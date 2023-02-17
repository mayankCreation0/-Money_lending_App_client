import { Button, Flex, Heading, Image, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Cookies from 'universal-cookie'

function UserDetails() {
  const cookies = new Cookies();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState();
  const [isShowingInterest, setIsShowingInterest] = useState(false);
  const[month, setMonth] = useState(0);
  const[days,setDays]=useState(0);
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
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const calculateInterest = () => {
    let loanDate = moment(data.date);
    let currentDate = moment();
    let duration = moment.duration(currentDate.diff(loanDate));
    // setDays(Math.ceil(duration.as("days")));
    console.log("top", duration)
    duration = duration.as("days") / 30;
    setDuration(duration);

    const interestAmount = (data.Amount * data.Rate * duration) / 100;
    setInterest(Math.ceil(interestAmount));
    setIsShowingInterest(!isShowingInterest)
    console.log("duration: ", duration);
    console.log("interest: ", interest);

    const totalDays = Math.floor(duration);
    setMonth(Math.ceil(totalDays / 30));
    setDays(totalDays % 30);

    console.log(month + ' months and ' + days + ' days');
  }

  console.log(data.date)
  function StatusCell({ status }) {
    switch (status) {
      case "Active":
        return (
          <div
            style={{
              backgroundColor: "#00b894",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Running
          </div>
        );
      case "Inactive":
        return (
          <div
            style={{
              backgroundColor: "#BA1B2A",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Completed
          </div>
        );
      case "Renew":
        return (
          <div
            style={{
              backgroundColor: "#2F3C7E",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Renew & Running
          </div>
        );
      default:
        return <div>{status}</div>;
    }
  }
  function Gendercheck({ gender }) {
    switch (gender) {
      case "Male":
        return (
          <Image
            src={
              "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
            }
            width="200px"
            mb={5}
            borderRadius="full"
            border="1px solid teal"
          />
        );
      case "Female":
        return (
          <Image
            src={
              "https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg"
            }
            width="200px"
            mb={5}
            borderRadius="full"
            border="1px solid teal"
          />
        );
      case "Others":
        return (
          <Image
            src={
              "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
            }
            width="200px"
            mb={5}
            borderRadius="full"
            border="1px solid teal"
          />
        );
      default:
        return <div>{data.gender}</div>;
    }
  }
  return (
    <>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          top="50%"
          justifyContent="center"
        />
      ) : (
        <Box
          backgroundImage={`url(https://source.unsplash.com/featured/?${data.Category})`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          // height="100vh"
          style={{ backgroundSize: "cover" }}
        >
          <Box
            width="70%"
            p={10}
            background="linear-gradient(to bottom, #e6e9f0, #eef1f5)"
            overflow="hidden"
            borderRadius="lg"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            cursor="pointer"
            // alignItems="center"
            justifyContent="space-around"
          >
            <Stack spacing={1}>
              <div style={{ margin: "auto" }}>
                {<Gendercheck gender={data.Gender} />}
              </div>
              <div>
                <Heading textAlign="center">{data.Name}</Heading>
                <Text fontWeight="bold" fontSize="lg" textAlign="center">
                  ID: {data._id}
                </Text>
                <Flex mt={10} justifyContent="space-between">
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      {<StatusCell status={data.Status} />}
                    </Text>
                  </Box>
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Created Date:{" "}
                      {new Date(data.date).toLocaleDateString("default", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  </Box>
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Last updated Date:{" "}
                      {new Date(data.updatedAt).toLocaleDateString("default", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  </Box>
                </Flex>
                <Button onClick={calculateInterest} bgColor='lightcyan'>
                  Show Interest
                </Button>
                {isShowingInterest && (
                  <div style={{ width: '100%', borderRadius:'10px', background: 'teal', display: 'flex', justifyContent: 'space-around' }}>
                    {/* <Flex mt={10} justifyContent='space-around'> */}
                    <Text fontWeight="bold" fontSize="lg" color="Yellow">
                        Duration: {month} months  {days} days
                    </Text>
                    <Text fontWeight="bold" fontSize="lg" color="Yellow">
                      Interest: ₹{interest}
                    </Text>
                    <Text fontWeight="bold" fontSize="lg" color="yellow">
                      Final Amount: ₹{interest + data.Amount}
                    </Text>
                  </div>
                )}
                <Flex mt={10} justifyContent="space-between">
                  <Box width="30%">
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color="#333"
                      letterSpacing={1}
                    >
                      Amount: ₹{data.Amount}
                    </Text>
                  </Box>
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Weight: {data.Weight}
                    </Text>
                  </Box>
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Rate: {data.Rate}%
                    </Text>
                  </Box>
                </Flex>
                <Flex mt={10} justifyContent="space-between">
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Category: {data.Category}
                    </Text>
                  </Box>
                  <Box width="30%">
                    <Text fontWeight="bold" fontSize="lg" color="#333">
                      Remarks: {data.Remarks}
                    </Text>
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg" mt={10} color="#333">
                    Address: {data.Address}
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" mt={10} color="#333">
                    Phone Number: {data.PhoneNumber}
                  </Text>
                </Flex>
                <div style={{ textAlign: "center" }}>
                  <Link to="/tabledata">
                    <button
                      style={{
                        padding: "10px 20px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        transition: "0.3s ease-in-out",
                        boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(220, 220, 220)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      Go Back
                    </button>
                  </Link>
                  <Link to={`/editpage/${data._id}`}>
                    <button
                      style={{
                        padding: "10px 20px",
                        border: "1px solid teal",
                        borderRadius: "5px",
                        backgroundColor: "teal",
                        color: "white",
                        transition: "0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(80, 227, 194)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "teal";
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
}

export default UserDetails;
