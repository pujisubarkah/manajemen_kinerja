<template>
  <div class="custom-tree-chart">
    <!-- Header -->
    <div class="chart-header">


      <!-- Ringkasan Statistik -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 justify-center">
        <div v-for="(count, type) in nodeCounts" :key="type"
             class="text-center p-3 bg-white rounded-lg shadow-md min-w-[100px] transition-transform hover:scale-105">
          <div class="text-2xl font-bold text-blue-600">{{ count }}</div>
          <div class="text-sm text-gray-600">{{ type }}</div>
        </div>
      </div>

     

  

    <!-- Visualisasi Pohon -->
    <div v-if="treeStructure && treeStructure.length > 0" class="tree-container relative w-full overflow-x-auto pb-10">
      <div class="tree-wrapper inline-flex justify-center">
        <TreeNode 
          v-for="rootNode in treeStructure"
          :key="rootNode.id"
          :node="rootNode" 
          :level="0" 
        />
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-10">
      Tidak ada data pohon untuk ditampilkan.
    </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useNodeStore } from '~/stores/nodeStore'
import TreeNode from '~/components/TreeNode.vue'

const nodeStore = useNodeStore()

// Ambil struktur pohon dari store
const treeStructure = computed(() => nodeStore.getTreeStructure)
const nodeCounts = computed(() => nodeStore.getNodeCounts)

onMounted(() => {
  if (nodeStore.nodes.length === 0) {
    nodeStore.loadSampleData()
  }
})

// Fungsi export ke PDF (opsional)
const exportToPdf = () => {
  alert('Fitur export PDF akan diimplementasikan menggunakan html2pdf.js atau jsPDF')
}
</script>

<style scoped>
.custom-tree-chart {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
}

.chart-header {
  margin-bottom: 2rem;
}

.tree-container {
  min-height: 400px;
  padding: 1rem;
}

.tree-wrapper {
  min-width: 100%;
  justify-content: center;
}

@media (min-width: 768px) {
  .tree-wrapper {
    min-width: auto;
  }
}
</style>