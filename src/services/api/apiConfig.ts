import axios from "axios";
import { authService } from "../../domain/auth/authService";
import { AuthCredentials } from "../../domain/auth/authCredentialsTypes";

export const BASE_URL = "http://10.0.2.2:3333/api";
export const api = axios.create({
  baseURL: BASE_URL,
});



