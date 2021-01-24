import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import {
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Checkbox,
  Select,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

const schema = Yup.object().shape({
  firstName: Yup.string().min(3).max(50).required("First Name cannot be empty"),
  lastName: Yup.string().min(3).max(50).required("Last Name cannot be empty"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 chars length")
    .required("Password is required"),
  country: Yup.string().required(),
  terms: Yup.boolean().oneOf([true], "You must accept terms and conditions"),
});

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  country: "Select your country",
  terms: false,
};

const AdvancedForm = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorsState, setErrorsState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    terms: "",
  });
  const [show, setShow] = React.useState(false);
  const handlePassClick = () => setShow(!show);
  function handleFieldValidation(e) {
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

  useEffect(() => {
    async function helper() {
      const valid = await schema.isValid(formData);
      setIsButtonDisabled(!valid);
    }

    helper();
  }, [formData]);

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("https://reqres.in/api/users", formData).then((response) => {
      props.handleUsersListUpdate(response.data);
      setFormData(initialData);
      console.log("response", response);
    });
  }

  function handleChange(e) {
    handleFieldValidation(e);
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl id="first-name" isRequired>
          <FormLabel>First name</FormLabel>
          {errorsState.firstName ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errorsState.firstName}
            </p>
          ) : null}
          <Input
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={formData.firstName}
          />
        </FormControl>

        <FormControl id="last-name" isRequired>
          <FormLabel>Last name</FormLabel>
          {errorsState.lastName ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errorsState.lastName}
            </p>
          ) : null}
          <Input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={formData.lastName}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          {errorsState.email ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errorsState.email}
            </p>
          ) : null}
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          {errorsState.password ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errorsState.password}
            </p>
          ) : null}
          <InputGroup>
            <Input
              name="password"
              type={show ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePassClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="country">
          <FormLabel>Country</FormLabel>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="Select your country">Select your country</option>
            <option value="md">Moldova</option>
            <option value="ro">Romania</option>
            <option value="ru">Russia</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl id="terms" margin="30px 5px">
          <Checkbox
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
          >
            Do you Agree with Terms and Conditions?
          </Checkbox>
        </FormControl>

        <Button
          type="submit"
          colorScheme="pink"
          size="lg"
          disabled={isButtonDisabled}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default AdvancedForm;
