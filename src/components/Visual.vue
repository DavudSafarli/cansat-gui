<template>
  <div ref="el" class="h-100"></div>
</template>

<script>
import { mapGetters } from 'vuex';
var THREE = window.THREE = require('three');

require('three/examples/js/controls/OrbitControls');
require('three/examples/js/controls/TrackballControls');


var camera, scene, renderer, controls, cylinder;
export default {
  name: 'DVisual',
  data() {
    return {

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // initialize
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 0.1, 100000 );
      let el = this.$refs.el;
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize( el.clientWidth, el.clientHeight - 4 );
      scene.background = new THREE.Color( 0x95a5a6 );
      renderer.domElement.id = 'threeObj';  
      el.appendChild(renderer.domElement);

      // helper

      scene.add( new THREE.AxesHelper( 800 ) );

      //controls

      controls = new THREE.TrackballControls( camera );
      controls.rotateSpeed = 10;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 2;
      camera.position.set( -450.6, 309.19, 1165 );
      controls.target = new THREE.Vector3(10, 800, 10)

      
      // cylinder
      
      var geometry = new THREE.CylinderGeometry( 0.132, 0.132, 0.8, 4 );
      var material = new THREE.MeshBasicMaterial( { 
        // color: 0x00ff00,
        // wireframe: true,  
      } );

      // texture
      var textureLoader = new THREE.TextureLoader();
      material.map = textureLoader.load('http://localhost:8080/img/cansat.e3e0cec5.jpg')

      cylinder = new THREE.Mesh( geometry, material );
      cylinder.position.x = 10
      cylinder.position.y = 800
      cylinder.position.z = 10
      scene.add( cylinder );


      //camera 
      renderer.render( scene, camera );
      this.animate();
    },
    animate() {
      requestAnimationFrame( this.animate );
      
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render( scene, camera );
      cylinder.position.y -= 0

    }
  },
  computed: {

  }
}
</script>

<style>
.h-100{
  height: 100%;
}
#threeObj{
  width: 100%;
  height: 100%;
}
</style>
