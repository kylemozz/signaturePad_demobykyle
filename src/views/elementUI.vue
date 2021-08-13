<template>
  <div class="container">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item class="menu-item" index="1"
        ><el-button @click="download()">保存</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="2">
        格式：
        <el-select
          class="selectModule"
          v-model="imageType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.vlaue"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-menu-item>
      <el-menu-item class="menu-item" index="3"
        ><el-button @click="clear()">清除</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="4"
        ><el-button
          :type="btnHighlight || imgFlag ? 'primary' : ''"
          @click="repaint()"
          >重绘</el-button
        ></el-menu-item
      >
      <el-menu-item class="menu-item" index="5"
        ><el-button
          :type="btnHighlight || imgFlag ? 'primary' : ''"
          @click="clearTrace()"
          >清除重绘</el-button
        ></el-menu-item
      >
      <el-menu-item class="menu-item" index="6"
        ><el-button
          :type="btnHighlight || imgFlag ? 'primary' : ''"
          @click="saveTraceAsJSON()"
          >导出重绘</el-button
        ></el-menu-item
      >
      <el-menu-item class="menu-item" index="7"
        ><el-button @click="fileInput()">导入重绘</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="7" @click="imageInput()"
        ><el-button>导入图片</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="7"
        ><el-button @click="traceBackWard()">撤回</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="7"
        ><el-button :type="eraserFlag ? 'primary' : ''" @click="eraserTrigger()"
          >橡皮擦</el-button
        ></el-menu-item
      >
      <el-menu-item class="menu-item" index="7"
        ><el-button @click="penShape()">笔锋</el-button></el-menu-item
      >
      <el-menu-item class="menu-item" index="7">
        <span>粗细：</span>
        <el-input
          class="width-input"
          placeholder="输入粗细"
          v-model="width"
          clearable
          @blur="penSizeChange(width)"
        >
        </el-input>
      </el-menu-item>
      <el-menu-item class="menu-item" index="7">
        <span>颜色：</span>
        <el-color-picker
          @change="colorChange(color)"
          v-model="color"
        ></el-color-picker>
      </el-menu-item>
    </el-menu>
    <signatureCore
      @updateBtnHight="updateBtnHight"
      @updateImgFlag="updateImgFlag"
      @updateEraserFlag="updateEraserFlag"
      @uploadImageToFather="uploadImageToFather"
      @uploadTraceToFather="uploadTraceJSONToFather"
      :imageType="imageType"
      :lineWidth="Number(width)"
      :lineColor="color"
      ref="sigCore"
    />
  </div>
</template>

<script>
import signatureCore from './Signature/SignatureCore.vue'
export default {
  data () {
    return {
      options: [
        {
          value: 'jpg',
          label: 'jpg'
        },
        {
          value: 'png',
          label: 'png'
        }
      ],
      imageType: 'jpg', // 传入子组件的图片类型
      btnHighlight: false, // 按钮高亮标志量
      eraserFlag: false, // 橡皮擦标志位
      imgFlag: false, // 图片缓存标志量
      width: 3, // 笔粗细
      color: '#000' // 笔颜色
    }
  },
  methods: {
    /* 下载功能入口 */
    download () {
      this.$refs.sigCore.download()
    },
    /* 清除功能入口 */
    clear () {
      this.$refs.sigCore.clear()
    },
    /* 重绘功能入口 */
    repaint () {
      this.$refs.sigCore.rePaint()
    },
    /* 重绘导入功能入口 */
    fileInput () {
      this.$refs.sigCore.fileInput()
    },
    /* 清除重绘功能入口 */
    clearTrace () {
      this.$refs.sigCore.clearTrace()
    },
    /* 导出重绘功能入口 */
    saveTraceAsJSON () {
      this.$refs.sigCore.saveTraceAsJSON()
    },
    /* 导入图片功能入口 */
    imageInput () {
      this.$refs.sigCore.imageInput()
    },
    /* 撤回功能入口 */
    traceBackWard () {
      this.$refs.sigCore.traceBackWard()
    },
    /* 橡皮擦功能入口 */
    eraserTrigger () {
      this.$refs.sigCore.eraserTrigger()
    },
    /* 笔锋功能入口 */
    penShape () {
      this.$refs.sigCore.penShape()
    },
    /* 笔粗细改变功能入口 */
    penSizeChange (width) {
      this.$refs.sigCore.penSizeChange(width)
    },
    /* 笔颜色改变功能入口 */
    colorChange (color) {
      this.$refs.sigCore.colorChange(color)
    },
    /* 更新按钮标志量 */
    updateBtnHight (newValue) {
      this.btnHighlight = newValue
    },
    /* 更新图片标志量 */
    updateImgFlag (newValue) {
      this.imgFlag = newValue
    },
    /* 更新橡皮擦标志量 */
    updateEraserFlag (newValue) {
      console.log(newValue)
      this.eraserFlag = newValue
    },
    // 内部图片传出
    uploadImageToFather (img) {
      // console.log(img)
      this.img = img
    },
    // 内部json传出
    uploadTraceJSONToFather (traceJSON) {
      this.traceJSON = traceJSON
      console.log(this.traceJSON)
    },
    injectJSON () { // 向手写板传入JSON
      // 获取json文件的请求
      var json = 'hello just test'
      this.$refs.sigCore.injectJSON(json)
    },
    injectImage () { // 向手写板传入image
      // 获取图片文件的请求
      var image = 'hello I am image' // 格式 data:image/jpeg;base64
      this.$refs.sigCore.injectImage(image)
    }
  },
  components: { signatureCore }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.selectModule {
  width: 100px;
}
.menu-item {
  padding: 0 5px;
}
.width-input {
  max-width: 80px;
}
</style>
