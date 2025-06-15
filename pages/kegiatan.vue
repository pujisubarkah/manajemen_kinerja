<template>
  <div class="p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-center text-2xl font-bold my-8 text-[#3781c7] uppercase tracking-wide">Kegiatan</h1>
      <button
        @click="openModal"
        class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2"
        aria-label="Tambah Kegiatan"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Tambah Kegiatan</span>
      </button>
    </div>

    <!-- Tabel -->
    <div class="overflow-x-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden my-5">
        <table class="min-w-full border border-[#3781c7] rounded-lg">
          <thead class="bg-[#3781c7] text-white">
            <tr>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Nama Kegiatan</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Program Terkait</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kegiatan, index) in kegiatans" :key="index" :class="index % 2 === 0 ? 'bg-teal-50' : 'bg-white'">
              <td class="p-3 border border-[#f2bd1d] text-left font-semibold text-sm text-gray-800">{{ kegiatan.nama }}</td>
              <td class="p-3 border border-[#f2bd1d] text-left font-semibold text-sm text-gray-700">{{ kegiatan.program }}</td>
              <td class="p-3 border border-[#f2bd1d] text-left text-sm">
                <button @click="editKegiatan(kegiatan, index)" class="text-teal-700 hover:text-teal-500 mb-2 transition-colors duration-200">Edit</button>
                <button @click="deleteKegiatan(index)" class="text-red-600 hover:text-red-500 transition-colors duration-200">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Input -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <h2 class="text-xl font-bold">{{ isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru' }}</h2>
        </div>
        <form @submit.prevent="saveKegiatan" class="p-6">
          <div class="mb-4">
            <label for="nama" class="block text-sm font-semibold text-gray-700 mb-2">Nama Kegiatan *</label>
            <input
              id="nama"
              v-model="currentKegiatan.nama"
              type="text"
              required
              placeholder="Masukkan nama kegiatan"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            />
          </div>
          <div class="mb-4">
            <label for="program" class="block text-sm font-semibold text-gray-700 mb-2">Program Terkait *</label>
            <select
              id="program"
              v-model="currentKegiatan.program"
              required
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            >
              <option value="" disabled selected>-- Pilih Program --</option>
              <option v-for="(program, idx) in programs" :key="idx" :value="program.nama">{{ program.nama }}</option>
            </select>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >Batal</button>
            <button
              type="submit"
              class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200"
            >{{ isEditing ? 'Simpan Perubahan' : 'Simpan' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const isEditing = ref(false)
const currentKegiatan = ref({ nama: '', program: '' })
const currentEditIndex = ref(null)

// Dummy Data
const kegiatans = ref([
  {
    nama: 'Pelatihan Digitalisasi',
    program: 'Digitalisasi Layanan Publik'
  },
  {
    nama: 'Pembangunan Jaringan Fiber Optik',
    program: 'Pengembangan Infrastruktur Digital'
  }
])

const programs = ref([
  { nama: 'Digitalisasi Layanan Publik' },
  { nama: 'Pengembangan Infrastruktur Digital' }
])

// Buka modal tambah
const openModal = () => {
  currentKegiatan.value = { nama: '', program: '' }
  isEditing.value = false
  showModal.value = true
}

// Simpan data
const saveKegiatan = () => {
  if (isEditing.value && currentEditIndex.value !== null) {
    // Update
    kegiatans.value[currentEditIndex.value] = { ...currentKegiatan.value }
  } else {
    // Tambah baru
    kegiatans.value.push({ ...currentKegiatan.value })
  }
  closeModal()
}

// Edit data
const editKegiatan = (kegiatan, index) => {
  currentKegiatan.value = { ...kegiatan }
  currentEditIndex.value = index
  isEditing.value = true
  showModal.value = true
}

// Hapus data
const deleteKegiatan = (index) => {
  if (confirm('Yakin ingin menghapus kegiatan ini?')) {
    kegiatans.value.splice(index, 1)
  }
}

// Tutup modal
const closeModal = () => {
  showModal.value = false
}
</script>