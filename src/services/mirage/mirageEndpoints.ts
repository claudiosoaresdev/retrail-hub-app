import { Response, Server } from "miragejs";
import { faker } from "@faker-js/faker";

import { AppSchema } from "./mirageTypes";

import { User } from "../../domain/auth/authCredentialsTypes";
import { Order } from "../../domain/orders/ordersTypes";

export function routesForAuth(server: Server) {
  server.post('/auth/signin', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { email, password } = attrs;

    if (email === "teste@teste.com" && password === "123456") {
      const user: User = {
        id: "1",
        displayName: "John Wick",
        email: "teste@teste.com",
      }

      return new Response(200, {}, {
        user,
        accessToken: "fake-access-token",
        refreshToken: "fake-refresh-token",
      });
    }

    return new Response(401, {}, {
      message: "Usuário e/ou senha inválidos",
    });
  });
}

export function routesForProducts(server: Server) {
  server.get("/products", (schema: AppSchema, request) => {
    const { page = "1", limit = "10" } = request.queryParams;
    const totalCount = schema.all("product").length;

    const pageStart = (Number(page) - 1) * Number(limit);
    const pageEnd = pageStart + Number(limit);

    const allProducts = schema.all("product").models;
    const products = allProducts.slice(pageStart, pageEnd);

    return new Response(
      200,
      { "x-total-count": String(totalCount) },
      products
    );
  });

  server.get("/products/:id", (schema: AppSchema, request) => {
    const product = schema.find("product", request.params.id);

    if (product) {
      return new Response(
        200,
        {},
        product.attrs,
      );
    }

    return new Response(404, {}, { message: "Produto não encontrado" });
  });
}

export function routesForOrders(server: Server) {
  server.get("/orders", (schema: AppSchema, request) => {
    const { page = "1", limit = "10" } = request.queryParams;
    const totalCount = schema.all("order").length;

    const pageStart = (Number(page) - 1) * Number(limit);
    const pageEnd = pageStart + Number(limit);

    const allOrders = schema.all("order").models;
    const orders = allOrders.slice(pageStart, pageEnd);

    return new Response(
      200,
      { "x-total-count": String(totalCount) },
      orders
    );
  });

  server.post("/orders", (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const order: Order = {
      id: faker.string.uuid(),
      userId: attrs.userId,
      items: attrs.items,
      totalAmount: attrs.totalAmount,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newOrder = schema.create("order", order);

    return new Response(
      201,
      {},
      newOrder.attrs,
    );
  });
}

const endpoints = {
  auth: routesForAuth,
  products: routesForProducts,
  orders: routesForOrders,
}

export { endpoints }