import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import couponRoutes from "./routes/coupon.route";
import productRoutes from "./routes/product.route";
import { initDb } from "./models";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/coupons", couponRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
