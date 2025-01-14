import React from 'react';
import { NavLink } from 'react-router-dom';

const Mealcards = ({ detail }) => {
    return (
        <div className='meals'>
            {detail && detail.length > 0 ? (
                detail.map((curItem) => (
                    <div className='mealImg' key={curItem.idMeal}>
                        <img src={curItem.strMealThumb} alt={curItem.strMeal} />
                        <p>{curItem.strMeal}</p>

                        <div className="mealIcon">
                <i className="fa fa-utensils"></i> 
  </div>

                        <NavLink to={`/${curItem.idMeal}`}>
                            <button>Recipe</button>
                        </NavLink>
                    </div>
                ))
            ) : (
                <p>No meals found</p>
            )}
        </div>
    );
};

export default Mealcards;
