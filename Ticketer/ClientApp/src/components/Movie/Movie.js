import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Movie.css';

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [select, setSelect] = useState(false);

    const style = {
        display: select ? 'block' : 'none'
    };

    let selectRef = useRef();

    useEffect(() => {

        let handler = (e) => {
            if (!selectRef.current.contains(e.target)) {
                setSelect(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });


    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`/api/movie/movie/${id}`);
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    const renderMovieContext = (movie) => {
        return (
            <div className="max-container">
                <div className="movie_info_wrapper">
                    <ul className="breadcrumbs">
                        <li className="breadcrumbs_item">
                            <a href="/">Ticketer</a>
                        </li>
                        {/*<li className="breadcrumbs_item">*/}
                        {/*    <a href="/movies">Movies</a>*/}
                        {/*</li>*/}
                        <li className="breadcrumbs_item_last">
                            {movie.title}
                        </li>
                    </ul>
                    <div className="movieInfo">
                        <div className="column1">
                            <div className="moviePoster">
                                <img src={movie.poster} alt="Location Unknown" />
                            </div>
                            <div className="video_section">
                                <h2 className="playtrailer">Watch Trailer</h2>
                            </div>
                        </div>
                        <div className="column3">
                            <div className="fv2_date">
                                <p className="heading">Session schedule</p>
                                <div className={`selector ${select ? 'active' : ''}`} onClick={() => setSelect(!select)}>
                                    <p className="left">Sun, 10 december</p>
                                </div>

                            </div>
                            <div className={`date_select `} style={style} ref={selectRef}>
                                <ul>
                                    <li className="current">Today</li>
                                    <li>Tomorrow</li>
                                </ul>
                            </div>
                            <div className="all_sessions_area">
                                <div className="as_schedule">
                                    <div className="cinema">
                                        <p className="heading oneTown">Cinema Name</p>
                                        <a href="/cart/seatplan" className="ns ">
                                            <p className="time">
                                                <span>12:20</span>
                                            </p>
                                            <p className="tag">LUX</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="techs">
                                <div className={`attribute ${hovered ? 'hovered' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                                    <div className="attribute-btn">
                                        LUX
                                        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 510 510">
                                            <path d="M255 0C114.7 0 0 114.8 0 255s114.8 255 255 255 255-114.8 255-255S395.2 0 255 0zm25.5 433.5h-51v-51h51v51zM334 237.2l-23 23c-20.3 17.8-30.5 33-30.5 71.3h-51v-12.8c0-28 10.2-53.5 30.6-71.3l30.7-33.2c10.2-7.7 15.3-20.4 15.3-35.7 0-28-23-51-51-51s-51 23-51 51h-51c0-56 46-102 102-102s102 46 102 102c0 23-10.2 43.3-23 58.7z" opacity="1" fill="#fff"></path>
                                        </svg>
                                    </div>
                                    <div className="attribute-hint">
                                        <img src="d_2.svg" alt="description" />
                                        <span>Description</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column2">
                            <h1>{movie.title}</h1>
                            <ul className="movie_credentials">
                                <li>
                                    <p className="key">Age Restriction:</p>
                                    <p className="val">{movie.ageRestriction}</p>
                                </li>
                                <li>
                                    <p className="key">Year:</p>
                                    <p className="val">{movie.releaseYear}</p>
                                </li>
                                <li>
                                    <p className="key">Director:</p>
                                    <p className="val">{movie.director}</p>
                                </li>
                                <li>
                                    <p className="key">Rating:</p>
                                    <p className="val">{movie.rating}/10</p>
                                </li>
                                <li>
                                    <p className="key">Genres:</p>                                                                                                                                                                                      
                                    <p className="val">{movie.genres.map(genre => genre.name).join(', ')}</p>                                                                                                                                                
                                </li>
                                <li>
                                    <p className="key">Duration:</p>
                                    <p className="val">{Math.floor(movie.duration / 60)}hr {movie.duration % 60}min</p>
                                </li>
                                <li>
                                    <p className="key">Production:</p>
                                    <p className="val">{movie.production}</p>
                                </li>
                                <li>
                                    <p className="key">Cast:</p>
                                    <p className="val">{movie.cast}</p>
                                </li>
                            </ul>
                            <p>Description</p>
                            <div className="movie_description">
                                <p>{movie.description}</p>
                            </div>
                        </div>
                        {/* Render other movie details as needed */}
                    </div>
                </div>
            </div>
        );
    };

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderMovieContext(movie[0]);

    return (
        <div className="movieContent">
            {contents}
        </div>
    )
}
export default Movie;
