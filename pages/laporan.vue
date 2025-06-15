<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Laporan Kinerja</h1>
      <button
        @click="exportReport"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
        <span>Ekspor Laporan</span>
      </button>
    </div>

    <!-- Filter -->
    <div class="bg-white shadow rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label for="tahun" class="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
        <select v-model="filters.tahun" id="tahun" class="w-full border border-gray-300 rounded-md px-3 py-2">
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div>
        <label for="tipe" class="block text-sm font-medium text-gray-700 mb-1">Tipe Node</label>
        <select v-model="filters.tipe" id="tipe" class="w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="">-- Semua --</option>
          <option value="sasaran">Sasaran Strategis</option>
          <option value="indikator">Indikator Kinerja</option>
          <option value="program">Program</option>
          <option value="kegiatan">Kegiatan</option>
        </select>
      </div>
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select v-model="filters.status" id="status" class="w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="">-- Semua --</option>
          <option value="on-track">On Track</option>
          <option value="delayed">Delayed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
        <input v-model="filters.search" id="search" placeholder="Cari nama..." class="w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
    </div>

    <!-- Ringkasan Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
        <div class="bg-blue-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500">Total Item</h3>
          <p class="text-xl font-bold text-gray-800">{{ filteredReports.length }}</p>
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
    </div>

    <!-- Tabel Laporan -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(report, index) in filteredReports" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.nama }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ report.tipe }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: report.progress + '%' }"></div>
              </div>
              <span class="text-xs mt-1 text-gray-600">{{ report.progress }}%</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex text-xs leading-5 font-semibold rounded-full',
                report.status === 'completed' ? 'bg-green-100 text-green-800' :
                report.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              ]">
                {{ report.statusLabel }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ report.tahun }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button @click="viewDetail(report)" class="text-blue-600 hover:text-blue-900 mr-3">Lihat Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const reports = ref([
  {
    nama: 'Peningkatan Kecepatan Layanan',
    tipe: 'Indikator Kinerja',
    progress: 90,
    status: 'completed',
    statusLabel: 'Selesai',
    tahun: 2025
  },
  {
    nama: 'Digitalisasi Layanan Publik',
    tipe: 'Program',
    progress: 75,
    status: 'on-track',
    statusLabel: 'On Track',
    tahun: 2025
  },
  {
    nama: 'Pelatihan Digitalisasi',
    tipe: 'Kegiatan',
    progress: 60,
    status: 'on-track',
    statusLabel: 'On Track',
    tahun: 2025
  },
  {
    nama: 'Pembangunan Jaringan Fiber Optic',
    tipe: 'Kegiatan',
    progress: 40,
    status: 'delayed',
    statusLabel: 'Tertunda',
    tahun: 2025
  }
])

// Filter
const filters = ref({
  tahun: new Date().getFullYear(),
  tipe: '',
  status: '',
  search: ''
})

const availableYears = [2023, 2024, 2025]

const filteredReports = computed(() => {
  return reports.value.filter(r => {
    const byTahun = filters.value.tahun ? r.tahun === filters.value.tahun : true
    const byTipe = filters.value.tipe ? r.tipe === filters.value.tipe : true
    const byStatus = filters.value.status ? r.status === filters.value.status : true
    const bySearch = filters.value.search
      ? r.nama.toLowerCase().includes(filters.value.search.toLowerCase())
      : true
    return byTahun && byTipe && byStatus && bySearch
  })
})

const completedCount = computed(() => filteredReports.value.filter(r => r.status === 'completed').length)
const delayedCount = computed(() => filteredReports.value.filter(r => r.status === 'delayed').length)

// Fungsi export
function exportReport() {
  alert('Fitur ekspor akan diimplementasikan dengan integrasi backend.')
}

// Fungsi detail
function viewDetail(report) {
  console.log('Lihat detail:', report)
}
</script>