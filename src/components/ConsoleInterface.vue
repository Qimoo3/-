<template>
  <div class="console-container">
    <div class="console-header">
      <div class="console-buttons">
        <div class="button red"></div>
        <div class="button yellow"></div>
        <div class="button green"></div>
      </div>
      <div class="console-title">终端</div>
    </div>
    <div class="console-body" ref="consoleBody">
      <div class="console-output" v-for="(line, index) in outputLines" :key="index" :class="{ 'command-line': line.isCommand, 'output-line': !line.isCommand }">
        <span class="prompt" v-if="line.isCommand">{{ prompt }}</span>
        <span class="text" v-html="line.text"></span>
      </div>
      <div class="input-line" v-if="!isExecuting">
        <span class="prompt">{{ prompt }}</span>
        <input
          v-model="currentCommand"
          ref="commandInput"
          class="command-input"
          @keydown.enter="executeCommand"
          @keydown.esc="clearInput"
          placeholder="输入 'whoami' 查看个人信息..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { resumeData } from '../data/resume';

const consoleBody = ref<HTMLElement | null>(null);
const commandInput = ref<HTMLInputElement | null>(null);
const currentCommand = ref('');
const outputLines = ref<Array<{ text: string; isCommand: boolean }>>([]);
const isExecuting = ref(false);
const prompt = ref('λ ');

// 模拟打字效果
const typeWriter = async (text: string, delay = 20) => {
  let result = '';
  for (const char of text) {
    result += char;
    outputLines.value[outputLines.value.length - 1].text = result;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return result;
};

// 执行命令
const executeCommand = async () => {
  if (!currentCommand.value.trim() || isExecuting.value) return;

  // 添加命令到输出
  outputLines.value.push({
    text: currentCommand.value,
    isCommand: true
  });

  const command = currentCommand.value.trim().toLowerCase();
  currentCommand.value = '';
  isExecuting.value = true;

  try {
    switch (command) {
      case 'whoami':
        await handleWhoamiCommand();
        break;
      case 'help':
        await handleHelpCommand();
        break;
      case 'skills':
        await handleSkillsCommand();
        break;
      case 'projects':
        await handleProjectsCommand();
        break;
      default:
        outputLines.value.push({
          text: `命令未找到: ${command} - 输入 'help' 查看可用命令`,
          isCommand: false
        });
        break;
    }
  } finally {
    isExecuting.value = false;
    scrollToBottom();
  }
};

// 处理whoami命令
const handleWhoamiCommand = async () => {
  outputLines.value.push({ text: '', isCommand: false });
  await typeWriter(`姓名: ${resumeData.personalInfo.name}`);
  await typeWriter(`职位: ${resumeData.personalInfo.title}`, 15);
  await typeWriter(`邮箱: ${resumeData.personalInfo.contact.email}`, 15);
  await typeWriter(`电话: ${resumeData.personalInfo.contact.phone}`, 15);
  await typeWriter(`所在地: ${resumeData.personalInfo.contact.location}`, 15);
  outputLines.value.push({ text: '', isCommand: false });
  await typeWriter('输入 "help" 查看更多命令...', 30);
};

// 处理help命令
const handleHelpCommand = async () => {
  outputLines.value.push({ text: '', isCommand: false });
  await typeWriter('可用命令:', 30);
  await typeWriter('- whoami: 显示个人基本信息', 20);
  await typeWriter('- skills: 显示技能概览', 20);
  await typeWriter('- projects: 显示项目经历', 20);
  await typeWriter('- help: 显示此帮助信息', 20);
};

// 处理skills命令
const handleSkillsCommand = async () => {
  outputLines.value.push({ text: '', isCommand: false });
  await typeWriter('主要技能:', 30);
  const topSkills = [...resumeData.skills.technical]
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);
  for (const skill of topSkills) {
    await typeWriter(`- ${skill.name}: ${skill.level}% 熟练度`, 20);
  }
  await typeWriter('查看技能可视化图表了解更多详情', 30);
};

// 处理projects命令
const handleProjectsCommand = async () => {
  outputLines.value.push({ text: '', isCommand: false });
  await typeWriter('项目经历:', 30);
  for (const project of resumeData.projects.slice(0, 2)) {
    await typeWriter(`- ${project.name}`, 25);
    await typeWriter(`  角色: ${project.role}`, 20);
    await typeWriter(`  技术: ${project.technologies.slice(0, 3).join(', ')}`, 20);
  }
  await typeWriter('查看项目展示区了解更多详情', 30);
};

// 清除输入
const clearInput = () => {
  currentCommand.value = '';
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (consoleBody.value) {
      consoleBody.value.scrollTop = consoleBody.value.scrollHeight;
    }
  });
};

onMounted(() => {
  // 初始提示
  outputLines.value.push({
    text: '欢迎使用个人简历终端!',
    isCommand: false
  });
  outputLines.value.push({
    text: '输入 "help" 查看可用命令，或直接输入 "whoami" 开始',
    isCommand: false
  });
  outputLines.value.push({ text: '', isCommand: false });

  // 自动聚焦输入框
  nextTick(() => {
    commandInput.value?.focus();
  });

  // 移除主题相关代码
});
</script>

<style scoped>
.console-container {
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  max-width: 800px;
  margin: 2rem auto;
}

.console-header {
  background-color: #2d2d2d;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.console-buttons {
  display: flex;
  gap: 0.5rem;
}

.button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red { background-color: #ff5f56; }
.yellow { background-color: #ffbd2e; }
.green { background-color: #27c93f; }

.console-title {
  color: #ccc;
  font-size: 0.8rem;
  margin-left: 1rem;
}

.console-body {
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  color: #f0f0f0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.output-line {
  color: #8be9fd;
  margin-bottom: 0.5rem;
}

.command-line {
  color: #f1fa8c;
  margin-bottom: 0.5rem;
}

.prompt {
  color: #50fa7b;
  margin-right: 0.5rem;
}

.input-line {
  display: flex;
  align-items: center;
}

.command-input {
  background: transparent;
  border: none;
  color: #f0f0f0;
  font-family: inherit;
  font-size: inherit;
  flex: 1;
  outline: none;
  padding: 0;
}

.command-input::placeholder {
  color: #666;
}

/* 滚动条样式 */
.console-body::-webkit-scrollbar {
  width: 8px;
}

.console-body::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.console-body::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.console-body::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>