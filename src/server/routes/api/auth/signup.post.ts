import {defineEventHandler, readBody, readValidatedBody} from 'h3';
import {signupUserSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  //----> Retrieve the request body.
  const body = await readValidatedBody(event, signupUserSchema.parse);

  //----> Signup the new user and send back a response.
  return await authService.signupUser(body);
});
