import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`http://localhost:8080/coustomer/${id}`, { headers })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  function StatusCell({ status }) {
    switch (status) {
      case "Active":
        return (
          <div
            bg="#0EBD60"
            borderRadius="200px"
            textAlign="center"
            color="#fff"
            fontSize="10px"
          >
            Running
          </div>
        );
      case "Inactive":
        return (
          <div
            bg="#BA1B2A"
            borderRadius="200px"
            textAlign="center"
            color="#fff"
            fontSize="15px"
          >
            Completed
          </div>
        );
      case "Renew":
        return (
          <div
            bg="#2F3C7E"
            borderRadius="200px"
            textAlign="center"
            color="#fff"
            fontSize="15px"
          >
            Renew & Running
          </div>
        );
      default:
        return <div>{status}</div>;
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
          justifyContent="center"
        />
      ) : (
        <>
          <div>{data.Name}</div>
          <StatusCell status={data.Status} />
        </>
      )}
    </>
  );
}

export default UserDetails;
