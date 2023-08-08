import { Api } from "sst/node/api";
import { expect, it } from "vitest";
import { createClient } from "@graphql-sst-sample/graphql/genql";
import {list as ArticleList} from "../../../core/src/article";

it("create an article", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const article = await client.mutation({
    createArticle: [
      { title: "Hello world", url: "https://example.com" },
      {
        id: true,
      },
    ],
  });
  const list = await ArticleList();
  expect(
    list.find((a) => a.articleID === article.createArticle.id)
  ).not.toBeNull();
});
