import React from 'react';

const Search = ({searchMovie, setSearchMovie}) => {
    return (
        <div className='search'>
            <div>
                <img src="./public/search.svg" alt="Search-icon" />
                
                <input type="text" placeholder='Search Movie ...'
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}/>
            </div>
        </div>
    );
}
 
export default Search;