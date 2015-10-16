# Canals: pure URL routing

Things Canals does:

- Maps URL fragments to params and arbitrary JS objects
- Parses query params

Things Canals doesn't do:

- Listen for URL changes
- Construct URLs
- Know anything about pushState

The limited scope of its responsibilities make it useful on the server and 
client! It also makes it really nice to write tests against, because it's all 
pure functions.

If type signatures appeal to you, Canals.compile works roughly like so:

    Canals.compile :: {route: A, ...} -> (url) -> ({args: [arg1, arg2, ...],
                                                    query: {queryParam: queryVal, ...},
                                                    value: A})

Usage:

    var route = Canals.compile({
        "posts/:postId": function(postId) { ... }
        "posts/:postId/comments/:commentId": function(postId, commendId) { ...  },
        "download/*path": function(path) { ... },
        "edit(/:tab)": function(tab) { ... }
        "about": "about",
        "": "home"
    });

    // Note that Canals doesn't *execute* the callback. That's up to you to do, 
    // if you wish.

    route("");
    // {args: [], query: {}, value: "home"}

    route("about");
    // {args: [], query: {}, value: "about"}

    route("about?lang=fr&v=2");
    // {args: [], query: {"lang": "fr", "v": "2"}, value: "about"}

    route("posts/1");
    // {args: ["1"], query: {}, value: function(postId) { ... }}

    route("posts/1/comments/3");
    // {args: ["1", "3"], query: {}, value: function(postId, commentId) { ... }}

    route("download/foo/bar/baz?lang=fr");
    // {args: ["foo/bar/baz"], query: {"lang": "fr"},
    //  value: function(postId, commentId) { ...  }}

    route("edit");
    // {args: [null], query: {}, value: function(tab) { ... }}

    route("edit/preview");
    // {args: ["preview"], query: {}, value: function(tab) { ... }}

    route("upload");  // No route defined for "upload"
    // null

The syntax for specifying routes was ripped directly from Backbone.Router.
