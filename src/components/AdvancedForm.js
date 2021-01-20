import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";

const AdvancedForm = (props) => {
  const {
    handleSubmit,
    formState,
    errorsState,
    handleChange,
    isButtonDisabled,
  } = props;
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl id="first-name" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="last-name" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" onChange={handleChange} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
          ></Input>
          {errorsState.password ? (
            <FormErrorMessage>{errorsState.password}</FormErrorMessage>
          ) : null}
        </FormControl>

        {/* <FormControl id="country">
          <FormLabel>Country</FormLabel>
          <Select name="country" placeholder="Select country" >
            <option>Moldova</option>
            <option>Romania</option>
          </Select>
        </FormControl>*/}

        <FormControl id="terms">
          <Checkbox
            name="terms"
            checked={formState.terms}
            onChange={handleChange}
          >
            Do you Agree with Terms and Conditions?
          </Checkbox>
        </FormControl>
        <Button disabled={isButtonDisabled}>Submit</Button>
      </form>
    </Container>
  );
};
export default AdvancedForm;
