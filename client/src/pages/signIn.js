import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Form from "../components/form";
import Input from "../components/input";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions/userActions";
import Loader from "../components/loader";

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // userInfo && console.log(userInfo.user_id);
  useEffect(() => {
    if (userInfo) {
      history.push(`/user/${userInfo.returnedUsername}`);
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
        {error && <p className="red shadow">{error}</p>}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-3/4 md:w-1/2 uppercase" type="submit">
          Sign In
        </Button>
      </Form>
    </Layout>
  );
};

export default SignIn;
