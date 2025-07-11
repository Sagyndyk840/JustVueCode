<script setup lang="ts">
import { computed } from 'vue'

interface IBasePaginationProps {
  page: number
  totalPages: number
  maxVisible?: number
}

const props = withDefaults(defineProps<IBasePaginationProps>(), {
  maxVisible: 5,
})

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const goToPage = (page: number) => {
  if (page !== props.page && page >= 1 && page <= props.totalPages) {
    emit('change', page)
  }
}

const pages = computed(() => {
  if (props.totalPages <= props.maxVisible) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(props.maxVisible / 2)
  let start = Math.max(props.page - half, 1)
  const end = Math.min(start + props.maxVisible - 1, props.totalPages)

  if (end - start + 1 < props.maxVisible) {
    start = Math.max(end - props.maxVisible + 1, 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
        class="pagination__nav pagination__nav--prev"
        :disabled="page === 1"
        @click="goToPage(page - 1)"
        aria-label="Previous page"
    >
      &lt;
    </button>

    <button
        v-if="pages[0] > 1"
        class="pagination__page"
        @click="goToPage(1)"
    >
      1
    </button>

    <span v-if="pages[0] > 2" class="pagination__ellipsis">...</span>

    <button
        v-for="p in pages"
        :key="p"
        class="pagination__page"
        :class="{ 'pagination__page--active': p === page }"
        @click="goToPage(p)"
    >
      {{ p }}
    </button>

    <span v-if="pages[pages.length - 1] < totalPages - 1" class="pagination__ellipsis">...</span>

    <button
        v-if="pages[pages.length - 1] < totalPages"
        class="pagination__page"
        @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
        class="pagination__nav pagination__nav--next"
        :disabled="page === totalPages"
        @click="goToPage(page + 1)"
        aria-label="Next page"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
