import {
  FormControl,
  FormLabel,
  Input,
  Box,
  InputRightElement,
  InputGroup,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context } from "../AuthContext/context";
import "../styles/login.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import  Cookies from 'universal-cookie';
// import png from ' ../assets/Gmail_Logo_16px.png';

const LoginPage = () => {
  const cookies = new Cookies();
  const [Loading, setLoading] = useState(false);
  const { authstate, fnauthstate, falseAuthState } = useContext(context);
  const [input, setInput] = useState({
    Username: "",
    password: "",
  });
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://fantastic-hen-cloak.cyclic.app/login",
        input
      );
      console.log(res.data.token);
      setLoading(false);
      if(res.data.token)
      {
        cookies.set('token', res.data.token, { path: '/' });

        setTimeout(() => {
          console.log(cookies.get('token'))
        }, 1000);
        toast({
          title: 'LoggedIn Sucessfully.',
          description: "Welcome!!",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        fnauthstate();
      }
      else{
        setLoading(false);
        toast({
          title: "Invalid credentials",
          description: "",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        falseAuthState();
      }
    } catch (e) {
      setLoading(false);
      toast({
        title: "Invalid credentials",
        description: "",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log(e);
    }
  };
  return (
    <div>
      {authstate ? (
        <Navigate to="/home" />
      ) : (
        <>
          <Box
              w="100vw"
              h="100vh"
              backgroundImage="url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
              backgroundSize="cover"
              backgroundPosition="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backdropFilter="blur(8px)" // Add this line for blur effect
          >
            <form
              onSubmit={handleSubmit}
              style={{
                // backgroundImage:
                //   "linear-gradient(to right top, #d2d7e0, #c8d3d7, #c3cdcd, #c1c7c3, #bfc0bc)",
                backgroundColor: "#FFF",
                padding: "20px",
                width: "50%",
                height: "auto",
                borderRadius: "20px",
              }}
            >
              <Heading
                as="h1"
                size={["md", "xl"]}
                color="teal"
                fontSize="4xl"
                fontWeight="medium"
              >
                WELCOME BACK!!
              </Heading>
              <FormControl>
                <FormLabel htmlFor="String">Username</FormLabel>
                <Input
                  type="String"
                  id="email"
                  name="Username"
                  border="1px solid black"
                  bg="white"
                  ref={inputRef}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      border="1px solid black"
                      bg="white"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <InputRightElement width="3rem">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        cursor="pointer"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

              <button className="stylish-button" type="submit">
                  LOGIN{Loading ? <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                    mb={-1}
                  /> : null}
              </button>
                <Link to='/signup'><button style={{borderBottom:'1px solid blue',color:'blue',marginLeft:'20px'}} type="click">
                  New User
                </button></Link>
            </form>
          </Box>
        </>
      )}
    </div>
  );
};

export default LoginPage;
