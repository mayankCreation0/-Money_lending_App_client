import {
  Button,
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
import MyLoader from "./Loader";


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
  const [showDropdown, setShowDropdown] = useState(false);
  const { fnstore } = useContext(context)
  const toast = useToast();


  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  // const handleFilterChange = (e) => {
  //   const value = e.target.value;
  //   if (selectedFilter.includes(value)) {
  //     setSelectedFilter(selectedFilter.filter((item) => item !== value));
  //   } else {
  //     setSelectedFilter([...selectedFilter, value]);
  //   }
  // };
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleFilterChange = (value) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      case "Completed":
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
          <MyLoader />
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
                    src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
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
                  <th scope="col" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    Actions &nbsp;
                    <div className={`dropdown-Tablecontainer ${showDropdown ? 'show-dropdown' : ''}`}>
                      <Button
                        colorScheme="twitter"
                        className="dropdown-button"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        Filter & Sort
                      </Button>
                      <div className="dropdown-content">
                        <div>
                          <label>Sort:</label>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <Button
                              textColor='black'
                                bg={selectedOption === 'asc' ? 'blue' : 'white'}
                                className={`sort-button ${selectedOption === 'asc' ? 'selected' : ''}`}
                                onClick={() => handleOptionChange('asc')}
                              >
                                Ascending
                              </Button>
                              <Button
                                textColor='black'
                                bg={selectedOption === 'desc' ? 'blue' : 'white'}
                                className={`sort-button ${selectedOption === 'desc' ? 'selected' : ''}`}
                                onClick={() => handleOptionChange('desc')}
                              >
                                Descending
                              </Button>
                          </div>
                        </div>
                        <hr />
                        <div>
                          <label>Filter:</label>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button
                              className={`filter-button ${selectedFilter.includes('Gold') ? 'selected' : ''}`}
                              onClick={() => handleFilterChange('Gold')}
                            >
                              Gold
                            </Button>
                            <Button
                              className={`filter-button ${selectedFilter.includes('Silver') ? 'selected' : ''}`}
                              onClick={() => handleFilterChange('Silver')}
                            >
                              Silver
                            </Button>
                            <Button
                              className={`filter-button ${selectedFilter.includes('Bronze') ? 'selected' : ''}`}
                              onClick={() => handleFilterChange('Bronze')}
                            >
                              Bronze
                            </Button>
                              <Button
                                className={`filter-button ${selectedFilter.includes('bike') ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('bike')}
                              >
                                Bike
                              </Button>
                              <Button
                                className={`filter-button ${selectedFilter.includes('cycle') ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('cycle')}
                              >
                                Bronze
                              </Button>
                              <Button
                                className={`filter-button ${selectedFilter.includes('others') ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('others')}
                              >
                                Others
                              </Button>
                          </div>
                        </div>
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
