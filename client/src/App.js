import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./components/ListingDetails";
import ListingReview from "./components/ListingReview";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Pastexperience from "./components/Pastexperience";
import Testimonials from "./components/Testimonials";
import UpdateBooking from "./pages/UpdateBooking";
import UpdateProperty from "./pages/UpdateProperty";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div>
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/properties/:listingId" element={<ListingDetails />} />
            <Route path="/feedback/:listingId" element={<ListingReview />} />
            <Route path="/pastexperience" element={<Pastexperience />} />
            <Route path="/testimonials/:id" element={<Testimonials />} />
            <Route
              path="/properties/category/:category"
              element={<Category />}
            />
            <Route path="/properties/search/:search" element={<Search />} />
            <Route path="/:userId/trips" element={<TripList />} />
            <Route path="/:userId/wishList" element={<WishList />} />
            <Route path="/:userId/properties" element={<PropertyList />} />
            <Route path="/:userId/reservations" element={<ReservationList />} />
            <Route
              path="/bookings/update/:bookingId"
              element={<UpdateBooking />}
            />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateProperty />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
