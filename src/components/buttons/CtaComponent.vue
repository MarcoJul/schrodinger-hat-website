<script setup lang="ts">
import { useAttrs } from 'vue'
import { useCtaComponent } from '@/functions/useCtaComponent'

defineProps<{
  secondary?: boolean
}>()

const { component, bindings } = useCtaComponent(useAttrs())
</script>

<template>
  <component
    :is="component"
    v-bind="bindings"
    class="cta"
    :class="{ 'secondary py-1 px-1.5 rounded-1': secondary }"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.cta {
  border: 1px solid $bg-secondary;
  background: $bg-primary;
  color: $text-primary;
  cursor: pointer;
  font-size: rem(16px);
  transition: all 0.2s ease-in;

  @include breakpoint(md) {
    &:hover {
      background: $nord7;
      color: $text-primary;
    }
  }
}

.secondary {
  border: none;
  background: none;
  transition: background 0.3s ease-in-out;

  @include breakpoint(md) {
    &:hover {
     background: $bg-secondary;
    }
  }
}

.#{$dark-mode-class} {
  .cta {
    border: none;
    background: $dark-bg-secondary;
    color: $text-secondary;

    @include breakpoint(md) {
      &:hover {
        background: $nord7;
        color: $text-primary;
      }
    }
  }

  .secondary {
    background: none;

    @include breakpoint(md) {
      &:hover {
        background: $dark-bg-secondary;
      }
    }
  }
}
</style>