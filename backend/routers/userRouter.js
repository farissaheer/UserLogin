import express from "express";
import path from "path";
import multer from "multer";
import userControl from "../controllers/userController.js";
import { protect } from "../middleware/authenticate.js";

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "../frontend/public/assets");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

userRouter.get("/", userControl.homepage);
userRouter.post("/signup", userControl.signup);
userRouter.post("/login", userControl.login);
userRouter.post(
  "/updateProfile",
  upload.single("image"),
  protect,
  userControl.updateProfile
);

export default userRouter;
