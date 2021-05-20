import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useGlobalState } from "../../Context/GlobalState";

export default function Post({ id }) {
  const { state } = useGlobalState();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const aux = state.Posts?.find((post_) => post_.id === Number(id));
    setPost(aux);
  }, [state]);

  if (state.Token === undefined || post === null) {
    return <p>Loading</p>;
  }

  if (state.Token === null) {
    router.push("/login");
  }

  if (post === undefined) {
    return (
      <>
        <Head>
          <title>No results</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <h1 className="display-4">
            Sorry, we couldn't find the requested post.
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="post">
        <h1 className="display-4">{post.title}</h1>
        <p className="lead">{post.body}</p>
        <style jsx>
          {`
            .post {
              max-width: 800px;
              height: 80%;
            }
          `}
        </style>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
