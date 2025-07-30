<template>
  <div id="app">
    <header class="app-header"></header>
    <main class="app-main">
      <div class="resume-container">
        <transition name="fade" appear>
          <PersonalInfo class="section" />
        </transition>

        <transition name="fade" appear>
          <InternshipExperience class="section" :internship-data="resumeData.experience" />
        </transition>

        <transition name="fade" appear>
          <ResearchExperience class="section" :research-data="resumeData.research" />
        </transition>

        <transition name="fade" appear>
          <ProjectShowcase class="section" />
        </transition>

        <transition name="fade" appear>
          <SkillsVisualization class="section" />
        </transition>

        <transition name="fade" appear>
          <ConsoleInterface class="section" />
        </transition>
      </div>
    </main>
    <footer class="app-footer">
      <p>© {{ new Date().getFullYear() }} 个人简历 | 使用 Vue 3 + TypeScript 构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PersonalInfo from './components/PersonalInfo.vue';
import SkillsVisualization from './components/SkillsVisualization.vue';
import ProjectShowcase from './components/ProjectShowcase.vue';
import ConsoleInterface from './components/ConsoleInterface.vue';
import InternshipExperience from './components/InternshipExperience.vue';
import ResearchExperience from './components/ResearchExperience.vue';
import 'animate.css';
import { resumeData } from './data/resume';

</script>

<style scoped>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}



.app-header {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2rem;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  opacity: 0.7;
  font-size: 0.9rem;
}

.resume-container {
  animation: fadeIn 0.8s ease-in-out;
}
</style>