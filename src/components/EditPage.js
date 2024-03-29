import React, { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState({});
  const [loanDate, setLoanDate] = useState();

  useEffect(() => {
    const token = cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`https://fantastic-hen-cloak.cyclic.app/coustomer/find/${id}`, {
        headers,
      })
      .then((response) => {
        setData(response.data[0]);
        setFormData(response.data[0]);
        const isoDate = new Date(response.data[0].date); // Convert the ISO 8601 date to a Date object
        setLoanDate(isoDate.toISOString().split('T')[0]); // Extract the date portion
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Create a new entry in previousPayments array if status is Renew
      if (formData.Status === "Renew") {
        formData.previousPayments.push({
          amount: formData.renewalAmount,
          date: formData.renewalDate,
        });
      }

      // Remove renewalAmount and renewalDate from formData
      delete formData.renewalAmount;
      delete formData.renewalDate;

      await axios.patch(
        `https://fantastic-hen-cloak.cyclic.app/coustomer/find/${id}`,
        formData,
        {
          headers,
        }
      );

      setIsLoading(false);
      toast({
        title: "Update the Changes",
        description: "All the Changes are updated in the Database",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "There was an error while updating the data.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
                value={data.Name || ''}
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
                value={formData.Gender || ''}
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
                value={formData.Category || ''}
                border="2px solid black"
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
            <FormControl mt={4}>
              <FormLabel htmlFor="Weight">Weight</FormLabel>
              <Input
                type="text"
                id="Weight"
                name="Weight"
                defaultValue={data.Weight}
                border="2px solid black"
                onChange={handleChange}
                // required
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
                value={formData.Status || ''}
                border="2px solid black"
                required
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Renew">Renew</option>
              </Select>
            </FormControl>
            {formData.Status === "Completed" && (
              <>
                <FormControl mt={4}>
                  <FormLabel htmlFor="paymentAmount">Amount Paid</FormLabel>
                  <Input
                    type="number"
                    id="paymentAmount"
                    name="paymentAmount"
                    value={formData.paymentAmount || ''}
                    onChange={handleChange}
                    border="2px solid black"
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor="paymentDate">Payment Date</FormLabel>
                  <Input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    value={formData.paymentDate || ''}
                    onChange={handleChange}
                    border="2px solid black"
                    required
                  />
                </FormControl>
              </>
            )}
            {formData.Status === "Renew" && (
              <>
                <FormControl mt={4}>
                  <FormLabel htmlFor="renewalAmount">Amount Paid</FormLabel>
                  <Input
                    type="number"
                    id="renewalAmount"
                    name="renewalAmount"
                    value={formData.renewalAmount || ''}
                    onChange={handleChange}
                    border="2px solid black"
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor="renewalDate">Paid Date</FormLabel>
                  <Input
                    type="date"
                    id="renewalDate"
                    name="renewalDate"
                    value={formData.renewalDate || ''}
                    onChange={handleChange}
                    border="2px solid black"
                    required
                  />
                </FormControl>
              </>
            )}
            <FormControl>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                id="date"
                name="date"
                type="date"
                placeholder="Select date"
                value={loanDate || ''}
                border="2px solid black"
                onChange={handleChange}
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
                <Button style={{border:'1px solid black'}}>view Changes</Button>
              </Link>
            </Box>
          </Flex>
        </form>
      </Box>
      
    </Box>
  );
};
export default EditPage;
