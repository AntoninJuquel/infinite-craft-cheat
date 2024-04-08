import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import cheat from './cheat';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/cheat', cheat);

export default router;
