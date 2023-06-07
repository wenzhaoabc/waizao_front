<template>
    <div ref="gltfThreeRef" class="content-box">
    </div>
</template>

<script setup lang="ts" name="threeViewer">
import { useRoute } from "vue-router";
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { onMounted, ref } from "vue";
const route = useRoute();
const gltfUrl = (route.query.url) as string ?? 'https://waizao.oss-cn-shanghai.aliyuncs.com/file/dec9de002d534e2b9a87ccf5f8c46eb9/rooitou_park_1k.hdr';
const urlIndex = gltfUrl.lastIndexOf('/') + 1
const modelPath = gltfUrl.substring(0, urlIndex)
const modelName = gltfUrl.substring(urlIndex)
console.log(modelPath, ",", modelName);

/**
 * 相机，场景，渲染器
 */
let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls;

/**
 * 挂载DOM
 */
const gltfThreeRef = ref()

const init = async () => {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    gltfThreeRef.value.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(-0.35, -0.2, 10);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, - 0.08, 0.11);
    controls.minDistance = 0.1;
    controls.maxDistance = 2;
    controls.addEventListener('change', render);
    controls.update();

    const rgbeLoader = new RGBELoader().setPath('https://waizao.oss-cn-shanghai.aliyuncs.com/file/dec9de002d534e2b9a87ccf5f8c46eb9/');
    const gltfLoader = new GLTFLoader().setPath(modelPath);

    const [texture, gltf] = await Promise.all([
        rgbeLoader.loadAsync('rooitou_park_1k.hdr'),
        gltfLoader.loadAsync(modelName),
    ]);

    // // 背景
    // // 设置背景纹理为纯黑色
    // const blackTexture = new THREE.Texture();
    // blackTexture.setPixelBuffer(new Float32Array([0, 0, 0]));
    // blackTexture.needsUpdate = true;
    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.backgroundBlurriness = 0.5;
    scene.environment = texture;

    // model

    scene.add(gltf.scene);

    render();

    window.addEventListener('resize', onWindowResize);

}

const onWindowResize = () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

const render = () => {
    renderer.render(scene, camera);
}

onMounted(() => {
    console.log("Mounted");

    init()
})

</script>

<style scoped>
.content-box {
    width: auto;
}
</style>