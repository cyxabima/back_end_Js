import { Router } from "express";
import { loginUser, logoutUser, registerUser,subscribeChannel } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

// router.post("/register",upload, registerUser); or 
router.route('/register').post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1  }
]), registerUser);

router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser)

router.route('/subscribe/:channel').post(verifyJwt,subscribeChannel)

export default router