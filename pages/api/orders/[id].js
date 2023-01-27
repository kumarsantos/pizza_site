import dbConnect from '@/utility/mongo';
import Order from '@/models/Order';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.findById(id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'PUT') {
    try {
      res.status(200).json({ message: 'Updated pizza' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'DELETE') {
    try {
      res.status(200).json({ message: 'Deleted pizza' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
