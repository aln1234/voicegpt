// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi';


type Data = {
  answer:string
}

export default async function sendQuestion(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {prompt,model,session} = req.body;

    if(!prompt) {
        res.status(400).json({answer:"Pleass provide a prompt"})
        return;
    }

    const response= await query(prompt,model)

    const message = {
        text:response || "Chat gpt was not able to find the answer"
    }
    res.status(200).json({ answer:message.text })

}
