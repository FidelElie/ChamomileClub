import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from "@thechamomileclub/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const xata = getXataClient();

  const users = await xata.db.User.getAll();

  res.status(200).json({ users });
}
