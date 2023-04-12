import React from "react";
import { MLButton } from "@moneylend-ui";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MLButton
        variant={"contained"}
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </MLButton>
      <MLButton
        variant={"contained"}
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </MLButton>
    </div>
  );
};

export default HomePage;
