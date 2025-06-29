import { Form, useSearchParams, Link } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // getting All Params object
  const [searchParams] = useSearchParams();
  // specifically getting the value of the "mode" using .get() and using it
  const isLogin = searchParams.get("mode") === "logIn";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/*using the value of "mode" to change UI and URL mode */}
          <Link to={`?mode=${isLogin ? "signUp" : "logIn"}`}>
            {isLogin ? "Create new user" : "Back to Login"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
