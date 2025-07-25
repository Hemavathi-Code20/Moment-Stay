import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Navbar.scss";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    if (dropdownMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenu]);

  const handleSearch = () => {
    if (!search || !startDate || !endDate) {
      setErrorMessage(
        "Oops! Looks like some fields are missing. Please fill them in to continue."
      );
    } else {
      setErrorMessage("");
      navigate(`/properties/search/${search}`);
    }
  };
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className="navbar">
        <a href="/">
          <img src="/assets/logo.png" alt="logo" />
        </a>
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        {isHomePage && (
          <div className="navbar_right">
            <button
              className="navbar_right_account"
              onClick={() => setDropdownMenu(!dropdownMenu)}
            >
              <Menu sx={{ color: "darkgrey" }} />
              {!user ? (
                <Person sx={{ color: "darkgrey" }} />
              ) : (
                <img
                  src={`https://momentstay.onrender.com/${user.profileImagePath.replace(
                    "public",
                    ""
                  )}`}
                  alt="profile photo"
                />
              )}
            </button>

            {dropdownMenu && (
              <div
                className="navbar_right_accountmenu"
                ref={dropdownRef} // Attach ref to dropdown menu
              >
                {!user ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                ) : (
                  <>
                    <Link to={`/${user._id}/trips`}>Trips</Link>
                    <Link to={`/${user._id}/wishList`}>Wishlists</Link>
                    <Link to={`/${user._id}/properties`}>Property List</Link>
                    <Link to={`/${user._id}/reservations`}>Reservation</Link>
                    <Link to="/create-listing">Post a Property</Link>
                    <Link
                      to="/login"
                      onClick={() => {
                        dispatch(setLogout());
                      }}
                    >
                      Log Out
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isHomePage && (
        <div className="navbar_search">
          <div className="input_group">
            <label htmlFor="search_input" className="input_label">
              where
            </label>
            <input
              id="search_input"
              type="text"
              placeholder="yurt"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search_input"
            />
          </div>

          <div className="input_group">
            <label htmlFor="checkin_input" className="input_label">
              Check-in
            </label>
            <ReactDatePicker
              id="checkin_input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Add Dates"
              className="checkin_input"
              dateFormat="MMM d, yyyy"
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          <div className="input_group">
            <label htmlFor="checkout_input" className="input_label">
              Check-out
            </label>
            <ReactDatePicker
              id="checkout_input"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Add Dates"
              className="checkout_input"
              dateFormat="MMM d, yyyy"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>

          <div className="search-button">
            <IconButton onClick={handleSearch}>
              <Search
                style={{
                  color: "whitesmoke",
                }}
              />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
