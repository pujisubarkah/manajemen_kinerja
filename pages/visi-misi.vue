<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <h3 class="text-center text-2xl font-bold my-8 text-[#3781c7] uppercase tracking-wide">VISI & MISI ORGANISASI</h3>

      <!-- Visi Section -->
      <div class="bg-white border border-[#3781c7] rounded-lg overflow-hidden shadow-lg mb-6">
        <div class="bg-[#3781c7] text-white p-4">
          <h2 class="text-xl font-bold uppercase tracking-wide flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            VISI
          </h2>
        </div>
        <div class="p-6 bg-teal-50">
          <p class="text-gray-800 text-lg font-semibold leading-relaxed mb-4">
            {{ visi.nama }}
          </p>
          <div class="bg-white border border-[#f2bd1d] rounded-lg p-3">
            <p class="text-sm text-gray-600 font-bold uppercase">
              Periode: {{ visi.tahun }}
            </p>
          </div>
        </div>
      </div>

      <!-- Misi Section -->
      <div class="bg-white border border-[#3781c7] rounded-lg overflow-hidden shadow-lg">
        <div class="bg-[#3781c7] text-white p-4">
          <h2 class="text-xl font-bold uppercase tracking-wide flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            MISI
          </h2>
        </div>
        <div class="p-6 bg-teal-50">
          <div class="space-y-4">
            <div v-for="(item, index) in misi" :key="item.id"
              class="flex items-start space-x-4 p-4 bg-white border border-[#f2bd1d] rounded-lg hover:bg-teal-100 transition-colors duration-150">
              <div class="bg-[#3781c7] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0 mt-1">
                {{ item.no }}
              </div>
              <div class="flex-grow">
                <p class="text-gray-800">{{ item.nama }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <div class="mt-6 flex justify-end space-x-3">
        <button @click="editVisi"
          class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
            </path>
          </svg>
          <span>Edit Visi</span>
        </button>

        <button @click="editMisi"
          class="bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
            </path>
          </svg>
          <span>Edit Misi</span>
        </button>
      </div>
    </div>

    <!-- Edit Visi Modal -->
    <div v-if="showVisiModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Edit Visi</h2>
            <button @click="closeVisiModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <form @submit.prevent="saveVisi" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Pernyataan Visi *</label>
            <textarea id="visiNama" v-model="editedVisi.nama" rows="4"
              placeholder="Masukkan pernyataan visi organisasi"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent resize-none">
            </textarea>
          </div>
          <div>
            <label for="visiTahun" class="block text-sm font-semibold text-gray-700 mb-2">Periode Visi *</label>
            <input id="visiTahun" v-model="editedVisi.tahun" type="text" required
              placeholder="Contoh: 2020 - 2024"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent" />
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="closeVisiModal"
              class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Batal
            </button>
            <button type="submit"
              class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Simpan Visi</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Misi Modal -->
    <div v-if="showMisiModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Edit Misi</h2>
            <button @click="closeMisiModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <form @submit.prevent="saveMisi" class="p-6 space-y-4">
          <div v-for="(item, idx) in editedMisi" :key="idx"
            class="bg-white border border-[#f2bd1d] rounded-lg p-4 relative group">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Misi {{ item.no }}</label>
            <textarea v-model="item.nama" rows="3"
              :placeholder="`Masukkan pernyataan misi ${idx + 1}`"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent resize-none">
            </textarea>
            <button v-if="editedMisi.length > 1" @click="removeMisi(idx)" type="button"
              class="absolute top-2 right-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>

          <div class="flex justify-between items-center">
            <button @click="addMisi" type="button"
              class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Tambah Misi</span>
            </button>
            <div class="flex space-x-3">
              <button @click="closeMisiModal" type="button"
                class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Batal
              </button>
              <button type="submit"
                class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Simpan Misi</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  title: 'Visi & Misi'
})

// Data Visi
const visi = ref({
  nama: 'Menjadi institusi pembelajar berkelas dunia yang mampu menjadi penggerak utama dalam mewujudkan SDM Aparatur Unggul, Kebijakan dan Inovasi Administrasi Negara yang Berkualitas untuk Mendukung Visi Indonesia Maju yang Berdaulat, Mandiri, dan Berkepribadian Berlandaskan Gotong Royong',
  tahun: '2020 - 2024'
})

// Data Misi
const misi = ref([
  {
    id: 1,
    no: '1',
    nama: 'Mewujudkan SDM Aparatur unggul melalui kebijakan, pembinaan, dan penyelenggaraan pengembangan kompetensi yang berstandar internasional.'
  },
  {
    id: 2,
    no: '2',
    nama: 'Mewujudkan Kebijakan Administrasi Negara yang berkualitas melalui kajian kebijakan berbasis evidence dan penyediaan analis kebijakan yang kompeten.'
  },
  {
    id: 3,
    no: '3',
    nama: 'Mewujudkan Inovasi Administrasi Negara yang berkualitas melalui pengembangan model inovasi serta penguatan kapasitas dan budaya inovasi.'
  },
  {
    id: 4,
    no: '4',
    nama: 'Memujudkan organisasi pembelajar berkinerja tinggi melalui dukungan pelayanan yang berkualitas dan berbasis elektronik.'
  }
])

// State untuk edit
const showVisiModal = ref(false)
const showMisiModal = ref(false)
const editedVisi = ref({})
const editedMisi = ref([])

// Method: Edit Visi
const editVisi = () => {
  editedVisi.value = { ...visi.value }
  showVisiModal.value = true
}

// Method: Save Visi
const saveVisi = () => {
  visi.value = { ...editedVisi.value }
  closeVisiModal()
}

// Method: Close Visi Modal
const closeVisiModal = () => {
  showVisiModal.value = false
  editedVisi.value = {}
}

// Method: Edit Misi
const editMisi = () => {
  editedMisi.value = misi.value.map(item => ({ ...item }))
  showMisiModal.value = true
}

// Method: Save Misi
const saveMisi = () => {
  misi.value = [...editedMisi.value]
  closeMisiModal()
}

// Method: Close Misi Modal
const closeMisiModal = () => {
  showMisiModal.value = false
  editedMisi.value = []
}

// Method: Tambah Misi
const addMisi = () => {
  const newId = misi.value.length > 0 ? Math.max(...misi.value.map(m => parseInt(m.no))) + 1 : 1
  editedMisi.value.push({
    id: Date.now(),
    no: newId.toString(),
    nama: ''
  })
}

// Method: Hapus Misi
const removeMisi = (index) => {
  editedMisi.value.splice(index, 1)
}
</script>