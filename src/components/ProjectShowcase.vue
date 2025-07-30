<template>
  <section class="project-showcase">
    <div class="section-header">
  <h2>项目经历</h2>
  <div class="section-divider"></div>
  <div class="scroll-hint">
    <el-icon class="scroll-icon"><ArrowLeft /></el-icon>
    <span>左右拖动可查看更多项目</span>
    <el-icon class="scroll-icon"><ArrowRight /></el-icon>
  </div>
</div>

<div class="projects-grid" ref="projectsGrid" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="endDrag" @mouseleave="endDrag">
      <div v-for="(project, index) in resumeData.projects" :key="index" class="project-card">
        <div class="card-inner" :class="{ flipped: flippedCards[index] }">
          <div class="card-front">
            <div class="project-period">{{ project.period }}</div>
            <h3 class="project-name">{{ project.name }}</h3>
            <div class="project-role">{{ project.role }}</div>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="(tech, i) in project.technologies" :key="i" class="tech-tag">{{ tech }}</span>
            </div>
            <button class="flip-btn" @click="toggleFlip(index)">
              查看详情 <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </button>
          </div>
          <div class="card-back">
            <h3 class="project-name">{{ project.name }}</h3>
            <div class="project-achievements">
              <h4>项目成果:</h4>
              <ul>
                <li v-for="(achievement, i) in project.achievements" :key="i">
                  <el-icon class="check-icon"><Check /></el-icon> {{ achievement }}
                </li>
              </ul>
            </div>
            <div class="project-tech-details">
              <h4>技术栈:</h4>
              <div class="tech-grid">
                <div v-for="(tech, i) in project.technologies" :key="i" class="tech-item">{{ tech }}</div>
              </div>
            </div>
            <button class="flip-btn back" @click="toggleFlip(index)">
              <el-icon class="arrow-icon"><ArrowLeft /></el-icon> 返回
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowRight, ArrowLeft, Check } from '@element-plus/icons-vue';
import { resumeData } from '../data/resume';

const flippedCards = ref<boolean[]>([]);
const projectsGrid = ref<HTMLDivElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// 初始化翻转状态数组
for (let i = 0; i < resumeData.projects.length; i++) {
  flippedCards.value.push(false);
}

const toggleFlip = (index: number) => {
  flippedCards.value[index] = !flippedCards.value[index];
};

const startDrag = (e: MouseEvent) => {
  if (!projectsGrid.value) return;
  isDragging.value = true;
  startX.value = e.pageX - projectsGrid.value.offsetLeft;
  scrollLeft.value = projectsGrid.value.scrollLeft;
  projectsGrid.value.style.cursor = 'grabbing';
};

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value || !projectsGrid.value) return;
  e.preventDefault();
  const x = e.pageX - projectsGrid.value.offsetLeft;
  const walk = (x - startX.value) * 1.5; // 拖动速度
  projectsGrid.value.scrollLeft = scrollLeft.value - walk;
};

const endDrag = () => {
  isDragging.value = false;
  if (projectsGrid.value) {
    projectsGrid.value.style.cursor = 'grab';
  }
};

onMounted(() => {
  if (projectsGrid.value) {
    projectsGrid.value.style.cursor = 'grab';
  }
});
</script>

<style scoped>
.project-showcase {
  padding: 2rem 0;
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

.section-divider {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 3px;
  margin: 0 auto;
}

.scroll-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  animation: fadeInOut 3s infinite alternate;
}

.scroll-icon {
  font-size: 1rem;
}

@keyframes fadeInOut {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.projects-grid {
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
  gap: 2.5rem;
  scrollbar-width: thin;
  scrollbar-color: #409eff transparent;
}

.projects-grid::-webkit-scrollbar {
  height: 6px;
}

.projects-grid::-webkit-scrollbar-track {
  background: transparent;
}

.projects-grid::-webkit-scrollbar-thumb {
  background-color: #409eff;
  border-radius: 3px;
}

.project-card {
  min-width: 450px;
}

.project-card {
  perspective: 1000px;
  height: auto;
  min-height: 650px;
  cursor: default;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding: 3.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0));
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.card-back {
  transform: rotateY(180deg);
}

.project-period {
  font-size: 0.85rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 0.5rem;
}

.project-name {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.project-role {
  font-weight: 500;
  color: #409eff;
  margin-bottom: 1rem;
  font-size: 1.0rem;
}

.project-desc {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background-color: rgba(64, 158, 255, 0.1);
  color: #409eff;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.flip-btn {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.flip-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.flip-btn.back {
  margin-top: auto;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.flip-btn:hover .arrow-icon {
  transform: translateX(3px);
}

.flip-btn.back:hover .arrow-icon {
  transform: translateX(-3px);
}

.project-achievements {
  margin-bottom: 1.5rem;
  flex: 1;
}

.project-achievements h4,
.project-tech-details h4 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: var(--el-text-color-primary);
  display: flex;
  align-items: center;
}

.project-achievements ul {
  padding-left: 1.5rem;
}

.project-achievements li {
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
}

.check-icon {
  color: #409eff;
  margin-right: 0.5rem;
  margin-top: 3px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.9rem;
}

.tech-item {
  display: flex;
  align-items: center;
  color: var(--el-text-color-regular);
}

.tech-item:before {
  content: "•";
  color: #409eff;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>