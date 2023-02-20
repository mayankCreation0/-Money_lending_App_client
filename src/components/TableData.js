import {
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/tableData.css";
import Pagination from "./Pagination";
import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/navbar.css";
import Navbar from "./Navbar";
import { context } from "../AuthContext/context";
import Cookies from "universal-cookie";


function TableData() {
  const cookies = new Cookies();
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
  const {fnstore}=useContext(context)
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
      const token = cookies.get('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true)
      axios.get(`https://fantastic-hen-cloak.cyclic.app/coustomer/${searchTerm}?category=${selectedFilter}&sortBy=date:${selectedOption}`, { headers })
        .then((response) => {
          setFilteredData(response.data);
          console.log(response.data)
          // console.log(currentPage)
          setLoading(false);
        }).catch(err => {
          toast({
            title: "Something went wrong",
            description: "",
            status: "error",
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
    const token = cookies.get('token');
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
    const token = cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    axios
      .get(
        `https://fantastic-hen-cloak.cyclic.app/coustomer?category=${selectedFilter}&sortBy=date:${selectedOption}`,
        { headers }
      )
      .then((response) => {
        // setSearchData(response.data);
        setFilteredData(response.data.data);
        fnstore(response.data.data)
        setLoading(false);
        console.log('hlw', response.data.data);
      })
      .catch((error) => {
        toast({
          title: "Something went wrong",
          description: "We've created your account for you.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log("err", error);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, [selectedFilter, selectedOption]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);
  function StatusCell({ status }) {
    switch (status) {
      case "Active":
        return (
          <td>
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
          </td>
        );
      case "Inactive":
        return (
          <td>
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
          </td>
        );
      case "Renew":
        return (
          <td>
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
          </td>
        );
      default:
        return <td>{status}</td>;
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
            <div className="Tablecontainer">
            <table
                className="responsive-table"
              // css={{
              //   backgroundColor: "#f2f2f2",
              //   border: "1px solid #ccc",
              //   fontSize: "14px",
              //   color: "#333",
              //   padding: "10px",
              // }}
            >
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">uid</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Rate</th>
                  <th scope="col">
                    Actions &nbsp;
                    <div className="dropdown-Tablecontainer">
                      <button className="dropdown-button">Filter & Sort</button>
                      <div className="dropdown-content">
                        <input type="radio" id="asc" name="sort" value="asc" checked={selectedOption === "asc"}
                          onChange={handleOptionChange} />
                        <label for="asc">Ascending</label><br />
                        <input type="radio" id="desc" name="sort" value="desc" checked={selectedOption === "desc"}
                          onChange={handleOptionChange} />
                        <label for="desc">Descending</label><br />
                        <hr style={{ marginTop: '5px', border: '1px solid ' }} />
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
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? currentPosts.map((row) => {
                  return (
                    <tr key={row._id}>
                      <th>{row.Name}</th>
                      <td data-title="Uid">{row._id}</td>
                      <td data-title="Date">
                        {new Date(row.date).toLocaleDateString("default", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td data-title="Category">{row.Category}</td>
                      <td data-title="Address">{row.Address}</td>
                      <StatusCell status={row.Status} />
                      <td data-title="Amount">{row.Amount}</td>
                      <td data-title="Rate">{row.Rate}</td>
                      <td >
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
                      </td>
                    </tr>
                  );
                }) : toast({
                  title: "Something went wrong",
                  description: "No Data Found.",
                  status: "error",
                  duration: 4000,
                  isClosable: true,
                })
                }
              </tbody>
            </table>
            </div>
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
