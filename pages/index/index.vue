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

// 导入tween
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'

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
  camera.position.z = 15;
  camera.position.x = 0
  camera.position.y = 0
  camera.lookAt(0,0,0)

  // 渲染场景
  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    // 更新tween
    tween.update()
  };


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


  // 创建三个球
  const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
  )
  sphere1.position.x = 4
  scene.add(sphere1)

  // 创建一个补间对象
  const tween = new TWEEN.Tween(sphere1.position)
  tween.to({x:-4}, 1000)
  tween.onUpdate(()=>{
    // console.log("%c ---> : 2121","color:#F0F;", sphere1.position.x);
  })
  // 循环无数次
  // tween.repeat(Infinity)
  // // 循环往复
  // tween.yoyo(true)
  // 延迟运行
  // tween.delay(3000)
  // 设置缓动函数
  tween.easing(TWEEN.Easing.Quadratic.InOut)


  const tween2 = new TWEEN.Tween(sphere1.position)

  tween2.to({y: -14}, 2000)

  tween.chain(tween2)

  // 启动补间动画
  tween.start()

  const params = {
    stop: function(){
      tween.stop()
    }
  }
  gui.add(params, 'stop')
  animate()
  // 全面讲解uv贴图
  // 法向量属性应用与法向量辅助器
  // 几何体顶点转化-位移-缩放-旋转
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
