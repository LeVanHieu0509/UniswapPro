export interface LoginInput {
  usr_name: string;
  usr_pass: string;
}

export interface UserProps {
  usr_id: number;
  usr_email: string;
  usr_age: string;
  usr_name: string;
  usr_status: 1;
  usr_address: string;
  usr_roles: "EMPLOYEE" | "ADMINIE";
  usr_phone: string;
  usr_blocked: boolean;
  usr_lock_count: boolean;
  usr_lock_time: number;
  usr_reset_password: number;
  usr_migration: number;
  updatedAt: string;
  createdAt: string;
}

export interface LoginOutPut {
  status: string;
  data: {
    user: UserProps;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
  message: string;
}

export interface ForgotPasswordInput {
  username: string;
  dob: string;
  idno: string;
}

export interface ForgotPasswordOutput {
  status: "SUCCESS" | "FAIL";
}

export interface ChangePasswordInput {
  username: string;
  password: string;
  newPassword: string;
}

export interface LogoutInput {
  refreshToken: string;
}
