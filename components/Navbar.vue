<template>
  <header class="bg-white shadow-lg h-16 flex items-center justify-between px-6 sticky top-0 z-30">
    <!-- Logo / Title -->
    <div class="flex items-center space-x-2">
      
        <img src="/lanri.png" alt="Logo" class="w-10 h-10 object-contain" />
      <h1 class="text-xl font-bold text-gray-800 ml-3">Sistem Informasi Manajemen Kinerja LAN</h1>
    </div>

    <!-- Right Side -->
    <div class="flex items-center space-x-6">
      <!-- Notification -->
      <div class="relative">
        <button
          @click="toggleNotification"
          aria-haspopup="true"
          :aria-expanded="showNotification.toString()"
          class="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 4.43 6 6.897 6 10v3.159c0 .538-.214 1.055-.595 1.436L4 16h5m4 0v1a3 3 0 11-6 0v-1" />
          </svg>
          <span v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {{ unreadCount }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <transition name="fade">
          <div
            v-show="showNotification"
            ref="notifDropdown"
            class="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-20"
          >
            <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 class="font-semibold text-sm">Notifikasi</h3>
              <button @click="markAllAsRead" class="text-xs text-blue-600 hover:underline">Tandai Semua</button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-for="(notif, idx) in notifications" :key="idx"
                class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                @click="readNotif(notif.id)">
                <p class="text-sm font-medium truncate">{{ notif.title }}</p>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ notif.message }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date) }}</p>
              </div>
              <div v-if="notifications.length === 0" class="text-center text-sm py-3 text-gray-400">Belum ada notifikasi</div>
            </div>
          </div>
        </transition>
      </div>

      <!-- User Profile -->
      <div class="relative">
        <button class="flex items-center space-x-3 focus:outline-none" @click="toggleProfile">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#3781c7] to-[#2d6bb0] flex items-center justify-center text-white font-medium shadow-sm">
            {{ user.name.charAt(0) }}
          </div>
          <div class="hidden md:block text-left">
            <p class="text-sm font-medium text-gray-800">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.role }}</p>
          </div>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Profile -->
        <transition name="fade">
          <div
            v-show="showProfile"
            ref="profileDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pengaturan</a>
            <hr class="my-1 border-gray-200">
            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showNotification = ref(false)
const showProfile = ref(false)
const unreadCount = ref(3)
const notifDropdown = ref(null)
const profileDropdown = ref(null)

const user = {
  name: 'Admin',
  role: 'Administrator'
}

const notifications = ref([
  { id: 1, title: 'Notifikasi Baru', message: 'Program "Portal Layanan Publik" telah diupdate.', date: new Date() },
  { id: 2, title: 'Deadline Mendekat', message: 'Pelatihan berakhir 15 Mei 2025.', date: new Date() },
  { id: 3, title: 'Anggaran Meningkat', message: 'Anggaran baru sebesar Rp 500 juta.', date: new Date() }
])

const toggleNotification = () => {
  showNotification.value = !showNotification.value
  showProfile.value = false
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  showNotification.value = false
}

const markAllAsRead = () => {
  unreadCount.value = 0
}

const readNotif = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
  if (notifications.value.length === 0) unreadCount.value = 0
  else if (unreadCount.value > 0) unreadCount.value--
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const handleClickOutside = (event) => {
  if (
    notifDropdown.value && !notifDropdown.value.contains(event.target) &&
    profileDropdown.value && !profileDropdown.value.contains(event.target)
  ) {
    showNotification.value = false
    showProfile.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
