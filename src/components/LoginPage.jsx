import {
  FormControl,
  FormLabel,
  Input,
  Box,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../AuthContext/context";
import '../styles/login.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const { authstate, fnauthstate, falseAuthState } = useContext(context);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.email === "admin@123") {
      fnauthstate();
      console.log(authstate);
    } else {
      falseAuthState();
      console.log("hello", authstate);
    }
    console.log(input.email);
  };
  return (
    <div>
      {authstate ? (
        <Navigate to="/dashboard" />
      ) : (
        <Box
          w="100vw"
          h="100vh"
          bg="teal"
          backgroundSize="cover"
          backgroundPosition="center"
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "rgb(248,248,255)",
              padding: "20px",
              width: "50%",
              height: "auto",
              borderRadius: "20px",
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
                <InputRightAddon
                  onClick={() => setShowPassword(!showPassword)}
                  cursor="pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    cursor="pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size="lg"
                  />
                </InputRightAddon>
              </InputGroup>
            </FormControl>

            <button className="stylish-button" type="submit">
              Login
            </button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default LoginPage;
