<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Pengaturan Aplikasi</h1>
    </div>

    <!-- Tabs Navigation -->
    <div class="bg-white shadow rounded-lg p-4 mb-6 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'general'"
            :class="[
              'inline-block py-2 px-4 rounded-t-lg',
              activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            type="button"
            role="tab"
          >Umum</button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'permissions'"
            :class="[
              'inline-block py-2 px-4 rounded-t-lg',
              activeTab === 'permissions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            type="button"
            role="tab"
          >Hak Akses</button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'system'"
            :class="[
              'inline-block py-2 px-4 rounded-t-lg',
              activeTab === 'system' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            type="button"
            role="tab"
          >Sistem</button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- General Settings -->
      <div v-show="activeTab === 'general'" class="p-6 space-y-6">
        <h2 class="text-lg font-semibold text-gray-800">Pengaturan Umum</h2>
        <form @submit.prevent="saveGeneralSettings" class="space-y-4">
          <div>
            <label for="appName" class="block text-sm font-medium text-gray-700 mb-1">Nama Aplikasi</label>
            <input
              id="appName"
              v-model="general.appName"
              type="text"
              required
              placeholder="Masukkan nama aplikasi"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label for="orgName" class="block text-sm font-medium text-gray-700 mb-1">Nama Organisasi</label>
            <input
              id="orgName"
              v-model="general.orgName"
              type="text"
              required
              placeholder="Masukkan nama organisasi"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label for="theme" class="block text-sm font-medium text-gray-700 mb-1">Tema Aplikasi</label>
            <select
              id="theme"
              v-model="general.theme"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="blue">Blue Theme</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >Simpan Perubahan</button>
          </div>
        </form>
      </div>

      <!-- Permissions Settings -->
      <div v-show="activeTab === 'permissions'" class="p-6 space-y-6">
        <h2 class="text-lg font-semibold text-gray-800">Hak Akses Pengguna</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dashboard</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tambah Node</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manajemen Data</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laporan & Monitoring</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengaturan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(role, index) in permissions" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ role.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="role.dashboard" class="rounded text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="role.addNode" class="rounded text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="role.dataManagement" class="rounded text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="role.reports" class="rounded text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" v-model="role.settings" class="rounded text-blue-600" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            @click="savePermissions"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >Simpan Hak Akses</button>
        </div>
      </div>

      <!-- System Info -->
      <div v-show="activeTab === 'system'" class="p-6 space-y-6">
        <h2 class="text-lg font-semibold text-gray-800">Informasi Sistem</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Versi Aplikasi</h3>
            <p class="text-gray-600">v{{ system.version }}</p>
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Database</h3>
            <p class="text-gray-600">{{ system.database }}</p>
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Server</h3>
            <p class="text-gray-600">{{ system.server }}</p>
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Uptime</h3>
            <p class="text-gray-600">{{ system.uptime }}</p>
          </div>
        </div>
        <div class="mt-6">
          <button
            @click="checkForUpdates"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >Perbarui Aplikasi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')

// General Settings
const general = ref({
  appName: 'Pohon Kinerja',
  orgName: 'Kementerian XYZ',
  theme: 'blue'
})

// Role-based Permissions
const permissions = ref([
  {
    role: 'Admin',
    dashboard: true,
    addNode: true,
    dataManagement: true,
    reports: true,
    settings: true
  },
  {
    role: 'Editor',
    dashboard: true,
    addNode: true,
    dataManagement: true,
    reports: true,
    settings: false
  },
  {
    role: 'Viewer',
    dashboard: true,
    addNode: false,
    dataManagement: false,
    reports: true,
    settings: false
  }
])

// System Info
const system = ref({
  version: '1.0.0',
  database: 'MySQL 8.0',
  server: 'Ubuntu 22.04 LTS',
  uptime: '98%'
})

// Save General Settings
function saveGeneralSettings() {
  alert('Pengaturan umum berhasil disimpan')
}

// Save Permissions
function savePermissions() {
  alert('Hak akses berhasil diperbarui')
}

// Check for Updates
function checkForUpdates() {
  alert('Memeriksa pembaruan... Tidak ada pembaruan tersedia.')
}
</script>