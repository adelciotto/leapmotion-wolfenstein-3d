/*
 * leap_utils.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Wolf.LeapUtils = (function() {
    return {
        DefaultOpts: {
            minHandVisible: 0.25,
            minHandConfidence: 0.5,
            minPinchStrength: 0.9
        },

        Axis: {
            X: 0, Y: 1, Z: 2, ALL: 3
        },

        RotAngles: {
            ROLL: "roll", YAW: "yaw", PITCH: "pitch"
        },

        findPinchingFinger: function(hand) {
            var pincher;
            var closest = 500;

            for (var f = 1; f < 5; ++f) {
                var curr = hand.fingers[f];
                var distance = Leap.vec3.distance(hand.thumb.tipPosition, curr.tipPosition);
                if (curr !== hand.thumb && distance < closest) {
                    closest = distance;
                    pincher = curr;
                }
            }

            return pincher;
        }
    };
})();
