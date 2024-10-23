import { Link } from "react-router-dom";
import { selectedCategories } from "../data"; 
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <h2>Discover Our Best Picks</h2>
      <div className="categories_list">
        {selectedCategories.map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div className="category">
              <img src={category.img} alt={category.label} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
