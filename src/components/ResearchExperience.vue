<template>
  <section class="research-section">
    <div class="section-header">
      <h2>科研经历</h2>
      <div class="section-divider"></div>
    </div>

    <div class="research-cards">
      <el-card v-for="(research, index) in researchData" :key="index" class="research-card" :style="cardStyles[index % cardStyles.length]">
        <div class="research-header">
          <div class="research-period">{{ research.period }}</div>
          <div class="research-title">{{ research.title }}</div>
        </div>
        <div class="research-description">{{ research.description }}</div>

        <div class="research-contributions">
          <h4>主要贡献:</h4>
          <ul>
            <li v-for="contribution in research.contributions" :key="contribution">{{ contribution }}</li>
          </ul>
        </div>

        <div v-if="research.publications?.length" class="research-publications">
          <h4>发表论文:</h4>
          <div class="publication-item" v-for="pub in research.publications" :key="pub">{{ pub }}</div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue';

const cardStyles = ref([
  { background: 'linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0))' },
  { background: 'linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0))' },
  { background: 'linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0))' },
]);
import type { ResumeData } from '../data/resume';

export interface ResearchItem {
  period: string;
  title: string;
  description: string;
  contributions: string[];
  publications?: string[];
}

const props = withDefaults(defineProps<{
  researchData?: ResearchItem[];
}>(), {
  researchData: () => []
});
</script>

<style scoped>
.research-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.research-cards {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.research-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  border: none;
  overflow: hidden;
}

.research-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(64, 158, 255, 0.15);
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.research-header {
  margin-bottom: 1rem;
}

.research-period {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.research-title {
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.research-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.0rem;
}

.research-contributions h4,
.research-publications h4 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: var(--el-color-primary);
  font-weight: bold;
}

.research-contributions ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.research-contributions li {
  margin-bottom: 0.5rem;
  position: relative;
  line-height: 1.5;
}

.research-contributions li:before {
  content: '•';
  color: var(--el-color-primary);
  font-weight: bold;
  position: absolute;
  left: -1rem;
}

.publication-item {
  color: var(--el-text-color-primary);
  font-style: italic;
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  background-color: rgba(64, 158, 255, 0.1);
  border-radius: 6px;
  transition: transform 0.3s ease;
}

.publication-item:hover {
  transform: translateX(5px);
}
</style>