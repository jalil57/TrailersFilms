import React, { Component } from 'react';
import SearchBar from '..//components/search-bar'
import VideoList from '../containers/video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY = 'api_key=b3a43ffdf4ba2e748cc85a343ec5e23b';
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_responsive=images";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

const VideoListStyle = {
  marginRight: '10%'
}

const pageStyle = {
  display: 'flex',
}

const titleStyle = {
  textAlign: 'center',
  margin: '4% auto'
}

class App extends Component {

  state = {
    movieList: {},
    currentMovie: {}
  }

  componentWillMount() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(response => {
      this.setState({movieList:response.data.results.slice(1,6), currentMovie:response.data.results[0]});
      this.applyVideoToCurrentMovie();
    });
  };

  applyVideoToCurrentMovie() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(response => {
      const youtubeKey = response.data.videos.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({currentMovie: newCurrentMovieState});
    });
  }

  handleChangeVideo = (movie) => {
    this.setState({currentMovie: movie}, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }

  handleSearchMovie = (movie) => {
    if (movie) {
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${movie}`).then(response => {
        if (response.data && response.data.results[0] &&
            response.data.results[0].id != this.state.currentMovie.id){
          this.setState({currentMovie:response.data.results[0]}, () => {
            this.applyVideoToCurrentMovie();
            this.setRecommendation();
          });
        }
      });
    }
  }

  setRecommendation() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(response => {
      this.setState({movieList:response.data.results.slice(1,5)})
    });
  }

  render() {

    const renderVideoList = () => {
      if (this.state.movieList.length >= 1) {
        return <VideoList movieList={this.state.movieList} callback={this.handleChangeVideo} />
      }
    }

    return (
      <div>
        <h1 style={titleStyle}>Trailers de films</h1>
        <div style={pageStyle}>
          <div>
            <div>
              <SearchBar callback={this.handleSearchMovie} />
            </div>
            <div>
              <Video videoId={this.state.currentMovie.videoId} />
            </div>
            <div>
              <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
            </div>
          </div>
          <div style={VideoListStyle}>
            { renderVideoList() }
          </div>
          </div>
      </div>
    );
  }

}

export default App;