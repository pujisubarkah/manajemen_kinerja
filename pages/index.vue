<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
    
    
    <!-- Tombol Lihat Pohon Kinerja -->
    <div class="mb-6">
      <NuxtLink
        to="/tree"
        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
        </svg>
        Lihat Pohon Kinerja
      </NuxtLink>
    </div>

    <!-- Visualisasi Pohon Kinerja -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Visualisasi Pohon Kinerja</h2>
      <div class="border border-gray-200 rounded p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
        <!-- Tempat komponen TreeChart akan ditampilkan -->
        <TreeChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import TreeChart from '~/components/TreeChart.vue'
</script>