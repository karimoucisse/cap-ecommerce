import Fastify from "fastify";
import connectToDatabase  from "./plugins/mongodb.js";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(import.meta.dirname, "config", ".env") });


const  PORT: string | number = process.env.PORT || 3000;

const app = Fastify({
  logger: true,
});
app.register(connectToDatabase);
// app.register('/products', ProductRoutes);

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
