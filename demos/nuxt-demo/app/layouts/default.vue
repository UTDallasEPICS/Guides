<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main Top Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <UContainer class="flex items-center justify-between h-16">
        <!-- Brand / Logo -->
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-primary-600 dark:text-primary-400">
            <UIcon name="i-heroicons-clipboard-document-check" class="w-6 h-6" />
            <span>EPICS Task Manager</span>
          </NuxtLink>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-2">
            <UButton
              to="/"
              variant="ghost"
              color="gray"
              icon="i-heroicons-list-bullet"
              :class="{ 'bg-gray-100 dark:bg-gray-800': $route.path === '/' }"
            >
              Tasks
            </UButton>
            <UButton
              to="/todos/new"
              variant="ghost"
              color="gray"
              icon="i-heroicons-plus-circle"
              :class="{ 'bg-gray-100 dark:bg-gray-800': $route.path === '/todos/new' }"
            >
              New Task
            </UButton>
          </nav>
        </div>

        <!-- Right Side Actions: Quick Add & Color Mode -->
        <div class="flex items-center gap-3">
          <UButton
            to="/todos/new"
            color="primary"
            icon="i-heroicons-plus"
            class="hidden sm:inline-flex"
          >
            Add Task
          </UButton>

          <!-- Theme Color Toggle Button -->
          <ClientOnly>
            <UButton
              :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              color="gray"
              variant="ghost"
              aria-label="Theme toggle"
              @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </div>
      </UContainer>
    </header>

    <!-- Page Content Container -->
    <main class="flex-1 py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500">
      <UContainer>
        <p>Built with Nuxt 4, Nuxt UI, Tailwind CSS, SQLite, and Drizzle ORM</p>
      </UContainer>
    </footer>
  </div>
</template>
