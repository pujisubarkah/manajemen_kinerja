<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Nama Node</label>
      <input v-model="formData.label" required type="text" class="w-full border-gray-300 rounded shadow-sm p-2" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Deskripsi (Opsional)</label>
      <textarea v-model="formData.description" class="w-full border-gray-300 rounded shadow-sm p-2"></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Parent ID (kosongkan jika root)</label>
      <input v-model.number="formData.parentId" type="number" class="w-full border-gray-300 rounded shadow-sm p-2" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Tipe Node</label>
      <select v-model="formData.type" class="w-full border-gray-300 rounded shadow-sm p-2">
        <option value="visi">Visi</option>
        <option value="misi">Misi</option>
        <option value="sasaran">Sasaran Strategis</option>
        <option value="program">Program</option>
        <option value="kegiatan">Kegiatan</option>
        <option value="indikator">Indikator</option>
      </select>
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Simpan Node
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useNodeStore } from '../stores/nodeStore'

const nodeStore = useNodeStore()

const formData = ref({
  label: '',
  description: '',
  parentId: null,
  type: 'sasaran'
})

function submit() {
  const newNode = {
    id: Math.floor(Math.random() * 10000),
    label: formData.value.label,
    description: formData.value.description,
    parentId: formData.value.parentId,
    type: formData.value.type
  }

  nodeStore.addNode(newNode)
  alert('Node berhasil ditambahkan!')
}
</script>