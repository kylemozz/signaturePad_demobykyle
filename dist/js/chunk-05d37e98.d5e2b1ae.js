(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05d37e98"],{"0ce0":function(t,e,n){},"0d3b":function(t,e,n){var r=n("d039"),a=n("b622"),i=n("c430"),s=a("iterator");t.exports=!r((function(){var t=new URL("b?a=1&b=2&c=3","http://a"),e=t.searchParams,n="";return t.pathname="c%20d",e.forEach((function(t,r){e["delete"]("b"),n+=r+t})),i&&!t.toJSON||!e.sort||"http://a/c%20d?a=1&c=3"!==t.href||"3"!==e.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!e[s]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host}))},"1dde":function(t,e,n){var r=n("d039"),a=n("b622"),i=n("2d00"),s=a("species");t.exports=function(t){return i>=51||!r((function(){var e=[],n=e.constructor={};return n[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"2b3d":function(t,e,n){"use strict";n("3ca3");var r,a=n("23e7"),i=n("83ab"),s=n("0d3b"),o=n("da84"),c=n("37e8"),u=n("6eeb"),h=n("19aa"),l=n("5135"),f=n("60da"),p=n("4df4"),d=n("6547").codeAt,g=n("5fb2"),v=n("d44e"),m=n("9861"),b=n("69f3"),w=o.URL,y=m.URLSearchParams,C=m.getState,k=b.set,x=b.getterFor("URL"),I=Math.floor,L=Math.pow,A="Invalid authority",R="Invalid scheme",S="Invalid host",T="Invalid port",U=/[A-Za-z]/,E=/[\d+-.A-Za-z]/,B=/\d/,q=/^0x/i,N=/^[0-7]+$/,_=/^\d+$/,P=/^[\dA-Fa-f]+$/,j=/[\0\t\n\r #%/:<>?@[\\\]^|]/,W=/[\0\t\n\r #/:<>?@[\\\]^|]/,O=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,F=/[\t\n\r]/g,M=function(t,e){var n,r,a;if("["==e.charAt(0)){if("]"!=e.charAt(e.length-1))return S;if(n=Y(e.slice(1,-1)),!n)return S;t.host=n}else if(K(t)){if(e=g(e),j.test(e))return S;if(n=X(e),null===n)return S;t.host=n}else{if(W.test(e))return S;for(n="",r=p(e),a=0;a<r.length;a++)n+=G(r[a],D);t.host=n}},X=function(t){var e,n,r,a,i,s,o,c=t.split(".");if(c.length&&""==c[c.length-1]&&c.pop(),e=c.length,e>4)return t;for(n=[],r=0;r<e;r++){if(a=c[r],""==a)return t;if(i=10,a.length>1&&"0"==a.charAt(0)&&(i=q.test(a)?16:8,a=a.slice(8==i?1:2)),""===a)s=0;else{if(!(10==i?_:8==i?N:P).test(a))return t;s=parseInt(a,i)}n.push(s)}for(r=0;r<e;r++)if(s=n[r],r==e-1){if(s>=L(256,5-e))return null}else if(s>255)return null;for(o=n.pop(),r=0;r<n.length;r++)o+=n[r]*L(256,3-r);return o},Y=function(t){var e,n,r,a,i,s,o,c=[0,0,0,0,0,0,0,0],u=0,h=null,l=0,f=function(){return t.charAt(l)};if(":"==f()){if(":"!=t.charAt(1))return;l+=2,u++,h=u}while(f()){if(8==u)return;if(":"!=f()){e=n=0;while(n<4&&P.test(f()))e=16*e+parseInt(f(),16),l++,n++;if("."==f()){if(0==n)return;if(l-=n,u>6)return;r=0;while(f()){if(a=null,r>0){if(!("."==f()&&r<4))return;l++}if(!B.test(f()))return;while(B.test(f())){if(i=parseInt(f(),10),null===a)a=i;else{if(0==a)return;a=10*a+i}if(a>255)return;l++}c[u]=256*c[u]+a,r++,2!=r&&4!=r||u++}if(4!=r)return;break}if(":"==f()){if(l++,!f())return}else if(f())return;c[u++]=e}else{if(null!==h)return;l++,u++,h=u}}if(null!==h){s=u-h,u=7;while(0!=u&&s>0)o=c[u],c[u--]=c[h+s-1],c[h+--s]=o}else if(8!=u)return;return c},H=function(t){for(var e=null,n=1,r=null,a=0,i=0;i<8;i++)0!==t[i]?(a>n&&(e=r,n=a),r=null,a=0):(null===r&&(r=i),++a);return a>n&&(e=r,n=a),e},J=function(t){var e,n,r,a;if("number"==typeof t){for(e=[],n=0;n<4;n++)e.unshift(t%256),t=I(t/256);return e.join(".")}if("object"==typeof t){for(e="",r=H(t),n=0;n<8;n++)a&&0===t[n]||(a&&(a=!1),r===n?(e+=n?":":"::",a=!0):(e+=t[n].toString(16),n<7&&(e+=":")));return"["+e+"]"}return t},D={},z=f({},D,{" ":1,'"':1,"<":1,">":1,"`":1}),$=f({},z,{"#":1,"?":1,"{":1,"}":1}),V=f({},$,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),G=function(t,e){var n=d(t,0);return n>32&&n<127&&!l(e,t)?t:encodeURIComponent(t)},Z={ftp:21,file:null,http:80,https:443,ws:80,wss:443},K=function(t){return l(Z,t.scheme)},Q=function(t){return""!=t.username||""!=t.password},tt=function(t){return!t.host||t.cannotBeABaseURL||"file"==t.scheme},et=function(t,e){var n;return 2==t.length&&U.test(t.charAt(0))&&(":"==(n=t.charAt(1))||!e&&"|"==n)},nt=function(t){var e;return t.length>1&&et(t.slice(0,2))&&(2==t.length||"/"===(e=t.charAt(2))||"\\"===e||"?"===e||"#"===e)},rt=function(t){var e=t.path,n=e.length;!n||"file"==t.scheme&&1==n&&et(e[0],!0)||e.pop()},at=function(t){return"."===t||"%2e"===t.toLowerCase()},it=function(t){return t=t.toLowerCase(),".."===t||"%2e."===t||".%2e"===t||"%2e%2e"===t},st={},ot={},ct={},ut={},ht={},lt={},ft={},pt={},dt={},gt={},vt={},mt={},bt={},wt={},yt={},Ct={},kt={},xt={},It={},Lt={},At={},Rt=function(t,e,n,a){var i,s,o,c,u=n||st,h=0,f="",d=!1,g=!1,v=!1;n||(t.scheme="",t.username="",t.password="",t.host=null,t.port=null,t.path=[],t.query=null,t.fragment=null,t.cannotBeABaseURL=!1,e=e.replace(O,"")),e=e.replace(F,""),i=p(e);while(h<=i.length){switch(s=i[h],u){case st:if(!s||!U.test(s)){if(n)return R;u=ct;continue}f+=s.toLowerCase(),u=ot;break;case ot:if(s&&(E.test(s)||"+"==s||"-"==s||"."==s))f+=s.toLowerCase();else{if(":"!=s){if(n)return R;f="",u=ct,h=0;continue}if(n&&(K(t)!=l(Z,f)||"file"==f&&(Q(t)||null!==t.port)||"file"==t.scheme&&!t.host))return;if(t.scheme=f,n)return void(K(t)&&Z[t.scheme]==t.port&&(t.port=null));f="","file"==t.scheme?u=wt:K(t)&&a&&a.scheme==t.scheme?u=ut:K(t)?u=pt:"/"==i[h+1]?(u=ht,h++):(t.cannotBeABaseURL=!0,t.path.push(""),u=It)}break;case ct:if(!a||a.cannotBeABaseURL&&"#"!=s)return R;if(a.cannotBeABaseURL&&"#"==s){t.scheme=a.scheme,t.path=a.path.slice(),t.query=a.query,t.fragment="",t.cannotBeABaseURL=!0,u=At;break}u="file"==a.scheme?wt:lt;continue;case ut:if("/"!=s||"/"!=i[h+1]){u=lt;continue}u=dt,h++;break;case ht:if("/"==s){u=gt;break}u=xt;continue;case lt:if(t.scheme=a.scheme,s==r)t.username=a.username,t.password=a.password,t.host=a.host,t.port=a.port,t.path=a.path.slice(),t.query=a.query;else if("/"==s||"\\"==s&&K(t))u=ft;else if("?"==s)t.username=a.username,t.password=a.password,t.host=a.host,t.port=a.port,t.path=a.path.slice(),t.query="",u=Lt;else{if("#"!=s){t.username=a.username,t.password=a.password,t.host=a.host,t.port=a.port,t.path=a.path.slice(),t.path.pop(),u=xt;continue}t.username=a.username,t.password=a.password,t.host=a.host,t.port=a.port,t.path=a.path.slice(),t.query=a.query,t.fragment="",u=At}break;case ft:if(!K(t)||"/"!=s&&"\\"!=s){if("/"!=s){t.username=a.username,t.password=a.password,t.host=a.host,t.port=a.port,u=xt;continue}u=gt}else u=dt;break;case pt:if(u=dt,"/"!=s||"/"!=f.charAt(h+1))continue;h++;break;case dt:if("/"!=s&&"\\"!=s){u=gt;continue}break;case gt:if("@"==s){d&&(f="%40"+f),d=!0,o=p(f);for(var m=0;m<o.length;m++){var b=o[m];if(":"!=b||v){var w=G(b,V);v?t.password+=w:t.username+=w}else v=!0}f=""}else if(s==r||"/"==s||"?"==s||"#"==s||"\\"==s&&K(t)){if(d&&""==f)return A;h-=p(f).length+1,f="",u=vt}else f+=s;break;case vt:case mt:if(n&&"file"==t.scheme){u=Ct;continue}if(":"!=s||g){if(s==r||"/"==s||"?"==s||"#"==s||"\\"==s&&K(t)){if(K(t)&&""==f)return S;if(n&&""==f&&(Q(t)||null!==t.port))return;if(c=M(t,f),c)return c;if(f="",u=kt,n)return;continue}"["==s?g=!0:"]"==s&&(g=!1),f+=s}else{if(""==f)return S;if(c=M(t,f),c)return c;if(f="",u=bt,n==mt)return}break;case bt:if(!B.test(s)){if(s==r||"/"==s||"?"==s||"#"==s||"\\"==s&&K(t)||n){if(""!=f){var y=parseInt(f,10);if(y>65535)return T;t.port=K(t)&&y===Z[t.scheme]?null:y,f=""}if(n)return;u=kt;continue}return T}f+=s;break;case wt:if(t.scheme="file","/"==s||"\\"==s)u=yt;else{if(!a||"file"!=a.scheme){u=xt;continue}if(s==r)t.host=a.host,t.path=a.path.slice(),t.query=a.query;else if("?"==s)t.host=a.host,t.path=a.path.slice(),t.query="",u=Lt;else{if("#"!=s){nt(i.slice(h).join(""))||(t.host=a.host,t.path=a.path.slice(),rt(t)),u=xt;continue}t.host=a.host,t.path=a.path.slice(),t.query=a.query,t.fragment="",u=At}}break;case yt:if("/"==s||"\\"==s){u=Ct;break}a&&"file"==a.scheme&&!nt(i.slice(h).join(""))&&(et(a.path[0],!0)?t.path.push(a.path[0]):t.host=a.host),u=xt;continue;case Ct:if(s==r||"/"==s||"\\"==s||"?"==s||"#"==s){if(!n&&et(f))u=xt;else if(""==f){if(t.host="",n)return;u=kt}else{if(c=M(t,f),c)return c;if("localhost"==t.host&&(t.host=""),n)return;f="",u=kt}continue}f+=s;break;case kt:if(K(t)){if(u=xt,"/"!=s&&"\\"!=s)continue}else if(n||"?"!=s)if(n||"#"!=s){if(s!=r&&(u=xt,"/"!=s))continue}else t.fragment="",u=At;else t.query="",u=Lt;break;case xt:if(s==r||"/"==s||"\\"==s&&K(t)||!n&&("?"==s||"#"==s)){if(it(f)?(rt(t),"/"==s||"\\"==s&&K(t)||t.path.push("")):at(f)?"/"==s||"\\"==s&&K(t)||t.path.push(""):("file"==t.scheme&&!t.path.length&&et(f)&&(t.host&&(t.host=""),f=f.charAt(0)+":"),t.path.push(f)),f="","file"==t.scheme&&(s==r||"?"==s||"#"==s))while(t.path.length>1&&""===t.path[0])t.path.shift();"?"==s?(t.query="",u=Lt):"#"==s&&(t.fragment="",u=At)}else f+=G(s,$);break;case It:"?"==s?(t.query="",u=Lt):"#"==s?(t.fragment="",u=At):s!=r&&(t.path[0]+=G(s,D));break;case Lt:n||"#"!=s?s!=r&&("'"==s&&K(t)?t.query+="%27":t.query+="#"==s?"%23":G(s,D)):(t.fragment="",u=At);break;case At:s!=r&&(t.fragment+=G(s,z));break}h++}},St=function(t){var e,n,r=h(this,St,"URL"),a=arguments.length>1?arguments[1]:void 0,s=String(t),o=k(r,{type:"URL"});if(void 0!==a)if(a instanceof St)e=x(a);else if(n=Rt(e={},String(a)),n)throw TypeError(n);if(n=Rt(o,s,null,e),n)throw TypeError(n);var c=o.searchParams=new y,u=C(c);u.updateSearchParams(o.query),u.updateURL=function(){o.query=String(c)||null},i||(r.href=Ut.call(r),r.origin=Et.call(r),r.protocol=Bt.call(r),r.username=qt.call(r),r.password=Nt.call(r),r.host=_t.call(r),r.hostname=Pt.call(r),r.port=jt.call(r),r.pathname=Wt.call(r),r.search=Ot.call(r),r.searchParams=Ft.call(r),r.hash=Mt.call(r))},Tt=St.prototype,Ut=function(){var t=x(this),e=t.scheme,n=t.username,r=t.password,a=t.host,i=t.port,s=t.path,o=t.query,c=t.fragment,u=e+":";return null!==a?(u+="//",Q(t)&&(u+=n+(r?":"+r:"")+"@"),u+=J(a),null!==i&&(u+=":"+i)):"file"==e&&(u+="//"),u+=t.cannotBeABaseURL?s[0]:s.length?"/"+s.join("/"):"",null!==o&&(u+="?"+o),null!==c&&(u+="#"+c),u},Et=function(){var t=x(this),e=t.scheme,n=t.port;if("blob"==e)try{return new St(e.path[0]).origin}catch(r){return"null"}return"file"!=e&&K(t)?e+"://"+J(t.host)+(null!==n?":"+n:""):"null"},Bt=function(){return x(this).scheme+":"},qt=function(){return x(this).username},Nt=function(){return x(this).password},_t=function(){var t=x(this),e=t.host,n=t.port;return null===e?"":null===n?J(e):J(e)+":"+n},Pt=function(){var t=x(this).host;return null===t?"":J(t)},jt=function(){var t=x(this).port;return null===t?"":String(t)},Wt=function(){var t=x(this),e=t.path;return t.cannotBeABaseURL?e[0]:e.length?"/"+e.join("/"):""},Ot=function(){var t=x(this).query;return t?"?"+t:""},Ft=function(){return x(this).searchParams},Mt=function(){var t=x(this).fragment;return t?"#"+t:""},Xt=function(t,e){return{get:t,set:e,configurable:!0,enumerable:!0}};if(i&&c(Tt,{href:Xt(Ut,(function(t){var e=x(this),n=String(t),r=Rt(e,n);if(r)throw TypeError(r);C(e.searchParams).updateSearchParams(e.query)})),origin:Xt(Et),protocol:Xt(Bt,(function(t){var e=x(this);Rt(e,String(t)+":",st)})),username:Xt(qt,(function(t){var e=x(this),n=p(String(t));if(!tt(e)){e.username="";for(var r=0;r<n.length;r++)e.username+=G(n[r],V)}})),password:Xt(Nt,(function(t){var e=x(this),n=p(String(t));if(!tt(e)){e.password="";for(var r=0;r<n.length;r++)e.password+=G(n[r],V)}})),host:Xt(_t,(function(t){var e=x(this);e.cannotBeABaseURL||Rt(e,String(t),vt)})),hostname:Xt(Pt,(function(t){var e=x(this);e.cannotBeABaseURL||Rt(e,String(t),mt)})),port:Xt(jt,(function(t){var e=x(this);tt(e)||(t=String(t),""==t?e.port=null:Rt(e,t,bt))})),pathname:Xt(Wt,(function(t){var e=x(this);e.cannotBeABaseURL||(e.path=[],Rt(e,t+"",kt))})),search:Xt(Ot,(function(t){var e=x(this);t=String(t),""==t?e.query=null:("?"==t.charAt(0)&&(t=t.slice(1)),e.query="",Rt(e,t,Lt)),C(e.searchParams).updateSearchParams(e.query)})),searchParams:Xt(Ft),hash:Xt(Mt,(function(t){var e=x(this);t=String(t),""!=t?("#"==t.charAt(0)&&(t=t.slice(1)),e.fragment="",Rt(e,t,At)):e.fragment=null}))}),u(Tt,"toJSON",(function(){return Ut.call(this)}),{enumerable:!0}),u(Tt,"toString",(function(){return Ut.call(this)}),{enumerable:!0}),w){var Yt=w.createObjectURL,Ht=w.revokeObjectURL;Yt&&u(St,"createObjectURL",(function(t){return Yt.apply(w,arguments)})),Ht&&u(St,"revokeObjectURL",(function(t){return Ht.apply(w,arguments)}))}v(St,"URL"),a({global:!0,forced:!s,sham:!i},{URL:St})},"4df4":function(t,e,n){"use strict";var r=n("0366"),a=n("7b0b"),i=n("9bdd"),s=n("e95a"),o=n("50c4"),c=n("8418"),u=n("35a1");t.exports=function(t){var e,n,h,l,f,p,d=a(t),g="function"==typeof this?this:Array,v=arguments.length,m=v>1?arguments[1]:void 0,b=void 0!==m,w=u(d),y=0;if(b&&(m=r(m,v>2?arguments[2]:void 0,2)),void 0==w||g==Array&&s(w))for(e=o(d.length),n=new g(e);e>y;y++)p=b?m(d[y],y):d[y],c(n,y,p);else for(l=w.call(d),f=l.next,n=new g;!(h=f.call(l)).done;y++)p=b?i(l,m,[h.value,y],!0):h.value,c(n,y,p);return n.length=y,n}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",s=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),c=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(o,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5fb2":function(t,e,n){"use strict";var r=2147483647,a=36,i=1,s=26,o=38,c=700,u=72,h=128,l="-",f=/[^\0-\u007E]/,p=/[.\u3002\uFF0E\uFF61]/g,d="Overflow: input needs wider integers to process",g=a-i,v=Math.floor,m=String.fromCharCode,b=function(t){var e=[],n=0,r=t.length;while(n<r){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);56320==(64512&i)?e.push(((1023&a)<<10)+(1023&i)+65536):(e.push(a),n--)}else e.push(a)}return e},w=function(t){return t+22+75*(t<26)},y=function(t,e,n){var r=0;for(t=n?v(t/c):t>>1,t+=v(t/e);t>g*s>>1;r+=a)t=v(t/g);return v(r+(g+1)*t/(t+o))},C=function(t){var e=[];t=b(t);var n,o,c=t.length,f=h,p=0,g=u;for(n=0;n<t.length;n++)o=t[n],o<128&&e.push(m(o));var C=e.length,k=C;C&&e.push(l);while(k<c){var x=r;for(n=0;n<t.length;n++)o=t[n],o>=f&&o<x&&(x=o);var I=k+1;if(x-f>v((r-p)/I))throw RangeError(d);for(p+=(x-f)*I,f=x,n=0;n<t.length;n++){if(o=t[n],o<f&&++p>r)throw RangeError(d);if(o==f){for(var L=p,A=a;;A+=a){var R=A<=g?i:A>=g+s?s:A-g;if(L<R)break;var S=L-R,T=a-R;e.push(m(w(R+S%T))),L=v(S/T)}e.push(m(w(L))),g=y(p,I,k==C),p=0,++k}}++p,++f}return e.join("")};t.exports=function(t){var e,n,r=[],a=t.toLowerCase().replace(p,".").split(".");for(e=0;e<a.length;e++)n=a[e],r.push(f.test(n)?"xn--"+C(n):n);return r.join(".")}},"65f0":function(t,e,n){var r=n("861d"),a=n("e8b5"),i=n("b622"),s=i("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[s],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},7156:function(t,e,n){var r=n("861d"),a=n("d2bb");t.exports=function(t,e,n){var i,s;return a&&"function"==typeof(i=e.constructor)&&i!==n&&r(s=i.prototype)&&s!==n.prototype&&a(t,s),t}},8418:function(t,e,n){"use strict";var r=n("c04e"),a=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var s=r(e);s in t?a.f(t,s,i(0,n)):t[s]=n}},9861:function(t,e,n){"use strict";n("e260");var r=n("23e7"),a=n("d066"),i=n("0d3b"),s=n("6eeb"),o=n("e2cc"),c=n("d44e"),u=n("9ed3"),h=n("69f3"),l=n("19aa"),f=n("5135"),p=n("0366"),d=n("f5df"),g=n("825a"),v=n("861d"),m=n("7c73"),b=n("5c6c"),w=n("9a1f"),y=n("35a1"),C=n("b622"),k=a("fetch"),x=a("Headers"),I=C("iterator"),L="URLSearchParams",A=L+"Iterator",R=h.set,S=h.getterFor(L),T=h.getterFor(A),U=/\+/g,E=Array(4),B=function(t){return E[t-1]||(E[t-1]=RegExp("((?:%[\\da-f]{2}){"+t+"})","gi"))},q=function(t){try{return decodeURIComponent(t)}catch(e){return t}},N=function(t){var e=t.replace(U," "),n=4;try{return decodeURIComponent(e)}catch(r){while(n)e=e.replace(B(n--),q);return e}},_=/[!'()~]|%20/g,P={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},j=function(t){return P[t]},W=function(t){return encodeURIComponent(t).replace(_,j)},O=function(t,e){if(e){var n,r,a=e.split("&"),i=0;while(i<a.length)n=a[i++],n.length&&(r=n.split("="),t.push({key:N(r.shift()),value:N(r.join("="))}))}},F=function(t){this.entries.length=0,O(this.entries,t)},M=function(t,e){if(t<e)throw TypeError("Not enough arguments")},X=u((function(t,e){R(this,{type:A,iterator:w(S(t).entries),kind:e})}),"Iterator",(function(){var t=T(this),e=t.kind,n=t.iterator.next(),r=n.value;return n.done||(n.value="keys"===e?r.key:"values"===e?r.value:[r.key,r.value]),n})),Y=function(){l(this,Y,L);var t,e,n,r,a,i,s,o,c,u=arguments.length>0?arguments[0]:void 0,h=this,p=[];if(R(h,{type:L,entries:p,updateURL:function(){},updateSearchParams:F}),void 0!==u)if(v(u))if(t=y(u),"function"===typeof t){e=t.call(u),n=e.next;while(!(r=n.call(e)).done){if(a=w(g(r.value)),i=a.next,(s=i.call(a)).done||(o=i.call(a)).done||!i.call(a).done)throw TypeError("Expected sequence with length 2");p.push({key:s.value+"",value:o.value+""})}}else for(c in u)f(u,c)&&p.push({key:c,value:u[c]+""});else O(p,"string"===typeof u?"?"===u.charAt(0)?u.slice(1):u:u+"")},H=Y.prototype;o(H,{append:function(t,e){M(arguments.length,2);var n=S(this);n.entries.push({key:t+"",value:e+""}),n.updateURL()},delete:function(t){M(arguments.length,1);var e=S(this),n=e.entries,r=t+"",a=0;while(a<n.length)n[a].key===r?n.splice(a,1):a++;e.updateURL()},get:function(t){M(arguments.length,1);for(var e=S(this).entries,n=t+"",r=0;r<e.length;r++)if(e[r].key===n)return e[r].value;return null},getAll:function(t){M(arguments.length,1);for(var e=S(this).entries,n=t+"",r=[],a=0;a<e.length;a++)e[a].key===n&&r.push(e[a].value);return r},has:function(t){M(arguments.length,1);var e=S(this).entries,n=t+"",r=0;while(r<e.length)if(e[r++].key===n)return!0;return!1},set:function(t,e){M(arguments.length,1);for(var n,r=S(this),a=r.entries,i=!1,s=t+"",o=e+"",c=0;c<a.length;c++)n=a[c],n.key===s&&(i?a.splice(c--,1):(i=!0,n.value=o));i||a.push({key:s,value:o}),r.updateURL()},sort:function(){var t,e,n,r=S(this),a=r.entries,i=a.slice();for(a.length=0,n=0;n<i.length;n++){for(t=i[n],e=0;e<n;e++)if(a[e].key>t.key){a.splice(e,0,t);break}e===n&&a.push(t)}r.updateURL()},forEach:function(t){var e,n=S(this).entries,r=p(t,arguments.length>1?arguments[1]:void 0,3),a=0;while(a<n.length)e=n[a++],r(e.value,e.key,this)},keys:function(){return new X(this,"keys")},values:function(){return new X(this,"values")},entries:function(){return new X(this,"entries")}},{enumerable:!0}),s(H,I,H.entries),s(H,"toString",(function(){var t,e=S(this).entries,n=[],r=0;while(r<e.length)t=e[r++],n.push(W(t.key)+"="+W(t.value));return n.join("&")}),{enumerable:!0}),c(Y,L),r({global:!0,forced:!i},{URLSearchParams:Y}),i||"function"!=typeof k||"function"!=typeof x||r({global:!0,enumerable:!0,forced:!0},{fetch:function(t){var e,n,r,a=[t];return arguments.length>1&&(e=arguments[1],v(e)&&(n=e.body,d(n)===L&&(r=e.headers?new x(e.headers):new x,r.has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),e=m(e,{body:b(0,String(n)),headers:b(0,r)}))),a.push(e)),k.apply(this,a)}}),t.exports={URLSearchParams:Y,getState:S}},"9a1f":function(t,e,n){var r=n("825a"),a=n("35a1");t.exports=function(t){var e=a(t);if("function"!=typeof e)throw TypeError(String(t)+" is not iterable");return r(e.call(t))}},"9bdd":function(t,e,n){var r=n("825a"),a=n("2a62");t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(s){throw a(t),s}}},a142:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"canvas_container"},[n("canvas",{attrs:{id:"canvas"}}),n("a-menu",{staticClass:"canvas-menu",attrs:{selectable:!1,mode:"horizontal"}},[n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",attrs:{id:"clearCanvas"},on:{click:function(e){return t.download()}}},[n("a-icon",{staticClass:"small-margin-right",attrs:{type:"download"}}),n("span",{staticClass:"btn-text"},[t._v("保存")])],1)],1),n("a-menu-item",{staticClass:"menu-item"},[t._v(" 格式： "),n("a-select",{staticClass:"img-type",staticStyle:{width:"70px"},attrs:{"label-in-value":"","default-value":{key:"jpg"}},on:{change:t.imgTypeChange}},[n("a-select-option",{attrs:{value:"png"}},[t._v(" png ")]),n("a-select-option",{attrs:{value:"jpg"}},[t._v(" jpg ")])],1)],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",attrs:{id:"saveCanvas"},on:{click:function(e){return t.clear()}}},[n("a-icon",{staticClass:"small-margin-right",attrs:{type:"delete"}}),n("span",{staticClass:"btn-text"},[t._v("清除")])],1)],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",attrs:{type:t.btnHighlight?"primary":""},on:{click:function(e){return t.rePaint()}}},[t._v("重绘")])],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",attrs:{type:t.btnHighlight?"primary":""},on:{click:function(e){return t.clearTrace()}}},[t._v("清除重绘")])],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",attrs:{type:t.btnHighlight?"primary":""},on:{click:function(e){return t.saveTraceAsJSON()}}},[t._v("导出重绘")])],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",on:{click:function(e){return t.fileInput()}}},[t._v("导入重绘")]),t._v(" "+t._s(t.file.length>0?t.file[0].name:"none")+" "),n("input",{attrs:{id:"fileInputBtn",type:"file",multiple:""}})],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",on:{click:function(e){return t.imageInput()}}},[t._v("导入图片")]),t._v(" "+t._s(t.image.length>0?t.image[0].name:"none")+" "),n("input",{staticStyle:{display:"none"},attrs:{id:"imageInputBtn",type:"file",multiple:""}})],1),n("a-menu-item",{staticClass:"menu-item"},[n("a-button",{staticClass:"menu-btn small-width",on:{click:function(e){return t.traceBackWard()}}},[t._v("撤回")])],1),n("a-menu-item",{staticClass:"menu-item"},[n("span",[t._v("粗细：")]),n("a-input",{staticClass:"pen-width-input",on:{blur:t.penSizeChange},model:{value:t.lineWidth,callback:function(e){t.lineWidth=e},expression:"lineWidth"}})],1),n("a-menu-item",{staticClass:"menu-item"},[n("span",[t._v("颜色：")]),n("colorPicker",{staticClass:"colorPicker",on:{change:t.colorChange},model:{value:t.lineColor,callback:function(e){t.lineColor=e},expression:"lineColor"}})],1)],1)],1)},a=[],i=(n("fb6a"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("a9e3"),n("a434"),{data:function(){return{canvas:"",lineWidth:"",lineColor:"",canvasBgColor:"",cxt:"",imageType:"jpg",trace:[],flag:"",btnHighlight:!1,file:"",fileInputBtn:"",imageInputBtn:"",image:"",imageToInsert:"",newTrace:""}},watch:{trace:function(){this.trace.length>0?this.btnHighlight=!0:this.btnHighlight=!1}},methods:{image2Canvas:function(){var t=new Image;t.src=this.imageToInsert,t.onload=function(){this.cxt.drawImage(t,0,0)}.bind(this)},drawImageOnCanvas:function(){this.clearCanvas(),this.clearTrace(),this.image2Canvas()},imageInput:function(){this.imageInputBtn.click()},traceBackWard:function(){if(0!==this.trace.length){for(var t=!0,e=this.trace.length-2;e>=0;e--)if(!0===this.trace[e].end){this.trace=this.trace.slice(0,e+1),t=!1;break}t&&(this.trace=[]),this.rePaint()}else alert("当前不存在可撤回轨迹")},fileInput:function(){this.fileInputBtn.click()},saveTraceAsJSON:function(){var t=JSON.stringify(this.trace),e=document.createElement("a");e.download="trace.json";var n=new Blob([t]);e.href=URL.createObjectURL(n),e.click()},traceInput:function(t,e,n){this.trace.push({x:t,y:e,end:n})},rePaint:function(){this.clearCanvas();for(var t=!0,e=0;e<this.trace.length;e++)t?(this.beginAndMove(this.trace[e].x,this.trace[e].y),t=!1):(this.trace[e].end&&(t=!0),this.draw(this.trace[e].x,this.trace[e].y))},colorChange:function(){this.cxt.strokeStyle=this.lineColor,this.cxt.shadowColor=this.lineColor},penSizeChange:function(t){if(this.lineWidth=Number(this.lineWidth),this.lineWidth<=0||this.lineWidth>10||isNaN(this.lineWidth))return console.log("请输入1-10以内的数值"),this.lineWidth=5,void(this.cxt.lineWidth=this.lineWidth);this.cxt.lineWidth=this.lineWidth},imgTypeChange:function(t){this.imageType=t.key},getDOMEl:function(){this.canvas=document.querySelector("#canvas"),this.fileInputBtn=document.querySelector("#fileInputBtn"),this.imageInputBtn=document.querySelector("#imageInputBtn")},canvasSupTest:function(){if(!this.canvas.getContext||!this.canvas.getContext("2d")){var t=document.createElement("section");throw t.className="errorCanvas",t.innerHTML="对不起，当前浏览器不支持canvas",this.canvas.prepend(t),new Error("对不起，当前浏览器不支持canvas")}},porpertyInit:function(){this.lineWidth=5,this.lineColor="#000",this.canvasBgColor="#fff",this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.windowToCanvas(),this.cxt=this.canvas.getContext("2d"),this.cxt.fillStyle=this.canvasBgColor,this.cxt.fillRect(0,0,this.canvas.width,this.canvas.height),this.cxt.strokeStyle=this.lineColor,this.cxt.lineWidth=this.lineWidth,this.cxt.lineCap="round",this.cxt.lineJoin="round",this.cxt.shadowBlur=1,this.cxt.shadowColor="#000"},beginAndMove:function(t,e){this.cxt.beginPath(),this.cxt.moveTo(t,e)},draw:function(t,e){this.cxt.lineTo(t,e),this.cxt.stroke()},close:function(){this.cxt.closePath()},download:function(){if("jpg"===this.imageType)var t=this.canvas.toDataURL("image/jpeg",1);else"png"===this.imageType&&(t=this.canvas.toDataURL("image/png"));var e=document.createElement("a");e.href=t,e.download="mySignature",e.click()},clear:function(){this.clearCanvas()},clearCanvas:function(){this.cxt.clearRect(0,0,this.canvas.width,this.canvas.height),this.cxt.fillRect(0,0,this.canvas.width,this.canvas.height)},clearTrace:function(){this.trace.splice(0,this.trace.length)},windowToCanvas:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}},components:{},mounted:function(){this.getDOMEl(),this.canvasSupTest(),this.porpertyInit(),this.canvas.addEventListener("touchstart",function(t){this.beginAndMove(t.changedTouches[0].pageX,t.changedTouches[0].pageY),this.traceInput(t.changedTouches[0].pageX,t.changedTouches[0].pageY,!1)}.bind(this)),this.canvas.addEventListener("touchmove",function(t){this.traceInput(t.changedTouches[0].pageX,t.changedTouches[0].pageY,!1),this.draw(t.changedTouches[0].pageX,t.changedTouches[0].pageY)}.bind(this)),this.canvas.addEventListener("touchend",function(t){this.traceInput(t.changedTouches[0].pageX,t.changedTouches[0].pageY,!0),this.close()}.bind(this)),document.body.addEventListener("touchmove",(function(t){t.preventDefault()}),{passive:!1}),this.canvas.addEventListener("mousedown",function(t){this.traceInput(t.pageX,t.pageY,!1),this.beginAndMove(t.pageX,t.pageY),this.flag=!0}.bind(this)),this.canvas.addEventListener("mousemove",function(t){this.flag&&(this.traceInput(t.pageX,t.pageY,!1),this.draw(t.pageX,t.pageY))}.bind(this)),this.canvas.addEventListener("mouseout",function(t){this.flag=!1}.bind(this)),this.canvas.addEventListener("mouseup",function(t){this.traceInput(t.pageX,t.pageY,!0),this.flag=!1}.bind(this)),window.addEventListener("resize",function(){this.windowToCanvas(),this.porpertyInit(),this.clearTrace()}.bind(this)),this.fileInputBtn.addEventListener("change",function(t){this.file=t.target.files;var e=new FileReader;e.readAsText(this.file[0]),e.onload=function(){this.newTrace=JSON.parse(e.result),this.trace=this.newTrace}.bind(this)}.bind(this)),this.imageInputBtn.addEventListener("change",function(t){this.image=t.target.files;var e=new FileReader;e.readAsDataURL(this.image[0]),e.onload=function(t){this.imageToInsert=t.target.result,this.drawImageOnCanvas()}.bind(this)}.bind(this))}}),s=i,o=(n("d0ac"),n("2877")),c=Object(o["a"])(s,r,a,!1,null,"63ea1d7a",null);e["default"]=c.exports},a434:function(t,e,n){"use strict";var r=n("23e7"),a=n("23cb"),i=n("a691"),s=n("50c4"),o=n("7b0b"),c=n("65f0"),u=n("8418"),h=n("1dde"),l=h("splice"),f=Math.max,p=Math.min,d=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!l},{splice:function(t,e){var n,r,h,l,v,m,b=o(this),w=s(b.length),y=a(t,w),C=arguments.length;if(0===C?n=r=0:1===C?(n=0,r=w-y):(n=C-2,r=p(f(i(e),0),w-y)),w+n-r>d)throw TypeError(g);for(h=c(b,r),l=0;l<r;l++)v=y+l,v in b&&u(h,l,b[v]);if(h.length=r,n<r){for(l=y;l<w-r;l++)v=l+r,m=l+n,v in b?b[m]=b[v]:delete b[m];for(l=w;l>w-r+n;l--)delete b[l-1]}else if(n>r)for(l=w-r;l>y;l--)v=l+r-1,m=l+n-1,v in b?b[m]=b[v]:delete b[m];for(l=0;l<n;l++)b[l+y]=arguments[l+2];return b.length=w-r+n,h}})},a9e3:function(t,e,n){"use strict";var r=n("83ab"),a=n("da84"),i=n("94ca"),s=n("6eeb"),o=n("5135"),c=n("c6b6"),u=n("7156"),h=n("c04e"),l=n("d039"),f=n("7c73"),p=n("241c").f,d=n("06cf").f,g=n("9bf2").f,v=n("58a8").trim,m="Number",b=a[m],w=b.prototype,y=c(f(w))==m,C=function(t){var e,n,r,a,i,s,o,c,u=h(t,!1);if("string"==typeof u&&u.length>2)if(u=v(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(i=u.slice(2),s=i.length,o=0;o<s;o++)if(c=i.charCodeAt(o),c<48||c>a)return NaN;return parseInt(i,r)}return+u};if(i(m,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var k,x=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof x&&(y?l((function(){w.valueOf.call(n)})):c(n)!=m)?u(new b(C(e)),n,x):C(e)},I=r?p(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),L=0;I.length>L;L++)o(b,k=I[L])&&!o(x,k)&&g(x,k,d(b,k));x.prototype=w,w.constructor=x,s(a,m,x)}},d0ac:function(t,e,n){"use strict";n("0ce0")},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),i=n("e8b5"),s=n("23cb"),o=n("50c4"),c=n("fc6a"),u=n("8418"),h=n("b622"),l=n("1dde"),f=l("slice"),p=h("species"),d=[].slice,g=Math.max;r({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var n,r,h,l=c(this),f=o(l.length),v=s(t,f),m=s(void 0===e?f:e,f);if(i(l)&&(n=l.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?a(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return d.call(l,v,m);for(r=new(void 0===n?Array:n)(g(m-v,0)),h=0;v<m;v++,h++)v in l&&u(r,h,l[v]);return r.length=h,r}})}}]);
//# sourceMappingURL=chunk-05d37e98.d5e2b1ae.js.map