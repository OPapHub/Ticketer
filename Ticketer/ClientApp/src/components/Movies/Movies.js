import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';

export class Movies extends Component {
    static displayName = Movies.name;

    constructor(props) {
        super(props);
        this.state = { movies: [], loading: true };
    }

    componentDidMount() {
        this.populateMovieData(this.props.route);
    }

    static renderMoviesTable(movies) {
        if (movies.length === 0) {
            return (
                <div className="no_movies">
                    <h1>Sorry, there are no movies here ;(</h1>
                </div>);
        } else {
            return (
                <div className="wrapper">
                    {movies.map(movie =>
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <div className="movie_card">
                                <div className="poster"><img src={movie.poster} alt="Location Unknown" /></div>
                                <div className="details">
                                    <h1>{movie.title}</h1>
                                    <h2>{movie.releaseYear} • {movie.ageRestriction} • {Math.floor(movie.duration / 60)}hr {movie.duration % 60}min</h2>
                                    <div className="rating">
                                        <span>{movie.rating}/10</span>
                                    </div>
                                    <div className="ganre_tags">
                                        {movie.genres.map(genre =>
                                            <span className="ganre_tag" key={genre.name}>{genre.name}</span>)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            );
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Movies.renderMoviesTable(this.state.movies);

        return (
            <div className="moviesContent">
                {contents}
            </div>
        );
    }

    async populateMovieData(route) {
        const response = await fetch(`/api/movie/state/${route}`);
        const data = await response.json();
        this.setState({ movies: data, loading: false });
    }
}