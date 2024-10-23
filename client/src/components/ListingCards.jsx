import { useState } from "react";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import { Button } from "@mui/material";

const ListingCards = ({
  listingId,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  onEdit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace(
                  "public",
                  ""
                )}`}
                alt={`photo ${index + 1}`}
              />
              <div className="prev-button" onClick={goToPrevSlide}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={goToNextSlide}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <h3>
          {city}, {province}, {country}
        </h3>
        <p> {category}</p>
        <p>{type}</p>
        <p>
          <span>₹{price}</span> per night
        </p>
      </div>
      <Button
        variant="contained"
        style={{
          display: "block",
          margin: "14px auto",
          width: "32%",
          maxWidth: "300px",
          background: "#004369",
          boxShadow: "0 10px 10px 0 gray",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(listingId);
        }}
      >
        Update
      </Button>
    </div>
  );
};

export default ListingCards;
