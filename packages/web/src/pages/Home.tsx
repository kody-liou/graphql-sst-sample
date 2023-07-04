import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTypedQuery } from "@graphql-sst-sample/graphql/urql";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import styles from "./Home.module.css";

export default function Home() {
  // Handle empty document cache
  // https://formidable.com/open-source/urql/docs/basics/document-caching/#adding-typenames
  // If not use useMemo, will get error:
  // react-dom.development.js:16317 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // We can also just using a global variable to aviod this error.
  const context = useMemo(() => ({ 
    additionalTypenames: ["Article","Comments"],
  }), []);
  
  const [articles] = useTypedQuery({
    query: {
      articles: {
        id: true,
        url: true,
        title: true,
        comments: {
          id: true,
        },
      },
    },
    // pause: true, // Can pause the query
    context,
    // requestPolicy: 'cache-only',
  });

  return (
    <div>
      <Navbar />
      {articles.fetching ? (
        <Loading />
      ) : articles.data?.articles && articles.data?.articles.length > 0 ? (
        <ol className={styles.list}>
          {articles.data?.articles.map((article) => (
            <li key={article.id} className={styles.article}>
              <div>
                <h2 className={styles.title}>
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </h2>
                &nbsp;
                <a target="_blank" href={article.url} className={styles.url}>
                  ({article.url.replace(/(^\w+:|^)\/\//, "")})
                </a>
              </div>
              <div className={styles.footer}>
                <strong>{article.comments.length}</strong>
                <span className={styles.footerSeparator}>&bull;</span>
                <Link to={`/article/${article.id}`}>View Comments</Link>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <Empty>&#10024; Post the first link &#10024;</Empty>
      )}
    </div>
  );
}
