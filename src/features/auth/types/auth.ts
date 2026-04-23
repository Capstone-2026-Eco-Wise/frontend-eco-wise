export type AuthResponse = {
    token: string;
    user: {
        id: string;
        role: 'admin' | 'user';
        name: string;
        email: string;
    };
};

export type LoginPayLoad = {
    email: string;
    password: string;
};

export type RegisterPayLoad = {
    full_name: string;
    email: string;
    password: string;
    username: string
};