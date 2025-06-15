import { defineStore } from 'pinia'

export interface Node {
  id: string
  name: string
  type: 'Visi' | 'Misi' | 'Sasaran Strategis' | 'Program' | 'Kegiatan' | 'Indikator'
  parentId?: string
  children?: Node[]
  description?: string
  target?: string | number
  unit?: string
  responsible?: string
  status?: 'active' | 'inactive' | 'completed'
  createdAt?: Date
  updatedAt?: Date
}

export const useNodeStore = defineStore('node', {
  state: () => ({
    nodes: [] as Node[],
    selectedNode: null as Node | null,
    expandedNodes: [] as string[],
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    // Get tree structure dari flat list
    getTreeStructure(): Node[] {
      const nodeMap = new Map()
      const roots: Node[] = []

      // Buat map untuk akses cepat
      this.nodes.forEach(node => {
        nodeMap.set(node.id, { ...node, children: [] })
      })

      // Build tree structure
      this.nodes.forEach(node => {
        const nodeWithChildren = nodeMap.get(node.id)
        if (node.parentId) {
          const parent = nodeMap.get(node.parentId)
          if (parent) {
            parent.children.push(nodeWithChildren)
          }
        } else {
          roots.push(nodeWithChildren)
        }
      })

      return roots
    },

    // Get node by ID
    getNodeById(): (id: string) => Node | undefined {
      return (id: string) => this.nodes.find(node => node.id === id)
    },

    // Get children of a node
    getChildrenOf(): (parentId: string) => Node[] {
      return (parentId: string) => this.nodes.filter(node => node.parentId === parentId)
    },

    // Get nodes by type
    getNodesByType(): (type: Node['type']) => Node[] {
      return (type: Node['type']) => this.nodes.filter(node => node.type === type)
    },

    // Get root nodes (no parent)
    getRootNodes(): Node[] {
      return this.nodes.filter(node => !node.parentId)
    },

    // Count nodes by type
    getNodeCounts(): Record<string, number> {
      const counts = {
        'Visi': 0,
        'Misi': 0,
        'Sasaran Strategis': 0,
        'Indikator': 0,
        'Program': 0,
        'Kegiatan': 0
      }

      this.nodes.forEach(node => {
        if (counts[node.type] !== undefined) {
          counts[node.type]++
        }
      })

      return counts
    },

    // Check if node is expanded
    isNodeExpanded(): (nodeId: string) => boolean {
      return (nodeId: string) => this.expandedNodes.includes(nodeId)
    }
  },

  actions: {
    // Add single node
    addNode(node: Omit<Node, 'createdAt' | 'updatedAt'>) {
      const newNode: Node = {
        ...node,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.nodes.push(newNode)
      console.log('Node added:', newNode)
    },

    // Add multiple nodes
    addNodes(nodes: Omit<Node, 'createdAt' | 'updatedAt'>[]) {
      const newNodes = nodes.map(node => ({
        ...node,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      this.nodes.push(...newNodes)
      console.log('Nodes added:', newNodes.length)
    },

    // Update node
    updateNode(id: string, updates: Partial<Node>) {
      const index = this.nodes.findIndex(node => node.id === id)
      if (index !== -1) {
        this.nodes[index] = {
          ...this.nodes[index],
          ...updates,
          updatedAt: new Date()
        }
        console.log('Node updated:', id)
      }
    },

    // Delete node and its children
    deleteNode(id: string) {
      const nodeToDelete = this.nodes.find(node => node.id === id)
      if (!nodeToDelete) return

      // Get all descendant IDs
      const getDescendantIds = (parentId: string): string[] => {
        const children = this.nodes.filter(node => node.parentId === parentId)
        let ids = children.map(child => child.id)

        children.forEach(child => {
          ids = ids.concat(getDescendantIds(child.id))
        })

        return ids
      }

      const idsToDelete = [id, ...getDescendantIds(id)]

      // Remove nodes
      this.nodes = this.nodes.filter(node => !idsToDelete.includes(node.id))

      // Remove from expanded nodes
      this.expandedNodes = this.expandedNodes.filter(nodeId => !idsToDelete.includes(nodeId))

      console.log('Nodes deleted:', idsToDelete.length)
    },

    // Set selected node
    setSelectedNode(node: Node | null) {
      this.selectedNode = node
    },

    // Toggle node expansion
    toggleNodeExpansion(nodeId: string) {
      const index = this.expandedNodes.indexOf(nodeId)
      if (index === -1) {
        this.expandedNodes.push(nodeId)
      } else {
        this.expandedNodes.splice(index, 1)
      }
    },

    // Expand all nodes
    expandAllNodes() {
      this.expandedNodes = this.nodes.map(node => node.id)
    },

    // Collapse all nodes
    collapseAllNodes() {
      this.expandedNodes = []
    },

    // Reset all data
    resetNodes(this: any) {
      this.nodes = []
      this.selectedNode = null
      this.expandedNodes = []
      this.error = null
      console.log('Node store reset')
    },

    // Load sample data with Visi → Misi → Sasaran → Indikator → Program → Kegiatan
    loadSampleData(this: any) {
      this.resetNodes()

      const sampleNodes: Omit<Node, 'createdAt' | 'updatedAt'>[] = [
        // VISI
        {
          id: 'visi1',
          name: 'Menjadi institusi pembelajar berkelas dunia yang mampu menjadi penggerak utama dalam mewujudkan SDM Aparatur Unggul, Kebijakan dan Inovasi Administrasi Negara yang Berkualitas untuk Mendukung Visi Indonesia Maju yang Berdaulat, Mandiri, dan Berkepribadian Berlandaskan Gotong Royong',
          type: 'Visi',
          description: 'Dokumen RPJMD LAN Tahun 2020–2024',
          responsible: 'LAN Pusat',
          status: 'active'
        },
        // MISI 1
        {
          id: 'misi1',
          name: 'Mewujudkan SDM Aparatur unggul melalui kebijakan, pembinaan, dan penyelenggaraan pengembangan kompetensi yang berstandar internasional.',
          type: 'Misi',
          parentId: 'visi1',
          description: 'Peningkatan kapasitas SDM aparatur sipil negara',
          responsible: 'Pusdiklat ASN',
          status: 'active'
        },
        // MISI 2
        {
          id: 'misi2',
          name: 'Mewujudkan Kebijakan Administrasi Negara yang berkualitas melalui kajian kebijakan berbasis evidence dan penyediaan analis kebijakan yang kompeten.',
          type: 'Misi',
          parentId: 'visi1',
          description: 'Peningkatan kualitas rekomendasi kebijakan administrasi',
          responsible: 'Puslitbang Kebijakan',
          status: 'active'
        },
        // SASARAN STRATEGIS 1
        {
          id: 'sasaran1',
          name: 'Terwujudnya institusi pembelajar berkelas dunia melalui Pengembangan Kompetensi Aparatur, Kebijakan dan Inovasi Administrasi Negara dalam mewujudkan World Class Government',
          type: 'Sasaran Strategis',
          parentId: 'misi1',
          description: 'Meningkatkan kualitas SDM aparatur melalui pelatihan dan sertifikasi internasional',
          responsible: 'LAN Pusat',
          status: 'active'
        },

        // SASARAN STRATEGIS 2
        {
          id: 'sasaran2',
          name: 'Terwujudnya Kebijakan Administrasi Negara yang berkualitas melalui kajian kebijakan berbasis evidence dan penyediaan analis kebijakan yang kompeten',
          type: 'Sasaran Strategis',
          parentId: 'misi2',
          description: 'Meningkatkan kualitas kebijakan administrasi negara melalui kajian berbasis bukti',
          responsible: 'LAN Pusat',
          status: 'active'
        },
        // INDIKATOR 1
        {
          id: 'indikator1',
          name: 'Persentase rekomendasi kebijakan hasil kajian LAN yang memiliki tingkat kemanfaatan "sangat bermanfaat"',
          type: 'Indikator',
          parentId: 'sasaran1',
          target: '60%',
          unit: '%',
          description: 'Indikator kinerja strategis',
          responsible: 'Peneliti Senior',
          status: 'active'
        },
        // PROGRAM 1
        {
          id: 'program1',
          name: 'Pengembangan Kompetensi Aparatur',
          type: 'Program',
          parentId: 'sasaran1',
          description: 'Pelatihan dan pendidikan profesional bagi aparatur sipil negara',
          responsible: 'Pusdiklat ASN',
          status: 'active'
        },
        // KEGIATAN 1
        {
          id: 'kegiatan1',
          name: 'Pelatihan Dasar Calon Pegawai Negeri Sipil',
          type: 'Kegiatan',
          parentId: 'program1',
          description: 'Membekali CPNS dengan pengetahuan dasar administrasi negara',
          target: '5000 peserta',
          unit: 'peserta',
          responsible: 'Instructor Team',
          status: 'active'
        },
        // INDIKATOR KEGIATAN 1
        {
          id: 'indikator_kegiatan1',
          name: 'Rata-rata peningkatan kompetensi peserta pelatihan',
          type: 'Indikator',
          parentId: 'kegiatan1',
          target: 80,
          unit: 'skor',
          description: 'Hasil ujian setelah pelatihan',
          responsible: 'Asesor Pelatihan',
          status: 'active'
        },
        // INDIKATOR KEGIATAN 2
        {
          id: 'indikator_kegiatan2',
          name: 'Tingkat kepuasan peserta pelatihan',
          type: 'Indikator',
          parentId: 'kegiatan1',
          target: 90,
          unit: '%',
          description: 'Survei kepuasan pelatihan',
          responsible: 'Tim Survey',
          status: 'active'
        },
        // PROGRAM 2
        {
          id: 'program2',
          name: 'Peningkatan Sarana dan Prasarana Aparatur',
          type: 'Program',
          parentId: 'sasaran1',
          description: 'Pemenuhan fasilitas pelatihan yang memadai',
          responsible: 'Bagian Infrastruktur LAN',
          status: 'active'
        },
        // KEGIATAN 2
        {
          id: 'kegiatan2',
          name: 'Peningkatan Kapasitas Ruang Kelas',
          type: 'Kegiatan',
          parentId: 'program2',
          description: 'Pengadaan peralatan multimedia dan ruang belajar baru',
          target: '10 ruang',
          unit: 'ruang kelas',
          responsible: 'Teknisi IT LAN',
          status: 'active'
        }
      ]

      this.addNodes(sampleNodes)
      
      // Expand root nodes by default
      this.expandedNodes = ['visi1']
    },

    // Search nodes
    searchNodes(query: string) {
      const searchTerm = query.toLowerCase()
      return this.nodes.filter(node =>
        node.name.toLowerCase().includes(searchTerm) ||
        node.description?.toLowerCase().includes(searchTerm) ||
        node.type.toLowerCase().includes(searchTerm)
      )
    },

    // Export data
    exportData() {
      return {
        nodes: this.nodes,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }
    },

    // Import data
    importData(data: { nodes: Node[] }) {
      try {
        this.resetNodes()
        this.nodes = data.nodes.map(node => ({
          ...node,
          createdAt: node.createdAt ? new Date(node.createdAt) : new Date(),
          updatedAt: node.updatedAt ? new Date(node.updatedAt) : new Date()
        }))
        console.log('Data imported successfully')
      } catch (error) {
        this.error = 'Failed to import data'
        console.error('Import error:', error)
      }
    }
  }
})