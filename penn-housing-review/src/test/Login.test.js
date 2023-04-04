import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login.js";

describe("Login component", () => {
  test("renders login form by default", () => {
    const { getByText } = render(<Login />);
    const loginTitle = getByText("Login to Continue");
    expect(loginTitle).toBeInTheDocument();
  });

  test("clicking register button shows registration form", () => {
    const { getByText } = render(<Login />);
    const registerButton = getByText("Register");
    fireEvent.click(registerButton);
    const registerTitle = getByText("Create an Account");
    expect(registerTitle).toBeInTheDocument();
  });

  test("clicking back button shows login form", () => {
    const { getByText } = render(<Login />);
    const registerButton = getByText("Register");
    fireEvent.click(registerButton);
    const backButton = getByText("Back");
    fireEvent.click(backButton);
    const loginTitle = getByText("Login to Continue");
    expect(loginTitle).toBeInTheDocument();
  });

  test("clicking login button does not change title", () => {
    const { getByText } = render(<Login />);
    const loginButton = getByText("Login");
    fireEvent.click(loginButton);
    const loginTitle = getByText("Login to Continue");
    expect(loginTitle).toBeInTheDocument();
  });
})
