import {TokenCreateInput, TokenUncheckedCreateInput} from "../../../generated/prisma/models/Token";
import {ResponseMessage} from "../../utils/responseMessage.util";

export interface ITokenService {
  createToken(request: TokenUncheckedCreateInput): Promise<void>;
  deleteAllInvalidTokens(): Promise<ResponseMessage>;
  deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage>;
  revokeValidTokensByUserId(userId: string): Promise<void>;
}
