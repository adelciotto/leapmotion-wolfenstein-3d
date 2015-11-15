Wolf.setConsts({UPPERZCOORD:.6,LOWERZCOORD:-.6,TRACE_MARK_MAP:1,TRACE_SIGHT:2,TRACE_SIGHT_AI:4,TRACE_BULLET:8,TRACE_OBJECT:16,TRACE_HIT_VERT:32,TRACE_HIT_DOOR:64,TRACE_HIT_PWALL:128}),Wolf.Raycaster=function(){function o(o,f,l,r,e,_,I,c,u,g){var C;if(o[r][e]&T)return c?(g.x=(r<<a)+(u?n:0),g.y=(e<<a)+_,g.flags|=t):(g.x=(r<<a)+_,g.y=(e<<a)+(u?n:0),g.flags&=~t),g.tileX=r,g.tileY=e,g.frac=_/n,!0;if(l&&(l[r][e]=!0),o[r][e]&W&&f[r][e].action!=Wolf.dr_open){if(C=f[r][e],_+=I>>1,E(_))return!1;if(c){if(C.action!=Wolf.dr_closed&&_>>10>L-Wolf.Doors.opened(C))return!1;g.x=i(r),g.y=(e<<a)+_,g.flags|=t,g.frac=_/n}else{if(C.action!=Wolf.dr_closed&&_>>10<Wolf.Doors.opened(C))return!1;g.y=i(e),g.x=(r<<a)+_,g.flags&=~t,g.frac=1-_/n}return g.flags|=R,g.tileX=r,g.tileY=e,g.frac+=Wolf.Doors.opened(C)/L,!0}if(o[r][e]&s){var O=Wolf.PushWall.get(),d=O.pointsMoved/128;return _+=I*d,E(_)?!1:(c?(g.x=(r<<a)+(u?n:0)+d*n*(u?-1:1),g.y=(e<<a)+_,g.flags|=t):(g.x=(r<<a)+_,g.y=(e<<a)+(u?n:0)+d*n*(u?-1:1),g.flags&=~t),g.flags|=A,g.tileX=r,g.tileY=e,g.frac=_/n,!0)}return!1}function f(f,l,t){var T,W,i,R,s,A,L,C,O,d,x,y=f.tileMap,M=f.state.doorMap;x=u(_(t.angle)),T=r[x],W=e[x],s=E(t.x)+T,A=E(t.y)+W,i=W*I[t.angle],R=T*c[t.angle],L=((((-1==W?A+1:A)<<a)-t.y)/g[t.angle]>>0)+t.x,C=((((-1==T?s+1:s)<<a)-t.x)*g[t.angle]>>0)+t.y,O=C>>a,d=L>>a,l&&(l[E(t.x)][E(t.y)]=!0);for(var H=0;;){for(H++;!(-1==W&&A>=O||1==W&&O>=A);){if(0>s||s>=64||0>O||O>=64)return void(t.oob=!0);if(o(y,M,l,s,O,C%n,R,!0,-1==T,t))return void(0>i&&(t.frac=1-t.frac));s+=T,C+=R,O=C>>a}for(;!(-1==T&&s>=d||1==T&&d>=s);){if(0>A||A>=64||0>d||d>=64)return void(t.oob=!0);if(o(y,M,l,d,A,L%n,i,!1,-1==W,t))return void(R>0&&(t.frac=1-t.frac));A+=W,L+=i,d=L>>a}if(H>1e3)return}}function l(o,l){var r,e,a,t,n=(l.tileMap,[]),T=Wolf.XRES/Wolf.SLICE_WIDTH,W=[];for(e=0;64>e;e++)for(n[e]=[],a=0;64>a;a++)n[e][a]=0;for(r=0;T>r;++r)t={x:o.x,y:o.y,angle:Wolf.Math.normalizeAngle(o.angle-Wolf.Math.ColumnAngle[r*Wolf.SLICE_WIDTH]),flags:Wolf.TRACE_SIGHT|Wolf.TRACE_MARK_MAP,oob:!1},f(l,n,t),W[r]=t,t.oob&&r>0&&!W[r-1].oob&&(W[r]=W[r-1]);return{visibleTiles:n,tracers:W}}var r=[1,-1,-1,1],e=[1,1,-1,-1],a=Wolf.TILESHIFT,t=Wolf.TRACE_HIT_VERT,n=Wolf.TILEGLOBAL,T=Wolf.WALL_TILE,W=Wolf.DOOR_TILE,i=Wolf.TILE2POS,E=Wolf.POS2TILE,_=Wolf.FINE2RAD,R=Wolf.TRACE_HIT_DOOR,s=Wolf.PUSHWALL_TILE,A=Wolf.TRACE_HIT_PWALL,L=Wolf.DOOR_FULLOPEN,I=Wolf.Math.XnextTable,c=Wolf.Math.YnextTable,u=Wolf.Math.getQuadrant,g=Wolf.Math.TanTable;return{traceRays:l,trace:f}}();