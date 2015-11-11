/*
 * utils.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Wolf.Utils = (function() {
    return {
        objCheckDefaults: function(obj, defaults) {
            for (var key in defaults) {
                if (typeof obj[key] === 'undefined') {
                    obj[key] = defaults[key];
                }
            }
        }
    };
})();
