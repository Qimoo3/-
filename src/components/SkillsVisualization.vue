<template>
  <section class="skills-section">
    <div class="section-header">
      <h2>专业技能</h2>
      <div class="section-divider"></div>
    </div>

    <div class="bubble-container" ref="bubbleContainer">
      <div
        v-for="(skill, index) in skillData"
        :key="skill.uniqueId"
        class="skill-bubble"
        :style="bubbleStyles(index)"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave(index)"
      >
        <div class="skill-name">{{ skill.name }}</div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { resumeData } from '../data/resume';

// 气泡相关状态
const bubbleContainer = ref<HTMLDivElement | null>(null);
const bubbles = reactive<{[key: string]: { size: number, x: number, y: number, scale: number, baseX: number, baseY: number, animationDelay: number }}>({});
const containerSize = ref({ width: 0, height: 0 });
const skillColor = ref<string>('var(--accent-color)');

// 准备技能数据
const skillData = computed(() => {
  const technicalSkills = (resumeData.skills?.technical || []).map(skill => ({
    ...skill,
    id: `tech-${skill.name}`,
    size: Math.min(120, Math.max(60, skill.level * 10)) // 根据技能等级设置基础大小
  }));
  const frameworkSkills = (resumeData.skills?.frameworks || []).map(skill => ({
    ...skill,
    id: `framework-${skill.name}`,
    size: Math.min(120, Math.max(60, skill.level * 10))
  }));

  // 添加唯一ID用于v-for
  return [...technicalSkills, ...frameworkSkills].map((skill, index) => ({
    ...skill,
    uniqueId: `${skill.id}-${index}`
  }));
});

// 气泡样式配置 - 边框+浅色透明背景
const bubbleStyleConfigs = [
  { borderColor: '#165DFF', backgroundColor: 'rgba(22, 93, 255, 0.15)' },
  { borderColor: '#36CFC9', backgroundColor: 'rgba(54, 207, 201, 0.15)' },
  { borderColor: '#722ED1', backgroundColor: 'rgba(114, 46, 209, 0.15)' },
  { borderColor: '#FF7D00', backgroundColor: 'rgba(255, 125, 0, 0.15)' },
  { borderColor: '#F5222D', backgroundColor: 'rgba(245, 34, 45, 0.15)' },
  { borderColor: '#FAAD14', backgroundColor: 'rgba(250, 173, 20, 0.15)' },
  { borderColor: '#52C41A', backgroundColor: 'rgba(82, 196, 26, 0.15)' }
];

// 生成随机气泡位置
const generateBubblePositions = () => {
  if (!bubbleContainer.value) return;

  containerSize.value.width = bubbleContainer.value.offsetWidth;
  containerSize.value.height = bubbleContainer.value.offsetHeight;

  skillData.value.forEach((skill, index) => {
    // 确保气泡不会超出容器边界
    const size = skill.size;
    // 添加边距防止气泡触碰边缘
const margin = 15; // 边距大小
const maxX = containerSize.value.width - size - margin * 2;
const maxY = containerSize.value.height - size - margin * 2;
    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    const styleConfig = bubbleStyleConfigs[Math.floor(Math.random() * bubbleStyleConfigs.length)];

    // 碰撞检测
    do {
      x = margin + Math.random() * maxX;
y = margin + Math.random() * maxY;
      attempts++;
      // 检查与已有气泡的重叠
      let overlapping = false;
      for (const id in bubbles) {
        const existingBubble = bubbles[id];
        const dx = x - existingBubble.x;
        const dy = y - existingBubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (size + existingBubble.size) / 2 + 10; // 加上10px间距
        if (distance < minDistance) {
          overlapping = true;
          break;
        }
      }
      if (!overlapping || attempts >= maxAttempts) break;
    } while (true);

    const animationDelay = Math.random() * 3;

    bubbles[skill.uniqueId] = {
  size,
  x,
  y,
  baseX: x,
  baseY: y,
  scale: 1,
  animationDelay,
  borderColor: styleConfig.borderColor,
  backgroundColor: styleConfig.backgroundColor
};
  });
};

// 处理鼠标悬停
const handleMouseEnter = (index: number) => {
  const skill = skillData.value[index];
  if (bubbles[skill.uniqueId]) {
    bubbles[skill.uniqueId].scale = 1.2; // 鼠标接近时放大
  }
};

const handleMouseLeave = (index: number) => {
  const skill = skillData.value[index];
  if (bubbles[skill.uniqueId]) {
    bubbles[skill.uniqueId].scale = 1; // 鼠标离开时恢复原大小
  }
};

// 生成气泡样式
const bubbleStyles = (index: number) => {
  const skill = skillData.value[index];
  const bubble = bubbles[skill.uniqueId] || { size: 80, x: 0, y: 0, scale: 1, animationDelay: 0 };

  return {
    width: `${bubble.size}px`,
    height: `${bubble.size}px`,
    left: `${bubble.x}px`,
    top: `${bubble.y}px`,
    transform: `scale(${bubble.scale})`,
    backgroundColor: bubble.backgroundColor,
    borderColor: bubble.borderColor,
    borderWidth: '2px',
    borderStyle: 'solid',
    animationDelay: `${bubble.animationDelay}s`,
    zIndex: bubble.scale > 1 ? 2 : 1
  };
};

onMounted(() => {
  // 初始化气泡位置
  generateBubblePositions();
  // 监听窗口大小变化，重新布局气泡
  window.addEventListener('resize', generateBubblePositions);

  // 移除主题相关代码
    skillColor.value = '#409eff';

  // 气泡微动效果
  const animateBubbles = () => {
    if (!bubbleContainer.value) return;

    skillData.value.forEach(skill => {
      if (bubbles[skill.uniqueId] && bubbles[skill.uniqueId].scale === 1) {
        // 只有在非悬停状态下才进行微动
        const movementRange = 10; // 最大移动范围
        bubbles[skill.uniqueId].x = bubbles[skill.uniqueId].baseX + 
          (Math.sin(Date.now() * 0.001 + bubbles[skill.uniqueId].animationDelay) * movementRange);
        bubbles[skill.uniqueId].y = bubbles[skill.uniqueId].baseY + 
          (Math.cos(Date.now() * 0.0015 + bubbles[skill.uniqueId].animationDelay) * movementRange);
      }
    });

    requestAnimationFrame(animateBubbles);
  };

  animateBubbles();
});

// 窗口大小变化时重新计算位置
onMounted(() => {
  window.addEventListener('resize', generateBubblePositions);
  return () => window.removeEventListener('resize', generateBubblePositions);
});
</script>

<style scoped>
.skills-section {
  padding: 2rem 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 1rem;
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
  background: linear-gradient(90deg, var(--accent-color), rgba(64, 158, 255, 0.7));
  border-radius: 3px;
  margin: 0.5rem auto 2rem;
}

/* 气泡容器样式 */
.bubble-container {
  position: relative;
  width: 100%;
  height: 500px; /* 固定容器高度 */
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--bg-color-light);
  margin-top: 1rem;
}

/* 技能气泡样式 */
.skill-bubble {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  will-change: transform, left, top;
  z-index: 1;
}

.skill-bubble:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.skill-name {
  padding: 8px 12px;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
  max-height: 2.4em; /* 两行文本的高度 */
  font-size: 1.05rem;
  color: var(--text-primary);
}

/* 气泡浮动动画 */
@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(0, -5px) scale(1.02);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .bubble-container {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .bubble-container {
    height: 300px;
  }

  .skill-name {
    font-size: 0.8rem;
  }
}
</style>