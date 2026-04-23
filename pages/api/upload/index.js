import fs from "fs";
import { IncomingForm } from "formidable";
import { uploadFile } from "@/lib/s3";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import methodHandler from "@/utils/requestHandler";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Error parsing file" });

    const file = files.file[0];
    const buffer = fs.readFileSync(file.filepath);
    const userId = fields.userId?.[0];
    const type = fields.type?.[0];

    if (!userId || !type) {
      return res.status(400).json({ error: "Missing userId or type" });
    }

    const key = `public/${userId}/${type}/${file.originalFilename}`;

    const s3Url = await uploadFile(buffer, key, file.mimetype);

    res.status(200).json({ url: s3Url });
  });
}

export default methodHandler({
  POST: handler,
});
