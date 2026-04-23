import axios from "axios";
import API from "@/lib/axios";
import type { AuthResponse, LoginPayLoad, RegisterPayLoad } from "../types/auth";

export const login = async(data: LoginPayLoad) => {
    try {
        const res = await API.post<AuthResponse>('/users/sign-in', data);
        return {
            error: false,
            data: res.data,
        };
    } catch (err) {
        if(axios.isAxiosError(err)) {
            return {
                error: true,
                data: err.response?.data,
            };
        }
    }
    return {
        error: true,
        data: null,
    };
};

export const register = async (data: RegisterPayLoad) => {
    try {
        const res = await axios.post<AuthResponse>('http://localhost:3030/api/users/sign-up', data);
        return {
            error: false,
            data: res.data,
        };
    } catch (err) {
        if(axios.isAxiosError(err)) {
            return {
                error: true,
                data: err.response?.data,
            };
        }
    }
    return {
        error: true,
        data: null,
    };
}; 