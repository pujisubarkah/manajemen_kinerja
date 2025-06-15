<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Monitoring Kinerja</h1>
      <button
        @click="refreshData"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span>Refresh Data</span>
      </button>
    </div>

    <!-- Ringkasan Status Global -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
        <div class="bg-blue-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500">Total Item</h3>
          <p class="text-xl font-bold text-gray-800">{{ totalItems }}</p>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
        <div class="bg-green-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500">Selesai</h3>
          <p class="text-xl font-bold text-gray-800">{{ completedCount }}</p>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
        <div class="bg-yellow-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500">Tertunda</h3>
          <p class="text-xl font-bold text-gray-800">{{ delayedCount }}</p>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
        <div class="bg-purple-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500">Rata-rata Progress</h3>
          <p class="text-xl font-bold text-gray-800">{{ averageProgress }}%</p>
        </div>
      </div>
    </div>

    <!-- Tabel Monitoring -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Selesai</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Realisasi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(item, index) in monitoringData" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.tipe }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: item.progress + '%' }"></div>
              </div>
              <span class="text-xs mt-1 text-gray-600">{{ item.progress }}%</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex text-xs leading-5 font-semibold rounded-full',
                item.status === 'completed' ? 'bg-green-100 text-green-800' :
                item.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              ]">
                {{ item.statusLabel }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.targetDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.realisasiDate || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const monitoringData = ref([
  {
    nama: 'Peningkatan Kecepatan Layanan',
    tipe: 'Indikator Kinerja',
    progress: 100,
    status: 'completed',
    statusLabel: 'Selesai',
    targetDate: '31 Des 2024',
    realisasiDate: '15 Des 2024'
  },
  {
    nama: 'Digitalisasi Layanan Publik',
    tipe: 'Program',
    progress: 75,
    status: 'on-track',
    statusLabel: 'On Track',
    targetDate: '31 Mar 2025',
    realisasiDate: '-'
  },
  {
    nama: 'Pelatihan Digitalisasi',
    tipe: 'Kegiatan',
    progress: 60,
    status: 'on-track',
    statusLabel: 'On Track',
    targetDate: '31 Jan 2025',
    realisasiDate: '-'
  },
  {
    nama: 'Pembangunan Jaringan Fiber Optic',
    tipe: 'Kegiatan',
    progress: 40,
    status: 'delayed',
    statusLabel: 'Tertunda',
    targetDate: '31 Des 2024',
    realisasiDate: '-'
  }
])

// Hitung statistik
const totalItems = computed(() => monitoringData.value.length)
const completedCount = computed(() => monitoringData.value.filter(i => i.status === 'completed').length)
const delayedCount = computed(() => monitoringData.value.filter(i => i.status === 'delayed').length)
const averageProgress = computed(() => {
  const total = monitoringData.value.reduce((sum, item) => sum + item.progress, 0)
  return Math.round(total / totalItems.value)
})

function refreshData() {
  // Di sini kamu bisa fetch ulang data dari API
  alert('Data berhasil diperbarui')
}
</script>