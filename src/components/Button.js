import React from 'react'

export default class Button extends React.Component {
    events = {}
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            text: props.children
        };

        this.events.onMouseOver = props.onMouseOver;
        this.events.onMouseOut = props.onMouseOut;
    }
    render() {
        return <button type="button" id={this.state.id} onMouseOver={this.events.onMouseOver} onMouseLeave={this.events.onMouseOut}>{this.state.text}</button>
    }
}