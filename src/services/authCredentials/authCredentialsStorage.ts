import { AuthCredentials } from "../../domain/auth/authCredentialsTypes";
import { storageService } from "../storage/storageService";

const AUTH_KEY = '@Auth';

async function set(ac: AuthCredentials): Promise<void> {
  await storageService.setItem(AUTH_KEY, ac);
}

async function get(): Promise<AuthCredentials | null> {
  const ac = await storageService.getItem<AuthCredentials>(AUTH_KEY);

  return ac;
}

async function remove(): Promise<void> {
  await storageService.removeItem(AUTH_KEY);
}

export const authCredentialsStorage = {
  set,
  get,
  remove,
};