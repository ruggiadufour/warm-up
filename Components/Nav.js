import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useGlobalState } from "../Context/GlobalState";
import CreateEditPost from "../Components/CreateEditPost";

export default function Nav() {
  const API = process.env.NEXT_PUBLIC_API;
  const { state, dispatch } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios(API + "posts");
      dispatch({ type: "setPosts", payload: data.reverse() });
    }
    const token = localStorage.getItem("MyToken");
    dispatch({ type: "setToken", payload: token });

    getPosts();
  }, []);

  //Logout deletes the state and the localStorage
  function logout() {
    localStorage.removeItem("MyToken");
    dispatch({ type: "deleteToken" });
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div
          className="title"
          onClick={() => {
            router.push("/");
          }}
        >
          Posts 📰
        </div>
        {state.Token && <CreateEditPost isEditing={false} />}

        <div className="button">
          {!state.Token ? (
            <button
              className="btn btn-outline-secondary"
              type="button"
              color="inherit"
              size="large"
              onClick={() => {
                router.push("/login");
              }}
            >
              🙌 Login
            </button>
          ) : (
            <button
              className="btn btn-outline-secondary"
              type="button"
              color="inherit"
              size="large"
              onClick={logout}
            >
              👋 Logout
            </button>
          )}
        </div>
      </nav>
      <style jsx>
        {`
          .navbar {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 0.6rem 10%;
            background-color: lightgreen;
          }

          .button {
            margin-left: auto;
          }
          @media (max-width: 600px) {
            .button {
              margin: auto;
            }
          }
          .title {
            font-size: 2rem;
            margin: 0.5rem 1rem;
            cursor: pointer;
            color: white;
          }
        `}
      </style>
    </>
  );
}
