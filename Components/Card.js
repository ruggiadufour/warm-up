import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useGlobalState } from "../Context/GlobalState";
import IconButton from "./IconButton";
import CreateEditPost from "./CreateEditPost";

//Reusable component for showing heroes main data
export default function Card({ post }) {
  const router = useRouter();
  const { dispatch } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const API = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function deletePost() {
    setLoading(true);
    axios
      .delete(API + "posts/" + post.id)
      .then((res) => {
        dispatch({ type: "deletePost", payload: post });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
    <div className="card-row">
      <div className="card-info">
        <h3 className="display-6" align="center" component="h5" variant="h5">
          {post.title}
        </h3>
        <p className="lead" align="left">
          {post.body}
        </p>
      </div>
      <div className="action-buttons">
        <IconButton
          label="👁"
          tooltip="See more"
          onClick={() => {
            router.push(`/posts/${post.id}`);
          }}
        />
        <CreateEditPost post={post} isEditing={true} />
        <IconButton
          label={loading ? "⏳" : "❌"}
          tooltip="Remove"
          onClick={deletePost}
        />
      </div>
      <style jsx>
        {`
          .card-row {
            width: 300px;
            min-height: 230px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            border-radius: 2px;
            border: solid thin lightgray;
            transition: transform 0.3s;
          }
          .card-row:hover {
            transform: scale(1.02);
          }
          .card-row:hover img {
            transform: scale(1.3);
          }
          .card-info {
            flex: 2;
            padding: 0 10px;
            text-align: center;
            width: 100%;
          }
          .action-buttons {
            height: min-content;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
}
