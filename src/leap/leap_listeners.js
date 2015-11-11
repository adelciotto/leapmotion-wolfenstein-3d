/*
 * leap_listeners.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Wolf.LeapListeners = (function() {
    return {
        OnMove: {
            name: "OnMove",
            defaultOpts: { axis: Wolf.LeapUtils.Axis.ALL }
        },
        OnAiming: {
            name: "OnAiming",
            defaultOpts: { axis: Wolf.LeapUtils.Axis.X }
        },
        OnThumbContracting: {
            name: "OnThumbContracting"
        },
        OnClenching: {
            name: "OnClenching"
        },
        OnRotate: {
            name: "OnRotate",
            defaultOpts: { rotAngle: Wolf.LeapUtils.RotAngles.YAW }
        },
        OnPinching: {
            name: "OnPinching"
        }
    };
})();
