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
  // ** Hooks
  const router = useRouter();
  const [accessToken, setAccessToken] = useAuthStore();

  // Query Hooks
  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ["auth", accessToken],
    queryFn({ signal }) {
      return axios.get(authConfig.meEndpoint, {
        signal,
        headers: {
          Authorization: accessToken,
        },
      });
    },

    enabled: Boolean(accessToken),

    retry: 1,
    retryDelay: 1000 * 2,

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
      setAccessToken(response.data.accessToken, params.rememberMe);
    },
  });

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    mutation.mutate(params, {
      onError(err) {
        if (typeof errorCallback === "function") {
          // @ts-ignore
          errorCallback(err);
        }
      },
      async onSuccess() {
        const returnURL = (() => {
          const returnUrl = router.query.returnUrl;
          if (!returnUrl) {
            return "/";
          }

          if (typeof returnUrl !== "string") {
            return "/";
          }

          return returnUrl;
        })();

        await router.replace(returnURL);
      },
    });
  };

  const handleLogout = async () => {
    setAccessToken("");

    queryClient.removeQueries({
      queryKey: ["auth"],
    });

    await router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user: authQuery.data?.data.userData || null,
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
