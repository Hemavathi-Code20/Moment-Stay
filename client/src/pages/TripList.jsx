import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "../styles/TripList.scss";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndexes, setCurrentIndexes] = useState({});

  const getTripList = useCallback(async () => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/users/${userId}/trips`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetching Trip journal details failed!!", err.message);
      setLoading(false);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getTripList();
  }, [getTripList]);

  useEffect(() => {
    console.log("Current tripList:", tripList);
  }, [tripList]);

  const filteredTripList = tripList.filter(
    (trip) => trip.listingId && trip.listingId._id
  );

  const goToPrevSlide = (listingId) => {
    if (!listingId || !listingId._id) return;

    setCurrentIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[listingId._id] || 0;
      const trip = filteredTripList.find(
        (trip) => trip.listingId?._id === listingId._id
      );
      const photosLength = trip?.listingId?.listingPhotoPaths?.length || 1;

      return {
        ...prevIndexes,
        [listingId._id]:
          currentIndex === 0 ? photosLength - 1 : currentIndex - 1,
      };
    });
  };

  const goToNextSlide = (listingId) => {
    if (!listingId || !listingId._id) return;

    setCurrentIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[listingId._id] || 0;
      const trip = filteredTripList.find(
        (trip) => trip.listingId?._id === listingId._id
      );
      const photosLength = trip?.listingId?.listingPhotoPaths?.length || 1;

      return {
        ...prevIndexes,
        [listingId._id]:
          currentIndex === photosLength - 1 ? 0 : currentIndex + 1,
      };
    });
  };

  const handleStartSearching = () => {
    navigate("/");
  };

  const handleCardClick = (listingId) => {
    navigate(`/feedback/${listingId}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="trip-list-container">
        {filteredTripList.length > 0 ? (
          <>
            <h1 className="title-list">Trip Journal</h1>
            <div className="list">
              {filteredTripList.map(
                ({ listingId, type, startDate, endDate, totalPrice }) => {
                  if (!listingId || !listingId._id) return null;
                  const currentIndex = currentIndexes[listingId._id] || 0;
                  return (
                    <div key={listingId._id} className="trip-card-wrapper">
                      <div
                        className="listing-card"
                        onClick={() => handleCardClick(listingId._id)}
                      >
                        {listingId?.listingPhotoPaths?.length > 0 && (
                          <div className="slider-container">
                            <div
                              className="slider"
                              style={{
                                transform: `translateX(-${
                                  currentIndex * 100
                                }%)`,
                              }}
                            >
                              {listingId.listingPhotoPaths.map(
                                (photo, index) => (
                                  <div key={index} className="slide">
                                    <img
                                      src={`https://momentstay.onrender.com/${photo.replace(
                                        "public",
                                        ""
                                      )}`}
                                      alt={`Slide ${index + 1}`}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              className="prev-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                goToPrevSlide(listingId);
                              }}
                            >
                              <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                            </div>
                            <div
                              className="next-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                goToNextSlide(listingId);
                              }}
                            >
                              <ArrowForwardIos sx={{ fontSize: "15px" }} />
                            </div>
                          </div>
                        )}
                        <div className="info">
                          <h3>{listingId?.title}</h3>
                          <p>
                            {startDate} - {endDate}
                          </p>
                          <span>₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </>
        ) : (
          <div className="empty-trip-list">
            <h2>Trips</h2>
            <p style={{ fontWeight: "600" }}>No trips booked ... yet!</p>
            <p>
              Time to dust off your bags and start planning your next adventure.
            </p>
            <Button
              variant="contained"
              className="trip-btn"
              onClick={handleStartSearching}
            >
              Find Your Destination
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
