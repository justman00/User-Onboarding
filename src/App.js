import React, { useState, useEffect } from "react";
import AdvancedForm from "./components/AdvancedForm";
import * as Yup from "yup";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import "./App.css";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Must include your First Name"),
  lastName: Yup.string().required("Must include your Last Name "),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 chars length")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept terms and conditions"),
});

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  terms: false,
};

function App() {
  const [formState, setFormState] = useState(initialState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorsState, setErrorsState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: "",
  });

  function handleFieldValidaton(e) {
    Yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrorsState({
          ...errorsState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorsState({
          ...errorsState,
          [e.target.name]: err.errors[0],
        });
      });
  }

  function handleChange(e) {
    handleFieldValidaton(e);
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }

  useEffect(() => {
    async function helper() {
      const valid = await schema.isValid(formState);
      setIsButtonDisabled(!valid);
    }

    helper();
  }, [formState]);

  useEffect(() => {
    axios.post("https://reqres.in/api/users", formState).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [formState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(initialState);
  };
  return (
    <div className="App">
      <Text fontSize="3xl" color="palevioletred">
        Hello User!
      </Text>
      <AdvancedForm
        formState={formState}
        isButtonDisabled={isButtonDisabled}
        errorsState={errorsState}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <pre>{JSON.stringify(formState.firstName)}</pre>
    </div>
  );
}

export default App;
