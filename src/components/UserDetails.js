import { Button, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Cookies from 'universal-cookie'
import MyLoader from "./Loader";

function UserDetails() {
  const cookies = new Cookies();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [interest, setInterest] = useState(0);
  const [isShowingInterest, setIsShowingInterest] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [days, setDays] = useState(0);
  const { id } = useParams();
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
        setLoading(false);
        console.log("data",response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const calculateInterest = () => {
    if (isShowingInterest) {
      setIsShowingInterest(false);
      setYear(0);
      setMonth(0);
      setDays(0);
      setInterest(0);
      return;
    }

    let loanDate = moment(data.date);
    let currentDate = data.Status === "Completed" ? moment(data.paymentDate) : moment();
    let duration = moment.duration(currentDate.diff(loanDate));
    let totalDays = Math.ceil(duration.as("days"));

    // Calculate per-day interest rate
    let perDayInterestRate = data.Rate / 30 / 100;

    // Calculate total interest
    let totalInterest = data.Amount * perDayInterestRate * totalDays;

    setDays(totalDays);
    setInterest(Math.ceil(totalInterest));
    setIsShowingInterest(true);

    // Calculate years, months, and remaining days
    let years = Math.floor(totalDays / 365);
    totalDays -= years * 365;
    let months = Math.floor(totalDays / 30);
    let remainingDays = totalDays % 30;

    setYear(years);
    setMonth(months);
    setDays(remainingDays);

    // console.log(years + ' years, ' + months + ' months, and ' + remainingDays + ' days');
  };




  // console.log(data.date)
  return (
    <>
      {loading ? (
        <MyLoader />
      ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="88.5vh"
            bg="gray.100"
            backgroundImage={`url(https://source.unsplash.com/featured/?${data.Category})`}
            style={{ backgroundSize: "cover" }}
          >
            <Box
              width="80%"
              p={1}
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="stretch"
              justifyContent="space-between"
            >
              <Box flex="1" p={2} bg="gray.200">
                <Flex direction="column" alignItems="center">
                  <Image
                    src={
                      data.Gender === "Male"
                        ? "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                        : data.Gender === "Female"
                          ? "https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg"
                          : "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                    }
                    width="150px"
                    height="150px"
                    mb={1}
                    borderRadius="full"
                    border="2px solid teal"
                  />
                  <Heading textAlign="center" color="teal.500" mb={1}>
                    {data.Name}
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    textAlign="center"
                    color="gray.600"
                  >
                    ID: {data._id}
                  </Text>
                </Flex>
                <Stack spacing={1} mt={2}>
                  <Flex justify="space-between" color="black" alignItems="center">
                    <Text color="black">Status:</Text>
                    <Text
                      fontWeight="bold"
                      borderRadius="md"
                      px={1}
                      py={1}
                      color="white"
                      bg={
                        data.Status === "Active"
                          ? "green.500"
                          : data.Status === "Completed"
                            ? "red.500"
                            : "blue.500"
                      }
                    >
                      {data.Status}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" color="black">
                    <Text color="black">Last Updated:</Text>
                    <Text color="black">{moment(data.updatedAt).format("MMMM D, YYYY")}</Text>
                  </Flex>
                  <Flex justify="space-between" color="black">
                    <Text color="black" fontWeight="bold">Loan Date:</Text>
                    <Text color="black" fontWeight="bold">{moment(data.date).format("MMMM D, YYYY")}</Text>
                  </Flex>
                  {data.Status === "Completed" && (
                    <>
                      <Flex justify="space-between" color="black">
                        <Text color="black" fontWeight="bold">Amount Paid:</Text>
                        <Text color="black" fontWeight="bold">₹{data.paymentAmount}</Text>
                      </Flex>
                      <Flex justify="space-between" color="black">
                        <Text color="black" fontWeight="bold">Payment Date:</Text>
                        <Text color="black" fontWeight="bold">{moment(data.paymentDate).format("MMMM D, YYYY")}</Text>
                      </Flex>
                    </>
                  )}
                </Stack>
                <Button
                  mt="3"
                  w="100%"
                  colorScheme="teal"
                  fontWeight="bold"
                  onClick={calculateInterest}
                  _hover={{ bg: "teal.600" }}
                  transition="background-color 0.3s ease"
                  _focus={{ outline: "none" }}
                >
                  {isShowingInterest ? "Hide Total Amount" : "Show Total Amount"}
                </Button>
                {isShowingInterest && (
                  <Box
                    mt="3"
                    p="2"
                    bg="teal.600"
                    borderRadius="md"
                    color="white"
                    _hover={{ bg: "teal.700" }}
                    transition="background-color 0.3s ease"
                  >
                    <Text fontWeight="bold" color="gold">
                      Duration: {year} years {month} months {days} days
                    </Text>
                    <Text fontWeight="bold" color="gold">
                      Interest: ₹{interest}
                    </Text>
                    <Text fontWeight="bold" color="gold">
                      Final Amount: ₹{interest + data.Amount}
                    </Text>
                  </Box>
                )}
                {data.Status === "Renew" && (
                  <Box mt={6} bg="gray.200" w="100%" p={4} borderRadius="md" boxShadow="md" maxHeight="150px" overflowY="auto">
                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                      Previous Payments
                    </Text>
                    <Divider mt={0} mb={4} />
                    {data.previousPayments.map((payment, index) => (
                      <Flex key={index} justify="space-between">
                        <Text color="gray.600">Payment {index + 1}:</Text>
                        <Text fontWeight="bold" color="gray.800">
                          Amount: ₹{payment.amount}, Date: {moment(payment.date).format("MMMM D, YYYY")}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
              <Box flex="1" p={2}>
              <Flex direction="column">
                <Box bg="gray.200" p={4} borderRadius="md" boxShadow="md">
                  <Text fontSize="xl" fontWeight="bold" color="gray.800">
                    Product Details
                  </Text>
                  <Divider mt={2} mb={4} />
                  <Flex justify="space-between">
                    <Text color="gray.600">Amount:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      ₹{data.Amount}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.600">Weight:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.Weight}gms
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.600">Rate:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.Rate}%
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.600">Category:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.Category}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.600">Remarks:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.Remarks}
                    </Text>
                  </Flex>
                </Box>
                <Box bg="gray.200" mt={2} p={2} borderRadius="md" boxShadow="md">
                  <Text fontSize="xl" fontWeight="bold" color="gray.800">
                    Contact Details
                  </Text>
                  <Divider mt={2} mb={4} />
                  <Flex justify="space-between">
                    <Text color="gray.600">Address:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.Address}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.600">Phone Number:</Text>
                    <Text fontWeight="bold" color="gray.800">
                      {data.PhoneNumber}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
            <div style={{textAlign: "center", marginTop: "10px" }}>
              <Link to="/tabledata">
                <Button
                  px={6}
                  py={3}
                  border="1px solid black"
                  borderRadius="5px"
                  bg="white"
                  _hover={{ bg: "gray.300" }}
                  transition="0.3s ease-in-out"
                  boxShadow="0 1rem 2rem rgba(0,0,0,0.2)"
                  mr={4}
                >
                  Go Back
                </Button>
              </Link>
              <Link to={`/editpage/${data._id}`}>
                <Button
                  px={6}
                  py={3}
                  border="1px solid teal"
                  borderRadius="5px"
                  bg="teal"
                  color="white"
                  _hover={{ bg: "teal.500" }}
                  transition="0.3s ease-in-out"
                >
                  Edit
                </Button>
              </Link>
            </div>
        </Box>

      )}
    </>
  );
}

export default UserDetails;
