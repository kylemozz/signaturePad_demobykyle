<template>
  <div class="canvas_container" id="canvas_container">
    <canvas id="canvas"></canvas>
    <input id="fileInputBtn" type="file" multiple />
    <input style="display: none" id="imageInputBtn" type="file" multiple />
  </div>
</template>

<script>
export default {
  // 暴露的参数
  props: {
    lineWidth: {
      // 线条宽度 默认为5
      type: Number,
      default: 5
    },
    lineColor: {
      // 线条颜色 默认黑色
      type: String,
      default: '#000'
    },
    canvasBgColor: {
      // 绘画框背景颜色
      type: String,
      default: '#fff'
    },
    imageType: {
      // 默认的图片类型
      type: String,
      default: 'jpg'
    }
  },
  data () {
    return {
      canvas: '', // canvas画布
      cxt: '', // canvas的context,
      trace: [], // 轨迹变量数据
      flag: '', // 鼠标移动时的标志量
      btnHighlight: false, // 按钮高亮标志量
      imgFlag: false, // 图片功能关联的重绘和消除重绘高亮
      file: '', // 传入的文件
      fileInputBtn: '', // 文件选择输入按钮
      imageInputBtn: '', // 图片选择输入按扭
      image: '', // 导入的图片
      imageToInsert: '', // 要导入canvas的图片
      newTrace: '', // 导入的新轨迹
      eraserFlag: false, // 橡皮擦功能启动标志位
      eraserTrace: [], // 橡皮擦轨迹
      minusX: '', // 移动端画布x轴偏移值
      minusY: '', // 移动端画布y轴偏移值
      color: this.lineColor,
      width: this.lineWidth,
      magnifi: 1
    }
  },
  watch: {
    trace () {
      // 只能使用watcher 如果在按钮属性直接使用三元表达式会导致书写卡顿
      if (this.trace.length > 0) {
        this.btnHighlight = true
      } else {
        this.btnHighlight = false
      }
      this.$emit('updateBtnHight', this.btnHighlight) // 同时向外部更新
    },
    imageToInsert () {
      if (this.imageToInsert) {
        this.imgFlag = true
      } else {
        this.imgFlag = false
      }
      this.$emit('updateImgFlag', this.imgFlag) // 同时向外部更新
    }
  },
  methods: {
    /* 缩小 */
    scaleDown () {
      this.magnifi /= 2
      this.cxt.scale(0.5, 0.5)
      this.clearCanvas()
      if (this.imageToInsert) {
        this.drawImageOnCanvas()
      }
      this.rePaintTrace()
      this.$emit('updateMagnifi', this.magnifi)
      // console.log(this.canvas.width, this.canvas.height)
    },
    /* 放大 */
    scaleUp () {
      this.magnifi *= 2

      this.cxt.scale(2, 2)
      this.clearCanvas()
      if (this.imageToInsert) {
        this.drawImageOnCanvas()
      }
      this.rePaintTrace()
      this.$emit('updateMagnifi', this.magnifi)
      // console.log(this.canvas.width, this.canvas.height)
    },

    /* 外部图片传入 */
    injectImage (image) {
      // console.log(image)
      this.imageToInsert = image
      this.drawImageOnCanvas()
    },
    /* 外部JSON传入 */
    injectJSON (json) {
      // console.log(json)
      this.newTrace = JSON.parse(json)
      this.trace = this.trace.concat(this.newTrace)
    },
    /* 计算移动端偏移值 */
    mobileCompute (flag = false) {
      this.minusX = this.canvas.getBoundingClientRect().x
      this.minusY = this.canvas.getBoundingClientRect().y
    },
    /* 判断浏览器是pc端还是移动端 */
    isMobile () {
      if (
        window.navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        return true // 移动端
      } else {
        return false // PC端
      }
    },
    /* 笔锋测试 核心思路为线的宽度逐渐减少 */
    penShapeCompute () {
      const index = [] // 每条线段的终点坐标
      const len = []
      for (let j = 0; j < this.trace.length; j++) {
        if (this.trace[j].end) {
          index.push(j)
        }
      }
      // console.log(index)
      // 计算每段线段的长度

      len[0] = index[0] + 1
      for (let j = 1; j < index.length; j++) {
        len.push(index[j] - index[j - 1])
      }

      // console.log(len)
      // var count = 0
      let decay = (this.lineWidth - 1) / len[0] // 宽度衰减值
      // console.log(decay)
      let branchFlag = true
      // 遍历轨迹对象
      for (let i = 0; i < this.trace.length; i++) {
        // console.log(this.trace[i])
        if (branchFlag) {
          this.beginAndMove(this.trace[i].x, this.trace[i].y)
          branchFlag = false
          continue
        }

        // 逐渐改变线的宽度
        this.cxt.lineWidth -= decay
        // console.log(this.cxt.lineWidth)
        this.draw(this.trace[i].x, this.trace[i].y)
        if (this.trace[i].end) {
          branchFlag = true
          this.cxt.lineWidth = this.lineWidth
          len.shift()
          decay = (this.lineWidth - 1) / len[0]
          // count += 1
          // console.log(decay)
        }
      }
      // console.log(count)
    },
    penShape () {
      this.clearCanvas()
      this.penShapeCompute()
      this.image2Canvas(true)
    },
    /* 遍历轨迹数组 并根据检测结果擦除 */
    eraserTheLine () {
      for (let i = 0; i < this.trace.length - 1; i++) {
        // 第一个点不能是终点 以防错误连线检测
        if (!this.trace[i].end) {
          // 相交检测
          const x1 = this.eraserTrace[0].x
          const y1 = this.eraserTrace[0].y
          const x2 = this.eraserTrace[1].x
          const y2 = this.eraserTrace[1].y
          const x3 = this.trace[i].x
          const y3 = this.trace[i].y
          const x4 = this.trace[i + 1].x
          const y4 = this.trace[i + 1].y
          const res = this.judgeIntersect(x1, y1, x2, y2, x3, y3, x4, y4)
          if (res) {
            this.removeThisLine(i)
          }
        }
      }
    },
    /* 四点两两连线线段相交检测 注意传入参数的顺序 */
    judgeIntersect (x1, y1, x2, y2, x3, y3, x4, y4) {
      // 快速排斥
      // 两个线段为对角线组成的矩形，如果两个矩形没有重叠的部分，那么两条线段一定不相交（但是重叠的矩形也有可能不相交）

      // 1. 线段ab的低点低于cd的最高点（可能重合）
      const conditon1 = Math.min(y1, y2) <= Math.max(y3, y4)
      // 2. cd最左端小于ab最右端
      const condition2 = Math.min(x3, x4) < Math.max(x1, x2)
      // 3. cd的最低点低于ab的最高点（加上条件1，两线段在竖直方向上重合）
      const condition3 = Math.min(y3, y4) < Math.max(y1, y2)
      // 4. ab的最左端小于cd的最右端
      const condition4 = Math.min(x1, x2) < Math.max(x3, x4)

      // 综合以上4个条件 矩形是重合的（也包括矩形包含的情况） 这一步是判断那些绝对不重合的矩阵 即绝对不相交
      if (!(conditon1 && condition2 && condition3 && condition4)) {
        return false
      }

      // 剩下的用跨立实验判断
      // 如果两条线段相交 必然跨立，以一条线段为标准，另一条线段的两端点一定在这条线段的两端
      // 即ab两点在线段cd的两端 cd两点在线段ab的两端
      // (ACxAB)*(ABxAD) <= 0
      // AC AB 叉乘<=0
      // AB AD 叉乘<=0

      // AC AB 叉乘 详见向量公式以及叉乘公式
      const u = (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1)
      // AD AB 叉乘
      const v = (x4 - x1) * (y2 - y1) - (x2 - x1) * (y4 - y1)
      // 以下同理 即对于另一条线段也要判断是否在两侧
      const w = (x1 - x3) * (y4 - y3) - (x4 - x3) * (y1 - y3)
      const z = (x2 - x3) * (y4 - y3) - (x4 - x3) * (y2 - y3)
      return u * v <= 0.00000001 && w * z <= 0.00000001
    },
    /* 传入坐标 移除该坐标所在的线段 */
    removeThisLine (index) {
      let start = 0
      let end = 0
      for (let i = index; i >= 0; i--) {
        if (this.trace[i].end) {
          start = i + 1
          break
        }
      }
      for (let i = index; i < this.trace.length; i++) {
        if (this.trace[i].end) {
          end = i
          break
        }
      }
      this.trace.splice(start, end - start + 1)
      // console.log(this.trace)
      this.rePaint()
    },
    eraserTrigger () {
      this.eraserFlag = !this.eraserFlag
      const cursorIcon = require('./eraser.png') // base64
      this.canvas.style.cursor = this.eraserFlag
        ? `url(${cursorIcon}),auto`
        : 'default'
      this.$emit('updateEraserFlag', this.eraserFlag)
      this.eraserTrace = [] // 清空上一次的橡皮擦轨迹数组
    },
    image2Canvas (penFlag) {
      const img = new Image()
      console.log(this.imageToInsert)
      img.src = this.imageToInsert
      // 异步事件的使用要特别注意
      img.onload = function () {
        // this.cxt.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        const preColor = this.color
        this.colorChange('#FFFFFF')
        this.cxt.drawImage(img, 0, 0)
        this.colorChange(preColor)
        // 重画之前的轨迹
        if (this.trace.length > 0 && penFlag) {
          this.penShapeCompute()
        } else {
          this.rePaintTrace()
        }
      }.bind(this)
    },
    /* 导入的图片显示在canvas上 */
    drawImageOnCanvas () {
      // this.clearCanvas()
      // this.clearTrace()
      this.image2Canvas()
    },
    /* 导入图片 */
    imageInput () {
      this.imageInputBtn.click()
    },
    /* test */
    // findMark () {
    //   var em = []
    //   for (var i = 0; i < this.trace.length; i++) {
    //     if (this.trace[i].end === true) {
    //       em.push(i)
    //     }
    //   }
    //   console.log(this.trace)
    //   console.log(em)
    // },
    /* 撤回轨迹的上一步 切割数组 */
    traceBackWard () {
      if (this.trace.length === 0) {
        alert('当前不存在可撤回轨迹')
        return
      }
      let backFlag = true
      // this.findMark()
      // console.log(this.trace)
      // 逆序遍历
      for (let i = this.trace.length - 2; i >= 0; i--) {
        if (this.trace[i].end === true) {
          this.trace = this.trace.slice(0, i + 1)
          backFlag = false
          break
        }
      }
      if (backFlag) {
        this.trace = []
      }
      this.rePaint() // 重新绘制之前的轨迹 也是在这一步导致导入的图片消失
    },
    /* 文件导入 */
    fileInput () {
      this.fileInputBtn.click() // 触发真正的文件导入按钮
    },
    /* 保存轨迹文件 */
    saveTraceAsJSON () {
      const content = JSON.stringify(this.trace) // 转换为JSON格式
      const jsonLink = document.createElement('a')
      jsonLink.download = 'trace.json'
      const blob = new Blob([content]) // 字符内容变为blob地址
      jsonLink.href = URL.createObjectURL(blob)
      jsonLink.click()
      this.$emit('uploadTraceJSONToFather', content)
    },
    /* 橡皮擦输入轨迹 */
    eraserTraceInput (x, y) {
      this.eraserTrace.push({ x: x, y: y })
    },
    /* 输入轨迹起点 起点记录标志位 颜色 宽度 */
    traceInputBegin (x, y, flag, color, width) {
      this.trace.push({
        x: x,
        y: y,
        start: flag,
        color: color,
        width: width
      })
    },
    /* 输入轨迹 */
    traceInput (x, y, flag) {
      this.trace.push({
        x: x,
        y: y,
        end: flag
      })
    },
    /* 利用轨迹数据重新绘制 */
    rePaintTrace () {
      let branchFlag = true
      // 遍历轨迹对象
      for (let i = 0; i < this.trace.length; i++) {
        // console.log(this.trace[i])
        if (branchFlag) {
          this.beginAndMove(this.trace[i].x, this.trace[i].y)
          branchFlag = false
          if (this.trace[i].start) {
            this.colorChange(this.trace[i].color)
            this.penSizeChange(this.trace[i].width)
          }
          continue
        }
        if (this.trace[i].end) {
          branchFlag = true
        }
        this.draw(this.trace[i].x, this.trace[i].y)
      }
    },
    rePaint () {
      this.clearCanvas() // 重绘首先清空画布 这一步必须清除画布 因为撤回的原理是把分割后的数组重新绘制 这一步清空数组也导致了之前导入图片的消失

      // 重画之前的图片 如果再这一步加重画图片 会导致之前的轨迹全部消失
      if (this.imageToInsert) {
        this.drawImageOnCanvas()
      }
      this.rePaintTrace()
      // console.log(this.trace)
      // console.log(this.trace)
    },
    /* 改变笔触颜色 注意要改两种颜色一种是线的颜色 一种时阴影的颜色 */
    colorChange (color) {
      this.color = color
      this.cxt.strokeStyle = this.color
      this.cxt.shadowColor = this.color
    },
    /* 改变笔触粗细 注意笔触属性接受值为number */
    penSizeChange (width) {
      // console.log(e) // e.data
      // console.log(typeof this.lineWidth) //用户输入均为字符串
      this.width = width
      let lineWidth = Number(this.width)
      if (lineWidth <= 0 || lineWidth > 10 || isNaN(lineWidth)) {
        // 范围判定 只接受1-10
        // console.log('请输入1-10以内的数值')
        lineWidth = 5 // 恢复原值
        this.cxt.lineWidth = lineWidth
        return
      }
      this.cxt.lineWidth = lineWidth // 更改canvas设置
    },
    /* 改变保存图片类型 */
    imgTypeChange (value) {
      // console.log(value) //{key: "jpeg", label: " jpg "}
      this.imageType = value.key
    },
    /* 获取DOM元素 */
    getDOMEl () {
      this.canvas = document.querySelector('#canvas')
      this.fileInputBtn = document.querySelector('#fileInputBtn')
      this.imageInputBtn = document.querySelector('#imageInputBtn')
    },
    /* canvas可用性测试 */
    canvasSupTest () {
      if (!(this.canvas.getContext && this.canvas.getContext('2d'))) {
        const section = document.createElement('section') // 创建section元素
        section.className = 'errorCanvas'
        section.innerHTML = '对不起，当前浏览器不支持canvas'
        this.canvas.prepend(section)
        throw new Error('对不起，当前浏览器不支持canvas') // 终止代码运行
      }
    },
    /* 属性初始化 */
    porpertyInit (flag = false) {
      // 这里设置宽高等于可见宽高很重要
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight
      this.cxt = this.canvas.getContext('2d')
      this.cxt.fillStyle = this.canvasBgColor // 填充颜色设定
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height) // 画一个矩形 大小占满canvas 当做背景
      // this.drawBackground()
      this.cxt.strokeStyle = this.lineColor // 边框颜色设定
      this.cxt.lineWidth = this.lineWidth // 线条粗细设定
      this.cxt.lineCap = 'round' // 线条末端设定 为圆形
      this.cxt.lineJoin = 'round' // 线条交汇处设定 为圆形边角
      // 利用阴影 消除锯齿 注意颜色与线条颜色保持一致
      this.cxt.shadowBlur = 1
      this.cxt.shadowColor = this.lineColor
    },
    /* 创建路径与移动触点 */
    beginAndMove (x, y) {
      this.cxt.beginPath() // 创建新路径
      this.cxt.moveTo(x, y) // 移动触点
    },
    /* 鼠标移动绘画 */
    draw (x, y) {
      this.cxt.lineTo(x, y)
      this.cxt.stroke()
    },
    /* 闭合路径 PC请勿使用？ */
    close () {
      // this.cxt.closePath()
    },
    /* 下载签名并保存成图片 应该接收参数决定保存成图片的类型 */
    download () {
      let img = ''
      if (this.imageType === 'jpg') {
        img = this.canvas.toDataURL('image/jpeg', 1)
      } else if (this.imageType === 'png') {
        img = this.canvas.toDataURL('image/png')
      }
      const downLoadLink = document.createElement('a')
      downLoadLink.download = 'mySignature'
      downLoadLink.href = img
      // console.log(downLoadLink)
      downLoadLink.click() // 触发点击事件进行下载
      this.$emit('uploadImageToFather', img)
    },
    clear () {
      // this.clearTrace()
      // 把导入的图片和画布一起清除
      // this.image = ''
      this.clearCanvas()
      this.image = ''
      // this.imageToInsert = ''
      this.file = ''
      this.newTrace = []
    },
    /* 清除当前canvas的内容 */
    clearCanvas () {
      this.cxt.clearRect(
        0,
        0,
        this.canvas.width / this.magnifi,
        this.canvas.height / this.magnifi
      )

      this.cxt.fillRect(
        0,
        0,
        this.canvas.width / this.magnifi,
        this.canvas.height / this.magnifi
      ) // 再绘制一次背景因为会连背景也清除
      // this.drawBackground()
    },
    /* 清除当前轨迹数据 */
    clearTrace () {
      this.trace.splice(0, this.trace.length)
      this.imageToInsert = ''
      // this.trace = []
      // this.clearCanvas()
    }
  },
  components: {},
  mounted () {
    this.getDOMEl() // 获取DOM元素
    this.canvasSupTest() // canvas可用性测试
    this.porpertyInit() // 初始化属性
    this.mobileCompute() // 计算移动端偏移值
    // 判断pc端还是移动端
    if (this.isMobile()) {
      /*
      移动端  回调函数使用bind传入this
    */
      // 开始绘制 touchstart 手指触摸时触发
      this.canvas.addEventListener(
        'touchstart',

        function (e) {
          // console.log(e)
          // console.log(e.changedTouches[0].pageX,event.changedTouches[0].pageY)
          /*
        e.changedTouches[0].pageX 触点的X坐标
        e.changedTouches[0].pageY 触点的Y坐标
        */
          // console.log('start')
          if (!this.eraserFlag) {
            const X = (e.changedTouches[0].pageX - this.minusX) / this.magnifi
            const Y = (e.changedTouches[0].pageY - this.minusY) / this.magnifi
            this.beginAndMove(X, Y)
            this.traceInputBegin(X, Y, true, this.color, this.width) // 记录鼠标开始时坐标
          }
        }.bind(this)
      )

      // 绘制中 touchmove 当手指在屏幕上滑动的时候连续地触发 思路为连续触发lineTo事件
      this.canvas.addEventListener(
        'touchmove',
        function (e) {
          if (!this.eraserFlag) {
            const X = (e.changedTouches[0].pageX - this.minusX) / this.magnifi
            const Y = (e.changedTouches[0].pageY - this.minusY) / this.magnifi
            this.traceInput(X, Y, false) // 记录鼠标移动时坐标
            this.draw(X, Y)
          }
        }.bind(this)
      )

      // 结束绘制 闭合线路
      this.canvas.addEventListener(
        'touchend',
        function (e) {
          if (!this.eraserFlag) {
            const X = (e.changedTouches[0].pageX - this.minusX) / this.magnifi
            const Y = (e.changedTouches[0].pageY - this.minusY) / this.magnifi
            if (this.trace.length > 0) {
              this.traceInput(X, Y, true) // 记录鼠标结束时坐标
            }
            this.draw(X, Y)
            // this.close()
            // this.penShape() // 抬笔添加笔锋
          }
          // console.log('end', this.trace)
        }.bind(this)
      )
      /* 禁止移动端默认拖拽事件 */
      document.body.addEventListener(
        'touchmove',
        function (e) {
          e.preventDefault()
        },
        { passive: false }
      )
      /* 移动端橡皮擦 */
      this.canvas.addEventListener(
        'touchstart',
        function (e) {
          if (this.eraserFlag) {
            const X = (e.changedTouches[0].pageX - this.minusX) / this.magnifi
            const Y = (e.changedTouches[0].pageY - this.minusY) / this.magnifi
            if (this.eraserTrace.length === 2) {
              // 清除上一次的轨迹
              this.eraserTrace = []
            }
            this.eraserTraceInput(X, Y)
            // console.log(this.eraserTrace)
          }
        }.bind(this)
      )

      this.canvas.addEventListener(
        'touchend',
        function (e) {
          // console.log(this.eraserFlag)
          if (this.eraserFlag) {
            const X = (e.changedTouches[0].pageX - this.minusX) / this.magnifi
            const Y = (e.changedTouches[0].pageY - this.minusY) / this.magnifi
            this.eraserTraceInput(X, Y)
            // console.log(this.eraserTrace)
            // 相交检测并根据检测结果擦除
            this.eraserTheLine()
            this.eraserTrace = []
          }
        }.bind(this)
      )
    } else {
      /*
      PC端  回调函数使用bind传入this
    */
      this.canvas.addEventListener(
        'mousedown',
        function (e) {
          // console.log(e)
          if (!this.eraserFlag) {
            const X = e.layerX / this.magnifi
            const Y = e.layerY / this.magnifi
            this.traceInputBegin(X, Y, true, this.color, this.width) // 记录鼠标开始时坐标
            this.beginAndMove(X, Y)
            this.flag = true // 鼠标移动绘制时的标志量
          }
        }.bind(this)
      )
      this.canvas.addEventListener(
        'mousemove',
        function (e) {
          if (!this.eraserFlag && this.flag) {
            const X = e.layerX / this.magnifi
            const Y = e.layerY / this.magnifi
            this.traceInput(X, Y, false) // 记录鼠标移动时坐标
            this.draw(X, Y)
          }
        }.bind(this)
      )
      this.canvas.addEventListener(
        // 这个事件很重要 否则在使用导航栏时会出现bug
        'mouseout',
        function (e) {
          // this.traceInput(e.pageX, e.pageY, true)
          this.flag = false // 标志归位
        }.bind(this)
      )
      this.canvas.addEventListener(
        'mouseup',
        function (e) {
          if (!this.eraserFlag) {
            const X = e.layerX / this.magnifi
            const Y = e.layerY / this.magnifi
            if (this.trace.length > 0) {
              this.traceInput(X, Y, true) // 记录鼠标结束时坐标
            }
            this.flag = false // 标志归位
            this.draw(X, Y)
            // this.penShape() // 抬笔添加笔锋
          }

          // console.log(this.trace)
        }.bind(this)
      )

      /* PC端橡皮擦 */
      this.canvas.addEventListener(
        'mousedown',
        function (e) {
          if (this.eraserFlag) {
            const X = e.layerX / this.magnifi
            const Y = e.layerY / this.magnifi
            if (this.eraserTrace.length === 2) {
              // 清除上一次的轨迹
              this.eraserTrace = []
            }
            this.eraserTraceInput(X, Y)
            // console.log(this.eraserTrace)
          }
        }.bind(this)
      )

      this.canvas.addEventListener(
        'mouseup',
        function (e) {
          // console.log(this.eraserFlag)
          if (this.eraserFlag) {
            const X = e.layerX / this.magnifi
            const Y = e.layerY / this.magnifi
            this.eraserTraceInput(X, Y)
            // console.log(this.eraserTrace)
            // 相交检测并根据检测结果擦除
            this.eraserTheLine()
            this.eraserTrace = []
          }
        }.bind(this)
      )
    }

    /* 检测窗口变化大小 如果发生变化会清除面板和重绘数据 */
    window.addEventListener(
      'orientationchange',
      function () {
        // orientationchange事件必须设置延迟 不然宽高获取会出错
        // alert('resize')
        setTimeout(() => {
          this.mobileCompute() //
          // console.log(this.minusX, this.minusY)
          this.porpertyInit() // 需要重新初始化属性
          this.rePaint()
        }, 200)

        // this.clearTrace() // 需要清除重绘数据
      }.bind(this)
    )
    /* 文件选择并导入新轨迹 */
    this.fileInputBtn.addEventListener(
      'change',
      function (e) {
        this.file = e.target.files
        // console.log(this.file)
        const reader = new FileReader()
        reader.readAsText(this.file[0])
        reader.onload = function () {
          this.newTrace = JSON.parse(reader.result)
          this.trace = this.trace.concat(this.newTrace)
        }.bind(this)
      }.bind(this)
    )
    this.fileInputBtn.addEventListener('click', function (e) {
      this.value = ''
    })
    /* 图片导入 */
    this.imageInputBtn.addEventListener(
      'change',
      function (e) {
        this.image = e.target.files
        const reader = new FileReader()
        reader.readAsDataURL(this.image[0])
        reader.onload = function (e) {
          this.imageToInsert = e.target.result
          // console.log(this.imageToInsert)
          this.drawImageOnCanvas()
        }.bind(this)
      }.bind(this)
    )
    this.imageInputBtn.addEventListener('click', function (e) {
      this.value = ''
    })
  }
}
</script>

<style scoped>
#fileInputBtn {
  position: absolute;
  /* z-index: 99; */
  left: 8px;
  display: none;
}
.colorPicker {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%); /* 50%为自身尺寸的一半 */
}

.extra-show-item {
  overflow: visible;
}
.pen-width-input {
  width: 43px;
}
.btn-text {
  margin-left: 0 !important;
}
.small-margin-right {
  margin-right: 5px;
}
.small-width {
  padding: 0 10px;
}
.menu-item {
  padding: 5px;
}
.menu-item > span {
  font-size: 15px;
}
.canvas-menu {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
}
.canvas_container {
  position: relative;
  width: 100%;
  height: 100%;
}
.canvas_container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<style>
.m-colorPicker .box {
  position: absolute;
  left: -681%;
  top: 169%;
}
</style>
