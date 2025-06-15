<template>
  <div class="tree-node" :class="`level-${level}`">
    <!-- Node Card -->
    <div 
      class="node-card" 
      :class="[getNodeTypeClass(node.type), { 'selected': isSelected }]"
      @click="selectNode"
    >
      <!-- Type & Name -->
      <div class="node-type">{{ node.type }}</div>
      <div class="node-name">{{ node.name }}</div>

      <!-- ID -->
      <div class="node-id">ID: {{ node.id }}</div>

      <!-- Target + Unit -->
      <div v-if="node.target" class="node-target">
        Target: {{ node.target }} {{ node.unit }}
      </div>

      <!-- Indikator Level Child -->
      <div v-if="hasIndicators" class="mt-2 pt-2 border-t border-gray-300">
        <h4 class="text-xs font-semibold text-gray-600 mb-1 uppercase">Indikator</h4>
        <ul class="space-y-1">
          <li v-for="(indicator, idx) in indicators" :key="idx"
              class="indicator-badge bg-white border border-blue-200 rounded px-2 py-1 text-xs text-blue-700">
            {{ indicator.name }} — {{ indicator.target }} {{ indicator.unit }}
          </li>
        </ul>
      </div>

      <!-- Toggle Button -->
      <button 
        v-if="hasChildren"
        @click.stop="toggle"
        class="toggle-button"
        :class="{ 'expanded': isExpanded }"
        :title="isExpanded ? 'Collapse' : 'Expand'"
      >
        {{ isExpanded ? '−' : '+' }}
      </button>
    </div>

    <!-- Connection Line Down -->
    <div v-if="isExpanded && hasChildren" class="connection-line-down"></div>
    
    <!-- Children Container -->
    <div v-if="isExpanded && hasChildren" class="children-container">
      <div v-if="multipleChildren" class="connection-line-horizontal"></div>
      <div class="children-wrapper">
        <TreeNode 
          v-for="child in node.children" 
          :key="child.id"
          :node="child" 
          :level="level + 1"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNodeStore } from '~/stores/nodeStore'

const props = defineProps({
  node: Object,
  level: { type: Number, default: 0 }
})

const nodeStore = useNodeStore()

const hasChildren = computed(() => nodeStore.getChildrenOf(props.node.id).length > 0)
const multipleChildren = computed(() => nodeStore.getChildrenOf(props.node.id).length > 1)
const indicators = computed(() => nodeStore.nodes.filter(ind => ind.parentId === props.node.id && ind.type === 'Indikator'))
const hasIndicators = computed(() => indicators.value.length > 0)
const isSelected = computed(() => nodeStore.selectedNode?.id === props.node.id)
const isExpanded = computed(() => nodeStore.isNodeExpanded(props.node.id))

const selectNode = () => nodeStore.setSelectedNode(props.node)
const toggle = () => nodeStore.toggleNodeExpansion(props.node.id)

const getNodeTypeClass = (type) => {
  return {
    'Visi': 'node-visi',
    'Misi': 'node-misi',
    'Sasaran Strategis': 'node-sasaran',
    'Program': 'node-program',
    'Kegiatan': 'node-kegiatan',
    'Indikator': 'node-indikator'
  }[type] || 'node-default'
}
</script>

<style scoped>
/* Struktur layout */
.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  position: relative;
}

.node-card {
  position: relative;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  min-width: 180px;
  max-width: 240px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* Hover dan selected */
.node-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.node-card.selected {
  box-shadow: 0 0 0 2px #3b82f6;
  transform: translateY(-2px) scale(1.02);
}

/* Informasi node */
.node-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.node-name {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.node-id {
  font-size: 0.75rem;
  opacity: 0.7;
}

.node-target {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.indicator-badge {
  transition: all 0.2s ease;
}
.indicator-badge:hover {
  background-color: #bfdbfe;
}

/* Tombol toggle expand */
.toggle-button {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #4a5568;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  border: none;
}

.toggle-button:hover {
  background: #2d3748;
  transform: translateX(-50%) scale(1.1);
}

.connection-line-down {
  width: 2px;
  height: 30px;
  background: #cbd5e0;
  margin: 0 auto;
}

.connection-line-horizontal {
  height: 2px;
  background: #cbd5e0;
  margin-bottom: 15px;
  width: calc(100% - 2rem);
}

.children-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.tree-node:not(:only-child)::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 15px;
  background: #cbd5e0;
}

/* 🌈 WARNA KHUSUS PER TYPE NODE */
.node-visi {
  background-color: #D1FAE5;
  color: #065F46;
  border-color: #10B981;
}
.node-misi {
  background-color: #E0F2FE;
  color: #1D4ED8;
  border-color: #60A5FA;
}
.node-sasaran {
  background-color: #FEF3C7;
  color: #92400E;
  border-color: #FACC15;
}
.node-program {
  background-color: #DBEAFE;
  color: #1E3A8A;
  border-color: #3B82F6;
}
.node-kegiatan {
  background-color: #E0E7FF;
  color: #3730A3;
  border-color: #818CF8;
}
.node-indikator {
  background-color: #FFEDD5;
  color: #C2410C;
  border-color: #F97316;
}
.node-default {
  background-color: #F3F4F6;
  color: #374151;
  border-color: #D1D5DB;
}

/* Responsif */
@media (max-width: 768px) {
  .children-wrapper {
    flex-direction: column;
    gap: 2rem;
  }

  .node-card {
    min-width: 160px;
    max-width: 200px;
  }

  .tree-node {
    margin: 0 0.5rem;
  }

  .connection-line-horizontal,
  .tree-node:not(:only-child)::before {
    display: none;
  }
}
</style>
