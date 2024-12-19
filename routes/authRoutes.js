import express from "express"
import { signupUser,loginUser,forgotPassword ,resetPassword} from "../controller/userAuth.js"
const router=express.Router();
router.post("/signup",signupUser)
router.post("/login",loginUser);
router.post("/forgetPassword",forgotPassword);
router.post("/reset-password",resetPassword);
export default router;