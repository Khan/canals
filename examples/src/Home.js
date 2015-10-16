import React, { Component } from 'react';

import Link from './Link';

class Home extends Component {
    render() {
        return <div>
            <h1>Colors!</h1>
            <ul>
                <li><Link href="/colors/red">Red!</Link></li>
                <li><Link href="/colors/green">Green!</Link></li>
                <li><Link href="/colors/blue">Blue!</Link></li>
            </ul>
        </div>;
    }
}

export default Home;
