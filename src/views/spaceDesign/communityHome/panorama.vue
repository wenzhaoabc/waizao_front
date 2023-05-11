<template>
    <div class="card content-box">
        <p>详情页 panorama-url {{ panoramaUrl }}</p>
    </div>
</template>

<script setup lang="ts" name="panorama">
import { useRoute } from "vue-router";
const route = useRoute();
const panoramaUrl = route.query.url;

</script>

<style scoped></style>