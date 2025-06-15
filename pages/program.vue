<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <h3 class="text-center text-2xl font-bold my-8 text-[#3781c7] uppercase tracking-wide">
        DAFTAR PROGRAM
      </h3>
      
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
              placeholder="Cari Program..."
              class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent min-w-[250px]"
            />
          </div>
        </div>

        <div>
          <button
            @click="openModal"
            class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2"
            aria-label="Tambah Program Baru"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Tambah Program</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div v-if="allFilteredPrograms.length === 0" class="text-center py-8">
        <div class="text-gray-500 text-lg">
          {{ searchQuery ? 'Tidak ada program yang ditemukan' : 'Belum ada program' }}
        </div>
        <button 
          v-if="!searchQuery" 
          @click="openModal"
          class="mt-4 bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200"
        >
          Tambah Program Pertama
        </button>
      </div>

      <table v-else class="w-full border border-[#3781c7] rounded-lg overflow-hidden my-5 shadow-lg">
        <thead class="bg-[#3781c7]">
          <tr class="bg-[#3781c7] text-white">
            <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm w-16">No</th>
            <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Nama Program</th>
            <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Indikator Terkait</th>
            <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(program, index) in paginatedPrograms" 
            :key="getOriginalIndex(index)"
            :class="index % 2 === 0 ? 'bg-teal-50' : 'bg-white'"
            class="hover:bg-teal-100 transition-colors duration-150"
          >
            <td class="p-3 border border-[#f2bd1d] text-center font-bold uppercase text-sm">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="p-3 border border-[#f2bd1d] text-left font-semibold text-sm text-gray-800">
              {{ program.nama }}
            </td>
            <td class="p-3 border border-[#f2bd1d] text-left text-sm text-gray-700">
              {{ program.indikator }}
            </td>
            <td class="p-3 border border-[#f2bd1d] text-left text-sm">
              <!-- Icon Edit -->
              <div 
                @click="editProgram(program, getOriginalIndex(index))"
                class="flex items-center cursor-pointer hover:text-teal-500 mb-2 transition-colors duration-200"
              >
                <svg class="w-4 h-4 text-teal-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span class="text-teal-700 text-sm font-semibold">Edit</span>
              </div>

              <!-- Icon Delete -->
              <div 
                @click="confirmDelete(getOriginalIndex(index))"
                class="flex items-center cursor-pointer hover:text-red-500 transition-colors duration-200"
              >
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
          Menampilkan {{ Math.min(itemsPerPage, allFilteredPrograms.length) }} dari {{ allFilteredPrograms.length }} data
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">
              {{ isEditing ? 'Edit Program' : 'Tambah Program Baru' }}
            </h2>
            <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="saveProgram" class="p-6">
          <div class="mb-4">
            <label for="nama" class="block text-sm font-semibold text-gray-700 mb-2">
              Nama Program *
            </label>
            <input
              id="nama"
              v-model="currentProgram.nama"
              type="text"
              required
              placeholder="Masukkan nama program"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            />
          </div>
          
          <div class="mb-4">
            <label for="indikator" class="block text-sm font-semibold text-gray-700 mb-2">
              Indikator Kinerja *
            </label>
            <select
              id="indikator"
              v-model="currentProgram.indikator"
              required
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            >
              <option value="" disabled>-- Pilih Indikator --</option>
              <option v-for="(indikator, idx) in indikators" :key="idx" :value="indikator.nama">
                {{ indikator.nama }}
              </option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{{ isEditing ? 'Simpan Perubahan' : 'Simpan Program' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.854-.833-2.624 0L3.228 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus program ini?
          </p>
          <div class="bg-red-50 p-3 rounded-lg mb-4 border-l-4 border-red-400">
            <p class="font-semibold text-red-800">
              {{ programs[deleteIndex]?.nama }}
            </p>
          </div>
          <p class="text-sm text-red-600 mb-6">Tindakan ini tidak dapat dibatalkan.</p>
          
          <div class="flex justify-center space-x-3">
            <button
              @click="closeDeleteModal"
              class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              @click="deleteProgram"
              class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Hapus Program</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

definePageMeta({
  title: 'Program'
})

const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const currentProgram = ref({ nama: '', indikator: '' })
const currentEditIndex = ref(null)
const deleteIndex = ref(null)
const currentPage = ref(1)
const searchQuery = ref('')
const itemsPerPage = ref(10)

// Enhanced dummy data
const programs = ref([
  {
    nama: 'Digitalisasi Layanan Publik',
    indikator: 'Peningkatan Kecepatan Layanan'
  },
  {
    nama: 'Pengembangan Infrastruktur Digital',
    indikator: 'Cakupan Infrastruktur Digital'
  },
  {
    nama: 'Sistem Informasi Manajemen Kepegawaian',
    indikator: 'Tingkat Kepuasan Masyarakat'
  },
  {
    nama: 'Aplikasi Pelayanan Terpadu Online',
    indikator: 'Jumlah Aplikasi Digital'
  },
  {
    nama: 'Program Pelatihan SDM Digital',
    indikator: 'Jumlah SDM Terlatih'
  },
  {
    nama: 'Smart City Implementation',
    indikator: 'Tingkat Adopsi Teknologi'
  },
  {
    nama: 'E-Government Integration',
    indikator: 'Persentase Layanan Online'
  },
  {
    nama: 'Digital Transformation Initiative',
    indikator: 'Indeks Kepuasan Pelayanan'
  }
])

const indikators = ref([
  { nama: 'Peningkatan Kecepatan Layanan' },
  { nama: 'Cakupan Infrastruktur Digital' },
  { nama: 'Tingkat Kepuasan Masyarakat' },
  { nama: 'Jumlah Aplikasi Digital' },
  { nama: 'Waktu Respons Layanan' },
  { nama: 'Persentase Layanan Online' },
  { nama: 'Jumlah SDM Terlatih' },
  { nama: 'Indeks Kepuasan Pelayanan' },
  { nama: 'Waktu Penyelesaian Dokumen' },
  { nama: 'Tingkat Adopsi Teknologi' }
])

// Computed properties
const allFilteredPrograms = computed(() => {
  return programs.value.filter(program => 
    program.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    program.indikator.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return allFilteredPrograms.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(allFilteredPrograms.value.length / itemsPerPage.value)
})

// Methods
const getOriginalIndex = (paginatedIndex) => {
  const item = paginatedPrograms.value[paginatedIndex]
  return programs.value.findIndex(p => p.nama === item.nama)
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

const handleSearchChange = () => {
  currentPage.value = 1
}

const openModal = () => {
  currentProgram.value = { nama: '', indikator: '' }
  isEditing.value = false
  currentEditIndex.value = null
  showModal.value = true
}

const saveProgram = () => {
  if (!currentProgram.value.nama.trim() || !currentProgram.value.indikator) return
  
  if (isEditing.value && currentEditIndex.value !== null) {
    // Update existing
    programs.value[currentEditIndex.value] = { ...currentProgram.value }
  } else {
    // Add new
    programs.value.unshift({ ...currentProgram.value })
  }
  closeModal()
}

const editProgram = (program, index) => {
  currentProgram.value = { ...program }
  currentEditIndex.value = index
  isEditing.value = true
  showModal.value = true
}

const confirmDelete = (index) => {
  deleteIndex.value = index
  showDeleteModal.value = true
}

const deleteProgram = () => {
  if (deleteIndex.value !== null) {
    programs.value.splice(deleteIndex.value, 1)
    closeDeleteModal()
    
    // Adjust current page if needed
    if (paginatedPrograms.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteIndex.value = null
}

// Watch search query to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1
})

watch(itemsPerPage, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Additional custom styles if needed */
.table-container {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #3781c7;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #2d6bb0;
}
</style>