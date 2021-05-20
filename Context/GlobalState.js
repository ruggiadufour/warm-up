import { useReducer, createContext, useContext } from "react";

const initialState = {
  Token: undefined,
  Posts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setToken":
      return { ...state, Token: action.payload };
    case "deleteToken":
      return { ...state, Token: null };
    case "setPosts":
      return { ...state, Posts: action.payload };
    case "deletePost":
      return {
        ...state,
        Posts: state.Posts.filter((post) => post.id !== action.payload.id),
      };
    case "editPost":
      const newPosts = state.Posts.map((post) => {
        return post.id !== action.payload.id ? post : action.payload;
      });
      return { ...state, Posts: newPosts };
    case "createPost":
      return {
        ...state,
        Posts: [action.payload, ...state.Posts],
      };
    default:
      return state;
  }
};

const State = createContext(initialState);

export const ProviderState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <State.Provider value={{ state, dispatch }}>{children}</State.Provider>
  );
};

export const useGlobalState = () => useContext(State);
