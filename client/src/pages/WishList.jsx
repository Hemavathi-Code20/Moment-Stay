import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { removeFromWishList } from "../redux/state";
import "../styles/WishList.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.user.wishList);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRemove = (listingId) => {
    try {
      dispatch(removeFromWishList(listingId));
      setMessage("Removed from wishlist");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to remove property from wishlist!!");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleStartExploring = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="wish-list-container">
        {wishList.length === 0 ? (
          <div className="empty-wish-list">
            <h2>WishLists</h2>
            <p style={{ fontWeight: "600" }}>
              Your wish list is empty ... for now!
            </p>
            <p>Start exploring and adding properties to your wish list.</p>
            <Button
              variant="contained"
              className="wish-btn"
              onClick={handleStartExploring}
            >
              Start Your Wishlist
            </Button>
          </div>
        ) : (
          <>
            {message && (
              <div className={`message ${messageType}`}>{message}</div>
            )}
            <h1 className="title-list">Explorer's Wishlist</h1>
            <div className="list">
              {wishList.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  province,
                  country,
                  category,
                  type,
                  price,
                  booking = false,
                }) => (
                  <div key={_id} className="listing-card-wrapper">
                    <ListingCard
                      listingId={_id}
                      creator={creator}
                      listingPhotoPaths={listingPhotoPaths}
                      city={city}
                      province={province}
                      country={country}
                      category={category}
                      type={type}
                      price={price}
                      booking={booking}
                    />
                    <DeleteIcon
                      onClick={() => handleRemove(_id)}
                      style={{
                        cursor: "pointer",
                        color: "#333",
                        marginLeft: "10px",
                        fontSize: "25px",
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
