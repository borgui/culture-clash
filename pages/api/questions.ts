import { createQuestion, getQuestions, deleteQuestion } from "@/utils/helpers/questionHelper";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let result = null
    switch(req.method){
        case 'GET':
            result = await getQuestions()
            res.status(200).json(result)
            return;
        case 'POST':
            result = await createQuestion(req.body.question)
            res.status(200).json({...req.body.question})
            return;
        case 'DELETE':
            result = await deleteQuestion(req.body.id)
            res.status(200).json({...req.body.question})
            return;
        default:
            res.status(200).json({})
            return;
    }
}