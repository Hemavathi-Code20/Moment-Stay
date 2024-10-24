import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishList } from "../redux/state.js";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/UpdateBooking.scss";

const UpdateBooking = () => {
  const { listingId } = useParams();
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
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
  const wishList = useSelector((state) => state?.user?.wishList || []);

  const calculateDayCount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    if (isNaN(differenceInTime) || !startDate || !endDate) {
      console.error("Invalid date range:", startDate, endDate);
      return 0;
    }
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  const calculateTotalPrice = (dayCount, pricePerNight) => {
    return dayCount * pricePerNight;
  };

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

  useEffect(() => {
    const fetchBookingAndListing = async () => {
      try {
        const bookingResponse = await fetch(
          `http://localhost:3001/bookings/${bookingId}`
        );
        if (!bookingResponse.ok) {
          throw new Error(
            `Booking fetch failed: ${bookingResponse.statusText}`
          );
        }
        const bookingData = await bookingResponse.json();
        setBooking(bookingData);
        setDateRange([
          {
            startDate: new Date(bookingData.startDate),
            endDate: new Date(bookingData.endDate),
            key: "selection",
          },
        ]);

        const listingId = bookingData.listingId?._id;
        if (listingId) {
          const listingResponse = await fetch(
            `http://localhost:3001/properties/${listingId}`
          );
          if (!listingResponse.ok) {
            throw new Error(
              `Listing fetch failed: ${listingResponse.statusText}`
            );
          }
          const listingData = await listingResponse.json();
          setListing(listingData);
        } else {
          console.error("Invalid listingId:", bookingData.listingId);
        }
      } catch (err) {
        console.error("Failed to fetch booking or listing", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingAndListing();
  }, [bookingId]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate && endDate && endDate >= startDate) {
      setDateRange([ranges.selection]);
    } else {
      console.error("Invalid date range selected");
    }
  };

  const handleUpdate = async () => {
    if (!booking || !listing) return;

    const startDate = dateRange[0]?.startDate?.toDateString();
    const endDate = dateRange[0]?.endDate?.toDateString();

    const updatedBooking = {
      startDate,
      endDate,
      totalPrice: calculateTotalPrice(
        calculateDayCount(startDate, endDate),
        listing.price
      ),
    };

    try {
      const response = await fetch(
        `http://localhost:3001/bookings/update/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBooking),
        }
      );

      if (response.ok) {
        window.alert("Booking updated successfully!");
        setTimeout(() => {
          navigate("/:userId/reservations");
        }, 2000);
      } else {
        window.alert("Failed to update booking.");
      }
    } catch (err) {
      console.error("Update booking failed", err.message);
      window.alert("An error occurred while updating the booking.");
    }
  };

  const oldDayCount = booking
    ? calculateDayCount(booking.startDate, booking.endDate)
    : 0;
  const newDayCount = dateRange[0]
    ? calculateDayCount(dateRange[0].startDate, dateRange[0].endDate)
    : 0;
  const oldTotalPrice = listing
    ? calculateTotalPrice(oldDayCount, listing.price)
    : 0;
  const newTotalPrice = listing
    ? calculateTotalPrice(newDayCount, listing.price)
    : 0;

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="update-details">
        <div className="title">
          <h1>{listing.title}</h1>
          {!isInWishlist && (
            <button className="wishlist-button" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          )}
        </div>

        {listing && (
          <>
            <div className="listing-photos">
              {listing.listingPhotoPaths?.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:3001/${photo.replace(
                    "public",
                    ""
                  )}`}
                  alt={`photo ${index + 1}`}
                />
              ))}
            </div>

            <h2>
              {listing.type} in {listing.city}, {listing.province},{" "}
              {listing.country}
            </h2>
            <p>
              {listing.guestCount} Guests - {listing.bedroomCount} Bedrooms -{" "}
              {listing.bedCount} Cot - {listing.bathroomCount} Bathrooms
            </p>

            <div className="profile">
              <img
                src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="host profile"
              />
              <h3>Hosted by {listing.creator.username}</h3>
            </div>

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
                            facilities.find(
                              (facility) => facility.name === item
                            )?.icon
                          }
                        </div>
                        <p>{item}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h2>Reschedule Your Stay</h2>
                <div className="date-range-calendar">
                  <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    minDate={new Date()}
                  />
                  <p style={{ fontSize: "17px" }}>
                    Old Price: ₹{oldTotalPrice}
                  </p>
                  <p style={{ fontSize: "17px" }}>
                    New Price: ₹{newTotalPrice}
                  </p>
                  <button onClick={handleUpdate} className="update-button">
                    Update Booking
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UpdateBooking;
