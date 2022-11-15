export interface IFormData {
  name: string;
  username: string;
  password: string;
}
export interface IAuthState {
  login: string;
  name: string;
  id: string;
  token: string;
  loading: boolean;
}
export interface ISignInResp {
  name: string;
  login: string;
  _id: string;
}
export interface IErrorResp {
  statusCode: number;
  message: string;
}
