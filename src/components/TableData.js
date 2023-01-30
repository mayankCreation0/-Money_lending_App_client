import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/tableData.css";

function TableData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(15);
  const toast = useToast();
  const search = (q) => {
    const query = q.trim().toLowerCase();
    return data.filter(
      (el) =>
        el.Name.trim().toLowerCase().includes(query) ||
        el.Category.trim().toLowerCase().includes(query) ||
        el.Address.trim().toLowerCase().includes(query)
    );
  };
  useEffect(() => {
    console.log(search("gold"));
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`http://localhost:8080/coustomer`, { headers })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        toast({
          title: "Something went wrong",
          description: "We've created your account for you.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log(error);
        setLoading(false);
      });
  }, []);
  function StatusCell({ status }) {
    switch (status) {
      case "Active":
        return (
          <Td>
            <div
              style={{
                backgroundColor: "#0EBD60",
                borderRadius: "20px",
                textAlign: "center",
                color: "#fff",
                padding: "10px",
              }}
            >
              Running
            </div>
          </Td>
        );
      case "Inactive":
        return (
          <Td>
            <div
              style={{
                backgroundColor: "#BA1B2A",
                borderRadius: "20px",
                textAlign: "center",
                color: "#fff",
                padding: "10px",
              }}
            >
              Completed
            </div>
          </Td>
        );
      case "Renew":
        return (
          <Td>
            <div
              style={{
                backgroundColor: "#2F3C7E",
                borderRadius: "20px",
                textAlign: "center",
                font: "5px",
                color: "#fff",
                padding: "10px",
              }}
            >
              Renew
            </div>
          </Td>
        );
      default:
        return <Td>{status}</Td>;
    }
  }

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(
    indexOfFirstData,
    indexOfLastData + dataPerPage
  );
  console.log(
    currentData,
    dataPerPage,
    data,
    indexOfFirstData,
    indexOfLastData
  );
  function handleClick(event, index) {
    setCurrentPage(index);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pageNumbers.push(i);
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
          <Table
            className="table-data"
            css={{
              backgroundColor: "#f2f2f2",
              border: "1px solid #ccc",
              fontSize: "14px",
              color: "#333",
              padding: "10px",
            }}
          >
            <Thead>
              <Tr>
                <Th width="50px">uid</Th>
                <Th width="150px">Name</Th>
                <Th width="100px">Date</Th>
                <Th width="120px">Category</Th>
                <Th width="250px">Address</Th>
                <Th width="80px">Status</Th>
                <Th width="70px">Amount</Th>
                <Th width="30px">Rate</Th>
                <Th width="300px">
                  Actions &nbsp;
                  <Menu closeOnSelect={false}>
                    <MenuButton as={Button} colorScheme="blue">
                      Filter&Sort
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup
                        defaultValue="asc"
                        title="SortBy"
                        type="radio"
                      >
                        <MenuItemOption value="asc">Ascending</MenuItemOption>
                        <MenuItemOption value="desc">Descending</MenuItemOption>
                      </MenuOptionGroup>
                      <MenuDivider />
                      <MenuOptionGroup title="Filter" type="checkbox">
                        <MenuItemOption value="Name">Email</MenuItemOption>
                        <MenuItemOption value="date">Phone</MenuItemOption>
                        <MenuItemOption value="Address">Country</MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((row) => {
                return (
                  <Tr key={row._id}>
                    <Td>{row._id}</Td>
                    <Td>{row.Name}</Td>
                    <Td>{row.date}</Td>
                    <Td>{row.Category}</Td>
                    <Td>{row.Address}</Td>
                    <StatusCell status={row.Status} />
                    <Td>{row.Amount}</Td>
                    <Td>{row.Rate}</Td>
                    <Td>
                      <Link to={`/editpage/${row._id}`}>
                        <Button
                          color="green"
                          bg="rgb(198, 191, 191)"
                          mr={1}
                          width="70px"
                        >
                          &#x270E;Edit
                        </Button>
                      </Link>
                      <Link to={`/userdetails/${row._id}`}>
                        <Button color="black" bg="blue" mr={1} width="70px">
                          &#128065;View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        bg="red.500"
                        // onClick={() => deleteRow(row.id)}
                      >
                        &#128465;Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
      <div className="pagination">
        {pageNumbers.map((number, index) => (
          <Button key={number} onClick={(event) => handleClick(event, index)}>
            {number}
          </Button>
        ))}
      </div>
    </>
  );
}
export default TableData;
