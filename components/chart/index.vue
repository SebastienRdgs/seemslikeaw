<template>
  <div>
    <div class="flex flex-1 justify-center items-center"></div>
    <c-chart
      v-if="loaded && chartData.length"
      ref="lwChart"
      :type="chartType"
      :data="chartData"
      :autosize="true"
      :chart-options="chartOptions"
      :series-options="seriesOptions"
      :price-scale-options="priceScaleOptions"
    />
    <c-button v-if="loaded && chartData.length" @click="toggleDisplayPrice">Affichage montants</c-button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useDataStore } from '@/stores/data.store';

const dataStore = useDataStore();
const { allAccounts, priceScaleOptions } = storeToRefs(dataStore);

const loaded = ref(true);
const chartType = ref('line');
const lwChart = ref();
const chartOptions = ref({});
const displayPrice = ref(true);
const seriesOptions = ref([
  {
    color: 'rgb(45, 77, 205)',
    topColor: 'rgba(45, 77, 205, 0.5)',
    bottomColor: 'rgba(45, 77, 205, 0.0)',
    lineWidth: 2,
  },
]);

const chartData = computed(() => {
  return allAccounts.value;
});

const toggleDisplayPrice = () => {
  displayPrice.value = !displayPrice.value;
};

watch(
  () => displayPrice.value,
  (newDisplayPrice) => {
    priceScaleOptions.value = { ...priceScaleOptions.value, visible: newDisplayPrice };
  },
);

const updateChartData = () => {
  loaded.value = false;
  setTimeout(() => {
    loaded.value = true;
  }, 0);
};

watch(
  () => allAccounts,
  () => {
    updateChartData();
  },
  { deep: true },
);
</script>
