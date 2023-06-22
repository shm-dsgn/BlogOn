import React from "react";

interface FormProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  label: string;
  onSubmit: (event: React.FormEvent) => void;
}

const Form = (props: FormProps) => {
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
          <input
            className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={(event) => props.setPassword(event.target.value)}
            value={props.password}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full"
        >
          {props.label}
        </button>
      </form>
    </div>
  );
};

export default Form;
