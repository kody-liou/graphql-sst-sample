// packages/functions/src/graphql/builder.ts
import SchemaBuilder from "@pothos/core";
var builder = new SchemaBuilder({});
builder.queryType({});
builder.mutationType({});

// packages/core/src/article.ts

// packages/functions/src/graphql/types/article.ts
var ArticleType = builder.objectRef("Article").implement({
  fields: t => ({
    id: t.exposeID("articleID"),
    url: t.exposeString("url"),
    title: t.exposeString("title"),
    comments: t.field({
      type: [CommentType],
      resolve: article => comments(article.articleID)
    })
  })
});
var CommentType = builder.objectRef("Comment").implement({
  fields: t => ({
    id: t.exposeID("commentID"),
    text: t.exposeString("text")
  })
});
var CommentRemovedType = builder.objectRef("CommentRemoved").implement({
  fields: t => ({
    success: t.exposeBoolean("success")
  })
});
// packages/utils/src/dynamo.ts
var dynamo_exports = {};
var CommentEntity = new Entity({
  model: {
    version: "1",
    entity: "Comment",
    service: "scratch"
  },
  attributes: {
    articleID: {
      type: "string",
      required: true,
      readOnly: true
    },
    commentID: {
      type: "string",
      required: true
    },
    text: {
      type: "string",
      required: true
    }
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: []
      },
      sk: {
        field: "sk",
        composite: ["articleID", "commentID"]
      }
    }
  }
}, dynamo_exports.Configuration);
async function comments(articleID) {
  const result = await CommentEntity.query.primary({
    articleID
  }).go();
  return result.data;
}
builder.queryFields(t => ({
  article: t.field({
    type: ArticleType,
    args: {
      articleID: t.arg.string({
        required: true
      })
    }
  }),
  articles: t.field({
    type: [ArticleType]
  })
}));
builder.mutationFields(t => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({
        required: true
      }),
      url: t.arg.string({
        required: true
      })
    }
  }),
  addComment: t.field({
    type: CommentType,
    args: {
      articleID: t.arg.string({
        required: true
      }),
      text: t.arg.string({
        required: true
      })
    }
  }),
  updateComment: t.field({
    type: CommentType,
    args: {
      articleID: t.arg.string({
        required: true
      }),
      commentID: t.arg.string({
        required: true
      }),
      text: t.arg.string({
        required: true
      })
    }
  }),
  removeComment: t.field({
    type: CommentRemovedType,
    args: {
      articleID: t.arg.string({
        required: true
      }),
      commentID: t.arg.string({
        required: true
      })
    }
  })
}));

// packages/functions/src/graphql/schema.ts
var schema = builder.toSchema({});
export { schema };