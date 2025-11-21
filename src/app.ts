import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import couponRoutes from "./routes/coupon.route";
import { initDb } from "./models";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/coupons", couponRoutes);

// ⬇️ THIS export is the ONLY thing we add
export default app;

// ⬇️ Server should only start if NOT in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = Number(process.env.PORT) || 3000;

  (async () => {
    try {
      await initDb();
      app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
      );
    } catch (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  })();
}
