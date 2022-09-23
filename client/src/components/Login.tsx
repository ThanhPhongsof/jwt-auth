import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import JWTManger from "../utils/jwt";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login, _] = useLoginMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login({
      variables: { loginInput: { username, password } },
    });

    if (response.data?.login.success) {
      JWTManger.setToken(response.data?.login.accessToken as string);
      navigate("..");
    } else {
      response.data?.login.message && setError(response.data?.login.message);
    }
  };

  return (
    <>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form style={{ marginTop: "1rem" }} onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
