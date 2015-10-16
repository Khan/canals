import React, { Component } from 'react';

import {checkLocation} from './client';

class Link extends Component {
    handleClick(ev) {
        if (window.history.pushState) {
            window.history.pushState({}, "", this.props.href);
            checkLocation();
            ev.preventDefault();
        }
    }

    render() {
        return <a href={"javascript:void 0"} onClick={this.handleClick.bind(this)}>
            {this.props.children}
        </a>;
    }
};

export default Link;
