import { defineEventHandler, sendRedirect} from 'h3';
import {isPublicRoute} from "../utils/publicRoutes.util"
import {StatusCodes} from "http-status-codes";
import { authService } from '../services/auth/AuthService';


export default defineEventHandler(async (event) => {
//---->  Check for public routes.
  const route = event.node.req.originalUrl!;
  const session = authService.getUserSession(event);
  if (!isPublicRoute(route) && !session?.isLoggedIn) {
    await sendRedirect(event, '/login', StatusCodes.UNAUTHORIZED);
  }
});
