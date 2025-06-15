<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
      <button
        @click="openModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Tambah Pengguna</span>
      </button>
    </div>

    <!-- Tabel Daftar Pengguna -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(user, index) in users" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex text-xs leading-5 font-semibold rounded-full',
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ user.statusLabel }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button @click="editUser(user, index)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
              <button @click="deleteUser(index)" class="text-red-600 hover:text-red-900">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Input -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}</h2>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              id="name"
              v-model="currentUser.name"
              type="text"
              required
              placeholder="Masukkan nama pengguna"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              v-model="currentUser.email"
              type="email"
              required
              placeholder="Masukkan email pengguna"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              v-model="currentUser.role"
              required
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled selected>-- Pilih Role --</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              v-model="currentUser.status"
              required
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled selected>-- Pilih Status --</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="closeModal"
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >Batal</button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
const currentUser = ref({
  name: '',
  email: '',
  role: '',
  status: 'active',
  statusLabel: ''
})
const currentEditIndex = ref(null)

// Dummy Data
const users = ref([
  {
    name: 'Ahmad Fauzi',
    email: 'fauzi@example.com',
    role: 'admin',
    status: 'active',
    statusLabel: 'Aktif'
  },
  {
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    role: 'editor',
    status: 'active',
    statusLabel: 'Aktif'
  },
  {
    name: 'Budi Santoso',
    email: 'budi@example.com',
    role: 'viewer',
    status: 'inactive',
    statusLabel: 'Tidak Aktif'
  }
])

// Buka modal tambah
const openModal = () => {
  currentUser.value = {
    name: '',
    email: '',
    role: '',
    status: 'active',
    statusLabel: ''
  }
  isEditing.value = false
  showModal.value = true
}

// Simpan data
const saveUser = () => {
  if (isEditing.value && currentEditIndex.value !== null) {
    // Update
    const updatedUser = { ...currentUser.value }
    updatedUser.statusLabel = updatedUser.status === 'active' ? 'Aktif' : 'Tidak Aktif'
    users.value[currentEditIndex.value] = updatedUser
  } else {
    // Tambah baru
    const newUser = { ...currentUser.value }
    newUser.statusLabel = newUser.status === 'active' ? 'Aktif' : 'Tidak Aktif'
    users.value.push(newUser)
  }
  closeModal()
}

// Edit data
const editUser = (user, index) => {
  currentUser.value = { ...user }
  currentEditIndex.value = index
  isEditing.value = true
  showModal.value = true
}

// Hapus data
const deleteUser = (index) => {
  if (confirm('Yakin ingin menghapus pengguna ini?')) {
    users.value.splice(index, 1)
  }
}

// Tutup modal
const closeModal = () => {
  showModal.value = false
}
</script>