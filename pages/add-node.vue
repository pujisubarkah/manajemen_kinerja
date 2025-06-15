<template>
  <div class="container mx-auto px-4 py-6">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Tambah Node Baru</h1>
        <p class="text-gray-600">Tambahkan visi, misi, sasaran strategis, program, kegiatan, atau indikator baru</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Node Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tipe Node *
            </label>
            <select
              v-model="form.type"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Tipe Node</option>
              <option value="Visi">Visi</option>
              <option value="Misi">Misi</option>
              <option value="Sasaran Strategis">Sasaran Strategis</option>
              <option value="Indikator">Indikator</option>
              <option value="Program">Program</option>
              <option value="Kegiatan">Kegiatan</option>
            </select>
          </div>

          <!-- Parent Node (dinamis berdasarkan tipe) -->
          <div v-if="form.type === 'Misi'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Visi (Parent Node) *
            </label>
            <select
              v-model="form.parentId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Visi</option>
              <option v-for="node in visiNodes" :key="node.id" :value="node.id">
                {{ node.name }}
              </option>
            </select>
          </div>

          <div v-if="form.type === 'Sasaran Strategis'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Parent Node *
            </label>
            <select
              v-model="form.parentId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Parent</option>
              <option v-for="node in misiOrSasaranNodes" :key="node.id" :value="node.id">
                {{ node.name }} ({{ node.type }})
              </option>
            </select>
          </div>

          <!-- Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Masukkan nama node"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Masukkan deskripsi (opsional)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Status -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
              <option value="completed">Selesai</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Node' }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <NuxtLink
              to="/"
              class="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors text-center"
            >
              Batal
            </NuxtLink>
          </div>
        </form>
      </div>

      <!-- Preview -->
      <div v-if="form.name" class="mt-6 bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Preview Node</h3>
        <div class="node-preview" :class="getPreviewClass(form.type)">
          <div class="node-type">{{ form.type || 'Tipe Node' }}</div>
          <div class="node-name">{{ form.name || 'Nama Node' }}</div>
          <div v-if="form.description" class="node-description">{{ form.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNodeStore } from '~/stores/nodeStore'

const router = useRouter()
const nodeStore = useNodeStore()

// Form state
const isSubmitting = ref(false)
const form = ref({
  id: '',
  name: '',
  description: '',
  parentId: null,
  type: '',
  status: 'active',
})

// Daftar semua node
const allNodes = computed(() => nodeStore.nodes)

// Hanya visi nodes
const visiNodes = computed(() => {
  return allNodes.value.filter(n => n.type === 'Visi')
})

// Misi + Sasaran Strategis untuk parent Sasaran Strategis
const misiOrSasaranNodes = computed(() => {
  return allNodes.value.filter(n => ['Visi', 'Misi'].includes(n.type))
})

// Handle submit
const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    // Validasi
    if (!form.value.name.trim()) {
      throw new Error('Nama node harus diisi')
    }

    if (form.value.type === 'Misi' && !form.value.parentId) {
      throw new Error('Harus memilih Visi sebagai parent')
    }

    if (form.value.type === 'Sasaran Strategis' && !form.value.parentId) {
      throw new Error('Harus memilih Visi atau Misi sebagai parent')
    }

    // Generate ID
    const newNode = {
      id: Date.now().toString(),
      name: form.value.name.trim(),
      description: form.value.description?.trim() || undefined,
      parentId: form.value.parentId || undefined,
      type: form.value.type,
      status: form.value.status
    }

    // Tambahkan ke store
    nodeStore.addNode(newNode)

    alert(`${form.value.type} berhasil ditambahkan`)
    await router.push('/')
  } catch (error) {
    alert(error.message || 'Gagal menambahkan node')
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  form.value = {
    id: '',
    name: '',
    description: '',
    parentId: null,
    type: '',
    status: 'active',
  }
}

// Get preview class
const getPreviewClass = (type) => {
  const classes = {
    'Visi': 'preview-visi',
    'Misi': 'preview-misi',
    'Sasaran Strategis': 'preview-sasaran',
    'Program': 'preview-program',
    'Kegiatan': 'preview-kegiatan',
    'Indikator': 'preview-indikator'
  }
  return classes[type] || 'preview-default'
}

// Watch type change
watch(() => form.value.type, () => {
  form.value.parentId = null
})
</script>

<style scoped>
.node-preview {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  max-width: 200px;
  margin: 0 auto;
}
.preview-visi {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}
.preview-misi {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-color: #f093fb;
}
.preview-sasaran {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border-color: #4facfe;
}
.preview-program {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #1a202c;
  border-color: #43e97b;
}
.preview-indikator {
  background: #f7fafc;
  color: #1a202c;
}
.preview-kegiatan {
  background: #f7fafc;
  color: #1a202c;
}
.node-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}
.node-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.node-description {
  font-size: 0.875rem;
  opacity: 0.9;
}
</style>