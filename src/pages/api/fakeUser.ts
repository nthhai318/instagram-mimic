import { type NextApiRequest, type NextApiResponse } from "next";
import { fakeUser } from "~/fake-data/User";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ fakeUser })
}