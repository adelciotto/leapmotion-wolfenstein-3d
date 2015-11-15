Wolf.Weapon=function(){function o(o,l){var n,i,f,t,a,e,W,s=o.level;for(Wolf.Sound.startSound(null,null,0,Wolf.CHAN_WEAPON,"lsfx/023.wav",1,Wolf.ATTN_NORM,0),i=2147483647,n=null,t=0;t<s.state.numGuards;++t)if(W=s.state.guards[t],W.flags&Wolf.FL_SHOOTABLE){if(a=Wolf.Math.point2LineDist(W.x-l.position.x,W.y-l.position.y,l.angle),a>2*Wolf.TILEGLOBAL/3)continue;if(f=Wolf.Math.lineLen2Point(W.x-l.position.x,W.y-l.position.y,l.angle),0>f||f>i)continue;if(!Wolf.Level.checkLine(W.x,W.y,l.position.x,l.position.y,s))continue;i=f,n=W}!n||i>Wolf.TILE2POS(1)||(e=Wolf.Random.rnd()>>4,Wolf.ActorAI.damageActor(n,o,l,e))}function l(o,l){var n,i,f,t,a,e,W,s,u,r=o.level;switch(l.weapon){case Wolf.WEAPON_PISTOL:Wolf.Sound.startSound(null,null,0,Wolf.CHAN_WEAPON,"sfx/012.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.WEAPON_AUTO:Wolf.Sound.startSound(null,null,0,Wolf.CHAN_WEAPON,"sfx/011.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.WEAPON_CHAIN:Wolf.Sound.startSound(null,null,0,Wolf.CHAN_WEAPON,"sfx/013.wav",1,Wolf.ATTN_NORM,0)}for(l.madenoise=!0,a=2147483647,n=null,s=0;s<r.state.numGuards;++s)if(u=r.state.guards[s],u.flags&Wolf.FL_SHOOTABLE){if(W=Wolf.Math.point2LineDist(u.x-l.position.x,u.y-l.position.y,l.angle),W>2*Wolf.TILEGLOBAL/3)continue;if(e=Wolf.Math.lineLen2Point(u.x-l.position.x,u.y-l.position.y,l.angle),0>e||e>a)continue;if(!Wolf.Level.checkLine(u.x,u.y,l.position.x,l.position.y,r))continue;a=e,n=u}if(!n){var A={angle:Wolf.Math.normalizeAngle(l.angle-Wolf.DEG2FINE(2)+65536*Math.random()%Wolf.DEG2FINE(4)),x:l.position.x,y:l.position.y,flags:Wolf.TRACE_BULLET};return Wolf.Raycaster.trace(r,null,A),void(A.flags&Wolf.TRACE_HIT_DOOR&&Wolf.Sound.startSound(null,null,0,Wolf.CHAN_AUTO,"lsfx/028.wav",1,Wolf.ATTN_NORM,0))}if(f=Math.abs(n.tile.x-l.tile.x),t=Math.abs(n.tile.y-l.tile.y),a=Math.max(f,t),2>a)i=Wolf.Random.rnd()/4;else if(4>a)i=Wolf.Random.rnd()/6;else{if(Wolf.Random.rnd()/12<a)return;i=Wolf.Random.rnd()/6}Wolf.ActorAI.damageActor(n,o,l,i)}return{fireHit:o,fireLead:l}}();