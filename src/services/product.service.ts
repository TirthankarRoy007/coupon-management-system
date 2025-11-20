import { Product } from "../models";

export interface CreateProductDTO {
  name: string;
  price: number;
  sku?: string;
}

const productService = {
  async createProduct(data: CreateProductDTO) {
    const product = await Product.create(data as any);
    return product.toJSON();
  },

  async listProducts() {
    const products = await Product.findAll();
    return products.map((p) => p.toJSON());
  },

  async getProductById(id: number) {
    const product = await Product.findByPk(id);
    return product ? product.toJSON() : null;
  },

  async updateProduct(id: number, data: Partial<CreateProductDTO>) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.update(data);
    return product.toJSON();
  },

  async deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();
  },
};

export default productService;
