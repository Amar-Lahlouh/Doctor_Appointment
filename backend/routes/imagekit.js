import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import ImageKit from "imagekit";
import fs from "fs";

const router = Router();
// imagekit auth
router.get("/", async (req, res) => {
  let imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  let authenticationParameters = imagekit.getAuthenticationParameters();
  console.log(authenticationParameters);
  return res.status(200).json(authenticationParameters);
});

export default router;
