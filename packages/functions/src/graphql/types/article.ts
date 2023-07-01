import { Article } from "@graphql-sst-sample/core/article";
import { builder } from "../builder";

const ArticleType = builder
  .objectRef<Article.ArticleEntityType>("Article")
  .implement({
    fields: (t) => ({
      id: t.exposeID("articleID"),
      url: t.exposeString("url"),
      title: t.exposeString("title"),
      comments: t.field({
        type: [CommentType],
        resolve: (article) => Article.comments(article.articleID),
      }),
    }),
  });


const CommentType = builder.objectRef<Article.CommentEntityType>("Comment").implement({
  fields: (t) => ({
    id: t.exposeID("commentID"),
    text: t.exposeString("text"),
  }),
});

builder.queryFields((t) => ({
  article: t.field({
    type: ArticleType,
    args: {
      articleID: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const result = await Article.get(args.articleID);
      if (!result) {
        throw new Error("Article not found");
      }
      return result;
    },
  }),
  articles: t.field({
    type: [ArticleType],
    resolve: () => Article.list(),
  }),
}));

builder.mutationFields((t) => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.create(args.title, args.url),
  }),
  addComment: t.field({
    type: CommentType,
    args: {
      articleID: t.arg.string({ required: true }),
      text: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.addComment(args.articleID, args.text),
  }),
}));

