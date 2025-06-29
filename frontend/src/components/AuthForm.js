import {
  Form,
  useSearchParams,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // getting All Params object
  const [searchParams] = useSearchParams();
  // specifically getting the value of the "mode" using .get() and using it
  const isLogin = searchParams.get("mode") === "logIn";

  // getting data returnded after submitting the form (if any) using useActionData()
  const data = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
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
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting.." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
