import { createServer, Server } from "miragejs";
import { faker } from '@faker-js/faker';

import { LOCAL_IP } from "./mirageTypes";
import { models } from "./mirageModels";
import { factories, productData } from "./mirageFactories";
import { endpoints } from "./mirageEndpoints";

export function makeServer(): Server {
  const server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList("user", faker.number.int({ min: 2, max: 25 }));
      server.createList("product", productData.length);
    },

    routes() {
      this.namespace = "api";
      this.urlPrefix = `http://${LOCAL_IP}:3333`;
      this.timing = 750;

      endpoints.auth(this);
      endpoints.products(this);
      endpoints.orders(this);

      this.passthrough();
      this.passthrough("http://10.0.2.2:3333/images/**");
    },
  });

  server.logging = true;

  return server;
}