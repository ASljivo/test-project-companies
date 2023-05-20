import { AUTH } from "../constants";

class AuthHelper {
  static getToken(): string {
    const user = JSON.parse(localStorage.getItem(AUTH) || "null");
    return user?.tokenObj?.id_token;
  }

  static setAuth(auth: string): void {
    if (auth) {
      localStorage.setItem(AUTH, auth);
    }
  }

  static getAuth(): string {
    return localStorage.getItem(AUTH) || "";
  }

  static removeAuth(): void {
    localStorage.removeItem(AUTH);
  }
}

export default AuthHelper;
