import React, { Component } from 'react'

const searchBarStyle = {
    width: '100%',
    marginTop: '5%'
}

class SearchBar extends Component {
    
    state = {
        searchText:"",
        placeHolder:"Rechercher un film...",
        intervalBeforeRequest: 1000,
        lockRequest: false

    };

    render() {
        return(
            <div>
                <input  style={searchBarStyle}
                        type='text'
                        onKeyUp={this.handleOnKeyUp}
                        onChange={this.handleChange}
                        placeholder={this.state.placeHolder}
                />
            </div>
        );
    }

    handleOnKeyUp = (event) => {
        this.setState({searchText: event.target.value});
    }

    handleChange = (event) => {
        this.setState({searchText: event.target.value});
        if (!this.state.lockRequest) {
            this.setState({lockRequest: true});
            setTimeout(() => {this.handleOnClick()}, this.state.intervalBeforeRequest);         
        }
    }

    handleOnClick = () => {
        this.props.callback(this.state.searchText);
        this.setState({lockRequest: false});
    }
}

export default SearchBar;