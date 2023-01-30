import dbConnect from '@/utility/mongo';
import Product from '@/models/Product';

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
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('Not authenticated!');
    }
    try {
      res.status(200).json({ message: 'Updated pizza' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('Not authenticated!');
    }
    try {
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product has been deleted', product });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
