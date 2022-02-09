import { LockClosedIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, {
  EventHandler,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import Logo from "../Logo";

type RegisterFormProps = {
  onLoginClick: EventHandler<SyntheticEvent>;
  onSubmit: (name: string, emailAddress: string, password: string) => any;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onLoginClick,
}) => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await onSubmit(name, emailAddress, password);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="w-auto h-20 mx-auto fill-indigo-700" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              type="button"
              onClick={onLoginClick}
            >
              Sign in here!
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Name"
              />
            </div>
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
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
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
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password-repeat" className="sr-only">
                Password (repeat)
              </label>
              <input
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.currentTarget.value)}
                id="password-repeat"
                name="password-repeat"
                type="password"
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Password (repeat)"
              />
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
