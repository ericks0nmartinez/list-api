import { Request, Response } from "express";
import { Version } from "../models/Version";

export const getVersion = (req: Request, res: Response) => {
  const version: Version = {
    version: "1.0.0",
    description: "Initial project list-api",
    autor: "erickson martinez",
  };
  res.json(version);
};
