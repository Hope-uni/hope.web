import { API_HOPE_PUBLIC } from "@/config";
import { LoginPayload, LoginResponse } from "@/models/schema";
import { API_RESPONSE } from "@/models/types";

export const LoginService = (loginPayload: LoginPayload) => {
    return API_HOPE_PUBLIC.post<API_RESPONSE<LoginResponse>>('auth/login', loginPayload);
};