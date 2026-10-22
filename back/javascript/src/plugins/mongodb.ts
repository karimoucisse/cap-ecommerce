import fp       from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

const connectToDatabase = async (fastify: FastifyInstance) => {
  const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/shop';

  await mongoose.connect(uri);
  fastify.log.info('MongoDB connected');

  fastify.addHook('onClose', async () => {
    await mongoose.disconnect();
    fastify.log.info('MongoDB disconnected');
  });
}

export default fp(connectToDatabase, { name: 'mongodb' });
