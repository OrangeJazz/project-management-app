export interface IFormData {
  name?: string;
  login: string;
  password: string;
}
export interface IAuthState {
  login: string;
  name: string;
  id: string;
  token: string;
  loading: boolean;
  isLoggedIn: boolean;
}
export interface ISignUpResp {
  name: string;
  login: string;
  _id: string;
  token: string;
}
export interface IErrorResp {
  statusCode: number;
  message: string;
}
export interface IDecodedToken {
  exp: number;
  iat: number;
  id: string;
  login: string;
}
export interface ILocalStorageData {
  id: string;
  token: string;
}
export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface IBoard {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}
