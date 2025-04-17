import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    // Login request
    const loginResponse = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    });
    if (!loginResponse.ok) {
      throw new Error(
        `Error: ${loginResponse.status} ${loginResponse.statusText}`
      );
    }
    // Redirect main page
    navigate("/");
  };

  return (
    <form onSubmit={login}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Login</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default Login;
