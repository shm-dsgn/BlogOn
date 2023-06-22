import { useState } from "react";
import Form from "../components/Form";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    console.log("onSubmit login page", username, password);
  };

  return (
    <Form
      label={"Login"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

export default LoginPage;
