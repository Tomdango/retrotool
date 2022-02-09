import { LockClosedIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, {
  EventHandler,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import Logo from "../Logo";

type LoginFormProps = {
  onSubmit: (
    emailAddress: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  onRegisterClick: EventHandler<SyntheticEvent>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onRegisterClick }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    setError(undefined);
    setIsLoading(true);
    const result = await onSubmit(emailAddress, password);

    if (!result.success) {
      setIsLoading(false);
      setError(result.error);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="w-auto h-20 mx-auto fill-indigo-700" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              type="button"
              onClick={onRegisterClick}
            >
              Create one today!
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-2 border rounded-md border-neutral-500">
              <p role="alert" className="text-sm">
                <span className="font-medium text-red-600">Error:</span> {error}
              </p>
            </div>
          )}
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.currentTarget.value)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border  rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
