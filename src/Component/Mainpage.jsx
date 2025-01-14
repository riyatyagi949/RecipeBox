import React, { useState, useEffect } from 'react';
import Mealcards from './Mealcards';

const Mainpage = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [msg, setMsg] = useState('');

    const handleInput = (event) => {
        setSearch(event.target.value);
    };

    const myFun = async () => {
        if (search === '') {
            setMsg('Please Enter Something');
        } else {
            try {
                const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
                const jsonData = await get.json();
                if (jsonData.meals) {
                    setData(jsonData.meals);
                    setMsg('');
                } else {
                    setMsg('No meals found');
                }
            } catch (error) {
                setMsg('Error fetching data');
            }
        }
    };

    useEffect(() => {
        // Optional: Auto fetch if search changes
        if (search !== '') {
            myFun();
        }
    }, [search]);

    return (
        <>
        <h1 className='head'>RECIPE <span>BOX</span></h1>


            <div className='container'>
                <div className='searchBar'>
                    <input
                        type='text'
                        placeholder='Enter Dish'
                        onChange={handleInput}
                        value={search}
                    />
                   
<button onClick={myFun}>
  <i className="fa fa-search"></i> Search
</button>

                </div>
                <h4 className='msg'>{msg}</h4>
                <div>
                    <Mealcards detail={data} />
                </div>
            </div>
        </>
    );
};

export default Mainpage;
