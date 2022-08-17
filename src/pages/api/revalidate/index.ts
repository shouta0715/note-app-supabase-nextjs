/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
};
type Msg = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log("Revalidating notes page...");
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Your secret is invalid !" });
  }
  let revalidated = false;
  try {
    await res.revalidate("/notes");
    revalidated = true;
  } catch (err) {
    console.log(err);
  }
  res.json({
    revalidated,
  });
}
