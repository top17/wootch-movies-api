import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel, { Session } from "../model/session.model";
import { privateFields, User } from "../model/user.model";
import { signJwt } from "../utils/jwt";
import { FilterQuery, UpdateQuery } from "mongoose";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionsByUserId(userId: string) {
  return SessionModel.find({ user: userId, valid: true });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function updateSessionsByUserId(
  userId: string,
  update: UpdateQuery<Session>
) {
  return SessionModel.updateMany({ user: userId, valid: true }, update);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
}
