import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Form from "../components/form";
import Input from "../components/input";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions/userActions";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push(`/dashboard/${userInfo.returnedUsername}`);
    }
  }, [history, userInfo]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Layout>
      <Form title="Sign In" handleSubmit={(e) => handleLogin(e)}>
        {loading && <Loader />}
        {error && <ErrorMessage className="text-red-500 shadow">{error}</ErrorMessage>}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          name="email"
          className="mx-auto"
          className="mx-auto lg:w-1/4 "
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          name="password"
          className="mx-auto lg:w-1/4 "
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-3/4 md:w-1/2 lg:w-1/4  uppercase" type="submit">
          Sign In
        </Button>
        <Link to="/sign-up" className="mx-auto mt-5">
          If you don't have an account, <span style={{ color: "#ff0078" }}>Sign Up</span>
        </Link>
      </Form>
    </Layout>
  );
};

export default SignIn;
