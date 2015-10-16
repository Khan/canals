import React, { Component } from 'react';

import Home from './Home';

class Box extends Component {
    render() {
        return <div style={{
            width: '100%',
            height: '100%',
            background: this.props.color
        }}>
            <Home />
        </div>
    }
};

export default Box;
