import {assert} from 'chai';

import Canals from '../src/index.js';

describe('Canals', () => {
    let route;

    beforeEach(() => {
        route = Canals.compile({
            "posts/:postId": 1,
            "posts/:postId/comments/:commentId": 2,
            "download/*path": 3,
            "edit(/:tab)": 4,
            "about": 5,
            "": 6
        });
    });

    const assertRoute = (fragment, expected) => {
        assert.deepEqual(route(fragment), {
            args: [],
            query: {},
            ...expected
        });
    };

    it("routes the empty path", () => {
        assertRoute("", {value: 6});
    });

    it("routes simple paths", () => {
        assertRoute("about", {value: 5});
    });

    it("routes simple paths with query params", () => {
        assertRoute("about?lang=fr&v=2", {value: 5, query: {lang: "fr",
                                                            v: "2"}});
    });

    it("routes paths with an arg", () => {
        assertRoute("posts/1", {value: 1, args: ["1"]});
    });

    it("routes paths with multiple args", () => {
        assertRoute("posts/1/comments/3", {value: 2, args: ["1", "3"]});
    });

    it("routes paths with splats", () => {
        assertRoute("download/foo/bar/baz?lang=fr",
                    {args: ["foo/bar/baz"],
                     query: {"lang": "fr"},
                     value: 3});
    });

    it("routes paths with optional params missing", () => {
        assertRoute("edit", {args: [null], value: 4});
    });

    it("routes paths with optional params present", () => {
        assertRoute("edit/preview", {args: ["preview"], value: 4});
    });
});
