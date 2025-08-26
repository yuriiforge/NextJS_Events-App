import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      const existingUser = await User.findOne({ email: userEmail });

      if (existingUser) {
        res.status(409).json({ message: 'Email already registered.' });
        return;
      }

      const newUser = await User.create({ email: userEmail });

      res.status(201).json({
        message: 'Signed up!',
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
