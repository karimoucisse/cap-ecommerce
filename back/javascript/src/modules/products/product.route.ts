import { FastifyInstance } from "fastify";
import { Product, IProduct } from "./product.schemas.js";

const productRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.code(200).send(products);
    } catch (error) {
      res.code(500).send({ error: "Failed to fetch products" });
    }
  });

  fastify.post<{ Body: IProduct }>("/products", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.code(201).send(savedProduct);
    } catch (error) {
      res.code(500).send({ error: "Failed to create product" });
    }
  });

  fastify.get<{ Params: { id: string } }>("/products/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.code(404).send({ error: "Product not found" });
        return;
      }
      res.code(200).send(product);
    } catch (error) {
      res.code(500).send({ error: "Failed to fetch product" });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    "/products/:id",
    async (req, res) => {
      try {
        await Product.findByIdAndDelete(req.params.id);
        res.code(200).send({ message: "Product deleted successfully" });
      } catch (error) {
        res.code(500).send({ error: "Failed to delete product" });
      }
    },
  );
};

export default productRoutes;
