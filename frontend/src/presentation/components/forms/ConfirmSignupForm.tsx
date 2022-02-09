import { Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import type { CodeDeliveryDetails } from "amazon-cognito-identity-js";
import clsx from "clsx";
import React, { FormEventHandler, useEffect, useState } from "react";
import Logo from "../Logo";

type ConfirmSignupFormProps = {
  codeDetails?: CodeDeliveryDetails;
  onSubmit: (code: string) => Promise<{ success: boolean; error?: string }>;
};

const ConfirmSignupForm: React.FC<ConfirmSignupFormProps> = ({
  codeDetails,
  onSubmit,
}) => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const [showResendCode, setShowResendCode] = useState(false);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(undefined);

    const { success, error } = await onSubmit(confirmationCode);

    if (!success) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    setTimeout(() => setShowResendCode(true), 5000);
  }, []);

  if (!codeDetails) return null;

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="w-auto h-20 mx-auto fill-indigo-700" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Verify your email address
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            We've sent you a code by {codeDetails.AttributeName} to{" "}
            <span className="font-medium">{codeDetails.Destination}</span>.
          </p>
          <Transition
            show={showResendCode}
            className="h-6 mt-1"
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <p className="text-sm text-center text-gray-600">
              Not received your verification code?{" "}
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
                type="button"
              >
                Send another code
              </button>
            </p>
          </Transition>
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
              <label htmlFor="confirmation-code" className="sr-only">
                Verification code
              </label>
              <input
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.currentTarget.value)}
                id="confirmation-code"
                name="confirmation-code"
                type="number"
                required
                className={clsx(
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  !error && "border-gray-300",
                  error && "border-red-600"
                )}
                placeholder="Confirmation code"
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
              Confirm email address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignupForm;
