<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
      <!-- Header -->
      <div class="bg-[#3781c7] text-white px-6 py-4 flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="close" class="text-white hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <slot></slot>
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: 'Modal Title' }
})

const emit = defineEmits(['update:open', 'close'])

const close = () => {
  emit('update:open', false)
  emit('close')
}
</script>