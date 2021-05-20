import React, { useState, useEffect } from "react";
import { DialogContent, DialogTitle, Dialog } from "@material-ui/core/";
import { Formik, Form, Field, ErrorMessage } from "formik";

import IconButton from "./IconButton";

import { useGlobalState } from "../Context/GlobalState";
import axios from "axios";

function CreateEditPost({ onClose, open, post, isEditing }) {
  const { state, dispatch } = useGlobalState();
  const API = process.env.NEXT_PUBLIC_API;

  const handleClose = () => {
    onClose();
  };

  async function save(values, isSubmitting) {
    if (isEditing) {
      await editPost(values, isSubmitting);
    } else {
      await createPost(values, isSubmitting);
    }
  }

  function editPost(values, isSubmitting) {
    const id = Number(post.id) > 100 ? 1 : post.id;
    axios
      .put(API + "posts/" + id, { ...values })
      .then((res) => {
        dispatch({ type: "editPost", payload: { ...res.data, id: post.id } });
        isSubmitting(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error.response);
        isSubmitting(false);
      });
  }
  function createPost(values, isSubmitting) {
    axios
      .post(API + "posts/", { ...values })
      .then((res) => {
        dispatch({
          type: "createPost",
          payload: { ...res.data, id: state.Posts[0].id + 1 },
        });
        isSubmitting(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        isSubmitting(false);
      });
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{isEditing ? "Edit post" : "Create post"}</DialogTitle>
      <DialogContent>
        {/* <h3 className="display-6">Login</h3> */}
        <Formik
          initialValues={{ title: post?.title || "", body: post?.body || "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            if (!values.body) {
              errors.body = "Content is required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            save(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="d-grid gap-3">
                <Field
                  className="form-control"
                  name="title"
                  placeholder="Title"
                />
                <ErrorMessage
                  className="badge rounded-pill bg-warning text-dark"
                  name="title"
                  component="div"
                />
                <Field
                  className="form-control"
                  name="body"
                  component="textarea"
                  placeholder="Content"
                />
                <ErrorMessage
                  className="badge rounded-pill bg-warning text-dark"
                  name="body"
                  component="div"
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "⏳" : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>

      <style jsx>
        {`
          .content {
            width: 500px;
          }
        `}
      </style>
    </Dialog>
  );
}

export default function ButtonDialog({ post, isEditing }) {
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const abortController = new AbortController()
    return function cleanup(){
      abortController.abort()
    }
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isEditing ? (
        <IconButton label="✍" tooltip="Edit" onClick={handleClickOpen} />
      ) : (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickOpen}
        >
          📑 Create Post
        </button>
      )}
      <CreateEditPost
        post={post}
        isEditing={isEditing}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
