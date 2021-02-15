// @ts-nocheck
import { Router } from "express";
import { auth } from "../middleware/auth";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;

const router = Router();

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});
let s3Bucket = new AWS.S3({ params: { Bucket: "clonetaskadeimages" } });

router.post("/image", auth, async (req, res, next) => {
  const { body } = req;
  const buf = Buffer.from(
    body.data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  let data = {
    Key: body.key,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
  };
  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      console.log("successfully uploaded the image!");
    }
  });
  const s3url = `https://clonetaskadeimages.s3.eu-central-1.amazonaws.com/${body.key}`;
  res.json({ url: s3url });
});
export default router;
