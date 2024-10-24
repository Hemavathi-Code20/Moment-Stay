import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/UpdateProperty.scss";

const UpdateProperty = () => {
  const { listingId } = useParams();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [amenities, setAmenities] = useState([]);

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    price: 0,
  });

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `https://momentstay.onrender.com/properties/${listingId}`
        );
        const data = await response.json();
        if (response.ok) {
          const {
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            photos,
            title,
            description,
            highlight,
            price,
          } = data;

          setCategory(category);
          setType(type);
          setFormLocation({
            streetAddress,
            aptSuite,
            city,
            province,
            country,
          });
          setGuestCount(guestCount);
          setBedroomCount(bedroomCount);
          setBedCount(bedCount);
          setBathroomCount(bathroomCount);
          setAmenities(amenities || []);
          setFormDescription({
            title,
            description,
            highlight,
            price,
          });
        }
      } catch (err) {
        console.error("Failed to fetching property details!!", err);
      }
    };

    fetchPropertyDetails();
  }, [listingId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("price", formDescription.price);

      const response = await fetch(
        `https://momentstay.onrender.com/properties/${listingId}`,
        {
          method: "PUT",
          body: listingForm,
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Updating Property Details failed!!", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/properties/${listingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Property successfully deleted");
        navigate("/");
      } else {
        alert("Failed to delete the property.");
      }
    } catch (err) {
      console.error("Deleting Property failed", err);
      alert("An error occurred while deleting the property.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-listing">
        <form onSubmit={handleUpdate}>
          <div className="update-listing_step1">
            <h2>
              <span>Step 1 :</span> Tell us about your place
            </h2>
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.length > 0 ? (
                categories.map((item, index) => (
                  <div
                    className={`category ${
                      category === item.label ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => setCategory(item.label)}
                  >
                    <div className="category_icon">{item.icon}</div>
                    <p>{item.label}</p>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.length > 0 ? (
                types.map((item, index) => (
                  <div
                    className={`type ${type === item.name ? "selected" : ""}`}
                    key={index}
                    onClick={() => setType(item.name)}
                  >
                    <div className="type-text">
                      <h4>{item.name}</h4>
                      <div className="type_icon">{item.icon}</div>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <p>No types available</p>
              )}
            </div>
          </div>

          <div className="update-listing_step2">
            <h2>
              <span>Step 2 :</span> Share some basics about your place
            </h2>
            <div className="full">
              <div className="location">
                <p>Flat, house etc. (if applicable)</p>
                <input
                  type="text"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={(e) =>
                    setFormLocation({
                      ...formLocation,
                      streetAddress: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Street address</p>
                <input
                  type="text"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={(e) =>
                    setFormLocation({
                      ...formLocation,
                      aptSuite: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="location">
                <p>City / town</p>
                <input
                  type="text"
                  name="city"
                  value={formLocation.city}
                  onChange={(e) =>
                    setFormLocation({
                      ...formLocation,
                      city: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>State / union territory</p>
                <input
                  type="text"
                  name="province"
                  value={formLocation.province}
                  onChange={(e) =>
                    setFormLocation({
                      ...formLocation,
                      province: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  name="country"
                  value={formLocation.country}
                  onChange={(e) =>
                    setFormLocation({
                      ...formLocation,
                      country: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <h3>How many guests can your place accommodate?</h3>
            <div className="count-container">
              <div className="half2">
                <div className="counts">
                  <p>Guests</p>
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(guestCount - 1, 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="guestCount"
                      value={guestCount}
                      onChange={(e) =>
                        setGuestCount(Math.max(parseInt(e.target.value, 10), 1))
                      }
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setGuestCount(guestCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="counts">
                  <p>Bedrooms</p>
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={() =>
                        setBedroomCount(Math.max(bedroomCount - 1, 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="bedroomCount"
                      value={bedroomCount}
                      onChange={(e) =>
                        setBedroomCount(
                          Math.max(parseInt(e.target.value, 10), 1)
                        )
                      }
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setBedroomCount(bedroomCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="counts">
                  <p>Beds</p>
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={() => setBedCount(Math.max(bedCount - 1, 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="bedCount"
                      value={bedCount}
                      onChange={(e) =>
                        setBedCount(Math.max(parseInt(e.target.value, 10), 1))
                      }
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setBedCount(bedCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="counts">
                  <p>Bathrooms</p>
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={() =>
                        setBathroomCount(Math.max(bathroomCount - 1, 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="bathroomCount"
                      value={bathroomCount}
                      onChange={(e) =>
                        setBathroomCount(
                          Math.max(parseInt(e.target.value, 10), 1)
                        )
                      }
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setBathroomCount(bathroomCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="update-listing_step3">
            <h2>
              <span>Step 3 :</span> Make your place stand out
            </h2>

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.length > 0 ? (
                facilities.map((item, index) => (
                  <div
                    className={`facility ${
                      amenities.includes(item.name) ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() =>
                      setAmenities((prev) =>
                        prev.includes(item.name)
                          ? prev.filter((facility) => facility !== item.name)
                          : [...prev, item.name]
                      )
                    }
                  >
                    <div className="facility_icon">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                ))
              ) : (
                <p>No amenities available</p>
              )}
            </div>
          </div>

          <div className="update-listing_step4">
            <h2>
              <span>Step 4 :</span> Now, let's give your place a title
            </h2>
            <div className="full">
              <div className="description">
                <p>Short titles work best. Have fun with it</p>
                <input
                  type="text"
                  name="title"
                  value={formDescription.title}
                  onChange={(e) =>
                    setFormDescription({
                      ...formDescription,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="description">
                <p>Next, let's describe your place</p>
                <textarea
                  name="description"
                  value={formDescription.description}
                  onChange={(e) =>
                    setFormDescription({
                      ...formDescription,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="description">
                <p> Share what makes your place special. (Highlight)</p>
                <input
                  type="text"
                  name="highlight"
                  value={formDescription.highlight}
                  onChange={(e) =>
                    setFormDescription({
                      ...formDescription,
                      highlight: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="description">
                <p>Price (per night)</p>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={formDescription.price}
                  onChange={(e) =>
                    setFormDescription({
                      ...formDescription,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="navigation-buttons">
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProperty;
