<template>
</template>
<script setup lang="ts">
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 引入HDR加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


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
  camera.position.z = 12;
  camera.position.x = 2
  camera.position.y = 2
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


  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader();
  // 加载纹理
  const texture = textureLoader.load('/textures/Material_2068.webp');

  // 加载ao 环境遮挡贴图
  const aoTexture = textureLoader.load('/textures/Material_2073.webp');

  // 加载透明度贴图
  const  alphaMap =  textureLoader.load('/textures/Material_2078.webp');

  // 加载光照贴图
  const lightMap = textureLoader.load('/textures/Material_2088.webp');


  // 加载高光贴图
  const specularMap = textureLoader.load('/textures/Material_2088.webp');

  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('/textures/small_empty_room_1_1k.hdr', (envMap)=>{
    // 设置球形映射
    envMap.mapping = THREE.EquirectangularReflectionMapping
    // 设置环境贴图
    scene.background = envMap
    // 给场景plane设置环境贴图
    planeMaterial.envMap = envMap
  })


  const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
  const planeMaterial = new THREE.MeshBasicMaterial( {
    color: 0xffffff,
    transparent: true,
    map: texture,
    aoMap: aoTexture,
    alphaMap: alphaMap,
    specularMap: specularMap
    // lightMap:lightMap,
    // reflectivity:0.1 // 反射强度
  } );
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  scene.add( plane );

  gui.add(planeMaterial, 'aoMapIntensity').min(0).max(1).name('ao强度')
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
