import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import route from './route';

const checkLocation = () => {
    const {pathname, search} = window.location;
    const urlFragment = pathname.substr(1) + (search ? `?${search}` : '');

    const reactElement = route(urlFragment);

    if (reactElement) {
        console.log(`Rendering component for ${urlFragment}`);
        ReactDOM.render(reactElement, document.getElementById('root'));
    }
};

if (typeof window !== 'undefined') {
    checkLocation();
    window.addEventListener('popstate', checkLocation);
}

export {checkLocation};
