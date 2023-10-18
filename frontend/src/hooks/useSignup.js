import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    const { fname, lname, email, password, confirmPassword, role, nic, phone } =
      data;
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:9000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fname + " " + lname,
        email,
        password,
        confirmPassword,
        role,
        nic,
        phone,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message || "Resgistration failed. Please try again.");
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);

      //console.log(`User signed up successfully, ${json.email}, ${json.token}`);
    }
  };

  return { signup, isLoading, error };
};
