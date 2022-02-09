import React from "react";
import Header from "../components/Header";

const AppWrapper: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="h-screen bg-gray-800">
        <div className="px-4 pt-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default AppWrapper;
