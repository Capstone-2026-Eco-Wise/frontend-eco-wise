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
        const res = await API.post<AuthResponse>('/users/sign-up', data,
        {
            headers:{
                'Content-Type': 'application/json',
                apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaXpydWtscGZwbHFrZmJ0cWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjQ4MzgsImV4cCI6MjA5MjUwMDgzOH0.T0R5NWxuhx56TlBwPjZtOoJAL6hDqhe7UgK41TTzGf8',
            }
        });
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