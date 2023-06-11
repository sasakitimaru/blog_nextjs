import { MongoClient } from 'mongodb';

let client;
let collection;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    collection = client.db('myDatabase').collection('comments');
  }
};

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    if (req.method === 'POST') {
      const result = await collection.insertOne(req.body);
      console.log('result', result);
      res.status(200).json({ message: 'Comment saved successfully', data: result });
    } else if (req.method === 'GET') {
      const comments = await collection.find({ 'comment.pageId': req.query.pageId}).toArray();
      res.status(200).json({ comments });
    } else {
      res.status(405).send({ error: 'Only POST and GET methods are allowed' });
    }
  } catch (err) {
    console.dir(err);
    res.status(500).json({ message: 'Failed to handle the request', error: err.message });
  }
}
