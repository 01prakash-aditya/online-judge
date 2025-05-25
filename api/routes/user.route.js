import express from 'express';
import {deleteUser, test, updateUser, submitSolution, getUserSolvedProblems} from '../controllers/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post("/update/:id", verifytoken, updateUser);
router.delete("/delete/:id", verifytoken, deleteUser);
router.post("/submit-solution", verifytoken, submitSolution);
router.get("/solved-problems", verifytoken, getUserSolvedProblems);

export default router;