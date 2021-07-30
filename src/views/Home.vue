<template>
  <div class="home">
    <div class="imagePad">
      <img :src="img" alt="" />
      <button @click="injectJSON">输入测试</button>
    </div>
    <div class="signaturePad">
      <signature ref="signaturePad"
        :lineWidth="2"
        :lineColor="color"
        v-on:uploadImageToFather="uploadImageToFather"
        v-on:uploadTraceToFather="uploadTraceJSONToFather"
      ></signature>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Signature from './Signature/Signature.vue'

export default {
  data () {
    return {
      color: '#FF1E02',
      img: '',
      traceJSON: ''
    }
  },
  name: 'Home',
  components: {
    Signature
  },
  methods: {
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
      this.$refs.signaturePad.injectJSON(json)
    },
    injectImage () { // 向手写板传入image
      // 获取图片文件的请求
      var image = 'hello I am image' // 格式 data:image/jpeg;base64
      this.$$refs.signaturePad.injectImage(image)
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
}
.imagePad {
  height: 50%;
}
.signaturePad {
  position:absolute;
  width: 1200px;
  height: 300px;
  bottom: 20px;
  left: 20px;
}
</style>
