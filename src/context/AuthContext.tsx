// ** React Imports
import React from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType } from "./types";

// Query Imports
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Store Imports
import { useShallow } from "zustand/react/shallow";
import { useAuthLocalStore, useAuthSessionStore } from "@/hooks/store";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();

  const { localToken, localClear, localSet, localUpdate } = useAuthLocalStore(
    useShallow((store) => {
      return {
        localToken: store.accessToken,
        localClear: store.clearAccessToken,
        localSet: store.setAccessToken,
        localUpdate: store.updateAccessToken,
      };
    })
  );

  const { sessionToken, sessionClear, sessionSet, sessionUpdate } =
    useAuthSessionStore(
      useShallow((store) => {
        return {
          sessionToken: store.accessToken,
          sessionClear: store.clearAccessToken,
          sessionSet: store.setAccessToken,
          sessionUpdate: store.updateAccessToken,
        };
      })
    );

  const accessToken = localToken || sessionToken;

  // Query Hooks
  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn({ signal }) {
      return axios.get(authConfig.meEndpoint, {
        signal,
        headers: {
          Authorization: accessToken,
        },
      });
    },

    staleTime: 1000 * 30,

    enabled: Boolean(accessToken),

    retry: 1,
    retryDelay: 1000 * 1,

    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation<unknown, Error, LoginParams>({
    mutationFn(params) {
      return axios.post(authConfig.loginEndpoint, params);
    },
    onError(error) {
      console.error(error);
    },
    onSuccess(response, params) {
      // Remember me
      const setToken = params.rememberMe ? localSet : sessionSet;

      // @ts-ignore
      setToken(response.data.accessToken);
    },
  });

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    mutation.mutate(params, {
      onError(err) {
        if (typeof errorCallback === "function") {
          errorCallback(err);
        }
      },
      async onSuccess() {
        const returnURL = (() => {
          if (!router.query.returnUrl) {
            return "/";
          }

          if (typeof router.query.returnUrl !== "string") {
            return "/";
          }

          return router.query.returnUrl;
        })();

        await router.replace(returnURL);
      },
    });
  };

  const handleLogout = async () => {
    localClear();
    sessionClear();

    queryClient.removeQueries({
      queryKey: ["auth"],
    });

    await router.push("/login");
  };

  const user = React.useMemo(() => {
    if (authQuery.isPending) {
      return null;
    }

    if (authQuery.isError) {
      return null;
    }

    if (authQuery.isSuccess) {
      return authQuery.data?.data.userData;
    }
  }, [
    authQuery.isPending,
    authQuery.isError,
    authQuery.isSuccess,
    authQuery.data,
  ]);

  React.useEffect(() => {
    if (authQuery.isPending) {
      return;
    }

    if (authQuery.isError) {
      console.error(authQuery.error);

      localClear();
      sessionClear();

      return;
    }

    if (authQuery.isSuccess) {
      localUpdate(authQuery.data.data.accessToken);
      sessionUpdate(authQuery.data.data.accessToken);

      return;
    }
  }, [
    authQuery.isPending,
    authQuery.isError,
    authQuery.error,
    authQuery.isSuccess,
    authQuery.data,
    localClear,
    sessionClear,
    localUpdate,
    sessionUpdate,
  ]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: Boolean(accessToken) && authQuery.isPending,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContext = React.createContext<AuthValuesType>({
  user: null,
  loading: true,
  async login() {
    return;
  },
  async logout() {
    return;
  },
});
