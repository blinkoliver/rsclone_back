import { Router } from 'express';

const router = Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.json(['tasks']);
});
 
export default router

