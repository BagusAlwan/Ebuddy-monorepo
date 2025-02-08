// File: middleware/responseHandler.ts
import { Request, Response } from "express";

export const responseHandler = (handler: (req: Request) => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: "error" });
    }
  };
};
