import { defineEventHandler } from 'h3';
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async(event) => {
  //----> Get the current user.
  return await authService.getCurrentUser(event);
});
