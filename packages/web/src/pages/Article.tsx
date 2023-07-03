import { useParams } from "react-router-dom";
import { useTypedMutation, useTypedQuery } from "@graphql-sst-sample/graphql/urql";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import styles from "./Article.module.css";
import Button from "../components/Button";
import { useMemo } from "react";

export default function Article() {
  const { id = "" } = useParams();
  // Handle empty document cache
  // https://formidable.com/open-source/urql/docs/basics/document-caching/#adding-typenames
  const context = useMemo(() => ({ additionalTypenames: ["Comment"] }), []);

  const [article] = useTypedQuery({
    query: {
      article: [
        { articleID: id },
        {
          id: true,
          url: true,
          title: true,
          comments: {
            id: true,
            text: true,
          },
        },
      ],
    },
    context,
  });

  const [addCommentResult, addComment] = useTypedMutation((opts:CreateCommentForm) => ({
    addComment: [
      {
        text: opts.text,
        articleID: opts.articleID,
      },
      {
        id: true,
      },
    ],
  }));

  const [removeCommentResult, removeComment] = useTypedMutation((opts: RemoveCommentForm) => ({
    removeComment: [
      {
        articleID: opts.articleID,
        commentID: opts.commentID,
      },
      {
        success: true,
      },
    ],
  }));

  interface CreateCommentForm {
    text: string;
    articleID: string;
  }

  interface RemoveCommentForm {
    articleID: string;
    commentID: string;
  }

  return (
    <div>
      <Navbar />
      {article.fetching ? (
        <Loading />
      ) : article.data?.article ? (
        <div className={styles.article}>
          <h1>{article.data.article.title}</h1>
          <p>
            <a target="_blank" href={article.data.article.url}>
              {article.data.article.url}
            </a>
          </p>
          <ol className={styles.comments}>
            {article.data.article.comments?.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                {comment.text}
                <Button
                  variant="secondary"
                  className={styles.button}
                  loading={removeCommentResult.fetching || article.stale}
                  onClick={async ()=> {
                    if(!article.data) return;
                    await removeComment({articleID: article.data.article.id, commentID: comment.id});
                  }}
                >
                  x
                </Button>
              </li>
            ))}
          </ol>
          <form
            className={styles.form}
            onSubmit={async (e) => {
              e.preventDefault();

              const fd = new FormData(e.currentTarget);
              const text = fd.get("text")!.toString();

              e.currentTarget.reset();

              text.length > 0 &&
               (await addComment({
                 text,
                   articleID: id,
               }));
              }}
            >
            <textarea name="text" className={styles.field}></textarea>
            <Button
              type="submit"
              variant="secondary"
              className={styles.button}
              loading={addCommentResult.fetching || article.stale}
            >
              Add Comment
            </Button>
          </form>
        </div>
      ) : (
        <Empty>Not Found</Empty>
      )}
    </div>
  );
}
