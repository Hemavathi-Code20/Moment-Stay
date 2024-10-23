import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { experiences } from "../data";
import "../styles/Testimonials.scss";
import CloseIcon from "@mui/icons-material/Close";

const Testimonials = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((exp) => exp.id === parseInt(id));

  const [mainImage, setMainImage] = useState(experience?.image[0] || "");

  if (!experience) {
    return <div>Experience not found!</div>;
  }

  const [initialImage, ...otherImages] = experience.image;

  const handleImageClick = (imgSrc) => {
    setMainImage(imgSrc);
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  return (
    <div className="experience-testimonials">
      <div className="experience-detail">
        <div className="close-icon" onClick={handleCloseClick}>
          <CloseIcon />
        </div>
        <h2>{experience.name}</h2>
        <div className="image-gallery">
          <img
            src={mainImage}
            alt={`${experience.name} main`}
            className="main-image"
          />
          <div className="other-images">
            {otherImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${experience.name} ${index + 1}`}
                className="other-image"
                onClick={() => handleImageClick(imgSrc)}
              />
            ))}
          </div>
        </div>
        <div className="details">
          <p className="hosted-name">
            {" "}
            <img src="/assets/host.png" alt="host" /> {experience.host}
          </p>
          <p style={{ color: "red" }}>{experience.status}</p>
          <p>
            <strong>Location:</strong> {experience.location}
          </p>
          <p>
            <strong>Guests:</strong> {experience.details.guests}
          </p>
          <p>
            <strong>Bedroom:</strong> {experience.details.bedroom}
          </p>
          <p>
            <strong>Bed:</strong> {experience.details.bed}
          </p>
          <p>
            <strong>Bathroom:</strong> {experience.details.bathroom}
          </p>
          <h3>Description :</h3>
          <p>{experience.description}</p>
          <h3>Highlights :</h3>
          <ul>
            {experience.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="testimonials">
        <h3>What Guests Are Saying</h3>
        <div className="testimonial-cards">
          {experience.reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <h3>{review.name}</h3>
                <p>{review.location}</p>
              </div>
              <div className="testimonial-rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
                {review.rating === 5 && (
                  <span className="rating-text">5.0</span>
                )}
              </div>
              <p className="testimonial-review">{review.review}</p>
              <p className="testimonial-date">{review.yearsOnAirbnb}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
