/*
 * leap_controller.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Wolf.LeapController = (function() {
    var options;
    var listeners = {};
    var timePinched = 0;
    var controller = null;

    function init(opts) {
        options = (typeof opts === "undefined" ? {} : opts);

        Wolf.Utils.objCheckDefaults(options, Wolf.LeapUtils.DefaultOpts);

        // init the leap controller
        controller = new Leap.Controller();
        controller.connect();
        controller.on("frame", onFrame.bind(this));
    }

    function on(listener, callback, ctx, opts) {
        ctx = (typeof ctx === "undefined" ? null : ctx);
        opts = (typeof opts === "undefined" ? {} : opts);

        Wolf.Utils.objCheckDefaults(opts, listener.defaultOpts);
        listeners[listener.name] = {
            callback: callback.bind(ctx),
            options: opts
        };
    }

    function onFrame(frame) {
        for (var i = 0, len = frame.hands.length; i < len; ++i) {
            var hand = frame.hands[i];

            // check the time the hand has been visible to the device.
            // This helps ensure that minor motion or environmental changes not in control of the
            // player don"t affect the gameplay.
            if (hand && hand.timeVisible > options.minHandVisible) {
                if (hand.pinchStrength < options.minPinchStrength - 0.25) {
                    timePinched = 0;
                }

                for (var key in listeners) {
                    this["_process" + key](frame, hand, listeners[key]);
                }
            }
        }
    }

    function _processOnMove(frame, hand, listener) {
        var opts = listener.options;
        var pos = (opts.axis === Wolf.LeapUtils.Axis.ALL ? hand.stabilizedPalmPosition :
                hand.stabilizedPalmPosition[opts.axis]);

        listener.callback(pos, hand);
    }

    function _processOnAiming(frame, hand, listener) {
        var opts = listener.options;
        var idxFingerPointable = hand.pointables[1];

        if (idxFingerPointable) {
            var pos = (opts.axis === Wolf.LeapUtils.Axis.ALL ? idxFingerPointable.tipVelocity :
                idxFingerPointable.tipVelocity[opts.axis]);

            // only invoke the callback if the index finger is extended (pointing)
            var idxFinger = hand.indexFinger;
            if (idxFinger && idxFinger.extended) {
                listener.callback(pos, hand);
            }
        }
    }

    function _processOnThumbContracting(frame, hand, listener) {
        var idxFinger = hand.indexFinger;
        var thumb = hand.thumb;

        if (thumb && idxFinger) {
            // check angle between both top and lower half of index finger
            var dotProductBottom = Leap.vec3.dot(
                idxFinger.proximal.direction(),
                thumb.distal.direction()
            );
            var dotProductTop = Leap.vec3.dot(
                idxFinger.distal.direction(),
                thumb.distal.direction()
            );
            var angles = {
                bottom: Math.acos(dotProductBottom),
                top: Math.acos(dotProductTop)
            };

            listener.callback(angles, hand);
        }
    }

    function _processOnClenching(frame, hand, listener) {
        listener.callback(hand.grabStrength, hand);
    }

    function _processOnRotate(frame, hand, listener) {
        var angle = hand[listener.options.rotAngle]();
        listener.callback(angle);
    }

    function _processOnPinching(frame, hand, listener) {
        if (hand.pinchStrength >= options.minPinchStrength) {
            listener.callback(Wolf.LeapUtils.findPinchingFinger(hand), hand);
        }
    }

    return {
        controller: controller,
        init: init,
        on: on,

        _processOnMove: _processOnMove,
        _processOnAiming: _processOnAiming,
        _processOnThumbContracting: _processOnThumbContracting,
        _processOnClenching: _processOnClenching,
        _processOnRotate: _processOnRotate,
        _processOnPinching: _processOnPinching
    };
})();
