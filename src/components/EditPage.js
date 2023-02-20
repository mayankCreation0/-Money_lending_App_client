import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Cookies from 'universal-cookie'

const EditPage = () => {
  const cookies = new Cookies();
  const toast = useToast();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    PhoneNumber: "",
    Gender: "",
    Category: "",
    Weight: "",
    Rate: "",
    Remarks: "",
    Status: "",
  });
  useEffect(() => {
    const token = cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`https://fantastic-hen-cloak.cyclic.app/coustomer/${id}`, {
        headers,
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        `https://fantastic-hen-cloak.cyclic.app/coustomer/${id}`,
        formData,
        {
          headers,
        }
      );

      setIsLoading(false);
      toast({
        title: "Update the Changes",
        description: "All the Change is updated in Database",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      console.log(formData);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "We've created your account for you.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  //   const EditForm = styled(Box)`
  //     background-color: #f8f8f8;
  //     p {
  //       color: #333;
  //     }
  //     input {
  //       background-color: #fff;
  //       border: 1px solid #333;
  //       &:focus {
  //         outline: none;
  //         box-shadow: 0 0 10px #333;
  //       }
  //     }
  //   `;
  return (
    <Box
      p={6}
      shadow="md"
      borderWidth="1px"
      rounded="lg"
      background="linear-gradient(to bottom, #e6e9f0, #eef1f5)"
    >
      <Heading as="h3" size="lg" textAlign="center">
        Edit Data
      </Heading>
      <Box mt={8}>
        <form onSubmit={handleEdit}>
          <Flex
            direction="column"
            margin="auto"
            justifyContent="center"
            width="50%"
          >
            <FormControl mt={4}>
              <FormLabel htmlFor="Name">Name</FormLabel>
              <Input
                type="text"
                id="Name"
                name="Name"
                defaultValue={data.Name}
                border="2px solid black"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="Address">Address</FormLabel>
              <Input
                type="text"
                id="Address"
                name="Address"
                defaultValue={data.Address}
                border="2px solid black"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
              <Input
                type="number"
                id="PhoneNumber"
                name="PhoneNumber"
                defaultValue={data.PhoneNumber}
                border="2px solid black"
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
                defaultValue={data.Gender}
                border="2px solid black"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="gender">Category</FormLabel>
              <Select
                id="category"
                name="Category"
                onChange={handleChange}
                placeholder="Select Category"
                defaultValue={data.Category}
                border="2px solid black"
                required
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
                <option value="Bronze">Bronze</option>
                <option value="Others">Others</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="Weight">Weight</FormLabel>
              <Input
                type="text"
                id="Weight"
                name="Weight"
                defaultValue={data.Weight}
                border="2px solid black"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="Rate">Rate</FormLabel>
              <Input
                type="text"
                id="Rate"
                name="Rate"
                defaultValue={data.Rate}
                border="2px solid black"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="Amount">Amount</FormLabel>
              <Input
                type="number"
                id="Amount"
                name="Amount"
                defaultValue={data.Amount}
                border="2px solid black"
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="Remarks">Remarks</FormLabel>
              <Input
                type="text"
                id="Remarks"
                name="Remarks"
                defaultValue={data.Remarks}
                border="2px solid black"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="Status">Status</FormLabel>
              <Select
                id="status"
                name="Status"
                onChange={handleChange}
                placeholder="Select Status"
                defaultValue={data.Status}
                border="2px solid black"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                defaultValue={data.date}
                border="2px solid black"
                required
              />
            </FormControl>
            <Box mt={6} textAlign="center">
              <Button variantColor="blue" mr={3} onClick={handleEdit} bg="plum">
                {isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Link to={`/userdetails/${data._id}`}>
                <Button>view Changes</Button>
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
export default EditPage;
