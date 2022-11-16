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
