import { defineEventHandler } from 'h3';
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
   //----> Logout user and send back a response.
    return await authService.logoutUser(event);
});
