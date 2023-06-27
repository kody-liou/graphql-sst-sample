import { SSTConfig } from "sst";
import { Api } from "./stacks/Api.js";
import { Web } from "./stacks/Web.js";
import { Database } from "./stacks/Database.js";

export default {
  config(_input) {
    return {
      name: "graphql-sst-sample",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(Database)
      .stack(Api)
      .stack(Web);
  }
} satisfies SSTConfig;
