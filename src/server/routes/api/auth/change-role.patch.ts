import {defineEventHandler, readBody, readValidatedBody} from "h3";
import {changeUserRoleSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  //---> Retrieve the request body.
  const changeUserRole = await readValidatedBody(event, changeUserRoleSchema.parse);

  //---> Change user role in db and send back a response.
  return await authService.changeUserRole(changeUserRole, event);
});
