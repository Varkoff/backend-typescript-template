import { Request, Response } from 'express';
import Player from '../models/players';

module.exports = {
  create: async (req: Request, res: Response) => {
    await Player.init();
    const player = new Player(req.body);
    const result = await player.save();
    res.json({ success: true, res: result });
  },
  read: async (req: Request, res: Response) => {
    const result = await Player.find();
    res.json({ success: true, res: result });
  },
};
