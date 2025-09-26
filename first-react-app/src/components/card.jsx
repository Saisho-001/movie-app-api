import React from 'react';

const Card = ({movie}) => {
    return ( 
        <div className='movie-card'>
            <img className='w-full h-64 object-cover rounded'
            src={movie.image}
            onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = '/noPoster.png';
            }} 
            alt={movie.title} />
            <div className='mt-4'>
                <h3>{movie.title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src="./public/star.svg" alt="Star-icon" />
                        <p>{movie.rating ? (movie.rating/2).toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className='lang'>en</p>
                    <span>•</span>
                    <p className='year'>{movie.year ? movie.year : 'N/A'}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Card;