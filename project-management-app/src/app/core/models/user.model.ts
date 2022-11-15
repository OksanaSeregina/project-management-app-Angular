export interface UserResp {
  name: string;
  login: string;
  _id: string;
}

export interface UserSigninReq {
  login: string;
  password: string;
}

export interface UserSignupReq {
  name: string;
  login: string;
  password: string;
}

export interface UserToken {
  token: string;
}

export interface UserData {
  _id?: string;
  name?: string;
  login?: string;
  token?: string;
  password?: string;
}

export interface DecodedToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}
