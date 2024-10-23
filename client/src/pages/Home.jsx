import Navbar from "../components/Navbar";
import Pastexperience from "../components/Pastexperience";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Listings />
      <Categories />
      <Pastexperience />
      <Footer />
    </>
  );
};

export default Home;
