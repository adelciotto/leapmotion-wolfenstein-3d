Wolf.AI=function(){function o(o,t){var e,l,a=t.level,f=t.player;if(!(o.flags&Wolf.FL_AMBUSH||a.state.areabyplayer[o.areanumber]))return!1;if(e=f.position.x-o.x,l=f.position.y-o.y,Math.abs(e)<Wolf.MINSIGHT&&Math.abs(l)<Wolf.MINSIGHT)return!0;switch(o.dir){case Wolf.Math.dir8_north:if(0>l)return!1;break;case Wolf.Math.dir8_east:if(0>e)return!1;break;case Wolf.Math.dir8_south:if(l>0)return!1;break;case Wolf.Math.dir8_west:if(e>0)return!1}return Wolf.Level.checkLine(o.x,o.y,f.position.x,f.position.y,a)}function t(o,t,e){var l,a,f,r,i,n=!1;if(l=Wolf.POS2TILE(o.x),a=Wolf.POS2TILE(o.y),f=l+Wolf.Math.dx8dir[t],r=a+Wolf.Math.dy8dir[t],1&t){if(e.tileMap[f][a]&Wolf.SOLID_TILE||e.tileMap[l][r]&Wolf.SOLID_TILE||e.tileMap[f][r]&Wolf.SOLID_TILE)return!1;for(i=0;i<e.state.numGuards;++i)if(!(e.state.guards[i].state>=Wolf.st_die1)){if(e.state.guards[i].tile.x==f&&e.state.guards[i].tile.y==r)return!1;if(e.state.guards[i].tile.x==l&&e.state.guards[i].tile.y==r)return!1;if(e.state.guards[i].tile.x==f&&e.state.guards[i].tile.y==a)return!1}}else{if(e.tileMap[f][r]&Wolf.SOLID_TILE)return!1;if(e.tileMap[f][r]&Wolf.DOOR_TILE)if(o.type==Wolf.en_fake||o.type==Wolf.en_dog){if(e.state.doorMap[f][r].action!=Wolf.dr_open)return!1}else o.waitfordoorx=f,o.waitfordoory=r,n=!0;if(!n)for(i=0;i<e.state.numGuards;++i)if(!(e.state.guards[i].state>=Wolf.st_die1)&&e.state.guards[i].tile.x==f&&e.state.guards[i].tile.y==r)return!1}return o.tile.x=f,o.tile.y=r,e.tileMap[l][a]&=~Wolf.ACTOR_TILE,e.tileMap[f][r]|=Wolf.ACTOR_TILE,e.areas[f][r]>0&&(o.areanumber=e.areas[f][r]),o.distance=Wolf.TILEGLOBAL,o.dir=t,!0}function e(o,e){var l=e.level;if(l.tileMap[o.x>>Wolf.TILESHIFT][o.y>>Wolf.TILESHIFT]&Wolf.WAYPOINT_TILE){var a=l.tileMap[o.x>>Wolf.TILESHIFT][o.y>>Wolf.TILESHIFT];a&Wolf.TILE_IS_E_TURN?o.dir=Wolf.Math.dir8_east:a&Wolf.TILE_IS_NE_TURN?o.dir=Wolf.Math.dir8_northeast:a&Wolf.TILE_IS_N_TURN?o.dir=Wolf.Math.dir8_north:a&Wolf.TILE_IS_NW_TURN?o.dir=Wolf.Math.dir8_northwest:a&Wolf.TILE_IS_W_TURN?o.dir=Wolf.Math.dir8_west:a&Wolf.TILE_IS_SW_TURN?o.dir=Wolf.Math.dir8_southwest:a&Wolf.TILE_IS_S_TURN?o.dir=Wolf.Math.dir8_south:a&Wolf.TILE_IS_SE_TURN&&(o.dir=Wolf.Math.dir8_southeast)}t(o,o.dir,l)||(o.dir=Wolf.Math.dir8_nodir)}function l(t,e,l){var a=e.level,f=e.player;if(!t.temp2){if(f.flags&Wolf.FL_NOTARGET)return!1;if(!(t.flags&Wolf.FL_AMBUSH||a.state.areabyplayer[t.areanumber]))return!1;if(!o(t,e)&&(t.flags&Wolf.FL_AMBUSH||!f.madenoise))return!1;switch(t.flags&=~Wolf.FL_AMBUSH,t.type){case Wolf.en_guard:t.temp2=1+Wolf.Random.rnd()/4;break;case Wolf.en_officer:t.temp2=2;break;case Wolf.en_mutant:t.temp2=1+Wolf.Random.rnd()/6;break;case Wolf.en_ss:t.temp2=1+Wolf.Random.rnd()/6;break;case Wolf.en_dog:t.temp2=1+Wolf.Random.rnd()/8;break;case Wolf.en_boss:case Wolf.en_schabbs:case Wolf.en_fake:case Wolf.en_mecha:case Wolf.en_hitler:case Wolf.en_gretel:case Wolf.en_gift:case Wolf.en_fat:case Wolf.en_spectre:case Wolf.en_angel:case Wolf.en_trans:case Wolf.en_uber:case Wolf.en_will:case Wolf.en_death:t.temp2=1}return!1}return t.temp2-=l,t.temp2>0?!1:(t.temp2=0,Wolf.ActorAI.firstSighting(t,e),!0)}function a(o,e){var l,a,f,r,i,n=e.level,W=e.player,s=[];if(e.player.playstate!=Wolf.ex_victory&&(r=o.dir,i=Wolf.Math.opposite8[r],s[0]=s[1]=Wolf.Math.dir8_nodir,l=Wolf.POS2TILE(W.position.x)-Wolf.POS2TILE(o.x),a=Wolf.POS2TILE(W.position.y)-Wolf.POS2TILE(o.y),l>0?s[0]=Wolf.Math.dir8_east:0>l&&(s[0]=Wolf.Math.dir8_west),a>0?s[1]=Wolf.Math.dir8_north:0>a&&(s[1]=Wolf.Math.dir8_south),Math.abs(a)>Math.abs(l)&&(f=s[0],s[0]=s[1],s[1]=f),s[0]==i&&(s[0]=Wolf.Math.dir8_nodir),s[1]==i&&(s[1]=Wolf.Math.dir8_nodir),!(s[0]!=Wolf.Math.dir8_nodir&&t(o,s[0],n)||s[1]!=Wolf.Math.dir8_nodir&&t(o,s[1],n)||r!=Wolf.Math.dir8_nodir&&t(o,r,n)))){if(Wolf.Random.rnd()>128){for(f=Wolf.Math.dir8_east;f<=Wolf.Math.dir8_south;f+=2)if(f!=i&&t(o,f,n))return}else for(f=Wolf.Math.dir8_south;f>=Wolf.Math.dir8_east;f-=2)if(f!=i&&t(o,f,n))return;i!=Wolf.Math.dir8_nodir&&t(o,i,n)||(o.dir=Wolf.Math.dir8_nodir)}}function f(o,e){var l,a,f,r=e.level,i=e.player,n=[];if(l=Wolf.POS2TILE(i.position.x)-Wolf.POS2TILE(o.x),a=Wolf.POS2TILE(i.position.y)-Wolf.POS2TILE(o.y),n[0]=0>l?Wolf.Math.dir8_east:Wolf.Math.dir8_west,n[1]=0>a?Wolf.Math.dir8_north:Wolf.Math.dir8_south,Math.abs(a)>Math.abs(l)&&(f=n[0],n[0]=n[1],n[1]=f),!t(o,n[0],r)&&!t(o,n[1],r)){if(Wolf.Random.rnd()>128){for(f=Wolf.Math.dir8_east;f<=Wolf.Math.dir8_south;f+=2)if(t(o,f,r))return}else for(f=Wolf.Math.dir8_south;f>=Wolf.Math.dir8_east;f-=2)if(t(o,f,r))return;o.dir=Wolf.Math.dir8_nodir}}function r(o,e){var l,a,f,r,i,n=e.level,W=e.player,s=[];if(e.player.playstate!=Wolf.ex_victory){for(o.flags&Wolf.FL_FIRSTATTACK?(r=Wolf.Math.dir8_nodir,o.flags&=~Wolf.FL_FIRSTATTACK):r=Wolf.Math.opposite8[o.dir],l=Wolf.POS2TILE(W.position.x)-Wolf.POS2TILE(o.x),a=Wolf.POS2TILE(W.position.y)-Wolf.POS2TILE(o.y),l>0?(s[1]=Wolf.Math.dir8_east,s[3]=Wolf.Math.dir8_west):(s[1]=Wolf.Math.dir8_west,s[3]=Wolf.Math.dir8_east),a>0?(s[2]=Wolf.Math.dir8_north,s[4]=Wolf.Math.dir8_south):(s[2]=Wolf.Math.dir8_south,s[4]=Wolf.Math.dir8_north),Math.abs(l)>Math.abs(a)&&(i=s[1],s[1]=s[2],s[2]=i,i=s[3],s[3]=s[4],s[4]=i),Wolf.Random.rnd()<128&&(i=s[1],s[1]=s[2],s[2]=i,i=s[3],s[3]=s[4],s[4]=i),s[0]=Wolf.Math.diagonal[s[1]][s[2]],f=0;5>f;++f)if(s[f]!=Wolf.Math.dir8_nodir&&s[f]!=r&&t(o,s[f],n))return;r!=Wolf.Math.dir8_nodir&&t(o,r,n)||(o.dir=Wolf.Math.dir8_nodir)}}function i(o,t,e){l(o,t,e)}function n(o,t,a){t.level;l(o,t,a)||o.speed&&(o.dir!=Wolf.Math.dir8_nodir||(e(o,t),o.dir!=Wolf.Math.dir8_nodir))&&M(o,t,e,a)}function W(o,t,e){var l,a,f,r,i,n=t.level,W=t.player;if(n.state.areabyplayer[o.areanumber]&&Wolf.Level.checkLine(o.x,o.y,W.position.x,W.position.y,n)){l=Math.abs(Wolf.POS2TILE(o.x)-Wolf.POS2TILE(W.position.x)),a=Math.abs(Wolf.POS2TILE(o.y)-Wolf.POS2TILE(W.position.y)),f=Math.max(l,a),(o.type==Wolf.en_ss||o.type==Wolf.en_boss)&&(f=2*f/3),r=W.speed>=Wolf.RUNSPEED?160:256;var s=Wolf.Math.transformPoint(o.x,o.y,W.position.x,W.position.y);switch(r-=Wolf.Angle.diff(s,Wolf.FINE2DEG(W.angle))<Math.PI/3?16*f:8*f,Wolf.Random.rnd()<r&&(i=2>f?Wolf.Random.rnd()>>2:4>f?Wolf.Random.rnd()>>3:Wolf.Random.rnd()>>4,Wolf.Player.damage(W,o,i)),o.type){case Wolf.en_ss:Wolf.Sound.startSound(W.position,o,1,Wolf.CHAN_WEAPON,"sfx/024.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.en_gift:case Wolf.en_fat:case Wolf.en_mecha:case Wolf.en_hitler:case Wolf.en_boss:Wolf.Sound.startSound(W.position,o,1,Wolf.CHAN_WEAPON,"sfx/022.wav",1,Wolf.ATTN_NORM,0);break;default:Wolf.Sound.startSound(W.position,o,1,Wolf.CHAN_WEAPON,"sfx/049.wav",1,Wolf.ATTN_NORM,0)}}}function s(o,t,e){var l,f,i,n,W=t.level,s=t.player,d=!1;if(Wolf.Level.checkLine(o.x,o.y,s.position.x,s.position.y,W)){if(l=Math.abs(Wolf.POS2TILE(o.x)-Wolf.POS2TILE(s.position.x)),f=Math.abs(Wolf.POS2TILE(o.y)-Wolf.POS2TILE(s.position.y)),i=Math.max(l,f),n=!i||1==i&&o.distance<16?300:(e<<4)/i,Wolf.Random.rnd()<n)return void Wolf.Actors.stateChange(o,Wolf.st_shoot1);d=!0}if(o.dir==Wolf.Math.dir8_nodir){if(d?r(o,t):a(o,t),o.dir==Wolf.Math.dir8_nodir)return;o.angle=Wolf.Math.dir8angle[o.dir]}M(o,t,d?r:a,e)}function d(o,t,e){var l,a,f=(t.level,t.player);if(o.dir!=Wolf.Math.dir8_nodir||(r(o,t),o.angle=Wolf.Math.dir8angle[o.dir],o.dir!=Wolf.Math.dir8_nodir))return l=Math.abs(f.position.x-o.x)-Wolf.TILEGLOBAL/2,l<=Wolf.MINACTORDIST&&(a=Math.abs(f.position.y-o.y)-Wolf.TILEGLOBAL/2,a<=Wolf.MINACTORDIST)?void Wolf.Actors.stateChange(o,Wolf.st_shoot1):void M(o,t,r,e)}function _(o,t,e){var l,i,n,W,s=t.level,d=t.player,_=!1;if(l=Math.abs(o.tile.x-Wolf.POS2TILE(d.position.x)),i=Math.abs(o.tile.y-Wolf.POS2TILE(d.position.y)),n=Math.max(l,i),Wolf.Level.checkLine(o.x,o.y,d.position.x,d.position.y,s)){if(Wolf.Random.rnd()<e<<3)return void Wolf.Actors.stateChange(o,Wolf.st_shoot1);_=!0}(o.dir!=Wolf.Math.dir8_nodir||(_?r(o,t):a(o,t),o.dir!=Wolf.Math.dir8_nodir))&&(W=4>n?f:_?r:a,M(o,t,W,e))}function h(o,t,e){var l=t.level,a=t.player;return Wolf.Level.checkLine(o.x,o.y,a.position.x,a.position.y,l)&&Wolf.Random.rnd()<e<<1?void Wolf.Actors.stateChange(o,Wolf.st_shoot1):void((o.dir!=Wolf.Math.dir8_nodir||(r(o,t),o.dir!=Wolf.Math.dir8_nodir))&&M(o,t,r,e))}function M(o,t,e,l){var a,f,r=t.level;if(!e)return void Wolf.log("Warning: Advance without <think> proc\n");for(a=o.speed*l;a>0;){if(o.waitfordoorx){if(f=r.state.doorMap[o.waitfordoorx][o.waitfordoory],Wolf.Doors.open(f),f.action!=Wolf.dr_open)return;o.waitfordoorx=o.waitfordoory=0}if(a<o.distance){T(o,t,a);break}if(o.x=Wolf.TILE2POS(o.tile.x),o.y=Wolf.TILE2POS(o.tile.y),a-=o.distance,e(o,t,l),o.angle=Wolf.Math.dir8angle[o.dir],o.dir==Wolf.Math.dir8_nodir)return}}function T(o,t,e){var l=(t.level,t.player);if(o.dir!=Wolf.Math.dir8_nodir&&e){if(o.x+=e*Wolf.Math.dx8dir[o.dir],o.y+=e*Wolf.Math.dy8dir[o.dir],Math.abs(o.x-l.position.x)<=Wolf.MINACTORDIST&&Math.abs(o.y-l.position.y)<=Wolf.MINACTORDIST){var a=o.type;return(a==Wolf.en_blinky||a==Wolf.en_clyde||a==Wolf.en_pinky||a==Wolf.en_inky||a==Wolf.en_spectre)&&Wolf.Player.damage(l,o,2),o.x-=e*Wolf.Math.dx8dir[o.dir],void(o.y-=e*Wolf.Math.dy8dir[o.dir])}o.distance-=e,o.distance<0&&(o.distance=0)}}function p(o,t,e){t.level,t.player;if(o.dir==Wolf.Math.dir8_nodir){if(a(o,t),o.dir==Wolf.Math.dir8_nodir)return;o.angle=Wolf.Math.dir8angle[o.dir]}M(o,t,a,e)}function u(o,t,e){var l,a,f=(t.level,t.player);return Wolf.Sound.startSound(f.position,o,1,Wolf.CHAN_VOICE,"sfx/002.wav",1,Wolf.ATTN_NORM,0),l=Math.abs(f.position.x-o.x)-Wolf.TILEGLOBAL,l<=Wolf.MINACTORDIST&&(a=Math.abs(f.position.y-o.y)-Wolf.TILEGLOBAL,a<=Wolf.MINACTORDIST&&Wolf.Random.rnd()<180)?void Wolf.Player.damage(f,o,Wolf.Random.rnd()>>4):void 0}function L(o,t,e){var l,a,f,r=(t.level,t.player);W(o,t,e),l=Math.abs(o.tile.x-Wolf.POS2TILE(r.position.x)),a=Math.abs(o.tile.y-Wolf.POS2TILE(r.position.y)),f=Math.max(l,a),1>=f&&Wolf.Player.damage(r,o,10)}function c(o,t,e){var l,a,f=t.level,r=t.player;if(a=Wolf.Math.transformPoint(o.x,o.y,r.position.x,r.position.y)+Math.PI,a>2*Math.PI&&(a-=2*Math.PI),o.type==Wolf.en_death&&(W(o,t,e),a=o.state==Wolf.st_shoot2?Wolf.Math.normalizeAngle(a-Wolf.DEG2RAD(4)):Wolf.Math.normalizeAngle(a+Wolf.DEG2RAD(4))),l=Wolf.Actors.getNewActor(f),null!=l)switch(l.x=o.x,l.y=o.y,l.tile.x=o.tile.x,l.tile.y=o.tile.y,l.state=Wolf.st_stand,l.ticcount=1,l.dir=Wolf.Math.dir8_nodir,l.angle=Wolf.RAD2FINE(a)>>0,l.speed=8192,l.flags=Wolf.FL_NONMARK,l.sprite=Wolf.Sprites.getNewSprite(f),o.type){case Wolf.en_death:l.type=Wolf.en_hrocket,Wolf.Sound.startSound(r.position,o,1,Wolf.CHAN_WEAPON,"lsfx/078.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.en_angel:l.type=Wolf.en_spark,l.state=Wolf.st_path1,Wolf.Sound.startSound(r.position,o,1,Wolf.CHAN_WEAPON,"lsfx/069.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.en_fake:l.type=Wolf.en_fire,l.state=Wolf.st_path1,l.flags=Wolf.FL_NEVERMARK,l.speed=4608,Wolf.Sound.startSound(r.position,o,1,Wolf.CHAN_WEAPON,"lsfx/069.wav",1,Wolf.ATTN_NORM,0);break;case Wolf.en_schabbs:l.type=Wolf.en_needle,l.state=Wolf.st_path1,Wolf.Sound.startSound(r.position,o,1,Wolf.CHAN_WEAPON,"lsfx/008.wav",1,Wolf.ATTN_NORM,0);break;default:l.type=Wolf.en_rocket,Wolf.Sound.startSound(r.position,o,1,Wolf.CHAN_WEAPON,"lsfx/085.wav",1,Wolf.ATTN_NORM,0)}}function I(o,t){var e,l,a,f,r,i,n=8192;for(e=o.x-n>>Wolf.TILESHIFT,l=o.y-n>>Wolf.TILESHIFT,a=o.x+n>>Wolf.TILESHIFT,f=o.y+n>>Wolf.TILESHIFT,i=l;f>=i;++i)for(r=e;a>=r;++r){if(t.tileMap[r][i]&(Wolf.WALL_TILE|Wolf.BLOCK_TILE))return!1;if(t.tileMap[r][i]&Wolf.DOOR_TILE&&Wolf.Doors.opened(t.state.doorMap[r][i])!=Wolf.DOOR_FULLOPEN)return!1}return!0}function y(o,t,e){var l,a,f,r,i=t.level,n=t.player,W=49152;if(f=o.speed*e,l=f*Wolf.Math.CosTable[o.angle]>>0,a=f*Wolf.Math.SinTable[o.angle]>>0,l>Wolf.TILEGLOBAL&&(l=Wolf.TILEGLOBAL),l<-Wolf.TILEGLOBAL&&(l=-Wolf.TILEGLOBAL),a>Wolf.TILEGLOBAL&&(a=Wolf.TILEGLOBAL),a<-Wolf.TILEGLOBAL&&(a=-Wolf.TILEGLOBAL),o.x+=l,o.y+=a,l=Math.abs(o.x-n.position.x),a=Math.abs(o.y-n.position.y),!I(o,i))return void(o.type==Wolf.en_rocket||o.type==Wolf.en_hrocket?(Wolf.Sound.startSound(n.position,o,1,Wolf.CHAN_WEAPON,"lsfx/086.wav",1,Wolf.ATTN_NORM,0),Wolf.Actors.stateChange(o,Wolf.st_die1)):Wolf.Actors.stateChange(o,Wolf.st_remove));if(W>l&&W>a){switch(o.type){case Wolf.en_needle:r=(Wolf.Random.rnd()>>3)+20;break;case Wolf.en_rocket:case Wolf.en_hrocket:case Wolf.en_spark:r=(Wolf.Random.rnd()>>3)+30;break;case Wolf.en_fire:r=Wolf.Random.rnd()>>3;break;default:r=0}return Wolf.Player.damage(n,o,r),void Wolf.Actors.stateChange(o,Wolf.st_remove)}o.tile.x=o.x>>Wolf.TILESHIFT,o.tile.y=o.y>>Wolf.TILESHIFT}function E(o,t,e){var l=Wolf.BJRUNSPEED*e;return T(o,t,l),o.distance||(o.distance=Wolf.TILEGLOBAL,--o.temp2)?void 0:(Wolf.Actors.stateChange(o,Wolf.st_shoot1),void(o.speed=Wolf.BJJUMPSPEED))}function S(o,t,e){}function O(o,t,e){Wolf.Sound.startSound(null,null,0,Wolf.CHAN_VOICE,"sfx/082.wav",1,Wolf.ATTN_NORM,0)}function A(o,t,e){Wolf.Player.playstate=Wolf.ex_victory,Wolf.Game.endEpisode(t)}return Wolf.setConsts({RUNSPEED:6e3,MINSIGHT:98304}),{T_Stand:i,T_Path:n,T_Ghosts:p,T_Bite:u,T_Shoot:W,T_UShoot:L,T_Launch:c,T_Chase:s,T_DogChase:d,T_BossChase:_,T_Fake:h,T_Projectile:y,T_BJRun:E,T_BJJump:S,T_BJYell:O,T_BJDone:A}}();