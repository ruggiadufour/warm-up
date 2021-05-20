import { useState, useEffect } from "react";
import Head from "next/head";

import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";
import { useRouter } from "next/router";
import { useGlobalState } from "../Context/GlobalState";

export default function Login() {
  const [message, setMessage] = useState("");
  const { state, dispatch } = useGlobalState();
  const LOGIN_API = process.env.NEXT_PUBLIC_LOGIN_API;

  const router = useRouter();

  //If the user isn' logged then is redirected to home
  useEffect(() => {
    if (state.Token) {
      router.push("/");
    }
  }, [state]);

  async function logIn(values, setSubmitting) {
    axios
      .get(`${LOGIN_API}?email=${values.email}&password=${values.password}`)
      .then(async (response) => {
        setSubmitting(false);
        const { token } = response.data;

        localStorage.setItem("MyToken", token);
        dispatch({ type: "setToken", payload: token });

        router.push("/");
      })
      .catch((error) => {
        setSubmitting(false);
        setMessage("Email/password incorrect");
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Create your account in HeroTeam 🐱‍🏍"
        />
        <meta name="author" content="Angel Ruggia Dufour" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="login, marvel team, dc team, heroe team maker"
        />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content="Login" />
        <meta
          name="og:description"
          property="og:description"
          content="Create your account in HeroTeam 🐱‍🏍"
        />
        <meta property="og:site_name" content="Login" />
      </Head>
      <div className="login">
        <h1>Login</h1>
        <p>Email: challenge@alkemy.org - Password: react</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }

            if (message !== "") {
              setMessage("");
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            logIn(values, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="d-grid gap-3">
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="📧 Email"
                />
                <ErrorMessage
                  className="badge rounded-pill bg-warning text-dark"
                  name="email"
                  component="div"
                />
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="🔒 Password"
                />
                <ErrorMessage
                  className="badge rounded-pill bg-warning text-dark"
                  name="password"
                  component="div"
                />

                <span className="badge rounded-pill bg-danger">{message}</span>

                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "⏳" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>
        {`
          .login {
            max-width: 400px;
          }
        `}
      </style>
    </>
  );
}
