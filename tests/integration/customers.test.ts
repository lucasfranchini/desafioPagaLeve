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
    expect({
      ...res.body[0],
      birthday: new Date(res.body[0].birthday),
    }).toMatchObject(customer);
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
    expect({
      ...res.body,
      birthday: new Date(res.body.birthday),
    }).toMatchObject({
      ...customer,
      id: expect.any(String),
    });
  });

  it("should return status 422 for invalid params", async () => {
    const customer = createCustomerObject();
    customer.email = "invalid";
    const res = await agent.post("/customers").send(customer);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("DELETE /customers/:id", () => {
  it("should return status 200 for valid id", async () => {
    const customer = await createCustomerInDatabase();
    const res = await agent.delete(`/customers/${customer.id}`);
    expect(res.status).toBe(httpStatus.OK);
  });

  it("should return status 422 for invalid params", async () => {
    const res = await agent.delete("/customers/invalid");
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 for not registered id", async () => {
    const res = await agent.delete("/customers/6208405cc5ed489059e28f91");
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });
});

describe("PUT /customers/:id", () => {
  it("should return status 200 for valid id", async () => {
    const customer = await createCustomerInDatabase();
    const updatedCustomer = createCustomerObject();
    const res = await agent
      .put(`/customers/${customer.id}`)
      .send(updatedCustomer);
    expect(res.status).toBe(httpStatus.OK);
  });

  it("should return status 422 for invalid id", async () => {
    const customer = createCustomerObject();
    const res = await agent.delete("/customers/invalid").send(customer);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 422 for invalid update data", async () => {
    const customer = createCustomerObject();
    customer.email = "invalid";
    console.log(customer);
    const res = await agent
      .put("/customers/6208405cc5ed489059e28f91")
      .send(customer);
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 for not registered id", async () => {
    const customer = createCustomerObject();
    const res = await agent
      .delete("/customers/6208405cc5ed489059e28f91")
      .send(customer);
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });
});
describe("GET /customers/:id", () => {
  it("should return contain the customer searched", async () => {
    const customer = await createCustomerInDatabase();
    const res = await agent.get(`/customers/${customer.id}`);
    expect({
      ...res.body,
      birthday: new Date(res.body.birthday),
    }).toMatchObject(customer);
  });
  it("should return status 422 for invalid id", async () => {
    const res = await agent.get("/customers/invalid");
    expect(res.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
