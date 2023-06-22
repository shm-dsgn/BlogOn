import { useState } from "react";
import Form from "../components/Form";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    console.log("onSubmit regider page", username, password);
  };

  return (
    <Form
      label={"Register"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterPage;
