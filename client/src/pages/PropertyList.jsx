import "../styles/PropertyList.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCards from "../components/ListingCards";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const propertyList = useSelector((state) => state.user.propertyList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `https://momentstay.onrender.com/users/${userId}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetching Properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [userId]);

  const handleStartCreating = () => {
    navigate("/create-listing");
  };

  const handleEditProperty = (listingId) => {
    navigate(`/update-listing/${listingId}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="property-container">
        {propertyList && propertyList.length > 0 ? (
          <>
            <h1 className="title-list">Property Collection</h1>
            <div className="list">
              {propertyList.map(
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
                }) => (
                  <div key={_id} className="property-item">
                    <ListingCards
                      listingId={_id}
                      creator={creator}
                      listingPhotoPaths={listingPhotoPaths}
                      city={city}
                      province={province}
                      country={country}
                      category={category}
                      type={type}
                      price={price}
                      onEdit={handleEditProperty}
                    />
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="empty-property-list">
            <h2>Properties</h2>
            <p  style={{ fontWeight: "600" }}>No properties listed ... yet!</p>
            <p>Time to showcase your beautiful properties to the world.</p>
            <Button
              variant="contained"
              className="property-btn"
              onClick={handleStartCreating}
            >
              Add Property
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
