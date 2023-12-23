export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UserDataType = {
  id: number;
  role: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar?: string | null;
};

export type AuthValuesType = {
  loading: boolean;
  user: UserDataType | null;
  logout: () => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
