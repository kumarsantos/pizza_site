import dbConnect from '@/utility/mongo';
import Order from '@/models/Order';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies?.token;

  dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('Not authenticated!');
    }
    try {
      const order = await Order.findById(id);
      order.status += 1;
      order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('Not authenticated!');
    }
    try {
      res.status(200).json({ message: 'Deleted pizza' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
