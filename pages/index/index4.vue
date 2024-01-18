<template>
</template>
<script setup lang="ts">
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 导入gltf加载器
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

onMounted (()=>{
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
      55,  // 视角，越大，看到的东西越多
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000); // 远平面


  // 创建渲染器
  const renderer = new  THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


  // 添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );



  const controls = new OrbitControls( camera, renderer.domElement );
  // 设置带阻尼的惯性
  controls.enableDamping = true
  // 设置阻尼系数
  controls.dampingFactor = 0.02


  // 设置相机位置
  camera.position.z = 10;
  camera.position.x = 0
  camera.position.y = 0
  camera.lookAt(0,0,0)

  // 渲染场景
  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };

  animate()

  window.addEventListener('resize', ()=>{
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机投影矩阵
    camera.updateProjectionMatrix()
  })


  let eventObj = {
    FullScreen: function () {
      // body全屏
      document.body.requestFullscreen()
      // 画布的全屏
      // renderer.domElement.requestFullscreen()
    },
    ExitFullScreen: function () {
      // 退出全屏
      document.exitFullscreen()
    }
  }

  // 创建GUI
  const gui = new GUI()
  // 添加按钮
  gui.add(eventObj, 'FullScreen').name('全屏')
  gui.add(eventObj, 'ExitFullScreen').name('退出全屏')


  // 实例化加载器gltf
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('/textures/tiny_city_4k.glb', (gltf)=>{
    console.log("%c ---> gltf: ","color:#F0F;", gltf);
    scene.add(gltf.scene)
    // scene.background = new THREE.Color(0x999999)
  })

  // // 实例化解析器
  // const dracoLoader = new DRACOLoader()
  // dracoLoader.setDecoderPath('./draco/')
  //
  // gltfLoader.setDRACOLoader(dracoLoader)
  //
  gltfLoader.load('/textures/雕塑11 (1).gltf', (gltf)=>{
    console.log("%c ---> gltf: ","color:#F0F;", gltf);
    scene.add(gltf.scene)
    // scene.background = new THREE.Color(0x999999)
  })

  // 加载环境贴图
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('/textures/small_empty_room_1_1k.hdr', (envMap)=>{
    // 球面的全景图映射
    envMap.mapping = THREE.EquirectangularReflectionMapping
    // 设置环境贴图
    scene.environment = envMap
  })

})


</script>


<style>
*{
  margin: 0;
  padding: 0;
}
canvas{
  width: 100vw;
  height: 100vh;
}

</style>
