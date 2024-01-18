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
  camera.position.z = 15;
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


  // 创建三个球
  const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
  )
  sphere1.position.x = 4
  scene.add(sphere1)
  // 创建三个球
  const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x000ff0
      })
  )
  sphere2.position.x = 0
  scene.add(sphere2)
  // 创建三个球
  const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x0ff0f0
      })
  )
  sphere2.position.x = -4
  scene.add(sphere3)

  // 创建射线
  const raycaster = new THREE.Raycaster()

  // 创建鼠标向量，保存鼠标点在了画布的哪个位置上
  const mouse = new THREE.Vector2()

  window.addEventListener('click',(event)=>{
    // 转化鼠标向量的x和y
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY/ window.innerHeight) * 2 + 1
    console.log("%c ---> mouse.x, mouse.y: ","color:#F0F;", mouse.x, mouse.y);

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera)

    // 计算射线与物体的焦点
    const intersects = raycaster.intersectObjects([sphere1,sphere2,sphere3])
    if(intersects.length>0){
      if(intersects[0].object._isSelected){
        intersects[0].object.material.color.set(intersects[0].object._originColor)
        intersects[0].object._isSelected = false
        return
      }

      intersects[0].object._isSelected = true
      intersects[0].object._originColor = intersects[0].object.material.color.getHex()
      intersects[0].object.material.color.set(0xff0000)
    }
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
