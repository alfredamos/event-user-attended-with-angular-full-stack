import {TokenUncheckedCreateInput} from "../../../generated/prisma/models";
import {ITokenService} from "./ITokenService";
import {prisma} from "../../db/prisma";
import {ResponseMessage} from "../../utils/responseMessage.util";

class TokenService implements ITokenService {
    async createToken(request: TokenUncheckedCreateInput): Promise<void> {
      //----> create token
      await prisma.token.create({data: request});
    }

    async deleteAllInvalidTokens(): Promise<ResponseMessage> {
      //----> delete all invalid tokens
      await prisma.token.deleteMany({where: {expired: true, revoked: true}});

      //----> return response message
      return new ResponseMessage("All invalid tokens deleted successfully", "success", 200);
    }

    async deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage> {
      //----> delete all invalid tokens
      await prisma.token.deleteMany({where: {userId, expired: true, revoked: true}});

      //----> return response message
      return new ResponseMessage("All invalid tokens deleted successfully", "success", 200);
    }

    async revokeValidTokensByUserId(userId: string): Promise<void> {
        //----> revoke all valid tokens
      await prisma.token.updateMany({where: {userId, revoked: false, expired: false}, data: {revoked: true, expired: true}});
    }

}

export const tokenService = new TokenService();
