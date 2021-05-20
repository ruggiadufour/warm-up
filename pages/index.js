import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "../Components/Card";

import { useGlobalState } from "../Context/GlobalState";

export default function Home() {
  const { state } = useGlobalState();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  if (state.Token === undefined || state.Posts === null) {
    return (
      <>
        <Head>
          <title>Loading</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>Loading</p>
      </>
    );
  }

  if (state.Token === null) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>{`Home Posts`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="display-5">All Posts</h1>

      <div className="list flex-row wrap gap10">
        {state.Posts.map((post) => (
          <Card post={post} key={post.id + post.title + post.body} />
        ))}
      </div>

      <style jsx>{`
        .list {
          width: 100%;
        }
        h1 {
          flex: 1;
          width: 100%;
        }
      `}</style>
    </>
  );
}
