Wolf.File=function(){function n(n,r,t){var o=r[n];if(o){var a=atob(o);t(null,{data:a,size:a.length,position:0})}else t(new Error("File not found: "+n))}function r(n){var r=255&n.data.charCodeAt(n.position);return n.position++,r}function t(n){var t=r(n);return t>127?t-256:t}function o(n){var t=r(n)+(r(n)<<8);return 0>t?t+65536:t}function a(n){var r=o(n);return r>32767?r-65536:r}function i(n){var t=r(n),o=r(n),a=r(n),i=r(n),e=(((i<<8)+a<<8)+o<<8)+t;return 0>e?e+4294967296:e}function e(n){var r=i(n);return r>2147483647?r-4294967296:r}function u(n,r){var t=n.data.substr(n.position,r);return n.position+=r,t}function d(n,r){for(var t=[],o=0;r>o;o++)t[o]=255&n.data.charCodeAt(n.position+o);return n.position+=r,t}return{open:n,readInt8:t,readUInt8:r,readInt16:a,readUInt16:o,readInt32:e,readUInt32:i,readBytes:d,readString:u}}();