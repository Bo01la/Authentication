import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // access search params to know the mode (login OR sign up)
  const searchParams = new URL(request.url).searchParams; // getting search params from url
  const mode = searchParams.get("mode") || "logIn"; // getting the mode value

  // handle if users manually changed the mode from url
  if (!mode === "logIn" && !mode === "signUp") {
    console.log("user manually changed the mode value in url");
  }

  // access the request data
  const data = await request.formData(); // handling the data passed from the form
  const formData = {
    // building our own data from the form data
    email: data.get("email"),
    password: data.get("password"),
  };

  // sennding the login / signup data to server
  // we saved it in a const to get data for error handling
  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // we return an error object
    return { errors: { title: "response is not OK", status: 500 } };
  }

  if (response.status === 442 || response.status === 401) {
    return response; // to be used in form validation
  }

  // soon will manage the authentication token...
  return redirect("/");
}
