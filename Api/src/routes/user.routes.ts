import { Router } from "express";
import passport from "passport";

const router = Router();

import { createUser, getAllUser } from "../controllers/user.controllers";



router.get(
  "/api/v1/user/list",
  passport.authenticate("jwt", { session: false }),getAllUser);


router.post(
  "/api/v1/user",createUser);


  router.put(
    "/api/v1/user/:userMail",
    passport.authenticate("jwt", { session: false }),createUser);

    
  
export default router;