import { ulid } from "ulid";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "./dynamo";

export * as Article from "./article";

const ArticleEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Article",
      service: "scratch",
    },
    attributes: {
      articleID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      title: {
        type: "string",
        required: true,
      },
      url: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["articleID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type ArticleEntityType = EntityItem<typeof ArticleEntity>;

export async function create(title: string, url: string) {
  const result = await ArticleEntity.create({
    articleID: ulid(),
    title,
    url,
  }).go();
  return result.data;
}

export async function get(articleID: string) {
  const result = await ArticleEntity.get({ articleID }).go();
  return result.data;
}

export async function list() {
  const result = await ArticleEntity.query.primary({}).go();
  return result.data;
}


const CommentEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Comment",
      service: "scratch",
    },
    attributes: {
      articleID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      commentID: {
        type: "string",
        required: true,
      },
      text: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["articleID","commentID"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type CommentEntityType = EntityItem<typeof CommentEntity>;

export async function addComment(articleID: string, text: string) {
  const result = await CommentEntity.create({
    articleID,
    commentID: ulid(),
    text,
  }).go();
  return result.data;
}

export async function updateComment(articleID: string, commentID: string, text: string) {
 await CommentEntity.update({
    articleID,
    commentID,
  }).set({text}).go();
  return {
    articleID,
    commentID,
    text,
  };
}


export async function removeComment(articleID: string, commentID: string): Promise<{}> {
  const result = await CommentEntity.remove({
    articleID,
    commentID,
  }).go();
  return result.data;
}

export async function comments(articleID: string) {
  const result = await CommentEntity.query.primary({ articleID }).go();
  return result.data;
}