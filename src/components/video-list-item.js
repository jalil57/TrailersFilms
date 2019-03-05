import React, { Component } from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const videoListItemTitleStyle = {
    width: '200px',
    margin: 'auto'
}

const videoListItemImgStyle = {
    marginLeft: '4%',
    marginTop: '4%',
    marginBottom: '4%',
    width: '100px',
    height: '100px'
}

const videoListItemStyle = {
    border: '1px solid #f5f5f5',
    display: 'flex',
    marginLeft: '15%'
}

class VideoListItem extends Component {
    render() {
        return (
            <div style={videoListItemStyle} onClick={this.handleOnClick}>
                <img style={videoListItemImgStyle}
                        height="100px" width="100px" src={`${IMAGE_BASE_URL}${this.props.movie.poster_path}`}
                />
                <div style={videoListItemTitleStyle}>
                    <li>{this.props.movie.title}</li>
                </div>
            </div>
        );
    }

    handleOnClick = () => {
        this.props.callback(this.props.movie);
    }
}

export default VideoListItem;