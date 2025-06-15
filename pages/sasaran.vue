<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <h3 class="text-center text-2xl font-bold my-8 text-[#3781c7] uppercase tracking-wide">
        DAFTAR SASARAN STRATEGIS
      </h3>

      <!-- Toggle View Button -->
      <div class="flex justify-center mb-6">
        <div class="bg-gray-100 p-1 rounded-lg inline-flex">
          <button 
            @click="viewMode = 'table'" 
            :class="viewMode === 'table' ? 'bg-[#3781c7] text-white' : 'text-gray-700 hover:bg-gray-200'"
            class="py-2 px-4 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 18h18M3 6h18"></path>
            </svg>
            <span>Tabel</span>
          </button>
          <button 
            @click="viewMode = 'tree'" 
            :class="viewMode === 'tree' ? 'bg-[#3781c7] text-white' : 'text-gray-700 hover:bg-gray-200'"
            class="py-2 px-4 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Pohon Kinerja</span>
          </button>
        </div>
      </div>

      <!-- Visi and Misi Summary Card -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6 border-l-4 border-[#3781c7]">
        <h4 class="text-lg font-bold text-[#3781c7] mb-2">Visi:</h4>
        <p class="text-gray-700 mb-4">{{ visi }}</p>
        <h4 class="text-lg font-bold text-[#3781c7] mb-2">Misi:</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(misi, index) in misiData" :key="index" class="text-gray-700">
            <span class="font-semibold">Misi {{ misi.id }}:</span> {{ misi.nama }}
          </li>
        </ul>
      </div>

      <!-- Table View -->
      <div v-if="viewMode === 'table'">
        <!-- Controls Section -->
        <div class="flex justify-between items-center mb-4 flex-wrap gap-4">
          <div class="flex items-center space-x-4 flex-wrap gap-2">
            <div class="flex items-center">
              <label class="mr-2 font-semibold text-gray-700">Show:</label>
              <select
                v-model="itemsPerPage"
                @change="handleItemsPerPageChange"
                class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="flex items-center">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearchChange"
                placeholder="Cari Sasaran Strategis..."
                class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7]"
              />
            </div>
            <div class="flex items-center">
              <select
                v-model="misiFilter"
                @change="handleMisiFilterChange"
                class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7]"
              >
                <option value="">Semua Misi</option>
                <option v-for="misi in misiData" :key="misi.id" :value="misi.id.toString()">
                  Misi {{ misi.id }}: {{ misi.nama.slice(0, 30) }}...
                </option>
              </select>
            </div>
          </div>
          <button
            @click="openModal"
            class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Tambah Sasaran</span>
          </button>
        </div>

        <!-- Table -->
        <div v-if="allFilteredSasarans.length === 0" class="text-center py-8">
          <div class="text-gray-500 text-lg">
            {{ searchQuery || misiFilter ? 'Tidak ada sasaran yang ditemukan' : 'Belum ada sasaran strategis' }}
          </div>
          <button 
            v-if="!searchQuery && !misiFilter" 
            @click="openModal"
            class="mt-4 bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200"
          >
            Tambah Sasaran Pertama
          </button>
        </div>

        <table v-else class="w-full border border-[#3781c7] rounded-lg overflow-hidden my-5 shadow-lg">
          <thead class="bg-[#3781c7] text-white">
            <tr>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">No</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Nama Sasaran Strategis</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Misi Terkait</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(sasaran, index) in paginatedSasarans" 
              :key="getOriginalIndex(index)"
              :class="index % 2 === 0 ? 'bg-teal-50' : 'bg-white'"
              class="hover:bg-teal-100 transition-colors duration-150"
            >
              <td class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left font-semibold text-sm text-gray-800">
                {{ sasaran.nama }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left text-sm">
                <span class="px-3 py-1 bg-[#f2bd1d]/20 text-[#8a6c0a] rounded-full font-medium">
                  Misi {{ sasaran.misiId }}: {{ getMisiNameById(sasaran.misiId).slice(0, 30) }}...
                </span>
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left text-sm">
                <!-- Icon Edit -->
                <div @click="editSasaran(sasaran, getOriginalIndex(index))" class="flex items-center cursor-pointer hover:text-teal-500 mb-2 transition-colors duration-200">
                  <svg class="w-4 h-4 text-teal-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span class="text-teal-700 text-sm font-semibold">Edit</span>
                </div>
                <!-- Icon Delete -->
                <div @click="confirmDelete(getOriginalIndex(index))" class="flex items-center cursor-pointer hover:text-red-500 transition-colors duration-200">
                  <svg class="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span class="text-red-600 text-sm font-semibold">Hapus</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-between items-center mt-4 flex-wrap gap-4">
          <div class="flex items-center space-x-4">
            <button
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-blue-600'"
              class="text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Previous
            </button>
            <span class="text-gray-700 font-semibold">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-blue-600'"
              class="text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          </div>
          <div class="text-gray-600 text-sm">
            Menampilkan {{ Math.min(itemsPerPage, allFilteredSasarans.length) }} dari {{ allFilteredSasarans.length }} data
          </div>
        </div>
      </div>

      <!-- Tree View -->
      <div v-else class="py-4">
        <div class="tree-container overflow-x-auto p-4">
          <div class="tree mx-auto">
            <!-- Root Node: Visi -->
            <div class="node-container flex flex-col items-center">
              <div class="node bg-gradient-to-r from-[#3781c7] to-[#2d6bb0] text-white p-6 rounded-xl shadow-lg max-w-2xl text-center mb-10">
                <h3 class="text-xl font-bold mb-2">VISI</h3>
                <p class="text-base">{{ visi }}</p>
              </div>
              <div class="connector-line h-12 w-0.5 bg-[#3781c7]"></div>
              <!-- Misi Nodes -->
              <div class="children-container flex flex-wrap justify-center gap-12 mb-8">
                <div v-for="misi in misiData" :key="misi.id" class="child-node flex flex-col items-center">
                  <div class="node bg-[#f2bd1d] text-white p-4 rounded-lg shadow-md max-w-md text-center">
                    <h3 class="text-base font-bold mb-1">MISI {{ misi.id }}</h3>
                    <p class="text-sm">{{ misi.nama }}</p>
                  </div>
                  <div v-if="getSasaransByMisiId(misi.id.toString()).length > 0" class="connector-line h-10 w-0.5 bg-[#f2bd1d]"></div>
                  <div v-if="getSasaransByMisiId(misi.id.toString()).length > 0" class="flex flex-wrap justify-center gap-4 mt-2">
                    <div 
                      v-for="(sasaran, idx) in getSasaransByMisiId(misi.id.toString())" 
                      :key="idx"
                      class="node bg-white border-2 border-[#3781c7] p-3 rounded-lg shadow-sm max-w-[250px] text-center hover:shadow-md transition-all duration-200"
                      @click="showSasaranDetails(sasaran)"
                    >
                      <h3 class="text-sm font-bold text-[#3781c7]">{{ sasaran.nama }}</h3>
                    </div>
                  </div>
                  <div v-else class="mt-4 text-center text-gray-500 text-sm bg-gray-100 p-2 rounded-lg w-44">
                    Belum ada sasaran
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BaseModal: Add/Edit -->
      <BaseModal v-model:open="showModal" :title="isEditing ? 'Edit Sasaran' : 'Tambah Sasaran Baru'">
        <form @submit.prevent="saveSasaran" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-1">Nama Sasaran Strategis *</label>
            <input v-model="currentSasaran.nama" required class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7]" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Pilih Misi Terkait *</label>
            <select v-model="currentSasaran.misiId" required class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7]">
              <option value="" disabled>Pilih Misi</option>
              <option v-for="misi in misiData" :key="misi.id" :value="misi.id.toString()">Misi {{ misi.id }}: {{ misi.nama }}</option>
            </select>
          </div>
          <textarea v-model="currentSasaran.deskripsi" rows="3" placeholder="Deskripsi..." class="w-full p-3 border border-[#3781c7] rounded-lg"></textarea>
        </form>

        <template #footer>
          <button @click="closeModal" class="py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Batal</button>
          <button type="submit" class="bg-[#3781c7] text-white py-2 px-4 rounded hover:bg-[#2d6bb0] flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{{ isEditing ? 'Simpan Perubahan' : 'Simpan Sasaran' }}</span>
          </button>
        </template>
      </BaseModal>

      <!-- BaseModal: Hapus -->
      <BaseModal v-model:open="showDeleteModal" title="Konfirmasi Hapus">
        <div class="text-center p-4">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus sasaran ini?</p>
          <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400 mb-4">
            <p class="font-semibold text-red-800">{{ sasarans[deleteIndex]?.nama }}</p>
            <p class="text-sm text-red-600 mt-1">Misi: {{ getMisiNameById(sasarans[deleteIndex]?.misiId) }}</p>
          </div>
          <p class="text-sm text-red-600 mb-6">Tindakan ini tidak dapat dibatalkan.</p>
        </div>

        <template #footer>
          <button @click="closeDeleteModal" class="py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Batal</button>
          <button @click="deleteSasaran" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Hapus</span>
          </button>
        </template>
      </BaseModal>

      <!-- BaseModal: Detail -->
      <BaseModal v-model:open="showSasaranDetailsModal" title="Detail Sasaran Strategis">
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-[#3781c7]">{{ selectedSasaran.nama }}</h3>
          <div class="bg-yellow-100 p-3 rounded-lg">
            <p class="text-sm font-semibold text-gray-600">Bagian dari:</p>
            <p class="text-sm font-bold text-[#8a6c0a] mt-1">
              Misi {{ selectedSasaran.misiId }}: {{ getMisiNameById(selectedSasaran.misiId) }}
            </p>
          </div>
          <p class="text-sm text-gray-700">{{ selectedSasaran.deskripsi || 'Tidak ada deskripsi' }}</p>
          <div class="text-xs text-gray-500">Dibuat: {{ formatDate(selectedSasaran.tanggalDibuat) }}</div>
        </div>

        <template #footer>
          <button @click="editFromDetails()" class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span>Edit</span>
          </button>
        </template>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'

// Data Refs
const viewMode = ref('table')
const showModal = ref(false)
const showDeleteModal = ref(false)
const showSasaranDetailsModal = ref(false)
const isEditing = ref(false)
const currentSasaran = ref({ nama: '', deskripsi: '', status: 'active', misiId: '', tanggalDibuat: new Date() })
const selectedSasaran = ref({})
const currentEditIndex = ref(null)
const deleteIndex = ref(null)
const currentPage = ref(1)
const searchQuery = ref('')
const misiFilter = ref('')
const itemsPerPage = ref(10)

// Dummy Data
const visi = ref('Terwujudnya Indonesia Maju yang Berdaulat, Mandiri, dan Berkepribadian, Berlandaskan Gotong Royong')
const misiData = ref([
  { id: 1, nama: 'Peningkatan Kualitas Manusia Indonesia' },
  { id: 2, nama: 'Struktur Ekonomi yang Produktif, Mandiri, dan Berdaya Saing' },
  { id: 3, nama: 'Pembangunan yang Merata dan Berkeadilan' }
])
const sasarans = ref([
  { nama: 'Meningkatkan Layanan Publik Digital', deskripsi: 'Transformasi digital layanan publik', misiId: '1', tanggalDibuat: new Date('2024-01-15') },
  { nama: 'Infrastruktur TI Handal', deskripsi: 'Pengembangan infrastruktur TI', misiId: '1', tanggalDibuat: new Date('2024-01-20') },
  { nama: 'Kapasitas SDM ASN', deskripsi: 'Program pelatihan kompetensi', misiId: '2', tanggalDibuat: new Date('2024-02-01') },
  { nama: 'Tata Kelola Pemerintahan Baik', deskripsi: 'Implementasi good governance', misiId: '2', tanggalDibuat: new Date('2024-02-10') },
  { nama: 'Layanan Publik One Stop Service', deskripsi: 'Integrasi layanan dalam satu pintu', misiId: '3', tanggalDibuat: new Date('2024-02-15') }
])

// Computed
const allFilteredSasarans = computed(() => {
  return sasarans.value.filter(sasaran => {
    const matchesSearch = sasaran.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesMisi = misiFilter.value ? sasaran.misiId === misiFilter.value : true
    return matchesSearch && matchesMisi
  })
})
const paginatedSasarans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return allFilteredSasarans.value.slice(start, start + itemsPerPage.value)
})
const totalPages = computed(() => Math.ceil(allFilteredSasarans.value.length / itemsPerPage.value))

// Methods
const getOriginalIndex = (paginatedIndex) => {
  const item = paginatedSasarans.value[paginatedIndex]
  return sasarans.value.findIndex(s => s.nama === item.nama)
}
const handleItemsPerPageChange = () => currentPage.value = 1
const handlePageChange = (newPage) => currentPage.value = newPage
const handleSearchChange = () => currentPage.value = 1
const handleMisiFilterChange = () => currentPage.value = 1

const openModal = () => {
  currentSasaran.value = { nama: '', deskripsi: '', status: 'active', misiId: '', tanggalDibuat: new Date() }
  isEditing.value = false
  showModal.value = true
}
const saveSasaran = () => {
  if (!currentSasaran.value.nama.trim() || !currentSasaran.value.misiId) return
  if (isEditing.value && currentEditIndex.value !== null) {
    sasarans.value[currentEditIndex.value] = { ...currentSasaran.value, tanggalDibuat: sasarans.value[currentEditIndex.value].tanggalDibuat }
  } else {
    sasarans.value.unshift({ ...currentSasaran.value, tanggalDibuat: new Date() })
  }
  closeModal()
}
const editSasaran = (sasaran, index) => {
  currentSasaran.value = { ...sasaran }
  currentEditIndex.value = index
  isEditing.value = true
  showModal.value = true
}
const editFromDetails = () => {
  const index = sasarans.value.findIndex(s => s.nama === selectedSasaran.value.nama)
  if (index !== -1) editSasaran(selectedSasaran.value, index)
}
const confirmDelete = (index) => {
  deleteIndex.value = index
  showDeleteModal.value = true
}
const deleteSasaran = () => {
  if (deleteIndex.value !== null) {
    sasarans.value.splice(deleteIndex.value, 1)
    closeDeleteModal()
    if (paginatedSasarans.value.length === 0 && currentPage.value > 1) currentPage.value--
  }
}
const closeModal = () => showModal.value = false
const closeDeleteModal = () => showDeleteModal.value = false
const getMisiNameById = (id) => {
  const misi = misiData.value.find(m => m.id.toString() === id?.toString())
  return misi?.nama ?? 'Misi tidak ditemukan'
}
const getSasaransByMisiId = (misiId) => {
  return sasarans.value.filter(s => s.misiId === misiId)
}
const showSasaranDetails = (sasaran) => {
  selectedSasaran.value = sasaran
  showSasaranDetailsModal.value = true
}
const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

watch(searchQuery, () => currentPage.value = 1)
watch(itemsPerPage, () => currentPage.value = 1)
</script>