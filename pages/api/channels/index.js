import { getAllChannels, createChannel } from "@/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all channels
        const channels = await getAllChannels()
        res.status(200).json(channels)
        break

      // res
      //   .status(200)
      //   .json({ message: "GET request to /api/channels not implemented yet" });
      //   break;

    case "POST":
      // Create a new channel
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ message: "Missing channel name" });
            break;
        }
        const newChannel = await createChannel(text);
        res.status(201).json(newChannel);
        break;

      //res
        // .status(200)
        // .json({ message: "POST request to /api/channels not implemented yet" });
      //break;
    default:
      res.status(405).end();
  }
}
