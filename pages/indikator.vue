<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <h3 class="text-center text-2xl font-bold my-8 text-[#3781c7] uppercase tracking-wide">
        INDIKATOR KINERJA
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
                placeholder="Cari indikator kinerja..."
                class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent min-w-[250px]"
              />
            </div>
            
            <div class="flex items-center">
              <select
                v-model="sasaranFilter"
                @change="handleSasaranFilterChange"
                class="p-2 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent min-w-[200px]"
              >
                <option value="">Semua Sasaran</option>
                <option v-for="sasaran in sasarans" :key="sasaran.id" :value="sasaran.id">
                  {{ sasaran.nama.slice(0, 40) }}{{ sasaran.nama.length > 40 ? '...' : '' }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex space-x-2">
            <button
              @click="openModal"
              class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-2"
              aria-label="Tambah Indikator Baru"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Tambah Indikator</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div v-if="allFilteredIndikators.length === 0" class="text-center py-8">
          <div class="text-gray-500 text-lg">
            {{ searchQuery || sasaranFilter ? 'Tidak ada indikator yang ditemukan' : 'Belum ada indikator kinerja' }}
          </div>
          <button 
            v-if="!searchQuery && !sasaranFilter" 
            @click="openModal"
            class="mt-4 bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200"
          >
            Tambah Indikator Pertama
          </button>
        </div>

        <table v-else class="w-full border border-[#3781c7] rounded-lg overflow-hidden my-5 shadow-lg">
          <thead class="bg-[#3781c7]">
            <tr class="bg-[#3781c7] text-white">
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">No</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Nama Indikator</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Sasaran Strategis</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Target</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Satuan</th>
              <th class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(indikator, index) in paginatedIndikators" 
              :key="getOriginalIndex(index)"
              :class="index % 2 === 0 ? 'bg-teal-50' : 'bg-white'"
              class="hover:bg-teal-100 transition-colors duration-150"
            >
              <td class="p-3 border border-[#f2bd1d] text-left font-bold uppercase text-sm">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left font-semibold text-sm text-gray-800">
                {{ indikator.nama }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left text-sm">
                <div 
                  class="px-3 py-1 bg-[#3781c7]/20 text-[#3781c7] rounded-full font-medium inline-flex items-center gap-1 cursor-pointer hover:bg-[#3781c7]/30"
                  @click="showSasaranDetails(getSasaranById(indikator.sasaranId))"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ getSasaranNameById(indikator.sasaranId).slice(0, 30) }}{{ getSasaranNameById(indikator.sasaranId).length > 30 ? '...' : '' }}</span>
                </div>
              </td>
              <td class="p-3 border border-[#f2bd1d] text-center font-bold text-sm">
                {{ indikator.target }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-center text-sm">
                {{ indikator.satuan }}
              </td>
              <td class="p-3 border border-[#f2bd1d] text-left text-sm">
                <!-- Icon Edit -->
                <div 
                  @click="editIndikator(indikator, getOriginalIndex(index))"
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
            Menampilkan {{ Math.min(itemsPerPage, allFilteredIndikators.length) }} dari {{ allFilteredIndikators.length }} data
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
              
              <!-- Connector Line -->
              <div class="connector-line h-12 w-0.5 bg-[#3781c7]"></div>
              
              <!-- Sasaran Nodes -->
              <div class="children-container flex flex-wrap justify-center gap-12 mb-8">
                <!-- Loop through sasarans -->
                <div 
                  v-for="sasaran in sasarans" 
                  :key="sasaran.id"
                  class="child-node flex flex-col items-center"
                >
                  <div 
                    class="node bg-[#f2bd1d] text-white p-4 rounded-lg shadow-md max-w-md text-center cursor-pointer hover:bg-[#e5b01b]"
                    @click="showSasaranDetails(sasaran)"
                  >
                    <p class="text-xs font-semibold mb-1 text-white/80">Misi {{ getMisiIdBySasaran(sasaran.id) }}</p>
                    <h3 class="text-base font-bold mb-1">{{ sasaran.nama }}</h3>
                  </div>
                  
                  <!-- Connector Line if has children -->
                  <div 
                    v-if="getIndikatorsBySasaranId(sasaran.id).length > 0"
                    class="connector-line h-10 w-0.5 bg-[#f2bd1d]"
                  ></div>
                  
                  <!-- Indikator under this Sasaran -->
                  <div v-if="getIndikatorsBySasaranId(sasaran.id).length > 0" class="flex flex-wrap justify-center gap-4 mt-2">
                    <div 
                      v-for="(indikator, idx) in getIndikatorsBySasaranId(sasaran.id)" 
                      :key="idx"
                      class="node bg-white border-2 border-[#3781c7] p-3 rounded-lg shadow-sm max-w-[250px] text-center hover:shadow-md transition-all duration-200 cursor-pointer"
                      @click="showIndikatorDetails(indikator)"
                    >
                      <h3 class="text-sm font-bold text-[#3781c7] mb-1">{{ indikator.nama }}</h3>
                      <div class="flex items-center justify-center gap-2 mt-2">
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Target: {{ indikator.target }} {{ indikator.satuan }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Empty State for Sasaran with no Indikator -->
                  <div 
                    v-else
                    class="mt-4 text-center text-gray-500 text-sm bg-gray-100 p-2 rounded-lg w-44"
                  >
                    Belum ada indikator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">
              {{ isEditing ? 'Edit Indikator' : 'Tambah Indikator Kinerja' }}
            </h2>
            <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="saveIndikator" class="p-6">
          <div class="mb-4">
            <label for="nama" class="block text-sm font-semibold text-gray-700 mb-2">
              Nama Indikator Kinerja *
            </label>
            <input
              id="nama"
              v-model="currentIndikator.nama"
              type="text"
              required
              placeholder="Masukkan nama indikator kinerja"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            />
          </div>

          <div class="mb-4">
            <label for="sasaranId" class="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Sasaran Strategis Terkait *
            </label>
            <select
              id="sasaranId"
              v-model="currentIndikator.sasaranId"
              required
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            >
              <option value="" disabled>Pilih Sasaran Strategis</option>
              <option v-for="sasaran in sasarans" :key="sasaran.id" :value="sasaran.id">
                {{ sasaran.nama }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="target" class="block text-sm font-semibold text-gray-700 mb-2">
                Target *
              </label>
              <input
                id="target"
                v-model="currentIndikator.target"
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="Nilai target"
                class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
              />
            </div>
            <div>
              <label for="satuan" class="block text-sm font-semibold text-gray-700 mb-2">
                Satuan *
              </label>
              <input
                id="satuan"
                v-model="currentIndikator.satuan"
                type="text"
                required
                placeholder="Contoh: %"
                class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="deskripsi" class="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Indikator
            </label>
            <textarea
              id="deskripsi"
              v-model="currentIndikator.deskripsi"
              rows="3"
              placeholder="Deskripsi singkat indikator kinerja"
              class="w-full p-3 border border-[#3781c7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3781c7] focus:border-transparent"
            ></textarea>
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
              <span>{{ isEditing ? 'Simpan Perubahan' : 'Simpan Indikator' }}</span>
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
            Apakah Anda yakin ingin menghapus indikator kinerja ini?
          </p>
          <div class="bg-red-50 p-3 rounded-lg mb-4 border-l-4 border-red-400">
            <p class="font-semibold text-red-800">
              {{ indikators[deleteIndex]?.nama }}
            </p>
            <p class="text-sm text-red-600 mt-1">
              Sasaran: {{ getSasaranNameById(indikators[deleteIndex]?.sasaranId) }}
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
              @click="deleteIndikator"
              class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Hapus Indikator</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Indikator Details Modal -->
    <div v-if="showIndikatorDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="bg-[#3781c7] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Detail Indikator Kinerja</h2>
            <button @click="showIndikatorDetailsModal = false" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-lg font-bold text-[#3781c7]">{{ selectedIndikator.nama }}</h3>
          </div>
          
          <div class="mb-4">
            <div class="bg-[#f2bd1d]/10 p-3 rounded-lg">
              <p class="text-sm font-semibold text-gray-600">Sasaran Strategis:</p>
              <p class="text-sm font-bold text-[#8a6c0a] mt-1">
                {{ getSasaranNameById(selectedIndikator.sasaranId) }}
              </p>
            </div>
          </div>
          
          <div class="mb-4 grid grid-cols-2 gap-4">
            <div class="p-3 bg-green-50 rounded-lg">
              <p class="text-sm font-semibold text-gray-600">Target:</p>
              <p class="text-lg font-bold text-green-700">{{ selectedIndikator.target }}</p>
            </div>
            <div class="p-3 bg-blue-50 rounded-lg">
              <p class="text-sm font-semibold text-gray-600">Satuan:</p>
              <p class="text-lg font-bold text-blue-700">{{ selectedIndikator.satuan }}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <p class="text-sm font-semibold text-gray-600">Deskripsi:</p>
            <p class="text-sm text-gray-700 mt-1">{{ selectedIndikator.deskripsi || 'Tidak ada deskripsi' }}</p>
          </div>
          
          <div class="flex justify-between">
            <div class="text-xs text-gray-500">
              Dibuat: {{ formatDate(selectedIndikator.tanggalDibuat) }}
            </div>
            
            <div class="flex space-x-2">
              <button
                @click="editFromDetails()"
                class="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sasaran Details Modal -->
    <div v-if="showSasaranDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="bg-[#f2bd1d] text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Detail Sasaran Strategis</h2>
            <button @click="showSasaranDetailsModal = false" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-lg font-bold text-[#8a6c0a]">{{ selectedSasaran.nama }}</h3>
          </div>
          
          <div class="mb-4">
            <div class="bg-[#3781c7]/10 p-3 rounded-lg">
              <p class="text-sm font-semibold text-gray-600">Bagian dari:</p>
              <p class="text-sm font-bold text-[#3781c7] mt-1">
                Misi {{ getMisiIdBySasaran(selectedSasaran.id) }}: {{ getMisiNameBySasaran(selectedSasaran.id) }}
              </p>
            </div>
          </div>
          
          <div class="mb-6">
            <p class="text-sm font-semibold text-gray-600">Deskripsi:</p>
            <p class="text-sm text-gray-700 mt-1">{{ selectedSasaran.deskripsi || 'Tidak ada deskripsi' }}</p>
          </div>
          
          <div class="mb-4">
            <p class="text-sm font-semibold text-gray-600 mb-2">Indikator Kinerja Terkait:</p>
            <div v-if="getIndikatorsBySasaranId(selectedSasaran.id).length > 0">
              <div 
                v-for="(indikator, idx) in getIndikatorsBySasaranId(selectedSasaran.id)" 
                :key="idx"
                class="p-2 bg-gray-50 rounded-lg mb-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                @click="showIndikatorDetails(indikator)"
              >
                <span class="text-sm font-semibold text-gray-700">{{ indikator.nama }}</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {{ indikator.target }} {{ indikator.satuan }}
                </span>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 text-sm bg-gray-100 p-2 rounded-lg">
              Belum ada indikator untuk sasaran ini
            </div>
          </div>
          
          <div class="flex justify-between">
            <div class="text-xs text-gray-500">
              Dibuat: {{ formatDate(selectedSasaran.tanggalDibuat) }}
            </div>
            
            <div class="flex space-x-2">
              <button
                @click="addNewIndikator(selectedSasaran)"
                class="bg-[#3781c7] text-white py-2 px-4 rounded-lg hover:bg-[#2d6bb0] transition-colors duration-200 flex items-center space-x-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Tambah Indikator</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const viewMode = ref('table') // 'table' or 'tree'
const showModal = ref(false)
const showDeleteModal = ref(false)
const showIndikatorDetailsModal = ref(false)
const showSasaranDetailsModal = ref(false)
const isEditing = ref(false)
const currentIndikator = ref({ 
  nama: '', 
  deskripsi: '', 
  sasaranId: '',
  target: '',
  satuan: '',
  tanggalDibuat: new Date()
})
const selectedIndikator = ref({})
const selectedSasaran = ref({})
const currentEditIndex = ref(null)
const deleteIndex = ref(null)
const currentPage = ref(1)
const searchQuery = ref('')
const sasaranFilter = ref('')
const itemsPerPage = ref(10)

// Visi organization
const visi = ref('Terwujudnya Indonesia Maju yang Berdaulat, Mandiri, dan Berkepribadian, Berlandaskan Gotong Royong')

// Misi data
const misiData = ref([
  {
    id: 1,
    nama: 'Peningkatan Kualitas Manusia Indonesia',
    deskripsi: 'Fokus pada pembangunan sumber daya manusia yang unggul dan berkualitas'
  },
  {
    id: 2,
    nama: 'Struktur Ekonomi yang Produktif, Mandiri, dan Berdaya Saing',
    deskripsi: 'Mendorong pertumbuhan ekonomi berkelanjutan dan inklusif'
  },
  {
    id: 3,
    nama: 'Pembangunan yang Merata dan Berkeadilan',
    deskripsi: 'Memastikan hasil pembangunan dapat dirasakan oleh seluruh lapisan masyarakat'
  }
])

// Sasaran data with IDs
const sasarans = ref([
  { 
    id: 's1',
    nama: 'Meningkatkan Kualitas Layanan Publik Berbasis Digital',
    deskripsi: 'Transformasi digital layanan publik untuk meningkatkan efisiensi dan kepuasan masyarakat',
    status: 'active',
    misiId: '1',
    tanggalDibuat: new Date('2024-01-15')
  },
  { 
    id: 's2',
    nama: 'Peningkatan Infrastruktur Teknologi Informasi',
    deskripsi: 'Pengembangan infrastruktur TI yang handal dan modern',
    status: 'active',
    misiId: '1',
    tanggalDibuat: new Date('2024-01-20')
  },
  { 
    id: 's3',
    nama: 'Penguatan Kapasitas SDM Aparatur Sipil Negara',
    deskripsi: 'Program pelatihan dan pengembangan kompetensi ASN',
    status: 'active',
    misiId: '2',
    tanggalDibuat: new Date('2024-02-01')
  },
  { 
    id: 's4',
    nama: 'Optimalisasi Tata Kelola Pemerintahan yang Baik',
    deskripsi: 'Implementasi good governance dalam setiap aspek pemerintahan',
    status: 'completed',
    misiId: '2',
    tanggalDibuat: new Date('2024-02-10')
  },
  { 
    id: 's5',
    nama: 'Peningkatan Pelayanan Publik One Stop Service',
    deskripsi: 'Integrasi layanan publik dalam satu pintu untuk kemudahan masyarakat',
    status: 'active',
    misiId: '3',
    tanggalDibuat: new Date('2024-02-15')
  }
])

// Indikator Kinerja data
const indikators = ref([
  {
    id: 'ik1',
    nama: 'Persentase Layanan Publik yang Terdigitalisasi',
    deskripsi: 'Mengukur persentase layanan publik yang sudah tersedia secara digital',
    sasaranId: 's1',
    target: 85,
    satuan: '%',
    tanggalDibuat: new Date('2024-01-16')
  },
  {
    id: 'ik2',
    nama: 'Indeks Kepuasan Masyarakat Terhadap Layanan Digital',
    deskripsi: 'Mengukur tingkat kepuasan masyarakat terhadap layanan digital pemerintah',
    sasaranId: 's1',
    target: 4.5,
    satuan: 'Poin',
    tanggalDibuat: new Date('2024-01-17')
  },
  {
    id: 'ik3',
    nama: 'Persentase Ketersediaan Infrastruktur TI',
    deskripsi: 'Mengukur tingkat ketersediaan infrastruktur TI yang memenuhi standar',
    sasaranId: 's2',
    target: 95,
    satuan: '%',
    tanggalDibuat: new Date('2024-01-21')
  },
  {
    id: 'ik4',
    nama: 'Jumlah ASN yang Tersertifikasi Kompetensi',
    deskripsi: 'Mengukur jumlah aparatur sipil negara yang memiliki sertifikasi kompetensi',
    sasaranId: 's3',
    target: 1200,
    satuan: 'Orang',
    tanggalDibuat: new Date('2024-02-02')
  },
  {
    id: 'ik5',
    nama: 'Persentase Instansi dengan Predikat Baik',
    deskripsi: 'Mengukur persentase instansi yang memperoleh predikat baik dalam evaluasi SAKIP',
    sasaranId: 's4',
    target: 80,
    satuan: '%',
    tanggalDibuat: new Date('2024-02-11')
  },
  {
    id: 'ik6',
    nama: 'Waktu Pelayanan Rata-rata',
    deskripsi: 'Mengukur rata-rata waktu penyelesaian layanan publik di One Stop Service',
    sasaranId: 's5',
    target: 15,
    satuan: 'Menit',
    tanggalDibuat: new Date('2024-02-16')
  }
])

// Computed properties
const allFilteredIndikators = computed(() => {
  return indikators.value.filter(indikator => {
    const matchesSearch = indikator.nama.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesSasaran = sasaranFilter.value ? indikator.sasaranId === sasaranFilter.value : true;
    return matchesSearch && matchesSasaran;
  });
})

const paginatedIndikators = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + parseInt(itemsPerPage.value);
  return allFilteredIndikators.value.slice(start, end);
})

const totalPages = computed(() => {
  return Math.ceil(allFilteredIndikators.value.length / parseInt(itemsPerPage.value));
})

// Methods
const getOriginalIndex = (paginatedIndex) => {
  const item = paginatedIndikators.value[paginatedIndex];
  return indikators.value.findIndex(i => i.id === item.id);
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1;
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
}

const handleSearchChange = () => {
  currentPage.value = 1;
}

const handleSasaranFilterChange = () => {
  currentPage.value = 1;
}

const openModal = () => {
  currentIndikator.value = { 
    nama: '', 
    deskripsi: '', 
    sasaranId: '',
    target: '',
    satuan: '',
    tanggalDibuat: new Date()
  }
  isEditing.value = false;
  currentEditIndex.value = null;
  showModal.value = true;
}

const saveIndikator = () => {
  if (!currentIndikator.value.nama.trim() || !currentIndikator.value.sasaranId) return;
  
  if (isEditing.value && currentEditIndex.value !== null) {
    // Update existing
    indikators.value[currentEditIndex.value] = { 
      ...currentIndikator.value,
      tanggalDibuat: indikators.value[currentEditIndex.value].tanggalDibuat // Keep original date
    }
  } else {
    // Add new
    const newId = 'ik' + (indikators.value.length + 1);
    indikators.value.unshift({ 
      ...currentIndikator.value,
      id: newId,
      tanggalDibuat: new Date()
    });
  }
  closeModal();
  showIndikatorDetailsModal.value = false;
}

const editIndikator = (indikator, index) => {
  currentIndikator.value = { ...indikator };
  currentEditIndex.value = index;
  isEditing.value = true;
  showModal.value = true;
}

const editFromDetails = () => {
  const index = indikators.value.findIndex(i => i.id === selectedIndikator.value.id);
  if (index !== -1) {
    editIndikator(selectedIndikator.value, index);
  }
}

const confirmDelete = (index) => {
  deleteIndex.value = index;
  showDeleteModal.value = true;
}

const deleteIndikator = () => {
  if (deleteIndex.value !== null) {
    indikators.value.splice(deleteIndex.value, 1);
    closeDeleteModal();
    
    // Adjust current page if needed
    if (paginatedIndikators.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  }
}

const closeModal = () => {
  showModal.value = false;
}

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  deleteIndex.value = null;
}

const getSasaranNameById = (id) => {
  const sasaran = sasarans.value.find(s => s.id === id);
  return sasaran ? sasaran.nama : 'Sasaran tidak ditemukan';
}

const getSasaranById = (id) => {
  return sasarans.value.find(s => s.id === id) || null;
}

const getMisiIdBySasaran = (sasaranId) => {
  const sasaran = sasarans.value.find(s => s.id === sasaranId);
  return sasaran ? sasaran.misiId : '?';
}

const getMisiNameBySasaran = (sasaranId) => {
  const sasaran = sasarans.value.find(s => s.id === sasaranId);
  if (!sasaran) return 'Misi tidak ditemukan';
  
  const misi = misiData.value.find(m => m.id.toString() === sasaran.misiId);
  return misi ? misi.nama : 'Misi tidak ditemukan';
}

const getIndikatorsBySasaranId = (sasaranId) => {
  return indikators.value.filter(i => i.sasaranId === sasaranId);
}

const showIndikatorDetails = (indikator) => {
  selectedIndikator.value = indikator;
  showIndikatorDetailsModal.value = true;
  showSasaranDetailsModal.value = false;
}

const showSasaranDetails = (sasaran) => {
  selectedSasaran.value = sasaran;
  showSasaranDetailsModal.value = true;
  showIndikatorDetailsModal.value = false;
}

const addNewIndikator = (sasaran) => {
  currentIndikator.value = { 
    nama: '', 
    deskripsi: '', 
    sasaranId: sasaran.id,
    target: '',
    satuan: '',
    tanggalDibuat: new Date()
  }
  isEditing.value = false;
  currentEditIndex.value = null;
  showSasaranDetailsModal.value = false;
  showModal.value = true;
}

const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

// Watch search query to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
})

watch(itemsPerPage, () => {
  currentPage.value = 1;
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

/* Tree View Styles */
.tree-container {
  min-height: 600px;
  overflow-x: auto;
  width: 100%;
}

.tree {
  min-width: fit-content;
  padding: 1rem;
}

.node {
  transition: all 0.3s ease;
  min-width: 200px;
}

.node:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.connector-line {
  height: 2rem;
  width: 2px;
  margin: 0.25rem 0;
}

.children-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}
</style>