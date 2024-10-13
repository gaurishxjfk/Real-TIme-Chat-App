import clsx from "clsx";
import { SignInButton } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div
      className={clsx(
        "absolute h-screen w-full bg-gray-600 z-50 bg-opacity-25 backdrop-blur",
        "flex items-center justify-center"
      )}
    >
      <div className="bg-white w-[95%] sm:w-[50%] md:w-[35%] rounded-lg shadow-xl p-6 flex flex-col  gap-3 items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary">
          RealTime Chatiffy
        </h2>
        <p className="text-sm text-slate-600 text-center">
         <strong>Note:</strong>  The backend is hosted on a <u>free instance of Render</u>, so it may take <strong>1-2 minutes</strong> to respond the first
          time as the service wakes up from its inactive state.
        </p>
        <button
          className="bg-primary hover:op text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
          type="submit"
        >
          <SignInButton />
        </button>
      </div>
    </div>
  );
};

export default Login;
