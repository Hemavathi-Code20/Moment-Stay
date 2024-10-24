import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishList } from "../redux/state.js";
import { facilities } from "../data.js";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "./Loader.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "../styles/ListingDetails.scss";

const ListingDetails = () => {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerId = useSelector((state) => state?.user?._id);
  const wishList = useSelector((state) => state?.user?.wishList || []);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetching Property Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // Check if the current listing is in the wishlist
  const isInWishlist = wishList.some((item) => item._id === listingId);

  const handleAddToWishlist = () => {
    try {
      dispatch(addToWishList(listing));
      alert("Added to wishlist");
    } catch (error) {
      alert(
        "Something went wrong with adding to your wishlist. Please try again."
      );
    }
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const handleSubmit = async () => {
    const startDate = new Date(dateRange[0].startDate);
    const endDate = new Date(dateRange[0].endDate);

    // Check if dates are selected
    if (!startDate || !endDate) {
      alert("Please Select Dates For Reservation");
      return;
    }

    // Calculate the number of days selected
    const dayCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Validate the minimum stay requirement
    if (dayCount < 2) {
      alert("Please select a start and end date for reservation");
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing?.creator?._id,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(
        "https://momentstay.onrender.com/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm),
        }
      );

      if (response.ok) {
        alert("Your reservation is confirmed!");
        navigate(`/${customerId}/reservations`);
      } else {
        alert(
          "There was a problem with your reservation. Please try again later."
        );
      }
    } catch (err) {
      alert(
        "An error occurred while submitting your reservation. Please retry."
      );
      console.log("Failed to submit reservation.", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          {!isInWishlist && (
            <button className="wishlist-button" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          )}
        </div>

        <div className="photos">
          {[
            ...new Set(
              listing?.listingPhotoPaths?.map(
                (item) =>
                  `https://momentstay.onrender.com/${item.replace(
                    "public",
                    ""
                  )}`
              )
            ),
          ].map((uniqueItem, index) => (
            <img key={index} src={uniqueItem} alt={`listing photo ${index}`} />
          ))}
        </div>

        <h2>
          {listing?.type} in {listing?.city}, {listing?.province},{" "}
          {listing?.country}
        </h2>
        <p>
          {listing?.guestCount} Guests - {listing?.bedroomCount} Bedrooms -{" "}
          {listing?.bedCount} Cot - {listing?.bathroomCount} Bathrooms
        </p>

        {listing?.creator && listing.creator.profileImagePath && (
          <div className="profile">
            <img
              src={`https://momentstay.onrender.com/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="host profile"
            />
            <h3>Hosted by {listing.creator.username}</h3>
          </div>
        )}

        <div className="info">
          <h3>Description</h3>
          <p>{listing?.description}</p>
          <hr />

          <h3>Highlights</h3>
          <p>{listing?.highlight}</p>
          <hr />
        </div>

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {[...new Set(listing?.amenities[0].split(","))].map(
                (item, index) => (
                  <div className="facility" key={index}>
                    <div className="facility_icon">
                      {
                        facilities.find((facility) => facility.name === item)
                          ?.icon
                      }
                    </div>
                    <p>{item}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ₹{listing?.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹{listing?.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹{listing?.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;



