<template>
  <div class="canvas_container">
    <canvas id="canvas"></canvas>
    <a-menu mode="horizontal" class="canvas-menu">
      <a-menu-item class="menu-item">
        <a-button
          class="menu-btn small-width"
          id="clearCanvas"
          @click="download()"
          ><a-icon class="small-margin-right" type="download" /><span
            class="btn-text"
            >保存</span
          ></a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        格式：
        <a-select
          label-in-value
          :default-value="{ key: 'jpg' }"
          style="width: 70px"
          @change="imgTypeChange"
          class="img-type"
        >
          <a-select-option value="png">
            png
          </a-select-option>
          <a-select-option value="jpg">
            jpg
          </a-select-option>
          <!-- <a-select-option value="svg">
            svg
          </a-select-option> -->
        </a-select>
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" id="saveCanvas" @click="clear()"
          ><a-icon class="small-margin-right" type="delete" /><span
            class="btn-text"
            >清除</span
          ></a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button
          @click="rePaint()"
          class="menu-btn small-width"
          :type="btnHighlight ? 'primary' : ''"
          >重绘</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button
          @click="clearTrace()"
          class="menu-btn small-width"
          :type="btnHighlight ? 'primary' : ''"
          >清除重绘</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button
          class="menu-btn small-width"
          @click="saveTraceAsJSON()"
          :type="btnHighlight ? 'primary' : ''"
          >导出重绘</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="fileInput()"
          >导入重绘</a-button
        >
        {{ file.length > 0 ? file[0].name : "none" }}
        <input id="fileInputBtn" type="file" multiple />
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="imageInput()"
          >导入图片</a-button
        >
        {{ image.length > 0 ? image[0].name : "none" }}
        <input style="display:none;" id="imageInputBtn" type="file" multiple />
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="traceBackWard()"
          >撤回</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button
          :type="eraserFlag ? 'primary' : ''"
          class="menu-btn small-width"
          @click="eraserTrigger()"
          >橡皮擦</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="penShape()"
          >笔锋</a-button
        >
      </a-menu-item>
      <!-- <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="findMark()"
          >断点</a-button
        >
      </a-menu-item> -->
      <!-- <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="wdMonitor()"
          >窗口</a-button
        >
      </a-menu-item> -->
      <!-- <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="dataTest()"
          >导出测试</a-button
        >
      </a-menu-item>
      <a-menu-item class="menu-item">
        <a-button class="menu-btn small-width" @click="dataTest2()"
          >导入测试</a-button
        >
      </a-menu-item> -->
      <a-menu-item class="menu-item">
        <span>粗细：</span
        ><a-input
          v-model="lineWidth"
          @blur="penSizeChange"
          class="pen-width-input"
      /></a-menu-item>

      <a-menu-item class="menu-item">
        <span>颜色：</span>
        <colorPicker
          @change="colorChange"
          class="colorPicker"
          v-model="lineColor"
        />
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvas: '', // canvas画布
      lineWidth: '', // 线条宽度 默认为5
      lineColor: '', // 线条颜色
      canvasBgColor: '', // 绘画框背景颜色
      cxt: '', // canvas的context,
      imageType: 'jpg', // 将要保存的图片类型 默认jpg
      trace: [], // 轨迹变量数据
      flag: '', // 鼠标移动时的标志量
      btnHighlight: false, // 按钮高亮标志量
      file: '', // 传入的文件
      fileInputBtn: '', // 文件选择输入按钮
      imageInputBtn: '', // 图片选择输入按扭
      image: '', // 导入的图片
      imageToInsert: '', // 要导入canvas的图片
      newTrace: '', // 导入的新轨迹
      // ImageData: ''
      eraserFlag: false, // 橡皮擦功能启动标志位
      eraserTrace: [] // 橡皮擦轨迹
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
    }
  },
  methods: {
    // dataTest () {
    //   this.ImageData = this.cxt.getImageData(
    //     0,
    //     0,
    //     this.canvas.width,
    //     this.canvas.height
    //   )
    //   console.log(ImageData)
    // },
    // dataTest2 () {
    //   this.cxt.putImageData(this.ImageData, 0, 0)
    // },
    /* 笔锋测试 核心思路为线的宽度逐渐减少 */
    penShape () {
      var index = [] // 每条线段的终点坐标
      var len = []
      for (var j = 0; j < this.trace.length; j++) {
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

      console.log(len)
      // var count = 0
      var decay = (this.lineWidth - 0) / len[0] // 宽度衰减值
      // console.log(decay)
      var branchFlag = true
      // 遍历轨迹对象
      for (var i = 0; i < this.trace.length; i++) {
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
          decay = (this.lineWidth - 0) / len[0]
          // count += 1
          console.log(decay)
        }
      }
      // console.log(count)
    },
    /* 遍历轨迹数组 并根据检测结果擦除 */
    eraserTheLine () {
      for (var i = 0; i < this.trace.length - 1; i++) {
        // 第一个点不能是终点 以防错误连线检测
        if (!this.trace[i].end) {
          // 相交检测
          var x1 = this.eraserTrace[0].x
          var y1 = this.eraserTrace[0].y
          var x2 = this.eraserTrace[1].x
          var y2 = this.eraserTrace[1].y
          var x3 = this.trace[i].x
          var y3 = this.trace[i].y
          var x4 = this.trace[i + 1].x
          var y4 = this.trace[i + 1].y
          var res = this.judgeIntersect(x1, y1, x2, y2, x3, y3, x4, y4)
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
      var conditon1 = Math.min(y1, y2) <= Math.max(y3, y4)
      // 2. cd最左端小于ab最右端
      var condition2 = Math.min(x3, x4) < Math.max(x1, x2)
      // 3. cd的最低点低于ab的最高点（加上条件1，两线段在竖直方向上重合）
      var condition3 = Math.min(y3, y4) < Math.max(y1, y2)
      // 4. ab的最左端小于cd的最右端
      var condition4 = Math.min(x1, x2) < Math.max(x3, x4)

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
      var u, v, w, z

      // AC AB 叉乘 详见向量公式以及叉乘公式
      u = (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1)
      // AD AB 叉乘
      v = (x4 - x1) * (y2 - y1) - (x2 - x1) * (y4 - y1)
      // 以下同理 即对于另一条线段也要判断是否在两侧
      w = (x1 - x3) * (y4 - y3) - (x4 - x3) * (y1 - y3)
      z = (x2 - x3) * (y4 - y3) - (x4 - x3) * (y2 - y3)
      return u * v <= 0.00000001 && w * z <= 0.00000001
    },
    /* 传入坐标 移除该坐标所在的线段 */
    removeThisLine (index) {
      var start = 0
      var end = 0
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
      this.eraserTrace = [] // 清空上一次的橡皮擦轨迹数组
    },
    image2Canvas () {
      var img = new Image()
      // console.log(this.imageToInsert)
      img.src = this.imageToInsert
      // 异步事件的使用要特别注意
      img.onload = function () {
        this.cxt.drawImage(img, 0, 0)
        // 重画之前的轨迹
        if (this.trace.length > 0) {
          this.rePaintTrace()
        }
      }.bind(this)
    },
    /* 导入的图片显示在canvas上 */
    drawImageOnCanvas () {
      // this.clearCanvas()
      // this.clearTrace()
      this.image2Canvas()
      // console.log(this.trace)
      // var img = new Image()
      // // console.log(this.imageToInsert)
      // img.src = this.imageToInsert
      // img.onload = function () {
      //   this.cxt.drawImage(img, 0, 0)
      // }.bind(this)
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
      var backFlag = true
      // this.findMark()
      // console.log(this.trace)
      // 逆序遍历
      for (var i = this.trace.length - 2; i >= 0; i--) {
        if (this.trace[i].end === true) {
          this.trace = this.trace.slice(0, i + 1)
          backFlag = false
          break
        }
      }
      if (backFlag) {
        this.trace = []
      }

      // this.findMark()
      // console.log(this.trace)

      this.rePaint() // 重新绘制之前的轨迹 也是在这一步导致导入的图片消失
    },
    /* 文件导入 */
    fileInput () {
      this.fileInputBtn.click() // 触发真正的文件导入按钮
    },
    /* 保存轨迹文件 */
    saveTraceAsJSON () {
      var content = JSON.stringify(this.trace) // 转换为JSON格式
      // var content = JSON.stringify(
      //   (this.ImageData = this.cxt.getImageData(
      //     0,
      //     0,
      //     this.canvas.width,
      //     this.canvas.height
      //   ))
      // )
      // console.log(content)
      var jsonLink = document.createElement('a')
      jsonLink.download = 'trace.json'
      var blob = new Blob([content]) // 字符内容变为blob地址
      jsonLink.href = URL.createObjectURL(blob)
      jsonLink.click()
    },
    /* 橡皮擦输入轨迹 */
    eraserTraceInput (x, y) {
      this.eraserTrace.push({ x: x, y: y })
    },
    /* 输入轨迹 */
    traceInput (x, y, flag) {
      this.trace.push({
        x: x,
        y: y,
        end: flag
      })
    },
    /* 窗口测试 */
    // wdMonitor () {
    //   console.log(this.canvas.width, this.canvas.height)
    //   console.log(window.innerWidth, window.innerHeight)
    // },
    /* 动画 */
    // animate () {
    //   window.requestAnimationFrame(this.rePaint)
    // },
    /* 利用轨迹数据重新绘制 */
    rePaintTrace () {
      var branchFlag = true
      // 遍历轨迹对象
      for (var i = 0; i < this.trace.length; i++) {
        // console.log(this.trace[i])
        if (branchFlag) {
          this.beginAndMove(this.trace[i].x, this.trace[i].y)
          branchFlag = false
          continue
        }
        if (this.trace[i].end) {
          branchFlag = true
        }
        /* 最后六个点改变lineWidth? */
        // if (this.trace.length - i === 10) {
        //   this.cxt.lineWidth -= 2
        // }
        this.draw(this.trace[i].x, this.trace[i].y)
      }
    },
    rePaint () {
      this.clearCanvas() // 重绘首先清空画布 这一步必须清除画布 因为撤回的原理是把分割后的数组重新绘制 这一步清空数组也导致了之前导入图片的消失

      // 重画之前的图片 如果再这一步加重画图片 会导致之前的轨迹全部消失
      if (this.image) {
        this.drawImageOnCanvas()
      }
      this.rePaintTrace()
      // console.log(this.trace)
    },
    /* 改变笔触颜色 注意要改两种颜色一种是线的颜色 一种时阴影的颜色 */
    colorChange () {
      this.cxt.strokeStyle = this.lineColor
      this.cxt.shadowColor = this.lineColor
    },
    /* 改变笔触粗细 注意笔触属性接受值为number */
    penSizeChange (e) {
      // console.log(e) // e.data
      // console.log(typeof this.lineWidth) //用户输入均为字符串
      this.lineWidth = Number(this.lineWidth)
      if (this.lineWidth <= 0 || this.lineWidth > 10 || isNaN(this.lineWidth)) {
        // 范围判定 只接受1-10
        console.log('请输入1-10以内的数值')
        this.lineWidth = 5 // 恢复原值
        this.cxt.lineWidth = this.lineWidth
        return
      }
      this.cxt.lineWidth = this.lineWidth // 更改canvas设置
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
    porpertyInit () {
      this.lineWidth = 5
      this.lineColor = '#000'
      this.canvasBgColor = '#fff'
      // 这里设置宽高等于可见宽高很重要
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight
      // this.windowToCanvas() // 强制与窗口化大小保持一致
      this.cxt = this.canvas.getContext('2d')
      this.cxt.fillStyle = this.canvasBgColor // 填充颜色设定
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height) // 画一个矩形 大小占满canvas 当做背景
      this.cxt.strokeStyle = this.lineColor // 边框颜色设定
      this.cxt.lineWidth = this.lineWidth // 线条粗细设定
      this.cxt.lineCap = 'round' // 线条末端设定 为圆形
      this.cxt.lineJoin = 'round' // 线条交汇处设定 为圆形边角
      // 利用阴影 消除锯齿
      this.cxt.shadowBlur = 1
      this.cxt.shadowColor = '#000'
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
      this.cxt.closePath()
    },
    /* 下载签名并保存成图片 应该接收参数决定保存成图片的类型 */
    download () {
      if (this.imageType === 'jpg') {
        var img = this.canvas.toDataURL('image/jpeg', 1)
      } else if (this.imageType === 'png') {
        img = this.canvas.toDataURL('image/png')
      }

      var downLoadLink = document.createElement('a')
      downLoadLink.href = img
      downLoadLink.download = 'mySignature'
      downLoadLink.click() // 触发点击事件进行下载
    },
    clear () {
      // this.clearTrace()
      // 把导入的图片和画布一起清除
      // this.image = ''
      this.clearCanvas()
    },
    /* 清除当前canvas的内容 */
    clearCanvas () {
      this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height) // 再绘制一次背景因为会连背景也清除
    },
    /* 清除当前轨迹数据 也会同时清除画布 */
    clearTrace () {
      this.trace.splice(0, this.trace.length)
      // this.trace = []
      // this.clearCanvas()
    },
    /* canvas画布强制跟着窗口大小(建议每次加载强制触发) 未真机测试 */
    windowToCanvas () {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }
  },
  components: {},
  mounted () {
    this.getDOMEl() // 获取DOM元素
    this.canvasSupTest() // canvas可用性测试
    this.porpertyInit() // 初始化属性

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
        if (!this.eraserFlag) {
          this.beginAndMove(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY
          )
          this.traceInput(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY,
            false
          ) // 记录鼠标开始时坐标
        }
      }.bind(this)
    )

    // 绘制中 touchmove 当手指在屏幕上滑动的时候连续地触发 思路为连续触发lineTo事件
    this.canvas.addEventListener(
      'touchmove',
      function (e) {
        if (!this.eraserFlag) {
          // console.log(e.changedTouches[0].pageX,event.changedTouches[0].pageY)
          this.traceInput(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY,
            false
          ) // 记录鼠标移动时坐标
          this.draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }
      }.bind(this)
    )

    // 结束绘制 闭合线路
    this.canvas.addEventListener(
      'touchend',
      function (e) {
        if (!this.eraserFlag) {
          this.traceInput(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY,
            true
          ) // 记录鼠标结束时坐标
          this.close()
        }
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
    /*
      PC端  回调函数使用bind传入this
    */
    this.canvas.addEventListener(
      'mousedown',
      function (e) {
        if (!this.eraserFlag) {
          this.traceInput(e.pageX, e.pageY, false) // 记录鼠标开始时坐标
          this.beginAndMove(e.pageX, e.pageY)
          this.flag = true // 鼠标移动绘制时的标志量
        }
      }.bind(this)
    )
    this.canvas.addEventListener(
      'mousemove',
      function (e) {
        if (!this.eraserFlag && this.flag) {
          this.traceInput(e.pageX, e.pageY, false) // 记录鼠标移动时坐标
          this.draw(e.pageX, e.pageY)
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
          this.traceInput(e.pageX, e.pageY, true) // 记录鼠标结束时坐标
          this.flag = false // 标志归位
        }

        // console.log(this.trace)
      }.bind(this)
    )

    /* 移动端橡皮擦 */
    this.canvas.addEventListener(
      'touchstart',
      function (e) {
        if (this.eraserFlag) {
          if (this.eraserTrace.length === 2) {
            // 清除上一次的轨迹
            this.eraserTrace = []
          }
          this.eraserTraceInput(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY
          )
          // console.log(this.eraserTrace)
        }
      }.bind(this)
    )

    this.canvas.addEventListener(
      'touchend',
      function (e) {
        // console.log(this.eraserFlag)
        if (this.eraserFlag) {
          this.eraserTraceInput(
            e.changedTouches[0].pageX,
            e.changedTouches[0].pageY
          )
          // console.log(this.eraserTrace)
          // 相交检测并根据检测结果擦除
          this.eraserTheLine()
        }
      }.bind(this)
    )

    /* PC端橡皮擦 */
    this.canvas.addEventListener(
      'mousedown',
      function (e) {
        if (this.eraserFlag) {
          if (this.eraserTrace.length === 2) {
            // 清除上一次的轨迹
            this.eraserTrace = []
          }
          this.eraserTraceInput(e.pageX, e.pageY)
          // console.log(this.eraserTrace)
        }
      }.bind(this)
    )

    this.canvas.addEventListener(
      'mouseup',
      function (e) {
        // console.log(this.eraserFlag)
        if (this.eraserFlag) {
          this.eraserTraceInput(e.pageX, e.pageY)
          // console.log(this.eraserTrace)
          // 相交检测并根据检测结果擦除
          this.eraserTheLine()
        }
      }.bind(this)
    )

    /* 检测窗口变化大小 如果发生变化会清除面板和重绘数据 */
    window.addEventListener(
      'resize',
      function () {
        // location.reload()
        // alert('window resize')
        this.porpertyInit() // 需要重新初始化属性
        // this.clearTrace() // 需要清除重绘数据
        this.rePaint()
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
    /* 图片导入 */
    this.imageInputBtn.addEventListener(
      'change',
      function (e) {
        this.image = e.target.files
        const reader = new FileReader()
        reader.readAsDataURL(this.image[0])
        reader.onload = function (e) {
          this.imageToInsert = e.target.result
          this.drawImageOnCanvas()
          // console.log(this.imageToInsert)
        }.bind(this)
      }.bind(this)
    )
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
