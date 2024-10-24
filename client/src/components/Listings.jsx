import { useEffect, useState, useRef } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const categoryListRef = useRef(null);

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `https://momentstay.onrender.com/properties?category=${selectedCategory}`
          : "https://momentstay.onrender.com/properties",
        {
          method: "GET",
        }
      );
      

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetching Properties Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  const handleScroll = (direction) => {
    if (categoryListRef.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        direction === "left"
          ? categoryListRef.current.scrollLeft - scrollAmount
          : categoryListRef.current.scrollLeft + scrollAmount;

      categoryListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollCheck = () => {
    if (categoryListRef.current) {
      setCanScrollLeft(categoryListRef.current.scrollLeft > 0);
      setCanScrollRight(
        categoryListRef.current.scrollWidth >
          categoryListRef.current.clientWidth +
            categoryListRef.current.scrollLeft
      );
    }
  };

  useEffect(() => {
    handleScrollCheck();
  }, []);

  return (
    <>
      <div className="category-list-container">
        {canScrollLeft && (
          <div
            className="scroll-icon left"
            onClick={() => handleScroll("left")}
          >
            <IoIosArrowBack />
          </div>
        )}
        <div
          className="category-list"
          ref={categoryListRef}
          onScroll={handleScrollCheck}
        >
          {categories?.map((category, index) => (
            <div
              className={`category ${
                category.label === selectedCategory ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <div
            className="scroll-icon right"
            onClick={() => handleScroll("right")}
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
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
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
