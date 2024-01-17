<template>
</template>
<script setup lang="ts">
import * as THREE from 'three';


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
  //create a blue LineBasicMaterial
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( geometry, material );
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
  scene.add(line);

  // 设置相机位置
  camera.position.z = 12;
  camera.position.x = 12;
  camera.lookAt(0,0,0)

  // 渲染场景
  const animate = () => {
    requestAnimationFrame(animate);

    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate()

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
