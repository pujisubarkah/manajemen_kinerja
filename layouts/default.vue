<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <div class="flex flex-1">
      <!-- Sidebar -->
      <TheSidebar />

      <!-- Main Content Area -->
      <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <slot />
      </main>
    </div>

   
  </div>
</template>

<script setup>
// Layout logic here if needed
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>