
import React from 'react';
import { useState, useEffect } from 'react';
import './Cards.css';
import Description from './Description';

function Cards () {
    const [Cards, setCards] = useState([])
    let [pageNum, setPageNum] = useState(1)
    let [search, setSearch] = useState('')

    async function fetchCards(pageNum, type) {
        let response
        if (type === 'SEARCH')
            response    = await fetch('https://jsonplaceholder.typicode.com/photos?q=' + search )
        else 
            response    = await fetch('https://jsonplaceholder.typicode.com/photos?_page=' +  pageNum + '&_limit=10')
        const data = await response.json();

        return data;
    }

    const handleChange = (event) => {  setSearch(event.target.value) }
      
    const HandleSearch = () => {
        if (search !== '')
            fetchCards(pageNum, "SEARCH").then((data) => { setCards(data)  }) 
    }

    const goToPrevPage = () => {
        if (pageNum > 1)
            setPageNum(pageNum - 1);  
        fetchCards(pageNum, "").then((data) => { setCards(data) })
    };

    const goToNextPage = () => {
        setPageNum(pageNum + 1); 
        fetchCards(pageNum, "").then((data) => { setCards(data) })
    };

    const RemoveItems = (id) => {
        setCards(Cards.filter((Card) => Card.id !== id));
    };

    useEffect(() => {
        fetchCards(pageNum, "").then((data) => {
            setCards(data);})
    }, []) 
    


    return (
        <div className="Cards">
            <div className='Dash'>
                <h3>Page { pageNum} : {Cards.length} Items </h3>
                <form className='Search'> 
                    <input type="text" placeholder="Search" onChange={handleChange} />
                    <button type='button' onClick={HandleSearch} >Search</button>
                </form>
                <button  onClick={goToPrevPage}  > Previous Page  </button>
                <button  onClick={goToNextPage} > Next Page </button>
            </div>
            <div>
                <ul>
                {Cards.map((Card) => (
                    <li className="Cardlist" key={Card.id}>
                        <img className="Cardimage"src={Card.url} alt={Card.title} />
                        <div className='CardData'>
                            <div className="title" >{Card.title}</div>
                            <a href={Card.url}  target="_blank" rel="noreferrer" >{Card.thumbnailUrl} </a>
                            <button className='Button' onClick={() => {RemoveItems(Card.id)}} > Delete </button>
                            <Description Card={Card}/>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Cards;

