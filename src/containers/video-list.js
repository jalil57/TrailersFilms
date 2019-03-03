import React, { Component } from 'react'
import VideoListItem from '../components/video-list-item'

const videoListUlStyle = {
    listStyle: 'none',
    textAlign: 'center'
}

const videoListStyle = {
    marginTop: '25%',
    width: '140%'
}

class VideoList extends Component {
    render() {
        return (
            <div style={videoListStyle}>
                <ul style={videoListUlStyle}>
                    {this.props.movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={this.receiveCallBack} />
                    })}
                </ul>
            </div>
        );
    }

    receiveCallBack = (movie) => {
        this.props.callback(movie);
    }
}

export default VideoList;