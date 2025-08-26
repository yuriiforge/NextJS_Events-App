import dbConnect from '../../../lib/mongodb';
import Comment from '../../../models/Comment';

async function handler(req, res) {
  const { eventId } = req.query;
  await dbConnect();

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    try {
      const newComment = await Comment.create({
        eventId,
        email,
        name,
        text,
      });

      res.status(201).json({
        message: 'Added comment.',
        comment: newComment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Saving comment failed.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await Comment.find({ eventId }).sort({ createdAt: -1 });
      res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Fetching comments failed.' });
    }
  }
}

export default handler;
