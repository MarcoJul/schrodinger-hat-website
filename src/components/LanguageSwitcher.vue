<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';

const { locale } = useI18n({useScope: "global"});
// locale.value = 'it'
const selectedLanguage = ref(locale);

const options = ref([
  { value: 'it', label: '🇮🇹' },
  { value: 'en', label: '🇬🇧' }
]);

</script>

<template>
  <div class="language-selector" >
    <select id="select" v-model="selectedLanguage">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.language-selector {
  font-size: 24px;
  margin: 0 8px;
  
  select {
    background-color: transparent;
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
  }
}
</style>
