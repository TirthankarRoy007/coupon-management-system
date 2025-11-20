import { Request, Response } from "express";
import productService from "../services/product.service";

const ProductController = {
  async create(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(_: Request, res: Response) {
    const products = await productService.listProducts();
    return res.json(products);
  },

  async get(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) return res.status(404).json({ error: "Not found" });
    return res.json(product);
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await productService.updateProduct(id, req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await productService.deleteProduct(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};

export default ProductController;
