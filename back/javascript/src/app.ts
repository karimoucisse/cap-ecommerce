import Fastify from "fastify";
import connectToDatabase  from "./plugins/mongodb.js";
import dotenv from "dotenv";
import path from "node:path";
import ProductRoutes from "./modules/products/product.route.js";
dotenv.config({ path: path.join(import.meta.dirname, "config", ".env") });


const  PORT: string | number = process.env.PORT || 3000;

const fastify = Fastify({
  logger: true,
});
fastify.register(connectToDatabase);
fastify.register(ProductRoutes);

fastify.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
