import * as THREE from 'three';

let scene, camera, renderer;
// geometry
let sphere;

/**
 * Renders the 3D scene using the specified renderer and camera.
 *
 * @param {THREE.Scene} scene - The 3D scene to be rendered.
 * @param {THREE.Camera} camera - The camera that views the scene.
 */
 function render() {
  const canvas = document.querySelector('.webgl');
  renderer = new THREE.WebGLRenderer({canvas});
    
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

}

function init() {
  scene = new THREE.Scene();

  // create camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
  0.1, 100);
  camera.position.z = 5;
  scene.add(camera);

  // create lighting 
  const light = new THREE.PointLight(0xffffff, 1,);
  light.position.set(0, 30, 0);
  light.castShadow = true;
  scene.add(light);
  
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default

  // create sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material  = new THREE.MeshBasicMaterial({color: "#00ff83"});
  sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = false; //default
  scene.add(sphere);


    //Create a plane that receives shadows (but does not cast them)
  const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
  const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.receiveShadow = true;
  scene.add( plane );

  //Create a helper for the shadow camera (optional)
  const helper = new THREE.CameraHelper( light.shadow.camera );
  scene.add( helper );
  // create renderer
  
  render();
} 

/**
 * Determines if the browser supports WebGL.
 *
 * @returns {boolean} - True if the browser supports WebGL, false otherwise.
 */
 function webgl_support() {
  try {
    // Create a canvas element
    var canvas = document.createElement('canvas');
    // Check if the browser supports WebGL rendering context and if
    // it's possible to create a WebGL or experimental context
    return !!window.WebGLRenderingContext && 
    (canvas.getContext('webgl') || canvas.getContext('experimental'));
  } catch (e) {
    // If an exception is thrown, return false
    return false;
  }
}

if(webgl_support()){
  // console.log('WebGL support is available.');
  // initialize
  init();
} else {
  console.log('WebGL support is not available in this version of the browser.');
}