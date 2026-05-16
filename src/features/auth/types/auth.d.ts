export type AuthResponse = {
  access_token: string;
  user: {
    fullName: string;
    avatar_url: any;
    id: string;
    role: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
      username?: string;
    };
  };
};

export type LoginPayLoad = {
  email: string;
  password: string;
};

export type RegisterPayLoad = {
  fullName: string;
  email: string;
  password: string;
  username: string;
};

export type LoginResponseType = {
  data: {
    access_token: string;
  };
  message: string;
};

export type ReturnAuthType = {
  data: unknown | ResponseSessionUser;
  error: boolean;
  message: string;
};

export type ResponseSessionUser = {
  message: string;
  data: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    role: string;
    avatar_url: string;
  };
};
