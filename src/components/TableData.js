import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/tableData.css";
import Pagination from "./Pagination";
import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/navbar.css";
import Navbar from "./Navbar";

function TableData() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [loading, setLoading] = useState(true);
  // const [SearchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [selectedOption, setSelectedOption] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState([]);

  const toast = useToast();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (selectedFilter.includes(value)) {
      setSelectedFilter(selectedFilter.filter((item) => item !== value));
    } else {
      setSelectedFilter([...selectedFilter, value]);
    }
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true)
      axios.get(`http://localhost:8080/coustomer/${searchTerm}?category=${selectedFilter}&sortBy=date:${selectedOption}`, { headers })
        .then((response) => {
          setFilteredData(response.data);
          console.log(response.data)
          console.log(currentPage)
          setLoading(false);
        }).catch(err => {
          toast({
            title: "Something went wrong",
            description: "",
            status: err,
            duration: 4000,
            isClosable: true,
          });
        })
    }
    else {
      fetchData();
    }
  }
  function deleteItem(id) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`https://fantastic-hen-cloak.cyclic.app/coustomer/${id}`, { headers })
      .then((response) => {
        // console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const fetchData = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `https://fantastic-hen-cloak.cyclic.app/coustomer?category=${selectedFilter}&sortBy=date:${selectedOption}`,
        { headers }
      )
      .then((response) => {
        // setSearchData(response.data);
        setFilteredData(response.data);
        setLoading(false);
        // console.log(response.data);
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
  }
  useEffect(() => {
    fetchData();
  }, [selectedFilter,selectedOption]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

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
  return (
    <>
      {loading ? (
        <>
          <Navbar />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            justifyContent="center"
            marginTop='20%'
          />
        </>
      ) : (
        <>
          <div className="header">
            <div className="logo-nav">
              <div className="logo-container">
                <Link to="/home">
                  <Logo className="logo" />
                </Link>
              </div>
              <ul className={click ? "nav-options active" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}>
                  <Link to="/tabledata">Coustomer Data</Link>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                  <Link to="/createpage">BLOG</Link>
                </li>
                <li className="option mobile-option" onClick={closeMobileMenu}>
                  <Link to="#">Account</Link>
                </li>
                <li className="option mobile-option" onClick={closeMobileMenu}>
                  <Link to="" className="sign-up">
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
            <div class="search-container">
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  name="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  
                />
                <Link>
                  <button type="submit" id="search-button" value={searchTerm} onClick={handleSearchChange}>
                    &#128269;
                  </button>
                </Link>
              </form>
            </div>
            <div className="mobile-menu" onClick={handleClick}>
              {click ? (
                <CloseMenu className="menu-icon" />
              ) : (
                <MenuIcon className="menu-icon" />
              )}
            </div>
            <ul className="signin-up">
              <li className="sign-in" onClick={closeMobileMenu}>
                <Link to="#">
                  <img
                    src="https://avatars.githubusercontent.com/u/111152286?v=4"
                    alt="img"
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </Link>
              </li>
              <li onClick={closeMobileMenu}>
                <Link to="" className="signup-btn">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
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
                    <div class="dropdown-container">
                      <button class="dropdown-button">Filter & Sort</button>
                      <div class="dropdown-content">
                        <input type="radio" id="asc" name="sort" value="asc" checked={selectedOption === "asc"}
                          onChange={handleOptionChange} />
                        <label for="asc">Ascending</label><br />
                        <input type="radio" id="desc" name="sort" value="desc" checked={selectedOption === "desc"}
                          onChange={handleOptionChange} />
                        <label for="desc">Descending</label><br />
                        <hr style={{marginTop:'5px',border:'1px solid lightgrey '}}/>
                        <input type="checkbox" id="Gold" name="Gold" value="Gold" checked={selectedFilter.includes("Gold")}
                          onChange={handleFilterChange} />
                        <label for="Gold">Gold</label><br />
                        <input type="checkbox" id="Silver" name="Silver" value="Silver" checked={selectedFilter.includes("Silver")}
                          onChange={handleFilterChange} />
                        <label for="Silver">Silver</label><br />
                        <input type="checkbox" id="Bronze" name="Bronze" value="Bronze" checked={selectedFilter.includes("Bronze")}
                          onChange={handleFilterChange} />
                        <label for="Bronze">Bronze</label><br />
                      </div>
                    </div>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPosts.length > 0 ? currentPosts.map((row) => {
                return (
                  <Tr key={row._id}>
                    <Td>{row._id}</Td>
                    <Td>{row.Name}</Td>
                    <Td>
                      {/* Last updated Date:{" "} */}
                      {new Date(row.updatedAt).toLocaleDateString("default", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Td>
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
                      <Button variant="outline" bg="red.500" onClick={() => { deleteItem(row._id) }}>
                        &#128465;Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              }) : toast({
                title: "Something went wrong",
                description: "No Data Found.",
                status: "error",
                duration: 4000,
                isClosable: true,
              })
              }
            </Tbody>
          </Table>
          <Pagination
            totalPosts={filteredData.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
}
export default TableData;
