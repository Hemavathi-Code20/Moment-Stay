import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import '../styles/Search.scss'

const Search = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/search/${search}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetching Search Details failed!!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      {listings && listings.length > 0 && (
        <h1 className="title-list">{search}</h1>
      )}
      <div className="list">
        {listings && listings.length > 0 ? (
          listings.map(
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
              <ListingCard
                key={_id}
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
            )
          )
        ) : (
          <div className="no-results">
            <h2>
              No search results found for{" "}
              <span style={{ color: "#004369" }}>"{search}"</span>
            </h2>
            <Button
              variant="contained"
              className="btn-go-back"
              onClick={handleGoBack}
            >
              Go Back to Home
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;
