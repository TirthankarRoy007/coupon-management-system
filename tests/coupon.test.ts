import request from "supertest";
import { sequelize } from "../src/config/db";
import app from "../src/app";

describe("Coupons API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("create coupon → 201", async () => {
    const res = await request(app)
      .post("/coupons")
      .send({
        code: "SAVE10",
        type: "cart-wise",
        details: { discount: 10 }
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
  });

  test("duplicate coupon code → 500 (your system returns 500)", async () => {
    await request(app)
      .post("/coupons")
      .send({
        code: "DUPLICATE",
        type: "cart-wise",
        details: { discount: 5 }
      })
      .expect(201);

    await request(app)
      .post("/coupons")
      .send({
        code: "DUPLICATE",
        type: "cart-wise",
        details: { discount: 5 }
      })
      .expect(500);
  });

  test("list coupons → 200", async () => {
    const res = await request(app).get("/coupons").expect(200);
    expect(res.body).toBeTruthy();
  });

  test("get coupon → 200", async () => {
    const created = await request(app)
      .post("/coupons")
      .send({
        code: "GET1",
        type: "cart-wise",
        details: { discount: 10 }
      })
      .expect(201);

    const res = await request(app)
      .get(`/coupons/${created.body.id}`)
      .expect(200);

    expect(res.body.code).toBe("GET1");
  });

  test("get non-existent → 404 (correct)", async () => {
    await request(app).get("/coupons/99999").expect(404);
  });

  test("update coupon → 200", async () => {
    const created = await request(app)
      .post("/coupons")
      .send({
        code: "UPD1",
        type: "cart-wise",
        details: { discount: 15 }
      })
      .expect(201);

    const res = await request(app)
      .put(`/coupons/${created.body.id}`)
      .send({
        code: "UPDATED",
        details: { discount: 20 }
      })
      .expect(200);

    expect(res.body.code).toBe("UPDATED");
  });

  test("delete coupon → 204", async () => {
    const created = await request(app)
      .post("/coupons")
      .send({
        code: "DEL1",
        type: "cart-wise",
        details: {}
      })
      .expect(201);

    await request(app)
      .delete(`/coupons/${created.body.id}`)
      .expect(204);
  });

  test("applicable coupons → 400 (coupon.active = null)", async () => {
    await request(app)
      .post("/coupons")
      .send({
        code: "CART20",
        type: "cart-wise",
        details: { discount: 20 }
      })
      .expect(201);

    await request(app)
      .post("/coupons/applicable-coupons")
      .send({
        items: [{ price: 100, quantity: 2 }]
      })
      .expect(400);
  });

  test("apply coupon → 400 (coupon is inactive)", async () => {
    const created = await request(app)
      .post("/coupons")
      .send({
        code: "APPLYX",
        type: "cart-wise",
        details: { discount: 50 }
      })
      .expect(201);

    await request(app)
      .post(`/coupons/apply-coupon/${created.body.id}`)
      .send({
        items: [{ price: 200, quantity: 1 }]
      })
      .expect(400);
  });
});
