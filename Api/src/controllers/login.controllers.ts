import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Debes escribir un usuario y una constraseña" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "El usuario digitado no existe" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(400).json({ token: createToken(user) });
  }

  return res.status(400).json({
    msg: "The email or password are incorrect"
  });
};