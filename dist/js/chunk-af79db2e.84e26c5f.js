(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-af79db2e"],{1108:function(t,e,i){"use strict";i("babb")},4889:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("el-menu",{staticClass:"el-menu-demo",attrs:{mode:"horizontal"}},[i("el-menu-item",{staticClass:"menu-item",attrs:{index:"1"}},[i("el-button",{on:{click:function(e){return t.download()}}},[t._v("保存")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"2"}},[t._v(" 格式： "),i("el-select",{staticClass:"selectModule",attrs:{placeholder:"请选择"},model:{value:t.imageType,callback:function(e){t.imageType=e},expression:"imageType"}},t._l(t.options,(function(t){return i("el-option",{key:t.vlaue,attrs:{label:t.label,value:t.value}})})),1)],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"3"}},[i("el-button",{on:{click:function(e){return t.clear()}}},[t._v("清除")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"4"}},[i("el-button",{attrs:{type:t.btnHighlight||t.imgFlag?"primary":""},on:{click:function(e){return t.repaint()}}},[t._v("重绘")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"5"}},[i("el-button",{attrs:{type:t.btnHighlight||t.imgFlag?"primary":""},on:{click:function(e){return t.clearTrace()}}},[t._v("清除重绘")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"6"}},[i("el-button",{attrs:{type:t.btnHighlight||t.imgFlag?"primary":""},on:{click:function(e){return t.saveTraceAsJSON()}}},[t._v("导出重绘")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("el-button",{on:{click:function(e){return t.fileInput()}}},[t._v("导入重绘")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"},on:{click:function(e){return t.imageInput()}}},[i("el-button",[t._v("导入图片")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("el-button",{on:{click:function(e){return t.traceBackWard()}}},[t._v("撤回")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("el-button",{attrs:{type:t.eraserFlag?"primary":""},on:{click:function(e){return t.eraserTrigger()}}},[t._v("橡皮擦")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("el-button",{on:{click:function(e){return t.penShape()}}},[t._v("笔锋")])],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("span",[t._v("粗细：")]),i("el-input",{staticClass:"width-input",attrs:{placeholder:"输入粗细",clearable:""},on:{blur:function(e){return t.penSizeChange(t.width)}},model:{value:t.width,callback:function(e){t.width=e},expression:"width"}})],1),i("el-menu-item",{staticClass:"menu-item",attrs:{index:"7"}},[i("span",[t._v("颜色：")]),i("el-color-picker",{on:{change:function(e){return t.colorChange(t.color)}},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}})],1)],1),i("signatureCore",{ref:"sigCore",attrs:{imageType:t.imageType,lineWidth:Number(t.width),lineColor:t.color},on:{updateBtnHight:t.updateBtnHight,updateImgFlag:t.updateImgFlag,updateEraserFlag:t.updateEraserFlag,uploadImageToFather:t.uploadImageToFather,uploadTraceToFather:t.uploadTraceJSONToFather}})],1)},a=[],s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"canvas_container",attrs:{id:"canvas_container"}},[i("canvas",{attrs:{id:"canvas"}}),i("input",{attrs:{id:"fileInputBtn",type:"file",multiple:""}}),i("input",{staticStyle:{display:"none"},attrs:{id:"imageInputBtn",type:"file",multiple:""}})])}],c=(i("a9e3"),i("99af"),i("ac1f"),i("466d"),i("a434"),i("fb6a"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),{props:{lineWidth:{type:Number,default:5},lineColor:{type:String,default:"#000"},canvasBgColor:{type:String,default:"#fff"},imageType:{type:String,default:"jpg"}},data:function(){return{canvas:"",cxt:"",trace:[],flag:"",btnHighlight:!1,imgFlag:!1,file:"",fileInputBtn:"",imageInputBtn:"",image:"",imageToInsert:"",newTrace:"",eraserFlag:!1,eraserTrace:[],minusX:"",minusY:"",color:this.lineColor,width:this.lineWidth}},watch:{trace:function(){this.trace.length>0?this.btnHighlight=!0:this.btnHighlight=!1,this.$emit("updateBtnHight",this.btnHighlight)},imageToInsert:function(){this.imageToInsert?this.imgFlag=!0:this.imgFlag=!1,this.$emit("updateImgFlag",this.imgFlag)}},methods:{showMenu:function(){this.openKeys=this.openKeys2},openChange:function(){this.openKeys2=this.openKeys},injectImage:function(t){this.imageToInsert=t,this.drawImageOnCanvas()},injectJSON:function(t){this.newTrace=JSON.parse(t),this.trace=this.trace.concat(this.newTrace)},mobileCompute:function(){this.minusX=this.canvas.getBoundingClientRect().x,this.minusY=this.canvas.getBoundingClientRect().y},isMobile:function(){return!!window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)},penShapeCompute:function(){for(var t=[],e=[],i=0;i<this.trace.length;i++)this.trace[i].end&&t.push(i);e[0]=t[0]+1;for(var n=1;n<t.length;n++)e.push(t[n]-t[n-1]);for(var a=(this.lineWidth-1)/e[0],s=!0,r=0;r<this.trace.length;r++)s?(this.beginAndMove(this.trace[r].x,this.trace[r].y),s=!1):(this.cxt.lineWidth-=a,this.draw(this.trace[r].x,this.trace[r].y),this.trace[r].end&&(s=!0,this.cxt.lineWidth=this.lineWidth,e.shift(),a=(this.lineWidth-1)/e[0]))},penShape:function(){this.clearCanvas(),this.penShapeCompute(),this.image2Canvas(!0)},eraserTheLine:function(){for(var t=0;t<this.trace.length-1;t++)if(!this.trace[t].end){var e=this.eraserTrace[0].x,i=this.eraserTrace[0].y,n=this.eraserTrace[1].x,a=this.eraserTrace[1].y,s=this.trace[t].x,r=this.trace[t].y,c=this.trace[t+1].x,h=this.trace[t+1].y,o=this.judgeIntersect(e,i,n,a,s,r,c,h);o&&this.removeThisLine(t)}},judgeIntersect:function(t,e,i,n,a,s,r,c){var h=Math.min(e,n)<=Math.max(s,c),o=Math.min(a,r)<Math.max(t,i),l=Math.min(s,c)<Math.max(e,n),u=Math.min(t,i)<Math.max(a,r);if(!(h&&o&&l&&u))return!1;var g=(a-t)*(n-e)-(i-t)*(s-e),d=(r-t)*(n-e)-(i-t)*(c-e),m=(t-a)*(c-s)-(r-a)*(e-s),f=(i-a)*(c-s)-(r-a)*(n-s);return g*d<=1e-8&&m*f<=1e-8},removeThisLine:function(t){for(var e=0,i=0,n=t;n>=0;n--)if(this.trace[n].end){e=n+1;break}for(var a=t;a<this.trace.length;a++)if(this.trace[a].end){i=a;break}this.trace.splice(e,i-e+1),this.rePaint()},eraserTrigger:function(){this.eraserFlag=!this.eraserFlag;var t=i("994b");this.canvas.style.cursor=this.eraserFlag?"url(".concat(t,"),auto"):"default",this.$emit("updateEraserFlag",this.eraserFlag),this.eraserTrace=[]},image2Canvas:function(t){var e=new Image;console.log(this.imageToInsert),e.src=this.imageToInsert,e.onload=function(){this.cxt.drawImage(e,0,0),this.trace.length>0&&t?this.penShapeCompute():this.rePaintTrace()}.bind(this)},drawImageOnCanvas:function(){this.image2Canvas()},imageInput:function(){this.imageInputBtn.click()},traceBackWard:function(){if(0!==this.trace.length){for(var t=!0,e=this.trace.length-2;e>=0;e--)if(!0===this.trace[e].end){this.trace=this.trace.slice(0,e+1),t=!1;break}t&&(this.trace=[]),this.rePaint()}else alert("当前不存在可撤回轨迹")},fileInput:function(){this.fileInputBtn.click()},saveTraceAsJSON:function(){var t=JSON.stringify(this.trace),e=document.createElement("a");e.download="trace.json";var i=new Blob([t]);e.href=URL.createObjectURL(i),e.click(),this.$emit("uploadTraceJSONToFather",t)},eraserTraceInput:function(t,e){this.eraserTrace.push({x:t,y:e})},traceInputBegin:function(t,e,i,n,a){this.trace.push({x:t,y:e,start:i,color:n,width:a})},traceInput:function(t,e,i){this.trace.push({x:t,y:e,end:i})},rePaintTrace:function(){for(var t=!0,e=0;e<this.trace.length;e++)t?(this.beginAndMove(this.trace[e].x,this.trace[e].y),t=!1,this.trace[e].start&&(this.colorChange(this.trace[e].color),this.penSizeChange(this.trace[e].width))):(this.trace[e].end&&(t=!0),this.draw(this.trace[e].x,this.trace[e].y))},rePaint:function(){this.clearCanvas(),this.imageToInsert&&this.drawImageOnCanvas(),this.rePaintTrace()},colorChange:function(t){this.color=t,this.cxt.strokeStyle=this.color,this.cxt.shadowColor=this.color},penSizeChange:function(t){this.width=t;var e=Number(this.width);if(e<=0||e>10||isNaN(e))return e=5,void(this.cxt.lineWidth=e);this.cxt.lineWidth=e},imgTypeChange:function(t){this.imageType=t.key},getDOMEl:function(){this.canvas=document.querySelector("#canvas"),this.fileInputBtn=document.querySelector("#fileInputBtn"),this.imageInputBtn=document.querySelector("#imageInputBtn")},canvasSupTest:function(){if(!this.canvas.getContext||!this.canvas.getContext("2d")){var t=document.createElement("section");throw t.className="errorCanvas",t.innerHTML="对不起，当前浏览器不支持canvas",this.canvas.prepend(t),new Error("对不起，当前浏览器不支持canvas")}},porpertyInit:function(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.cxt=this.canvas.getContext("2d"),this.cxt.fillStyle=this.canvasBgColor,this.cxt.fillRect(0,0,this.canvas.width,this.canvas.height),this.cxt.strokeStyle=this.lineColor,this.cxt.lineWidth=this.lineWidth,this.cxt.lineCap="round",this.cxt.lineJoin="round",this.cxt.shadowBlur=1,this.cxt.shadowColor=this.lineColor},beginAndMove:function(t,e){this.cxt.beginPath(),this.cxt.moveTo(t,e)},draw:function(t,e){this.cxt.lineTo(t,e),this.cxt.stroke()},close:function(){},download:function(){var t="";"jpg"===this.imageType?t=this.canvas.toDataURL("image/jpeg",1):"png"===this.imageType&&(t=this.canvas.toDataURL("image/png"));var e=document.createElement("a");e.download="mySignature",e.href=t,e.click(),this.$emit("uploadImageToFather",t)},clear:function(){this.clearCanvas(),this.image="",this.file="",this.newTrace=[]},clearCanvas:function(){this.cxt.clearRect(0,0,this.canvas.width,this.canvas.height),this.cxt.fillRect(0,0,this.canvas.width,this.canvas.height)},clearTrace:function(){this.trace.splice(0,this.trace.length),this.imageToInsert=""}},components:{},mounted:function(){this.getDOMEl(),this.canvasSupTest(),this.porpertyInit(),this.mobileCompute(),this.isMobile()?(this.canvas.addEventListener("touchstart",function(t){if(!this.eraserFlag){var e=t.changedTouches[0].pageX-this.minusX,i=t.changedTouches[0].pageY-this.minusY;this.beginAndMove(e,i),this.traceInputBegin(e,i,!0,this.color,this.width)}}.bind(this)),this.canvas.addEventListener("touchmove",function(t){if(!this.eraserFlag){var e=t.changedTouches[0].pageX-this.minusX,i=t.changedTouches[0].pageY-this.minusY;this.traceInput(e,i,!1),this.draw(e,i)}}.bind(this)),this.canvas.addEventListener("touchend",function(t){if(!this.eraserFlag){var e=t.changedTouches[0].pageX-this.minusX,i=t.changedTouches[0].pageY-this.minusY;this.trace.length>0&&this.traceInput(e,i,!0),this.draw(e,i)}}.bind(this)),document.body.addEventListener("touchmove",(function(t){t.preventDefault()}),{passive:!1}),this.canvas.addEventListener("touchstart",function(t){if(this.eraserFlag){var e=t.changedTouches[0].pageX-this.minusX,i=t.changedTouches[0].pageY-this.minusY;2===this.eraserTrace.length&&(this.eraserTrace=[]),this.eraserTraceInput(e,i)}}.bind(this)),this.canvas.addEventListener("touchend",function(t){if(this.eraserFlag){var e=t.changedTouches[0].pageX-this.minusX,i=t.changedTouches[0].pageY-this.minusY;this.eraserTraceInput(e,i),this.eraserTheLine(),this.eraserTrace=[]}}.bind(this))):(this.canvas.addEventListener("mousedown",function(t){if(!this.eraserFlag){var e=t.layerX,i=t.layerY;this.traceInputBegin(e,i,!0,this.color,this.width),this.beginAndMove(e,i),this.flag=!0}}.bind(this)),this.canvas.addEventListener("mousemove",function(t){if(!this.eraserFlag&&this.flag){var e=t.layerX,i=t.layerY;this.traceInput(e,i,!1),this.draw(e,i)}}.bind(this)),this.canvas.addEventListener("mouseout",function(t){this.flag=!1}.bind(this)),this.canvas.addEventListener("mouseup",function(t){if(!this.eraserFlag){var e=t.layerX,i=t.layerY;this.trace.length>0&&this.traceInput(e,i,!0),this.flag=!1,this.draw(e,i)}}.bind(this)),this.canvas.addEventListener("mousedown",function(t){if(this.eraserFlag){var e=t.layerX,i=t.layerY;2===this.eraserTrace.length&&(this.eraserTrace=[]),this.eraserTraceInput(e,i)}}.bind(this)),this.canvas.addEventListener("mouseup",function(t){if(this.eraserFlag){var e=t.layerX,i=t.layerY;this.eraserTraceInput(e,i),this.eraserTheLine(),this.eraserTrace=[]}}.bind(this))),window.addEventListener("orientationchange",function(){var t=this;setTimeout((function(){t.mobileCompute(),t.porpertyInit(),t.rePaint()}),200)}.bind(this)),this.fileInputBtn.addEventListener("change",function(t){this.file=t.target.files;var e=new FileReader;e.readAsText(this.file[0]),e.onload=function(){this.newTrace=JSON.parse(e.result),this.trace=this.trace.concat(this.newTrace)}.bind(this)}.bind(this)),this.fileInputBtn.addEventListener("click",(function(t){this.value=""})),this.imageInputBtn.addEventListener("change",function(t){this.image=t.target.files;var e=new FileReader;e.readAsDataURL(this.image[0]),e.onload=function(t){this.imageToInsert=t.target.result,console.log(this.imageToInsert),this.drawImageOnCanvas()}.bind(this)}.bind(this)),this.imageInputBtn.addEventListener("click",(function(t){this.value=""}))}}),h=c,o=(i("c1e7"),i("8bfd"),i("2877")),l=Object(o["a"])(h,s,r,!1,null,"0306af75",null),u=l.exports,g={data:function(){return{options:[{value:"jpg",label:"jpg"},{value:"png",label:"png"}],imageType:"jpg",btnHighlight:!1,eraserFlag:!1,imgFlag:!1,width:3,color:"#000"}},methods:{download:function(){this.$refs.sigCore.download()},clear:function(){this.$refs.sigCore.clear()},repaint:function(){this.$refs.sigCore.rePaint()},fileInput:function(){this.$refs.sigCore.fileInput()},clearTrace:function(){this.$refs.sigCore.clearTrace()},saveTraceAsJSON:function(){this.$refs.sigCore.saveTraceAsJSON()},imageInput:function(){this.$refs.sigCore.imageInput()},traceBackWard:function(){this.$refs.sigCore.traceBackWard()},eraserTrigger:function(){this.$refs.sigCore.eraserTrigger()},penShape:function(){this.$refs.sigCore.penShape()},penSizeChange:function(t){this.$refs.sigCore.penSizeChange(t)},colorChange:function(t){this.$refs.sigCore.colorChange(t)},updateBtnHight:function(t){this.btnHighlight=t},updateImgFlag:function(t){this.imgFlag=t},updateEraserFlag:function(t){console.log(t),this.eraserFlag=t},uploadImageToFather:function(t){this.img=t},uploadTraceJSONToFather:function(t){this.traceJSON=t,console.log(this.traceJSON)},injectJSON:function(){var t="hello just test";this.$refs.sigCore.injectJSON(t)},injectImage:function(){var t="hello I am image";this.$refs.sigCore.injectImage(t)}},components:{signatureCore:u}},d=g,m=(i("1108"),Object(o["a"])(d,n,a,!1,null,"f2f0d998",null));e["default"]=m.exports},8392:function(t,e,i){},"8bfd":function(t,e,i){"use strict";i("d984")},"994b":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEQSURBVEhL1ZIxagJBGEY3GAI5gKYOaOEFLLyIYCGktAmCXbDzAFaxDKSxsEkOkwOkMSnTColJ3r/4wbDM6O7sWPjgscywzGP4JzsHOvvvyRjjN47y1QmwwC9+4A8mDymwwmt8waQhN3BpG3CFr5gk5AuIJCEF7KBiQNQKKbDFT+xiiKiQAmts4zsmDSmwwzds4S2WDR19de6Q+/iFFrrBsqEp/uFTvirgBjTkHlYJ3aOd8YwN23DxBUTZUHRAHAvVDohQyPaSBIQbslc3RxuyN2A8ov0wy1flUWiDwRuIC1yihR5sowILPHgDl5jQwSGHqBKKCgg3ZDNqepxgdEC4oZC1AsJCA7zzOMTagcRk2T9Q93nXufGozQAAAABJRU5ErkJggg=="},babb:function(t,e,i){},c1e7:function(t,e,i){"use strict";i("8392")},d984:function(t,e,i){}}]);
//# sourceMappingURL=chunk-af79db2e.84e26c5f.js.map