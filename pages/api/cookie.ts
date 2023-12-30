import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req : NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = req.body;
    res.setHeader('Set-Cookie', `user=${user}; Path=/; HttpOnly`);
    res.status(200).send('Cookie has been set.');
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', 'user=; Path=/; HttpOnly; Max-Age=0');
    res.status(200).send('Cookie has been deleted.');
  }

  const { user } = req.cookies;
  if (user) {
    res.status(200).json(JSON.parse(user));
  }
}
