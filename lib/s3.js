import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(fileBuffer, key, mimeType) {
  const uploadParams = {
    Bucket: "gws-assests-bucket",
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    // ACL: "public-read",
  };
  const AWS_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_URL;
  await s3.send(new PutObjectCommand(uploadParams));
  return `${AWS_BUCKET}/${key}`;
}

export async function deleteFileFromS3(key) {
  const command = new DeleteObjectCommand({
    Bucket: "gws-assests-bucket",
    Key: key,
  });

  await s3.send(command);
}

export async function getSignedUrlForDownload(fileName) {
  const command = new GetObjectCommand({
    Bucket: "gws-assets-bucket",
    Key: fileName,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}
