import {defineEventHandler, readBody, readValidatedBody} from 'h3';
import {loginUserSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  //----> Retrieve the request body.
  const body = await readValidatedBody(event, loginUserSchema.parse);

  //----> Login user and send back a response.
  return await authService.loginUser(body, event);
});
