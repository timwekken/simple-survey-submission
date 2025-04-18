import {
  Button,
  Center,
  Field,
  Fieldset,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../utils/auth";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Login(email, password);
      // Redirect main page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Center p="16">
      <form onSubmit={login}>
        <Fieldset.Root size="lg" maxW="md">
          <Heading>Login</Heading>
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
    </Center>
  );
};

export default LoginComponent;
