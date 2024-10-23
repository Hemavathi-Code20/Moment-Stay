import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pastexperience.scss";
import { experiences } from "../data";

const Pastexperience = () => {
  return (
    <div className="past-experiences-section">
      <h2 className="past-experiences-heading">Past Experiences</h2>
      <div className="experiences-grid">
        {experiences.map((experience) => (
          <Link
            key={experience.id}
            to={`/testimonials/${experience.id}`}
            className="experience-card-link"
          >
            <div className="experience-card">
              <div className="experience-image-container">
                <img
                  src={experience.image[0]}
                  alt={experience.name}
                  className="experience-image"
                />
              </div>
              <div className="experience-details">
                <h4 className="experience-name">{experience.name}</h4>
                <p className="experience-location">{experience.location}</p>
                <p className="experience-host">{experience.host}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pastexperience;
