import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.post('/gettoken', controller.getToken)

export = router;