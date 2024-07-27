import { userService } from './api.js';

export const login = (credentials) => userService.login(credentials);
export const signup = (userData) => userService.signup(userData);
export const logout = () => userService.logout();