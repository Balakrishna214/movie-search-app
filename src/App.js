import React, { Component } from 'react';
import MovieCard from './Components/MovieCard'
import { FiSearch, FiX } from 'react-icons/fi';  

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css';

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class App extends Component {
  state = {
    input: '',
    movies: [],
    error: null,
    loading: false,
    apiStatus: apiStatusConstants.initial,
  };

  getMoviesData = async () => {
    const { input } = this.state;
    if (!input.trim()) {
      alert('Please enter a movie name');
      return;
    }

    this.setState({ loading: true, error: null, apiStatus: apiStatusConstants.inProgress });
     

    try {
      const url = `https://openlibrary.org/search.json?q=${input}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        this.setState({ movies: data.docs ,apiStatus: apiStatusConstants.success,});
      } else {
        this.setState({ movies: [], error: 'No movies found',apiStatus: apiStatusConstants.failure});
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ error: 'Failed to fetch movies. Please try again later.' });
      
    }

    this.setState({ loading: false });
  };

  clearInput = () => {
    this.setState({ input: '', movies: [], error: null,apiStatus: apiStatusConstants.initial });
  };

  onChangeInput = event => {
    const inputValue = event.target.value;
    this.setState({ input: inputValue });
  };

  renderLoadingView=()=>{
    console.log("loading")
    return(
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
    )
  }

  renderMovieList=()=>{
    const {movies}=this.state
       
    return (
      <div className='movie-list-container'>
        {movies.map((each) => (
          <MovieCard key={each.id} movieDetails={each} />
        ))}
      </div>
    );
    
  }

  initialState=()=>{
     return(
       
        <div class="greeting greeting__welcome">
          <svg class="greeting__arrow" viewBox="0 0 256 400" xmlns="http://www.w3.org/2000/svg" data-v-704a5f74="">
            <path
              d="M244.36 212.936c-12.701-16.933-32.002-26.254-49.791-36.882-19.857-11.895-42.893-23.838-60.985-38.294-28.877-23.032-47.52-47.311-57.65-89.9 4.233 6.147 10.031 15.575 15.424 20.865 6.148 6.044 17.032-1.309 11.892-8.967C91.91 42.978 80.62 26.149 74.068 6.9 70.49-3.529 57.843-1.665 57.037 9.32c-1.865 23.632-8.467 46.558-17.74 68.327-5.594 13.148 9.469 21.063 14.66 7.407 2.72-7.159 8.22-19.408 10.337-29.087 6.688 31.994 18.243 50.096 33.312 67.38 30.49 34.715 72.37 53.507 110.57 78.295 17.236 11.186 40.572 34.927 28.427 57.45-10.13 18.592-30.94 30.136-50.09 36.882-42.232 14.814-91.071 12.955-133.757 25.6-20.562 6.147-44.502 15.468-51.053 37.64-4.349 14.94-.35 31.395 11.773 39.837a5.233 5.233 0 007.174-1.12h.002a4.788 4.788 0 00-.346-6.195c-14.883-15.492-6.33-39.106 13.344-49.462 19.51-10.271 45.41-14.062 66.879-17.181 40.065-5.7 88.96-10.157 119.24-29.222 15.215-9.58 28.679-20.458 34.323-38.093 4.94-15.62-.208-32.092-9.733-44.84z"
              fill="#34d399" fill-rule="nonzero" data-v-704a5f74=""></path>
          </svg>
          <p class="greeting__text">Use the search bar to find your movie.</p>
        </div>
     )
  }

renderFailureView=()=>{
  return(
  <div>
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="not found" className='failure-img'/>
  </div>
  )
}

  renderMoviesList=()=>{
    const {apiStatus} = this.state
    console.log(apiStatus);
    switch (apiStatus) {
      case apiStatusConstants.initial:
          return this.initialState()
      case apiStatusConstants.success:
        return this.renderMovieList()
      case apiStatusConstants.inProgress:
          return this.renderLoadingView()
      case apiStatusConstants.failure:
          return this.renderFailureView()
       
      default:
        return null
    }
  }

  render() {
    const { input } = this.state;

    return (
      <div className="movie-search-container">
        <h1>Movie Search</h1>

        <div className="search-bar">
          <input
            className="input-field"
            placeholder="Enter movie name..."
            type="text"
            value={input}
            onChange={this.onChangeInput}
          />
          {input && (
            <button className="clear-button" onClick={this.clearInput}>
              <FiX />
            </button>
          )}
          <button className="search-button" onClick={this.getMoviesData}>
            <FiSearch />
          </button>
        </div>
 
       

        {this.renderMoviesList()}
      </div>
    );
  }
}

export default App;
