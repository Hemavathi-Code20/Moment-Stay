import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "../styles/ReservationList.scss";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useSelector((state) => state.user._id);
  const reservationList =
    useSelector((state) => state.user.reservationList) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getReservationList = useCallback(async () => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
      setLoading(false);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getReservationList();
  }, [getReservationList]);

  useEffect(() => {
    console.log("Current reservationList:", reservationList);
  }, [reservationList]);

  const filteredReservationList = reservationList.filter(
    (booking) => booking.listingId && booking.listingId._id
  );

  const goToPrevSlide = (listingIndex) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? filteredReservationList[listingIndex]?.listingId?.listingPhotoPaths
            ?.length - 1
        : prevIndex - 1
    );
  };

  const goToNextSlide = (listingIndex) => {
    setCurrentIndex((prevIndex) =>
      prevIndex ===
      filteredReservationList[listingIndex]?.listingId?.listingPhotoPaths
        ?.length -
        1
        ? 0
        : prevIndex + 1
    );
  };

  const handleStartSearching = () => {
    navigate("/");
  };

  const handleUpdateBooking = (booking) => {
    navigate(`/bookings/update/${booking._id}`);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/bookings/delete/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await getReservationList(); // Fetch updated reservation list after deletion
        alert("Booking canceled successfully!");
      }
    } catch (err) {
      console.log("Cancel Booking Failed.", err.message);
    }
  };

  const calculateDayCount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="reserve-container">
        {filteredReservationList.length > 0 ? (
          <>
            <h1 className="title-list">Booking Overview</h1>
            <div className="list">
              {filteredReservationList.map((booking, listingIndex) => {
                if (!booking || !booking.listingId) {
                  return null;
                }
                const { listingId, startDate, endDate, totalPrice } = booking;
                const dayCount = calculateDayCount(startDate, endDate);
                const computedTotalPrice = (listingId.price || 0) * dayCount;

                return (
                  <div className="listing-card" key={booking._id}>
                    <div className="slider-container">
                      <div
                        className="slider"
                        style={{
                          transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                      >
                        {listingId.listingPhotoPaths?.map((photo, index) => (
                          <div key={index} className="slide">
                            <img
                              src={`https://momentstay.onrender.com/${photo.replace(
                                "public",
                                ""
                              )}`}
                              alt={`Slide ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        className="prev-button"
                        onClick={() => goToPrevSlide(listingIndex)}
                      >
                        <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                      </div>
                      <div
                        className="next-button"
                        onClick={() => goToNextSlide(listingIndex)}
                      >
                        <ArrowForwardIos sx={{ fontSize: "15px" }} />
                      </div>
                    </div>

                    <div className="listing-details">
                      <h2>{listingId.title}</h2>
                      <p>{listingId.city}</p>
                      <p>
                        {startDate} - {endDate}
                      </p>
                      <p className="price">
                        ₹
                        {totalPrice !== undefined
                          ? totalPrice
                          : computedTotalPrice}
                      </p>
                    </div>

                    <div className="action-buttons">
                      <Button
                        className="update-btn"
                        variant="contained"
                        onClick={() => handleUpdateBooking(booking)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="cancel-btn"
                        variant="outlined"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="empty-reservation-list">
            <h2>Reservations</h2>
            <p style={{ fontWeight: "600" }}>No reservations made ... yet!</p>
            <p>Time to find the perfect spot and make your next booking.</p>
            <Button
              className="reserve-btn"
              variant="contained"
              onClick={handleStartSearching}
            >
              Start Booking
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
