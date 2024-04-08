import express from 'express';

import { Dump, dump } from '../bot';

const router = express.Router();

type CheatResponse = Dump;

router.get<{}, CheatResponse>('/', async (req, res) => {
  const data = await dump();
  res.json(data);
});

export default router;
