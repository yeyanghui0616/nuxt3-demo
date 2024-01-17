<template>
</template>
<script setup lang="ts">
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";

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




  //  创建立方体
  const geometry = new THREE.BoxGeometry(1,1,1);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // 创建网格
  const cube = new THREE.Mesh(geometry, material);
  const parentCube =  new THREE.Mesh(geometry, parentMaterial);
  // parentCube.position.set(-2,0,0,)
  // // 子元素的位置是相对于父元素的， 局部坐标 （没有父元素的话，就是相对于世界坐标）
  // cube.position.set(2,0,0,)
  // // 缩放，也是局部缩放，父元素放大了，子元素也会放大
  // cube.scale.set(2,2,2)


  cube.rotation.x = Math.PI / 4
  parentCube.add(cube)
  // 添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
  scene.add(parentCube);

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

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

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

  // 全屏
  renderer.domElement.requestFullscreen()

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
