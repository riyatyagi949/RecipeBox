import React, { useState, useEffect } from "react";
import Mealcards from "./Mealcards";
import "../index.css";

// Import assets
import hero from "../assets/hero.jpg";
import breakfast from "../assets/breakfast.jpg";
import dessert from "../assets/dessert.jpg";
import salad from "../assets/salad.jpg";
import soup from "../assets/soup.jpg";
import grilled from "../assets/grilled.jpg";
import pasta from "../assets/pasta.jpg";
import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import cake from "../assets/cake.jpg";
import chef from "../assets/chef.jpg";
import cooking from "../assets/cooking.jpg";
import dining from "../assets/dining.jpg";

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const handleInput = (event) => setSearch(event.target.value);

  const fetchRecipes = async (query) => {
    if (!query.trim()) {
      setMsg("Please enter something...");
      setData([]);
      return;
    }
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const jsonData = await res.json();
      if (jsonData.meals) {
        setData(jsonData.meals);
        setMsg("");
      } else {
        setData([]);
        setMsg("No meals found 😢");
      }
    } catch (err) {
      setMsg("Error fetching data. Please try again.");
    }
  };

  const myFun = () => fetchRecipes(search);

  // Handle category clicks
  const handleCategoryClick = (category) => {
    setSearch(category);
    fetchRecipes(category);
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Welcome to <span>RecipeBox</span>
          </h1>
          <p>
            Discover thousands of delicious recipes and cook like a pro with
            step-by-step guides.
          </p>

          <div className="searchBar">
            <input
              type="text"
              placeholder="Search recipes like Pasta, Curry, Cake..."
              onChange={handleInput}
              value={search}
            />
            <button onClick={myFun}>
              <i className="fa fa-search"></i> Search
            </button>
          </div>
          <p className="msg">{msg}</p>
        </div>
      </section>

      {/* ✅ SEARCH RESULTS — Now placed above Explore by Category */}
      {data.length > 0 && (
        <section className="meals-section">
          <h2 className="section-title">Your Search Results</h2>
          <div className="meals-container">
            <Mealcards detail={data} />
          </div>
        </section>
      )}

      {/* CATEGORY SECTION */}
      <section className="categories">
        <h2 className="section-title">Explore by Category</h2>
        <div className="category-grid">
          {[
            { img: breakfast, name: "Breakfast" },
            { img: dessert, name: "Dessert" },
            { img: salad, name: "Salad" },
            { img: soup, name: "Soup" },
            { img: grilled, name: "Grilled" },
          ].map((cat, i) => (
            <div
              key={i}
              className="cat-card fade-in"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img src={cat.img} alt={cat.name} />
              <div className="cat-overlay">
                <h3>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="section-title">How RecipeBox Works</h2>
        <div className="steps">
          <div className="step fade-in">
            <img src={chef} alt="Step 1" />
            <h3>1. Search Your Dish</h3>
            <p>
              Type any meal name and get instant recipes with pictures and
              ingredients.
            </p>
          </div>
          <div className="step fade-in">
            <img src={cooking} alt="Step 2" />
            <h3>2. Explore Ingredients</h3>
            <p>
              Find all ingredients, quantities, and cooking steps clearly
              explained.
            </p>
          </div>
          <div className="step fade-in">
            <img src={dining} alt="Step 3" />
            <h3>3. Enjoy Your Meal</h3>
            <p>Follow the guide and enjoy delicious, homemade food!</p>
          </div>
        </div>
      </section>

      {/* POPULAR RECIPES */}
      <section className="popular-recipes">
        <h2 className="section-title">Popular Recipes</h2>
        <div className="popular-grid">
          {[
            { img: pasta, name: "Creamy Alfredo Pasta" },
            { img: pizza, name: "Cheesy Italian Pizza" },
            { img: burger, name: "Smoky BBQ Burger" },
            { img: cake, name: "Chocolate Lava Cake" },
          ].map((pop, i) => (
            <div
              key={i}
              className="pop-card fade-in"
              onClick={() => handleCategoryClick(pop.name.split(" ")[1])}
            >
              <img src={pop.img} alt={pop.name} />
              <div className="pop-overlay">
                <h3>{pop.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote fade-in">
        <blockquote>
          "Cooking is an art, but all art requires knowing something about the
          techniques and materials."
          <span> — Nathan Myhrvold</span>
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h3>RecipeBox</h3>
          <p>Made with ❤️ by Riya Tyagi</p>
          <div className="socials">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} RecipeBox. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Mainpage;
