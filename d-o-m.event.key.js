/*! <https://github.com/tovic/key> */
!function(e){function t(e){return e.toLowerCase()}function a(e){function a(n,r){if("string"==typeof r&&(r=e[r+"Key"]),!n||n===!0)return"boolean"==typeof r?r:f;if(n instanceof RegExp)return r&&n.test(f);if("object"==typeof n){if(r)for(u=0,i=n.length;i>u;++u)if(c=t(n[u]),(o[c]||c)===f)return!0;return!1}return n=t(n),r&&(o[n]||n)===f}var r=n.keys,o=n.keys_a,f=e.key?t(e.key):r[e.which||e.keyCode];return"object"==typeof f&&(f=e.shiftKey?f[1]||f[0]:f[0]),f=t(f),{key:function(e){return a(e,1)},control:function(e){return a(e,"ctrl")},shift:function(e){return a(e,"shift")},option:function(e){return a(e,"alt")},meta:function(e){return a(e,"meta")}}}var u,i,c,n=function(){},r={3:"cancel",6:"help",8:"backspace",9:"tab",12:"clear",13:"enter",16:"shift",17:"control",18:"alt",19:"pause",20:"capslock",27:"escape",28:"convert",29:"nonconvert",30:"accept",31:"modechange",33:"pageup",34:"pagedown",35:"end",36:"home",37:"arrowleft",38:"arrowup",39:"arrowright",40:"arrowdown",41:"select",42:"print",43:"execute",44:"printscreen",45:"insert",46:"delete",91:"meta",93:"contextmenu",144:"numlock",145:"scrolllock",181:"volumemute",182:"volumedown",183:"volumeup",224:"meta",225:"altgraph",246:"attn",247:"crsel",248:"exsel",249:"eraseeof",250:"play",251:"zoomout",48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],32:" ",59:[";",":"],61:["=","+"],173:["-","_"],188:[",","<"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']},o={alternate:r[18],option:r[18],ctrl:r[17],cmd:r[17],command:r[17],os:r[224],context:r[93],menu:r[93],"context-menu":r[93],"return":r[13],ins:r[45],del:r[46],esc:r[27],left:r[37],right:r[39],up:r[38],down:r[40],"arrow-left":r[37],"arrow-right":r[39],"arrow-up":r[38],"arrow-down":r[40],back:r[8],"back-space":r[8],space:r[32],plus:r[61][1],minus:r[173][0],"caps-lock":r[20],"non-convert":r[29],"mode-change":r[31],"page-up":r[33],"page-down":r[34],"print-screen":r[44],"num-lock":r[144],"numeric-lock":r[144],"scroll-lock":r[145],"volume-mute":r[181],"volume-down":r[182],"volume-up":r[183],altgr:r[225],"alt-gr":r[225],"alt-graph":r[225],"alternate-graph":r[225]};for(u=1;25>u;++u)r[111+u]="f"+u;for(u=65;91>u;++u)r[u]=t(String.fromCharCode(u));n.id="K",n.keys=r,n.keys_a=o,n.set=function(e,t){return e?a(e):(Object.defineProperty(KeyboardEvent.prototype,t||n.id,{configurable:!0,get:function(){return a(this)}}),!0)},n.reset=function(){},n.version="1.0.0",e.K=n}(window);

(function(win, $) {
    var K = win.K;
    $.event(function(e) {
        var ee = K.set(e);
        e.DOM = e.$ = ee;
        return e;
    });
    delete win.K;
})(window, DOM);