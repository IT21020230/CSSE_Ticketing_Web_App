import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const updateUser = async (
    ID,
    email,
    password,
    name,
    phone,
    age,
    province,
    city,
    photo
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:7000/api/user/${ID}`, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        password,
        name,
        phone,
        age,
        province,
        city,
        photo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
};
