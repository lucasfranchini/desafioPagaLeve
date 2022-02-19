import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  createCustomerInDatabase,
  createCustomerObject,
} from "../factories/customerFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /customers", () => {
  it("should return an array with all the customers", async () => {
    await createCustomerInDatabase();
    const res = await agent.get("/customers");
    expect(res.body.length).toBeGreaterThan(0);
  });
  it("should return an array containing the customer created", async () => {
    const customer = await createCustomerInDatabase();
    const res = await agent.get("/customers");
    expect(res.body[0]).toMatchObject(customer);
  });
});

describe("POST /customers", () => {
  it("should return status 201 for valid params", async () => {
    const customer = createCustomerObject();
    const res = await agent.post("/customers").send(customer);
    expect(res.status).toBe(httpStatus.CREATED);
  });
  it("should return an onbject containing all the customer data for valid params", async () => {
    const customer = createCustomerObject();
    const res = await agent.post("/customers").send(customer);
    expect(res.body).toMatchObject({ ...customer, id: expect.any(String) });
  });

  it("should return status 422 for invalid params", async () => {
    const customer = createCustomerObject();
    customer.email = "invalid";
    const res = await agent.post("/customers").send(customer);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});