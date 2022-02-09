import { Transition } from "@headlessui/react";
import type { CodeDeliveryDetails } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useAuthContext } from "../../core/context/AuthContext";
import Card from "../components/Card";
import ConfirmSignupForm from "../components/forms/ConfirmSignupForm";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import AppWrapper from "../wrappers/AppWrapper";

type LoginDetails = { emailAddress: string; password: string };

const LoginView: React.FC = () => {
  const { login } = useAuthContext();
  const [currentView, setCurrentView] = useState("login");
  const [loginDetails, setLoginDetails] = useState<LoginDetails>();
  const [codeDetails, setCodeDetails] = useState<CodeDeliveryDetails>();

  const handleLoginSubmit = async (emailAddress: string, password: string) => {
    try {
      await login(emailAddress, password);
      return { success: true };
    } catch (error: any) {
      if (error.code === "UserNotConfirmedException") {
        const details = await Auth.resendSignUp(emailAddress);
        setLoginDetails({ emailAddress, password });
        setCodeDetails(details.CodeDeliveryDetails);
        setCurrentView("confirm-signup");
      }

      return { success: false, error: error.message };
    }
  };

  const handleRegisterSubmit = async (
    name: string,
    emailAddress: string,
    password: string
  ) => {
    try {
      const response = await Auth.signUp({
        username: emailAddress,
        password: password,
        attributes: { name },
      });
      setLoginDetails({ emailAddress, password });
      setCodeDetails(response.codeDeliveryDetails);
      setCurrentView("confirm-signup");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleConfirmSubmit = async (code: string) => {
    try {
      if (!loginDetails) throw new Error("loginDetails is invalid");

      const result = await Auth.confirmSignUp(loginDetails.emailAddress, code);

      if (result !== "SUCCESS")
        throw new Error("Failed to verify email address");

      return handleLoginSubmit(
        loginDetails.emailAddress,
        loginDetails.password
      );
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AppWrapper>
      <Card>
        <Transition
          show={currentView === "login"}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 hidden"
        >
          <LoginForm
            onSubmit={handleLoginSubmit}
            onRegisterClick={() => setCurrentView("register")}
          />
        </Transition>
        <Transition
          show={currentView === "register"}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 hidden"
        >
          <RegisterForm
            onLoginClick={() => setCurrentView("login")}
            onSubmit={handleRegisterSubmit}
          />
        </Transition>
        <Transition
          show={currentView === "confirm-signup"}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 hidden"
        >
          <ConfirmSignupForm
            onSubmit={handleConfirmSubmit}
            codeDetails={codeDetails}
          />
        </Transition>
      </Card>
    </AppWrapper>
  );
};

export default LoginView;
