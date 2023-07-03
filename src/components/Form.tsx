import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";
import Spinner from "./Spinner";

interface FormProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  label: string;
  onSubmit: (event: React.FormEvent) => void;
  spinner: boolean;
  children?: React.ReactNode;
}

const Form = (props: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="m-2">
      <h2 className="font-bold text-2xl text-center">{props.label}</h2>
      <form
        onSubmit={props.onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="my-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Username
          </label>
          <input
            className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter Username"
            id="username"
            onChange={(event) => props.setUsername(event.target.value)}
            value={props.username}
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              onChange={(event) => props.setPassword(event.target.value)}
              value={props.password}
            />

            {!showPassword ? (
              <Eye
                size={24}
                className=" -mx-10 cursor-pointer text-blue-500"
                weight="duotone"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeClosed
                size={24}
                className=" -mx-10 cursor-pointer text-blue-500"
                weight="duotone"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        {props.children}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full flex gap-4 justify-center items-center"
        >
          {props.spinner ? <Spinner color="white" /> : ""}
          {props.label}
        </button>
      </form>
    </div>
  );
};

export default Form;
