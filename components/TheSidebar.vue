<template>
  <aside class="w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl border-r border-blue-700 min-h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out z-20">
    <!-- Navigation Menu -->
    <nav class="mt-2 px-4 space-y-1 pb-6">
      <!-- Dashboard -->
      <NuxtLink
        to="/"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        exact-active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Dashboard</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Tambah Node -->
      <NuxtLink
        to="/add-node"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Tambah Node</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Divider -->
      <div class="my-4 border-t border-blue-700 mx-4"></div>
      
      <!-- Section Header -->
      <div class="px-4 py-2">
        <h3 class="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center">
          <span class="bg-blue-400 w-2 h-2 rounded-full mr-2"></span>
          Manajemen Data
        </h3>
      </div>

      <!-- visi misi -->
      <NuxtLink
        to="/visi-misi"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        <span>Visi & Misi</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Sasaran Strategis -->
      <NuxtLink
        to="/sasaran"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        <span>Sasaran Strategis</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Indikator Kinerja -->
      <NuxtLink
        to="/indikator"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <span>Indikator Kinerja</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Program -->
      <NuxtLink
        to="/program"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <span>Program</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Kegiatan -->
      <NuxtLink
        to="/kegiatan"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
        </svg>
        <span>Kegiatan</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Divider -->
      <div class="my-4 border-t border-blue-700 mx-4"></div>
      
      <!-- Laporan & Monitoring -->
      <div class="px-4 py-2">
        <h3 class="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center">
          <span class="bg-blue-400 w-2 h-2 rounded-full mr-2"></span>
          Laporan & Analisis
        </h3>
      </div>

      <NuxtLink
        to="/laporan"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span>Laporan Kinerja</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/monitoring"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        <span>Monitoring</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <!-- Divider -->
      <div class="my-4 border-t border-blue-700 mx-4"></div>
      
      <!-- Pengaturan -->
      <div class="px-4 py-2">
        <h3 class="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center">
          <span class="bg-blue-400 w-2 h-2 rounded-full mr-2"></span>
          Pengaturan
        </h3>
      </div>

      <NuxtLink
        to="/users"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        <span>Manajemen User</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="group flex items-center space-x-3 px-4 py-3 text-blue-100 rounded-xl hover:bg-blue-700/80 hover:text-white transition-all duration-200 relative overflow-hidden"
        active-class="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-lg"
      >
        <div class="absolute left-0 w-1 h-0 group-hover:h-full bg-blue-300 transition-all duration-300 rounded-r"></div>
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Pengaturan</span>
        <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </NuxtLink>
    </nav>
    <!-- Footer Section -->
    <footer class="p-4 text-blue-200 text-xs border-t border-blue-700">
      <div class="text-center">
        &copy; 2025 Lembaga Administrasi Negara. All rights reserved.
      </div>
    </footer>
  </aside>
</template>

<style scoped>
aside {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}

.router-link-active:not(.exact-active) {
  background-color: rgba(96, 165, 250, 0.2);
  color: white;
  font-weight: 500;
}

.exact-active svg,
.router-link-active svg {
  color: #fff;
}

.exact-active .group-hover\:scale-110,
.router-link-active .group-hover\:scale-110 {
  transform: none;
}

/* Glow effect on active items */
.exact-active,
.router-link-active {
  box-shadow: 0 0 10px rgba(147, 197, 253, 0.5);
}

/* Smooth transition for hover states */
.group:hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
