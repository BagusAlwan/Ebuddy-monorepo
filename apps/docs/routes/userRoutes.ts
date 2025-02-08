import express from "express";
import { fetchUser, updateUser, getAllUsers } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";
import { responseHandler } from "../middleware/responseHandler";

const router = express.Router();

router.get(
  "/fetch-user-data/:userId",
  authMiddleware,
  responseHandler(fetchUser)
);
router.get("/fetch-all-users", authMiddleware, responseHandler(getAllUsers));
router.put(
  "/update-user-data/:userId",
  authMiddleware,
  responseHandler(updateUser)
);

export default router;
