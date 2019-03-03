import React, { Component } from 'react'

const BASE_URL="https://www.youtube.com/embed/";

const videoStyle = {
    width: '80%',
    height: '400px',
    marginTop: '5%'
}

class Video extends Component {
    render() {
        return (
            <div>
                <iframe style={videoStyle} src={`${BASE_URL}${this.props.videoId}`} />
            </div>
        );
    }
}

export default Video;