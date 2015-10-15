// Much of this code is cribbed directly from Backbone.Router's source:
// http://backbonejs.org/

const optionalParam = /\((.*?)\)/g;
const namedParam    = /(\(\?)?:\w+/g;
const splatParam    = /\*\w+/g;
const escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

const routeToRegex = (route) => {
    route = route.replace(escapeRegExp, '\\$&')
                 .replace(optionalParam, '(?:$1)?')
                 .replace(namedParam, (match, optional) => {
                     return optional ? match : '([^/?]+)';
                 })
                 .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
};

// Original from:
// http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
var parseQueryString = function(query) {
    var urlParams = {},
        e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function(s) { return decodeURIComponent(s.replace(a, " ")); };

    while ((e = r.exec(query))) {
        urlParams[d(e[1])] = d(e[2]);
    }

    return urlParams;
};

const extractParameters = (routeRegex, fragment) => {
    const params = routeRegex.exec(fragment).slice(1);
    const ret = {
        args: [],
        query: {}
    };

    params.map((param, i) => {
        if (i === params.length - 1) {
            // Last match group in the regex is the part after the ?
            if (param) {
                ret.query = parseQueryString(param);
            }
        } else {
            ret.args.push(param ? decodeURIComponent(param) : null);
        }
    });

    return ret;
};

const Canals = {
    compile(routeMap) {
        const routeList = Object.keys(routeMap).map((key) => {
            return [routeToRegex(key), routeMap[key]];
        });

        return (urlFragment) => {
            for (let i = 0, ii = routeList.length; i < ii; i++) {
                const route = routeList[i];
                if (route[0].test(urlFragment)) {
                    return {
                        ...extractParameters(route[0], urlFragment),
                        value: route[1]
                    }
                }
            };
            return null;
        };
    }
};

export default Canals;
