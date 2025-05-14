import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SigninProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SigninProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");//useState to store and update the input values dynamically as the user types in the form fields
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check credentials and log the user in
    if (username === "praveen" && password === "pass123") {
      sessionStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true); // Update authentication state immediately
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gray-50">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Sign in</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-bold" htmlFor="username">
              username
            </label>
            <input
              className="inline-block w-full p-4 text-lg leading-6 placeholder-indigo-900 bg-white border-2 border-indigo-900 rounded shadow"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="inline-block w-full p-4 text-lg leading-6 placeholder-indigo-900 bg-white border-2 border-indigo-900 rounded shadow"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="**********"
            />
          </div>
          <button
            type="submit"
            className="inline-block w-full px-6 py-4 mb-6 text-lg font-bold leading-6 text-center text-white transition duration-200 bg-indigo-800 border-indigo-900 rounded shadow hover:bg-indigo-900 border-3"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
