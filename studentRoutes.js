import {Router} from "express";
import {addStudent, findStudent} from "./studentController.js"

const router = Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudent);
//TODO hw: implement other routes

export default router;