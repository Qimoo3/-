<template>
  <section class="experience-section">
    <div class="section-header">
      <h2>实习经历</h2>
      <div class="section-divider"></div>
    </div>

    <div class="experience-cards">
      <el-card v-for="(exp, index) in internshipData" :key="exp.company" class="experience-card" :style="cardStyles[index % cardStyles.length]">
        <div class="experience-header">
          <div class="experience-period">{{ exp.period }}</div>
          <div class="experience-company">{{ exp.company }}</div>
        </div>
        <div class="experience-position">{{ exp.position }} | {{ exp.location }}</div>
        <div class="experience-details">
          <ul class="responsibilities">
            <li v-for="(item, index) in exp.responsibilities" :key="index">{{ item }}</li>
          </ul>
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
  { background: 'linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0))' }
]);
import type { ResumeData } from '../data/resume';

export type ExperienceItem = ResumeData['experience'][number];

const props = withDefaults(defineProps<{
  internshipData?: ExperienceItem[];
}>(), {
  internshipData: () => []
});
</script>

<style scoped>
.experience-section {
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

.experience-cards {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.experience-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  border: none;
  overflow: hidden;
}

.experience-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(64, 158, 255, 0.15);
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.experience-period {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.experience-company {
  font-weight: bold;
  font-size: 1.3rem;
}

.experience-position {
  color: var(--el-color-primary);
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.0rem;
}

.responsibilities {
  padding-left: 1.5rem;
  margin: 0;
}

.responsibilities li {
  margin-bottom: 0.5rem;
  position: relative;
  font-size: 1.0rem;
}

.responsibilities li:before {
  content: '•';
  color: var(--el-color-primary);
  font-weight: bold;
  position: absolute;
  left: -1rem;
}
</style>