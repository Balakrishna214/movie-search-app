import  { Component } from 'react';
import './index.css';
import { FaStar } from 'react-icons/fa';

 

class MovieCard extends Component {
    state={dogImage:''}

    componentDidMount(){
        this.getDogsImage()
    }

    getDogsImage=async()=>{
        const url='https://dog.ceo/api/breeds/image/random'
        const response=await fetch(url)
        const data=await response.json()
        this.setState({dogImage:data.message})
         
    }

  render() {
    const {dogImage}=this.state
    const { movieDetails } = this.props;
    const {
      author_name,
      first_publish_year,
      title,
      ratings_average,
      ratings_count,
      want_to_read_count,
    } = movieDetails;

    return (
      <div className='movie-card'>
        <img
          src={dogImage} 
          alt={title}
          className='movie-poster'
        />
        <div className='movie-info'>
          <h3 className='movie-title'>{title}</h3>
          <p className='info-item'>Author: {author_name ? author_name[0] : 'Unknown'}</p>
          <p className='info-item'>Year: {first_publish_year || 'Unknown'}</p>
          <div className='ratings'>
            <FaStar className='star-icon' />
            <span>{ratings_average ? `${ratings_average} (${ratings_count})` : '0'}</span>

          </div>
          <p className='info-item'>Want to Read: {want_to_read_count}</p>
        </div>
      </div>
    );
  }
}

export default MovieCard;
