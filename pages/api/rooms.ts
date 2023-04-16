import { createRoom } from "@/utils/helpers/roomHelper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method){
        case 'POST':
            const result = await createRoom(req.body.room)
            res.status(200).json({...req.body.room})
            return;
        default:
            res.status(200).json({})
            return;
    }
}