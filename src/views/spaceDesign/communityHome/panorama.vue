<template>
    <div ref="threeRef" class="content-box">
    </div>
</template>

<script setup lang="ts" name="panorama">
import { useRoute } from "vue-router";
import * as THREE from 'three'
import { onMounted, ref } from "vue";
const route = useRoute();
const panoramaUrl = (route.query.url) as string;

/**
 * 相机，渲染器，场景等
 */
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let isUserInteracting = false,
    onPointerDownMouseX = 0, onPointerDownMouseY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0;
/**
 * 挂载DOM
 */
const threeRef = ref();

/**
 * 初始化函数
 */
const init = () => {
    // const threeRef = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(- 1, 1, 1);

    const texture = new THREE.TextureLoader().load(panoramaUrl!);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.value.appendChild(renderer.domElement);

    threeRef.value.style.touchAction = 'none';
    threeRef.value.addEventListener('pointerdown', onPointerDown);

    document.addEventListener('wheel', onDocumentMouseWheel);

    //

    document.addEventListener('dragover', function (event: any) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    });

    document.addEventListener('dragenter', function () {

        document.body.style.opacity = "0.5";

    });

    document.addEventListener('dragleave', function () {

        document.body.style.opacity = "1";

    });

    document.addEventListener('drop', function (event) {

        event.preventDefault();

        const reader = new FileReader();
        reader.addEventListener('load', function (event: any) {

            material.map!.image.src = event.target.result;
            material.map!.needsUpdate = true;

        });
        reader.readAsDataURL(event.dataTransfer!.files[0]);

        document.body.style.opacity = "1";

    });

    //

    window.addEventListener('resize', onWindowResize);

}

const onWindowResize = () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

const onPointerDown = (event: any) => {

    if (event.isPrimary === false) return;

    isUserInteracting = true;

    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

}

const onPointerMove = (event: any) => {

    if (event.isPrimary === false) return;

    lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;

}

const onPointerUp = (event: any) => {

    if (event.isPrimary === false) return;

    isUserInteracting = false;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

}

const onDocumentMouseWheel = (event: any) => {

    const fov = camera.fov + event.deltaY * 0.05;

    camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

    camera.updateProjectionMatrix();

}

const animate = () => {

    requestAnimationFrame(animate);
    update();

}

const update = () => {

    if (isUserInteracting === false) {

        lon += 0.1;

    }

    lat = Math.max(- 85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);

    renderer.render(scene, camera);

}

onMounted(() => {
    // nextTick(() => {
    // })
    init();
    animate();
    // console.log(threeRef.value);
})
</script>

<style scoped></style>