export interface AuthStore {
  accessToken: string;
  setAccessToken(action: Action): void;
  updateAccessToken(action: Action): void;
  clearAccessToken(): void;
}

export type Action = string | FunctionAction;
export type FunctionAction = (prev: string) => string;
