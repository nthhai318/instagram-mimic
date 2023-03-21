import { type NextApiRequest, type NextApiResponse } from "next";
import { fakePosts } from "~/fake-data/Insta-posts";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json( fakePosts )
}