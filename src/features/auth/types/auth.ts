export type AuthResponse = {
    access_token: string;
    user: {
        fullName: string;
        fullName: string;
        avatar_url: string;
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