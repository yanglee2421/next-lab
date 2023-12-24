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
import { useAuthStore } from "@/hooks/store";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const authStore = useAuthStore();

  // Query Hooks
  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn({ signal }) {
      return axios.get(authConfig.meEndpoint, {
        signal,
        headers: {
          Authorization: authStore.accessToken,
        },
      });
    },

    enabled: Boolean(authStore.accessToken),

    retry: 1,
    retryDelay: 1000 * 2,

    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation<any, Error, LoginParams>({
    mutationFn(params) {
      return axios.post(authConfig.loginEndpoint, params);
    },
    onError(error) {
      console.error(error);
    },
    onSuccess(response, params) {
      // Remember me
      authStore.setAccessToken(response.data.accessToken, params.rememberMe);
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
    authStore.clearAccessToken();

    queryClient.removeQueries({
      queryKey: ["auth"],
    });

    await router.push("/login");
  };

  React.useEffect(() => {
    if (authQuery.isPending) {
      return;
    }

    if (authQuery.isError) {
      authStore.clearAccessToken();
      return;
    }

    if (authQuery.isSuccess) {
      authStore.updateAccessToken(authQuery.data.data.accessToken);
      return;
    }
  }, [authQuery, authStore]);

  return (
    <AuthContext.Provider
      value={{
        user: authQuery.data?.data.userData || null,
        loading: Boolean(authStore.accessToken) && authQuery.isPending,
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
