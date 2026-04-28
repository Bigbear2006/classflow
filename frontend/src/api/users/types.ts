export interface RegisterUserData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  fullname: string;
  phone: string;
}

export interface ChangeUserPasswordData {
  old_password: string;
  new_password: string;
}

export interface LoginUserResponse {
  access_token: string;
}
