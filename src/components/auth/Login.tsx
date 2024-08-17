import clsx from "clsx";
import { appStore } from "../../store/store";
import { useState } from "react";

const Login = () => {
  const { loading, loginUser, error } = appStore((state) => state);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.length > 0 && password.length > 0 && !loading) {
      // const email = username + "@realtimechat.com";
      await loginUser({
        username,
        password,
      });
      // await registerUser({
      //   username,
      //   email,
      //   password,
      // });
    }
  };

  return (
    <div
      className={clsx(
        "absolute h-screen w-full bg-gray-600 z-50 bg-opacity-25 backdrop-blur",
        "flex items-center justify-center"
      )}
    >
      <div className="bg-white w-[95%] sm:w-[50%] md:w-[35%] rounded-lg shadow-xl p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-primary">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary "
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-primary "
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center -mt-6 mb-4 text-red-600 text-sm">
            {error && <p>{error}</p>}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className="bg-primary hover:bg-[#f36549] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
              type="submit"
            >
              Login
              <img src={`/arrow.svg`} alt="arrow" className="h-6 w-5" />
            </button>
            <button
              className="border-primary border text-[#f36549] bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
              type="button"
            >
              Guest Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
