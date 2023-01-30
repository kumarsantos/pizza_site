// import dbConnect from '@/utility/mongo';
// import User from '@/models/User';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { method } = req;

  //   dbConnect();

  if (method === 'GET') {
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'POST') {
    try {
      const { username, password } = req.body;
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );
        res.status(200).json('Successful');
      } else {
        res.status(400).json('Invalid credentials');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
