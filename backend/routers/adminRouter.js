import express from "express";
import adminController from "../controllers/adminController.js";
import { protect } from "../middleware/authenticate.js";

const adminRouter = express.Router();

adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: false }));

adminRouter.post("/login", adminController.login);
adminRouter.post("/userList", protect, adminController.userList);
adminRouter.post("/userDelete", adminController.userDelete);
adminRouter.post("/userEdit", adminController.userEdit);

export default adminRouter;
