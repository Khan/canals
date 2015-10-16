import React from 'react';

import Canals from '../../src/index.js';

import Home from './Home';
import Box from './Box';

const routeToFn = Canals.compile({
    "colors/:color": (color) => <Box color={color} />,
    "": () => <Home />
});

const route = (urlFragment) => {
    const result = routeToFn(urlFragment);

    if (result === null) {
        return null;
    } else {
        return result.value(...result.args, result.query);
    }
}

export default route;
