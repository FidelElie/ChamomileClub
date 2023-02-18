import AuthServiceClass from "./auth.service";

const APP_SECRET = process.env.APP_SECRET || "development";

export const AuthService = new AuthServiceClass(APP_SECRET);


