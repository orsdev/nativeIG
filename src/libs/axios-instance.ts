import { environment } from "@/utils";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: environment.baseUrl,
    timeout: 10000 // 10 seconds
})
