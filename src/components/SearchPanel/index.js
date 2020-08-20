import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        term: ''
    }

    doSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    }

    render() {
        
        return (
            <input placeholder="search" 
                   className="search-input" 
                   onChange = {this.doSearch} 
                   value={this.state.term}
            />
        );
    }
}

