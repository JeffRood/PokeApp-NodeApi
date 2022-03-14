import {Request, Response} from 'express'
import User, {IUser} from '../models/user';



export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: "debes colocar tu correo electronico" });
  }
  const user: IUser = req.body;

  if (user.errors) {
  return res.status(200).json({ success: false, data:null , message:"Los datos registrado tienen un error" });
    
  }

  const UserRegister = await User.findOne({ email: req.body.email });
  if (UserRegister) {
    return res.status(400).json({ msg: "Este usuario ya está registrado" });
  }

  const lastRecord = await User.findOne().sort({ field: 'asc', _id: -1 }).limit(1)

  const newuser = {
    _id: lastRecord?.id + 1,  
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role
  }
  const insert = await User.create(newuser);
  // await newUser.save();
  return res.status(200).json({ success: true, data:insert , message:"Usuario Registrado" });
};


export const getAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.find({});
  return res.status(200).json(user);
};

export const putUser = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const userMail = req.params.userMail;
  if (userMail) {
    return res.status(400).json( { success: false, data: null, message:"No se ha especificado un correo en la ruta" });
  }

  const user = await User.findOne({ email:  userMail });

  if (!user) {
    return res.status(400).json( { success: false, data: null, message:"El usuario no existe" });
  }

  User.updateOne({ email: req.body.email }, req.body );

  return res.status(200).json({ success: true, data: req.body, message:"Usuario Actualizado" });
};

