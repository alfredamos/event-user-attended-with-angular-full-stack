import {defineEventHandler, readBody, readValidatedBody} from "h3";
import {editProfileUserSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  //----> Retrieve the request body.
  const request = await readValidatedBody(event, editProfileUserSchema.parse);

  //----> Edit the user profile in db and send back a response.
  return await authService.editUserProfile(request);
});
