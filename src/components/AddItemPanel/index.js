import React, {Component} from 'react';

import './add-item-panel.css';

export default class AddItemPanel extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        });
    }

    render () {
        return(
            <form className="add-item-panel d-flex" onSubmit = {this.onFormSubmit}>
                <input type="text" placeholder="add item" value={this.state.label} className="form-control" onChange={this.onLabelChange} />
                
                <button type="submit" className="btn btn-outline-secondary btn-sm float-right">
                    Add Item
                </button>
            </form>
        );
    }
}
