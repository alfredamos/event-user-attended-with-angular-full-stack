import { defineEventHandler } from 'h3';
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  //----> Refresh the user token.
  return await authService.refreshUserToken(event);
});
