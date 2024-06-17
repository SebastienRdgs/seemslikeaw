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
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useDataStore } from '@/stores/data.store';
import type { Transaction } from '@/types/data';

const dataStore = useDataStore();
const { accounts } = storeToRefs(dataStore);

const loaded = ref(true);
const chartType = ref('line');
const lwChart = ref();
const chartOptions = ref({});
const seriesOptions = ref([
  {
    color: 'rgb(45, 77, 205)',
    topColor: 'rgba(45, 77, 205, 0.5)',
    bottomColor: 'rgba(45, 77, 205, 0.0)',
    lineWidth: 2,
  },
]);

const chartData = computed(() => {
  const data = accounts.value;
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    console.log(key, value);
    result.push(
      data[key].map((t: Transaction) => ({
        time: t.time,
        value: t.value,
      })),
    );
  }
  console.log(result);
  return result;
});

const updateChartData = () => {
  loaded.value = false;
  setTimeout(() => {
    loaded.value = true;
  }, 0);
};

watch(
  () => accounts,
  () => {
    updateChartData();
  },
  { deep: true },
);
</script>
