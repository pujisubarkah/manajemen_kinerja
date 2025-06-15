<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard - Pohon Kinerja</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <TreeChart />
    </div>
  </div>
</template>

<script setup>
import TreeChart from '~/components/TreeChart.vue'
</script>