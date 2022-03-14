import {Router} from 'express'
import {
  signIn,
} from '../controllers/login.controllers'

const router = Router();


router.post('/api/v1/signin', signIn);

export default router;