import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useDisclosure,
  Select,
  Spinner,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/home.css";
import Cookies from "universal-cookie";
// import bgimg from '../assets/bgimg.jpg'

const HomePage = () => {
  const cookies = new Cookies();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({});
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = cookies.get('token');

      console.log("token", token)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        "https://fantastic-hen-cloak.cyclic.app/coustomer",
        customer,
        {
          headers,
        }
      );
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "please fill the input fields correctly",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isSubmitting ? (
        <Navigate to="/tabledata" />
      ) : (
        <div className="background-image">
          <div className="content-inside">
            <Box maxW="xl" mx="auto" p={4}>
              <Stack align="center" spacing={8}>
                <Heading as="h1" size="2xl">
                  Welcome to the Finance Project
                </Heading>
                <Text>
                  This project is designed to help you to Keep Track of your
                  Coustomer data in very simple and easy manner.
                </Text>
                <Link to="/dashboard">
                  <Button variantColor="teal" variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
                {/* <Image
                  src="https://media.istockphoto.com/id/1250581414/photo/blue-double-exposure-of-money-coins-stacking-with-bar-graph-for-financial-and-investment.jpg?s=612x612&w=0&k=20&c=tjDzpMnVSMO2RGzt0GNwL7ccmkJytRaKsco4HzB1X5k="
                  alt="finance"
                /> */}
              </Stack>
            </Box>

            <Box>
              <Button onClick={onOpen} id="newbtn">Register New Customer</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                  <ModalContent>
                    <ModalHeader>Add new Customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <form onSubmit={handleSubmit}>
                        <FormControl>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input
                            id="name"
                            name="Name"
                            type="text"
                            onChange={handleChange}
                            required
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="gender">Gender</FormLabel>
                          <Select
                            id="gender"
                            name="Gender"
                            onChange={handleChange}
                            placeholder="Select Gender"
                            required
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="Address">Address</FormLabel>
                          <Input
                            id="address"
                            name="Address"
                            type="text"
                            placeholder="Enter address.."
                            onChange={handleChange}
                            required
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="amount">Amount</FormLabel>
                          <Input
                            id="amount"
                            name="Amount"
                            type="number"
                            onChange={handleChange}
                            required
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="rate">Rate</FormLabel>
                          <Input
                            id="rate"
                            name="Rate"
                            type="text"
                            onChange={handleChange}
                            required
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="Weight">Weight</FormLabel>
                          <Input
                            id="Weight"
                            name="Weight"
                            type="text"
                            placeholder="enter weight/pcs of product"
                            onChange={handleChange}
                            // required
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="gender">Category</FormLabel>
                          <Select
                            id="category"
                            name="Category"
                            onChange={handleChange}
                            placeholder="Select Category"
                            required
                          >
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Bike">bike</option>
                            <option value="Cycle">cycle</option>
                            <option value="Others">others</option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="Status">Status</FormLabel>
                          <Select
                            id="status"
                            name="Status"
                            onChange={handleChange}
                            placeholder="Select Status"
                            required
                          >
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Renew">Renew</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="date">Date</FormLabel>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            placeholder="Select date"
                            onChange={handleChange}
                            required
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="phoneNumber">
                            Phone Number
                          </FormLabel>
                          <Input
                            id="phoneNumber"
                            name="PhoneNumber"
                            type="number"
                            placeholder="enter phone number"
                            onChange={handleChange}
                          // required
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="remarks">Remarks</FormLabel>
                          <Input
                            id="remarks"
                            name="Remarks"
                            type="text"
                            placeholder="Enter Remarks"
                            onChange={handleChange}
                          // required
                          />
                        </FormControl>

                        <ModalFooter>
                          <Button
                            variantColor="blue"
                            mr={3}
                            onClick={handleSubmit}
                            bg="plum"
                          >
                            {isLoading ? (
                              <Spinner size="sm" color="white" />
                            ) : (
                              "Add Customer"
                            )}
                          </Button>
                          <Button variant="ghost" onClick={onClose}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </ModalOverlay>
              </Modal>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
