export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    avatar?: string;
    contact: {
      phone: string;
      email: string;
      location: string;
      politicalStatus: string;
    };
  };
  education: Array<{
    period: string;
    school: string;
    degree: string;
    major: string;
    courses?: string[];
    achievements?: string[];
  }>;
  experience: Array<{
    period: string;
    company: string;
    position: string;
    location: string;
    responsibilities: string[];
  }>;
  projects: Array<{
    period: string;
    name: string;
    role: string;
    description: string;
    technologies: string[];
    achievements?: string[];
    link?: string;
  }>;
  research?: Array<{
    period: string;
    title: string;
    description: string;
    contributions: string[];
    publications?: string[];
  }>;
  skills: {
    technical: Array<{
      name: string;
      level: number;
      category: string;
    }>;
    frameworks: Array<{
      name: string;
      level: number;
      category: string;
    }>;
    languages: Array<{
      name: string;
      level: number;
    }>;
  };
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: '张旋',
    title: '大模型AI开发',
    contact: {
      phone: '13770615793',
      email: '13770615793@163.com',
      location: '北京',
      politicalStatus: '中共党员'
    }
  },
  education: [
    {
      period: '2023.09 - 至今',
      school: '北京工商大学 (北京市重点)',
      degree: '硕士',
      major: '统计学',
      courses: ['机器学习', '大数据分析', '复杂数据建模', '统计因果推断等']
    },
    {
      period: '2019.09 - 2023.06',
      school: '南京工业大学 (省部共建)',
      degree: '本科',
      major: '数学与应用数学',
      courses: ['计算机程序设计Python', '大数据挖掘与机器学习', '时间序列分析等'],
      achievements: [
        '全国大学生数学建模竞赛 (江苏组) 省一',
        '美国H奖',
        '校一等奖学金多次 (前5%)',
        '校二等奖学金多次 (前10%)',
        '校"三好学生"称号两次',
        '南京工业大学优秀毕业生 (唯二)'
      ]
    }
  ],
  experience: [
    {
      period: '2025.05 - 2025.07',
      company: '海南绿色发展信用评级有限公司 (北京)',
      position: '大数据开发实习生',
      location: '北京',
      responsibilities: [
        '使用Python对公司采集的数据进行数据清洗、数据验证和关键字段的提取，对标准化的海量企业数据利用Clickhouse数据库进行构建分布式存储，使其具备高可用性和高效的并行处理性能',
        '结合业务需求和数据特点，利用业务指标和相关标签体系，利用Coze部署AI Agent对企业指标与产业关键词进行语义匹配，实现对企业指标到三大产业的归类，进一步为公司企业绿色评级提供依据'
      ]
    }
  ],
  projects: [
    {
      period: '2025.04 - 2025.06',
      name: '大模型微调项目：基于Qwen系列大模型的Text-to-SQL能力开发',
      role: '项目管理',
      description: '为降低非技术用户数据库操作门槛，基于Qwen系列大模型微调Text-to-SQL能力，实现自然语言转SQL查询。使用NL2SQL-BIRD数据集与Alpaca格式转换适配多轮对话，通过LoRA轻量化微调与LLaMA-Factory训练框架提升效率，测试集准确率58%，本地化部署验证可行性。',
      technologies: ['Qwen系列大模型', 'LoRA参数高效微调', 'LLaMA-Factory训练框架', 'NL2SQL-BIRD数据集', 'FastAPI', 'Streamlit'],
      achievements: [
        '通过LoRA技术减少95%参数量，训练效率提升4倍',
        'NL2SQL-BIRD测试集准确率58%，对话交互满意度92%',
        '开发多轮对话界面，响应延迟<300ms，支持复杂查询验证'
      ]
    },
    {
      period: '2025.04 - 2025.05',
      name: '上海市拌客外卖门店运营数据分析与策略优化',
      role: '数据分析师',
      description: '整合门店GMV、订单量、曝光量等15项核心指标，利用Excel清洗异常值，构建标准化数据集。通过Tableau制作各指标的动态可视化看板，定位关键问题(流量转化，广告投放效率等)进行分析。构建"曝光人数→进店人数→下单人数"漏斗模型，分析晚间曝光率占比40%，而下单率低下的原因。建立商户与平台补贴的GMV贡献模型，提出满减策略，提高用户进店转化率，降低CPC投放成本。',
      technologies: ['Excel', 'Tableau', '漏斗模型', 'GMV贡献模型', 'CPC优化'],
      achievements: [
        '构建标准化数据集，整合15项核心运营指标',
        '设计动态可视化看板，提升数据决策效率30%',
        '提出满减策略，进店转化率提升15%，CPC投放成本降低20%'
      ]
    },
    {
      period: '2025.02 - 2025.03',
      name: '基于主成分分析与聚类算法的全球经济水平分析',
      role: '项目负责人',
      description: '基于Kaggle网站，利用R语言爬取，整合167国经济指标，完成数据异常值检测和标准化处理等。采用主成分分析(PCA)，提取4个主成分(累计贡献率85%)，分析影响全球经济水平的因素。结合层次聚类与K-means算法，将全球国家按经济水平划分为3类，与现实情况进行多维度对比分析。通过变量排序与Tableau可视化，发现人均指标是经济核心表征，验证经济发展需多维提升。',
      technologies: ['R语言', '主成分分析(PCA)', '层次聚类', 'K-means', 'Tableau'],
      achievements: [
        '构建包含167国经济指标的标准化数据库',
        '提取4个核心经济影响因素，累计贡献率达85%',
        '建立全球经济水平分类框架，为国际组织提供差异化政策建议'
      ]
    },
    {
      period: '2024.03 - 2024.05',
      name: '河南省粮食产量影响因素分析与预测模型构建',
      role: '核心成员',
      description: '通过箱线图、相关系数矩阵及VIF检测多重共线性，识别异常值，标准化处理以消除量纲影响。采用基于R语言的Shapley值分解法，量化变量贡献度，剔除低影响变量，确定核心驱动因素。采用多元线性回归和BP神经网络模型预测未来5年粮食产量，测试精度分别达98.29%和98.58%。预测河南省2023-2027年粮食产量趋势，提出有效政策建议，给出理论支撑农业部门资源调配。',
      technologies: ['R语言', 'Shapley值分解', '多元线性回归', 'BP神经网络', 'VIF检测'],
      achievements: [
        '建立粮食产量预测模型，精度达98.58%',
        '识别关键影响因素，提升预测准确性12%',
        '为农业部门提供资源调配理论支撑，获采纳应用'
      ]
    }
  ],
  research: [
    {
      period: '2024.06 - 2024.12',
      title: '机器学习算法AP聚类框架的研发与应用',
      description: '针对传统混合压缩与流形学习的AP聚类算法的高计算复杂度、无法处理流形结构数据及聚类数量失控三大缺陷，提出混合压缩策略，结合随机采样与密度峰值聚类(DP)筛选代表样本，将全量相似度矩阵压缩为子矩阵，降低计算复杂度至O(N²)，内存占用率减少78%。',
      contributions: [
        '提出混合压缩策略，结合随机采样与密度峰值聚类(DP)筛选代表样本，将全量相似度矩阵压缩为子矩阵，降低计算复杂度至O(N²)，内存占用率减少78%',
        '引入流形距离度量，通过KNN图构建邻接矩阵，提升算法在低维流形形状数据(如数字图像)的聚类准确性',
        '设计动态聚类合并阈值升降算法，解决AP偏好多参数敏感性问题，在UCI数据集和各类图像数据集中平均提升聚类一致性15%以上'
      ],
      publications: ['SCI一区 (Pattern recognition) 论文在投']
    }
  ],
  skills: {
    technical: [
      { name: 'Python', level: 90, category: '编程语言' },
      { name: 'SQL', level: 85, category: '数据库' },
      { name: 'Linux', level: 80, category: '操作系统' },
      { name: 'Git', level: 85, category: '版本控制' },
      { name: 'PyTorch', level: 85, category: '深度学习框架' },
      { name: 'scikit-learn', level: 80, category: '机器学习库' },
      { name: 'Huggingface', level: 85, category: 'NLP工具' },
      { name: 'LLaMA Factory', level: 80, category: '大模型微调' },
      { name: 'RAGFlow', level: 75, category: '检索增强' }
    ],
    frameworks: [
      { name: 'Vue 3', level: 70, category: '前端框架' },
      { name: 'FastAPI', level: 75, category: '后端框架' },
      { name: 'Streamlit', level: 80, category: '可视化工具' },
      { name: 'Pinia', level: 70, category: '状态管理' }
    ],
    languages: [
      { name: '机器学习算法', level: 85 },
      { name: '深度学习模型', level: 85 },
      { name: '大模型微调', level: 80 },
      { name: 'LLM架构', level: 80 },
      { name: 'RAG', level: 75 },
      { name: 'SQL优化', level: 75 }
    ]
  }
};