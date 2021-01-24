import React, { useState } from "react";
import AdvancedForm from "./components/AdvancedForm";
import { Text } from "@chakra-ui/react";
import "./App.css";

function App(props) {
  const [usersList, setUsersList] = useState([]);

  function handleUsersListUpdate(user) {
    setUsersList([...usersList, user]);
    console.log("user", user);
    console.log("usersList", usersList);
  }

  return (
    <div className="App">
      <Text fontSize="3xl" color="palevioletred">
        Hello User!
      </Text>
      <AdvancedForm
        handleUsersListUpdate={handleUsersListUpdate}
      ></AdvancedForm>
      <pre>{JSON.stringify(usersList)}</pre>
    </div>
  );
}

export default App;
