Wolf.Player=function(){function a(a,t,l,n){var i=a.x,f=a.y,r=a.angle,s=Wolf.POS2TILE(i),W=Wolf.POS2TILE(f),E=t.areas[s][W],c={episode:-1,level:-1,health:100,frags:0,ammo:[],score:0,lives:0,startScore:0,nextExtra:0,items:0,weapon:0,pendingWeapon:-1,previousWeapon:-1,position:{x:i,y:f},angle:r,tile:{x:s,y:W},mov:{x:0,y:0},speed:0,armor:0,cmd:{forwardMove:0,sideMove:0,buttons:0,impulse:0},attackFrame:0,attackCount:0,weaponFrame:0,madenoise:!1,lastAttacker:null,faceFrame:0,faceCount:0,faceGotGun:!1,faceOuch:!1,flags:0,areanumber:E,playstate:0,attackDirection:[0,0],skill:l};return c.areanumber<0&&(c.areanumber=36),Wolf.Areas.init(t,c.areanumber),Wolf.Areas.connect(t,c.areanumber),n?e(c,n):o(c),c}function e(a,e){a.health=e.health,a.ammo=e.ammo,a.score=e.score,a.startScore=e.startScore,a.lives=e.lives,a.previousWeapon=e.previousWeapon,a.weapon=e.weapon,a.pendingWeapon=e.pendingWeapon,a.items=e.items&Wolf.ITEM_WEAPON_1|e.items&Wolf.ITEM_WEAPON_2|e.items&Wolf.ITEM_WEAPON_3|e.items&Wolf.ITEM_WEAPON_4,a.nextExtra=e.nextExtra}function o(a){a.health=100,a.ammo[Wolf.AMMO_BULLETS]=8,a.score=0,a.startScore=0,a.lives=3,a.previousWeapon=Wolf.WEAPON_KNIFE,a.weapon=a.pendingWeapon=Wolf.WEAPON_PISTOL,a.items=Wolf.ITEM_WEAPON_1|Wolf.ITEM_WEAPON_2,a.nextExtra=Wolf.EXTRAPOINTS}function t(a,e){var o,t,l,n,i,f,r,s;for(o=Wolf.POS2TILE(a.position.x-Wolf.PLAYERSIZE),t=Wolf.POS2TILE(a.position.y-Wolf.PLAYERSIZE),l=Wolf.POS2TILE(a.position.x+Wolf.PLAYERSIZE),n=Wolf.POS2TILE(a.position.y+Wolf.PLAYERSIZE),f=t;n>=f;++f)for(i=o;l>=i;++i){if(e.tileMap[i][f]&Wolf.SOLID_TILE)return!1;if(e.tileMap[i][f]&Wolf.DOOR_TILE&&Wolf.Doors.opened(e.state.doorMap[i][f])!=Wolf.DOOR_FULLOPEN&&Math.abs(a.position.x-Wolf.TILE2POS(i))<=36864&&Math.abs(a.position.y-Wolf.TILE2POS(f))<=36864)return!1}for(s=0;s<e.state.numGuards;++s)if(!(e.state.guards[s].state>=Wolf.st_die1)&&e.state.guards[s].flags&Wolf.FL_SHOOTABLE&&(r=a.position.x-e.state.guards[s].x,!(r<-Wolf.MINACTORDIST||r>Wolf.MINACTORDIST||(r=a.position.y-e.state.guards[s].y,r<-Wolf.MINACTORDIST||r>Wolf.MINACTORDIST))))return!1;return!0}function l(a,e,o,l){var n,i;n=a.position.x,i=a.position.y,a.position.x+=e,a.position.y+=o,t(a,l)||e&&(a.position.x=n+e,a.position.y=i,t(a,l))||o&&(a.position.x=n,a.position.y=i+o,t(a,l))||(a.position.x=n,a.position.y=i)}function n(a,e,o,t){var n,i;if(n=e.angle,e.mov.x=e.mov.y=0,e.cmd.forwardMove&&(i=t*e.cmd.forwardMove,e.mov.x+=i*Wolf.Math.CosTable[n]>>0,e.mov.y+=i*Wolf.Math.SinTable[n]>>0),e.cmd.sideMove&&(i=t*e.cmd.sideMove,e.mov.x+=i*Wolf.Math.SinTable[n]>>0,e.mov.y-=i*Wolf.Math.CosTable[n]>>0),e.mov.x||e.mov.y){e.speed=e.mov.x+e.mov.y,e.mov.x>Wolf.MAXMOVE?e.mov.x=Wolf.MAXMOVE:e.mov.x<-Wolf.MAXMOVE&&(e.mov.x=-Wolf.MAXMOVE),e.mov.y>Wolf.MAXMOVE?e.mov.y=Wolf.MAXMOVE:e.mov.y<-Wolf.MAXMOVE&&(e.mov.y=-Wolf.MAXMOVE),l(e,e.mov.x,e.mov.y,o),e.tile.x=Wolf.POS2TILE(e.position.x),e.tile.y=Wolf.POS2TILE(e.position.y);var f,r;for(f=-1;1>=f;f+=2)for(tilex=Wolf.POS2TILE(e.position.x+f*Wolf.PLAYERSIZE),r=-1;1>=r;r+=2)tiley=Wolf.POS2TILE(e.position.y+r*Wolf.PLAYERSIZE),Wolf.Powerups.pickUp(o,e,tilex,tiley);o.areas[e.tile.x][e.tile.y]>=0&&o.areas[e.tile.x][e.tile.y]!=e.areanumber&&(e.areanumber=o.areas[e.tile.x][e.tile.y],Wolf.Areas.connect(o,e.areanumber)),o.tileMap[e.tile.x][e.tile.y]&Wolf.EXIT_TILE&&Wolf.Game.victory(a)}}function i(a,e){var o,t,l,n,i=e.level;if(l=Wolf.Math.get4dir(Wolf.FINE2RAD(a.angle)),o=a.tile.x+Wolf.Math.dx4dir[l],t=a.tile.y+Wolf.Math.dy4dir[l],i.tileMap[o][t]&Wolf.DOOR_TILE)return Wolf.Doors.tryUse(i,a,i.state.doorMap[o][t]);if(i.tileMap[o][t]&Wolf.SECRET_TILE)return Wolf.PushWall.push(i,o,t,l);if(i.tileMap[o][t]&Wolf.ELEVATOR_TILE){switch(l){case Wolf.Math.dir4_east:case Wolf.Math.dir4_west:n=i.wallTexX[o][t]+=2;break;case Wolf.Math.dir4_north:case Wolf.Math.dir4_south:return!1}return i.tileMap[a.tile.x][a.tile.y]&Wolf.SECRETLEVEL_TILE?a.playstate=Wolf.ex_secretlevel:a.playstate=Wolf.ex_complete,Wolf.Sound.startSound(null,null,0,Wolf.CHAN_BODY,"lsfx/040.wav",1,Wolf.ATTN_NORM,0),Wolf.Game.startIntermission(e),!0}return!1}function f(a,e,o,t){var l;a.level;for(e.attackCount-=t;e.attackCount<=0;){switch(l=M[e.weapon][e.attackFrame],l.attack){case-1:return e.flags&=~Wolf.PL_FLAG_ATTCK,e.ammo[Wolf.AMMO_BULLETS]?e.weapon!=e.pendingWeapon&&(e.weapon=e.pendingWeapon):e.weapon=Wolf.WEAPON_KNIFE,void(e.attackFrame=e.weaponFrame=0);case 4:if(!e.ammo[Wolf.AMMO_BULLETS])break;o&&(e.attackFrame-=2);case 1:if(!e.ammo[Wolf.AMMO_BULLETS]){e.attackFrame++;break}Wolf.Weapon.fireLead(a,e),e.ammo[Wolf.AMMO_BULLETS]--;break;case 2:Wolf.Weapon.fireHit(a,e);break;case 3:e.ammo[Wolf.AMMO_BULLETS]&&o&&(e.attackFrame-=2)}e.attackCount+=l.tics,e.attackFrame++,e.weaponFrame=M[e.weapon][e.attackFrame].frame}}function r(a,e){for(a.score+=e;a.score>=a.nextExtra;)a.nextExtra+=Wolf.EXTRAPOINTS,W(a),Wolf.log("Extra life!")}function s(a,e,o){return 0==o&&(o=a.items&Wolf.ITEM_AUGMENT?150:100),a.health>=o?!1:(a.health+=e,a.health>o&&(a.health=o),a.faceGotGun=!1,!0)}function W(a){a.lives<9&&a.lives++}function E(a,e){a.items|=Wolf.ITEM_KEY_1<<e}function c(a,e){var o;m(a,Wolf.AMMO_BULLETS,6),o=Wolf.ITEM_WEAPON_1<<e,a.items&o||(a.items|=o,a.weapon<e&&(a.weapon=a.pendingWeapon=e))}function m(a,e,o){var t=99;return a.items&Wolf.ITEM_BACKPACK&&(t*=2),a.ammo[e]>=t?!1:(a.ammo[e]||a.attackFrame||(a.weapon=a.pendingWeapon),a.ammo[e]+=o,a.ammo[e]>t&&(a.ammo[e]=t),!0)}function _(a,e,o,t){var l,n,i,f,r;a.playstate!=Wolf.ex_dead&&a.playstate!=Wolf.ex_complete&&self.playstate!=Wolf.ex_victory&&(a.lastAttacker=e,t==Wolf.gd_baby&&(o>>=2),l=e.x-a.position.x,n=e.y-a.position.y,(0!=l||0!=n)&&(i=Math.atan2(n,l),f=360*a.angle/Wolf.ANG_360,i=180*i/Math.PI,0>i&&(i=360+i),r=i-f,r>180&&(r-=360),-180>r&&(r=360+r),r>40?a.attackDirection[0]=1:-40>r&&(a.attackDirection[1]=1)),a.flags&Wolf.FL_GODMODE||(a.health-=o),a.health<=0&&(Wolf.Game.notify("You have died"),a.health=0,a.playstate=Wolf.ex_dead,Wolf.Sound.startSound(null,null,0,Wolf.CHAN_BODY,"lsfx/009.wav",1,Wolf.ATTN_NORM,0)),Wolf.Game.startDamageFlash(o),a.faceGotGun=!1,o>30&&0!=a.health&&(a.faceOuch=!0,a.faceCount=0))}function p(a,e,o){var t;e.angle>Wolf.ANG_270?(e.angle-=o*Wolf.ANG_1*3,e.angle<Wolf.ANG_270&&(e.angle=Wolf.ANG_270)):e.angle<Wolf.ANG_270&&(e.angle+=o*Wolf.ANG_1*3,e.angle>Wolf.ANG_270&&(e.angle=Wolf.ANG_270)),t=Wolf.TILE2POS(e.tile.y+7),e.position.y<t&&(e.position.y+=3072*o,e.position.y>t&&(e.position.y=t))}function T(a,e,o){var t,l=a.level;if(e.playstate==Wolf.ex_victory)return void p(a,e,o);switch(e.attackDirection=[0,0],e.madenoise=!1,n(a,e,l,o),e.flags&Wolf.PL_FLAG_ATTCK?f(a,e,e.cmd.buttons&Wolf.BUTTON_ATTACK,o):(e.cmd.buttons&Wolf.BUTTON_USE?e.flags&Wolf.PL_FLAG_REUSE||!i(e,a)||(e.flags|=Wolf.PL_FLAG_REUSE):e.flags&=~Wolf.PL_FLAG_REUSE,e.cmd.buttons&Wolf.BUTTON_ATTACK&&(e.flags|=Wolf.PL_FLAG_ATTCK,e.attackFrame=0,e.attackCount=M[e.weapon][0].tics,e.weaponFrame=M[e.weapon][0].frame)),e.cmd.impulse){case 0:break;case 1:case 2:case 3:case 4:changeWeapon(e,e.cmd.impulse-1);break;case 10:for(e.pendingWeapon=e.weapon,t=0;4>t&&(++e.weapon>Wolf.WEAPON_CHAIN&&(e.weapon=Wolf.WEAPON_KNIFE),!changeWeapon(e,e.weapon));++t);e.weapon=e.pendingWeapon;break;default:Wolf.log("Unknown Impulse: ",+e.cmd.impulse)}}Wolf.setConsts({PLAYERSIZE:Wolf.MINDIST,STOPSPEED:3328,FRICTION:.25,MAXMOVE:2*Wolf.MINDIST-1,EXTRAPOINTS:4e4,ITEM_KEY_1:1,ITEM_KEY_2:2,ITEM_KEY_3:4,ITEM_KEY_4:8,ITEM_WEAPON_1:16,ITEM_WEAPON_2:32,ITEM_WEAPON_3:64,ITEM_WEAPON_4:128,ITEM_WEAPON_5:256,ITEM_WEAPON_6:512,ITEM_WEAPON_7:1024,ITEM_WEAPON_8:2048,ITEM_BACKPACK:4096,ITEM_AUGMENT:8192,ITEM_UNIFORM:16384,ITEM_AUTOMAP:32768,ITEM_FREE:65536,PL_FLAG_REUSE:1,PL_FLAG_ATTCK:2,FL_GODMODE:16,FL_NOTARGET:64,WEAPON_KNIFE:0,WEAPON_PISTOL:1,WEAPON_AUTO:2,WEAPON_CHAIN:3,WEAPON_TYPES:4,KEY_GOLD:0,KEY_SILVER:1,KEY_FREE1:2,KEY_FREE2:3,KEY_TYPES:4,AMMO_BULLETS:0,AMMO_TYPES:1,ex_notingame:0,ex_playing:1,ex_dead:2,ex_secretlevel:3,ex_victory:4,ex_complete:5,BJRUNSPEED:2048,BJJUMPSPEED:680});var M=[[{tics:6,attack:0,frame:1},{tics:6,attack:2,frame:2},{tics:6,attack:0,frame:3},{tics:6,attack:-1,frame:0},{},{},{},{},{},{},{},{},{},{}],[{tics:6,attack:0,frame:1},{tics:6,attack:1,frame:2},{tics:6,attack:0,frame:3},{tics:6,attack:-1,frame:0},{},{},{},{},{},{},{},{},{},{}],[{tics:6,attack:0,frame:1},{tics:6,attack:1,frame:2},{tics:6,attack:3,frame:3},{tics:6,attack:-1,frame:0},{},{},{},{},{},{},{},{},{},{}],[{tics:6,attack:0,frame:1},{tics:6,attack:1,frame:2},{tics:6,attack:4,frame:3},{tics:6,attack:-1,frame:0},{},{},{},{},{},{},{},{},{},{}]];return{spawn:a,newGame:o,controlMovement:n,process:T,damage:_,givePoints:r,giveHealth:s,giveAmmo:m,giveWeapon:c,giveLife:W,giveKey:E}}();