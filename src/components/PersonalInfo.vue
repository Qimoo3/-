<template>
  <div class="personal-info-container">
    <div class="card" ref="cardRef" @mousemove="handleMouseMove" @mouseleave="resetCard">
      <div class="card-inner">
        <div class="avatar-section">
          <div class="avatar-frame">
            <el-avatar :size="120" class="avatar">
              <img src="/new_avatar.png" alt="个人头像" />
            </el-avatar>
          </div>
        </div>
        <div class="info-section">
          <h1 class="name">{{ resumeData.personalInfo.name }}</h1>
          <h2 class="title">{{ resumeData.personalInfo.title }}</h2>
          <div class="contact-info">
            <el-row :gutter="12">
              <el-col :span="12" class="contact-item">
                <el-icon class="icon"><Phone /></el-icon>
                <span>{{ resumeData.personalInfo.contact.phone }}</span>
              </el-col>
              <el-col :span="12" class="contact-item">
                <el-icon class="icon"><Message /></el-icon>
                <span>{{ resumeData.personalInfo.contact.email }}</span>
              </el-col>
              <el-col :span="12" class="contact-item">
                <el-icon class="icon"><Location /></el-icon>
                <span>{{ resumeData.personalInfo.contact.location }}</span>
              </el-col>
              <el-col :span="12" class="contact-item">
                <el-icon class="icon"><Flag /></el-icon>
                <span>{{ resumeData.personalInfo.contact.politicalStatus }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Phone, Message, Location, Flag } from '@element-plus/icons-vue';
import { resumeData } from '../data/resume';

const cardRef = ref<HTMLElement | null>(null);
const rotateX = ref(0);
const rotateY = ref(0);
const transition = ref('transform 0.2s ease-out');

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;

  transition.value = 'none';
  const card = cardRef.value;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Calculate rotation values (limited to prevent extreme angles)
  rotateY.value = ((x - centerX) / centerX) * 8;
  rotateX.value = ((centerY - y) / centerY) * 8;

  card.style.transform = `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`;
};

const resetCard = () => {
  if (!cardRef.value) return;

  transition.value = 'transform 0.5s ease-out';
  rotateX.value = 0;
  rotateY.value = 0;
  cardRef.value.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
};
</script>

<style scoped>
.personal-info-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.card {
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0));
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.avatar-section {
  margin-bottom: 1.5rem;
}

.avatar-frame {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff, #69c0ff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
}

.avatar {
  border: 4px solid white;
}

.info-section {
  text-align: center;
  width: 100%;
}

.name {
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #409eff, #69c0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  font-weight: 500;
}

.contact-info {
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.icon {
  margin-right: 0.5rem;
  color: #409eff;
}

@media (min-width: 768px) {
  .card-inner {
    flex-direction: row;
    align-items: center;
    padding: 2rem 3rem;
  }

  .avatar-section {
    margin-bottom: 0;
    margin-right: 2rem;
  }

  .info-section {
    text-align: left;
  }
}
</style>