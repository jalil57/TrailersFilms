import React, { Component } from 'react'

const videoDetailStyle = {
    marginTop: '5%',
    width: '80%'
}

const VideoDetail = ({title, description}) => {
    return (
        <div style={videoDetailStyle}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

export default VideoDetail;