Wolf.LeapController=function(){function n(n){r="undefined"==typeof n?{}:n,Wolf.Utils.objCheckDefaults(r,Wolf.LeapUtils.DefaultOpts),d=new Leap.Controller,d.connect(),d.on("frame",t.bind(this))}function i(n,i,t,o){t="undefined"==typeof t?null:t,o="undefined"==typeof o?{}:o,Wolf.Utils.objCheckDefaults(o,n.defaultOpts),f[n.name]={callback:i.bind(t),options:o}}function t(n){for(var i=0,t=n.hands.length;t>i;++i){var o=n.hands[i];if(o&&o.timeVisible>r.minHandVisible){o.pinchStrength<r.minPinchStrength-.25&&(p=0);for(var e in f)this["_process"+e](n,o,f[e])}}}function o(n,i,t){var o=t.options,e=o.axis===Wolf.LeapUtils.Axis.ALL?i.stabilizedPalmPosition:i.stabilizedPalmPosition[o.axis];t.callback(e,i)}function e(n,i,t){var o=t.options,e=i.pointables[1];if(e){var a=o.axis===Wolf.LeapUtils.Axis.ALL?e.tipVelocity:e.tipVelocity[o.axis],l=i.indexFinger;l&&l.extended&&t.callback(a,i)}}function a(n,i,t){var o=i.indexFinger,e=i.thumb;if(e&&o){var a=Leap.vec3.dot(o.proximal.direction(),e.distal.direction()),l=Leap.vec3.dot(o.distal.direction(),e.distal.direction()),c={bottom:Math.acos(a),top:Math.acos(l)};t.callback(c,i)}}function l(n,i,t){t.callback(i.grabStrength,i)}function c(n,i,t){var o=i[t.options.rotAngle]();t.callback(o)}function s(n,i,t){i.pinchStrength>=r.minPinchStrength&&t.callback(Wolf.LeapUtils.findPinchingFinger(i),i)}var r,f={},p=0,d=null;return{controller:d,init:n,on:i,_processOnMove:o,_processOnAiming:e,_processOnThumbContracting:a,_processOnClenching:l,_processOnRotate:c,_processOnPinching:s}}();