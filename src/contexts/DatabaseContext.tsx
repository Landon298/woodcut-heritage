import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  likes: number;
}

export interface WoodcutWork {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  series: string;
  dynasty: string;
  origin: string;
  description: string;
  image: string;
  images?: string[]; // 多图片支持
  rating: number;
  reviewCount: number;
  author: string;
  authorId?: string;
  isUserUpload?: boolean;
  comments: Comment[];
  tags: string[];
}

interface DatabaseContextType {
  works: WoodcutWork[];
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addWork: (work: Omit<WoodcutWork, 'id' | 'comments' | 'rating' | 'reviewCount'>) => void;
  addComment: (workId: string, content: string) => void;
  searchWorks: (query: string, filters?: { category?: string; series?: string; dynasty?: string; origin?: string }) => WoodcutWork[];
  getWorkById: (id: string) => WoodcutWork | undefined;
  getUserWorks: () => WoodcutWork[];
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// Initial works data combining both websites
const initialWorks: WoodcutWork[] = [
  // 山海经异兽系列
  {
    id: 'shan-001',
    title: '麒麟',
    titleEn: 'Qilin - The Auspicious Beast',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的瑞兽麒麟，身披鳞甲、头生龙角、足踏祥云，是吉祥如意的象征。',
    image: '/uploads/qilin-2.jpg',
    images: ['https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/jingwei-1.jpg', 'https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/jingwei-2.jpg'],
    rating: 5.0,
    reviewCount: 256,
    author: '承印千年工作室',
    comments: [
      { id: 'c1', userId: 'u1', userName: '文化爱好者', content: '麒麟的形象栩栩如生，线条流畅。', date: '2026-04-10', likes: 45 },
      { id: 'c2', userId: 'u2', userName: '版画收藏家', content: '传统工艺与现代审美的完美结合。', date: '2026-04-11', likes: 32 }
    ],
    tags: ['瑞兽', '吉祥', '神兽']
  },
  {
    id: 'shan-002',
    title: '凤凰',
    titleEn: 'Fenghuang - The Phoenix',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的神鸟凤凰，羽翼华丽、尾羽飘逸，翱翔于云雾缭绕的山林之间。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 198,
    author: '承印千年工作室',
    comments: [],
    tags: ['神鸟', '凤凰', '祥瑞']
  },
  {
    id: 'shan-003',
    title: '白虎',
    titleEn: 'Baihu - The White Tiger',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的西方神兽白虎，身披白色毛皮、额有王字，威猛无比，是四象之一。',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 167,
    author: '承印千年工作室',
    comments: [],
    tags: ['白虎', '四象', '神兽']
  },
  {
    id: 'shan-004',
    title: '烛龙',
    titleEn: 'Zhulong - The Torch Dragon',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的钟山之神烛龙，人面龙身，口衔蜡烛，照亮九天十地。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 189,
    author: '承印千年工作室',
    comments: [],
    tags: ['烛龙', '钟山神', '神话']
  },
  {
    id: 'shan-005',
    title: '九婴',
    titleEn: 'Jiuying - The Nine-Headed Infant',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的九头神兽，能喷水吐火，生于凶水之上，是为上古凶兽。',
    image: 'https://images.unsplash.com/photo-1582560475093-d09bc3020944?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 145,
    author: '承印千年工作室',
    comments: [],
    tags: ['九婴', '凶兽', '神话']
  },
  {
    id: 'shan-006',
    title: '穷奇',
    titleEn: 'Qiongqi - The Mythical Beast',
    category: '山海经异兽',
    series: '山海经异兽系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》中记载的四大凶兽之一，形似虎而有翼，能听懂人语，专门帮助坏人。',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
    rating: 4.6,
    reviewCount: 134,
    author: '承印千年工作室',
    comments: [],
    tags: ['穷奇', '凶兽', '神话']
  },
  // 原创热门IP系列
  {
    id: 'ori-001',
    title: '哪吒斗龙',
    titleEn: 'Nezha Fighting the Dragon',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '史诗般的神话战斗场景，哪吒在波涛汹涌的海面上挺身对抗多头巨龙，展现出无畏的英雄主义气概。',
    image: '/uploads/nezha.jpg',
    images: ['/uploads/nezha.jpg'],

    rating: 5.0,
    reviewCount: 312,
    author: '承印千年工作室',
    comments: [
      { id: 'c3', userId: 'u3', userName: '哪吒粉丝', content: '战斗场面震撼人心！', date: '2026-04-09', likes: 67 }
    ],
    tags: ['哪吒', '神话', '战斗']
  },
  {
    id: 'ori-002',
    title: '精卫填海',
    titleEn: 'Jingwei Filling the Sea',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '《山海经》经典神话故事，炎帝之女女娃溺水而亡化为精卫鸟，衔石填海的悲壮场景。画面中精卫鸟口衔石子，在波涛汹涌的海面上飞翔，展现出不屈不挠的精神。',
    image: 'https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/jingwei-1.jpg',
    images: ['https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/jingwei-1.jpg', 'https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/jingwei-2.jpg'],
    rating: 4.9,
    reviewCount: 278,
    author: '承印千年工作室',
    comments: [],
    tags: ['精卫', '神话', '填海']
  },
  {
    id: 'ori-003',
    title: '大闹天宫',
    titleEn: 'Havoc in Heaven',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '齐天大圣孙悟空大闹天宫的经典场景，天兵天将围攻花果山，美猴王独战群雄。',
    image: '/uploads/danajiao.jpg',
    images: ['/uploads/danajiao.jpg'],

    rating: 4.8,
    reviewCount: 234,
    author: '承印千年工作室',
    comments: [],
    tags: ['孙悟空', '西游记', '天宫']
  },
  {
    id: 'ori-004',
    title: '战神斗龙',
    titleEn: 'Warrior Fighting the Dragon',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '史诗般的神话战斗场景，武士在波涛汹涌的海面上挺身对抗多头神龙，展现出无畏的英雄主义气概。画面中神龙拥有多个龙头，龙身蜿蜒盘旋，布满精细刻画的鳞片，祥云环绕，气势磅礴。人类武士虽然渺小，却以跃起冲锋的姿态直面神兽，"以小博大"的构图突出了英勇无畏的战斗精神。',
    image: '/uploads/work-001.jpg',
    images: ['/uploads/work-001.jpg'],

    rating: 5.0,
    reviewCount: 0,
    author: '承印千年工作室',
    comments: [],
    tags: ['战神', '斗龙', '神话', '战斗', '英雄']
  },
  {
    id: 'ori-005',
    title: '云端决战',
    titleEn: 'Battle in the Clouds',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '一幅极具动态感和戏剧张力的木刻版画，展现英雄人物在宏伟传统建筑间的激烈战斗。画面融合了中国传统建筑元素（层叠瓦片屋顶、精雕细琢的檐角）和神话氛围（云气、烟雾、火焰般的涡卷纹理）。人物身穿繁复盔甲，手持长柄兵器，身姿矫健。画面中央有云朵状边框的匾额，彰显传统木刻版画的精湛技艺。',
    image: '/uploads/work-002.jpg',
    images: ['/uploads/work-002.jpg'],

    rating: 5.0,
    reviewCount: 0,
    author: '承印千年工作室',
    comments: [],
    tags: ['云端', '决战', '战斗', '神话', '英雄', '建筑']
  },
  {
    id: 'ori-006',
    title: '有兽焉',
    titleEn: '',
    category: '原创热门IP',
    series: '原创热门IP系列',
    dynasty: '现代',
    origin: '乘印千年工作室',
    description: '《有兽焉》以神话集《山海经》为背景，将其中神兽的特色元素提取融合，围绕神兽四不像经营专门帮助神兽的鹿人店展开故事。讲述上古神兽貔貅皮皮来到人间，为躲避人类追捕，逃到好友四不像开的鹿人店，结识了一群性格各异的神兽，他们一起经历各种有趣事情，皮皮逐渐成长为勇敢有担当的神兽。',
    image: '/uploads/youshouyan-1.png',
    images: ['/uploads/youshouyan-1.png', '/uploads/youshouyan-2.png'],
    rating: 4.9,
    reviewCount: 1234,
    author: '乘印千年工作室',
    comments: [],
    tags: ['有兽焉', '山海经', '神兽', '皮皮', '四不像', '鹿人店', '奇幻', '冒险', '治愈']
  },
  // 历史人物场景
  {
    id: 'his-001',
    title: '秦始皇统一六国',
    titleEn: 'Qin Shi Huang Unifies the Six States',
    category: '历史人物',
    series: '历史人物场景',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '秦始皇扫六合、一统天下的宏大场面，展现秦军威武、版图归一的壮观景象。',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 189,
    author: '承印千年工作室',
    comments: [],
    tags: ['秦始皇', '统一', '战争']
  },
  {
    id: 'his-002',
    title: '项羽破釜沉舟',
    titleEn: 'Xiang Yu Breaks Cauldrons and Sinks Boats',
    category: '历史人物',
    series: '历史人物场景',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '项羽率军渡河后砸锅沉船，背水一战的英雄气概，表达了"置之死地而后生"的决心。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 201,
    author: '承印千年工作室',
    comments: [],
    tags: ['项羽', '楚汉争霸', '战争']
  },
  {
    id: 'his-003',
    title: '诸葛亮出山',
    titleEn: 'Zhuge Liang Leaves the Mountain',
    category: '历史人物',
    series: '历史人物场景',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '刘备三顾茅庐，诸葛亮感其诚心，出山辅佐，奠定三分天下之基业。',
    image: 'https://images.unsplash.com/photo-1582560475093-d09bc3020944?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 178,
    author: '承印千年工作室',
    comments: [],
    tags: ['诸葛亮', '三国', '谋略']
  },
  {
    id: 'his-004',
    title: '岳飞抗金',
    titleEn: 'Yue Fei Resists Jin Dynasty',
    category: '历史人物',
    series: '历史人物场景',
    dynasty: '现代',
    origin: '承印千年工作室',
    description: '精忠报国的岳飞率领岳家军抗金，驰骋沙场，威震敌胆。',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 167,
    author: '承印千年工作室',
    comments: [],
    tags: ['岳飞', '南宋', '民族英雄']
  },
  // 传统木版年画 - 门神画
  {
    id: 'tra-001',
    title: '门神·秦琼敬德',
    titleEn: 'Gate Gods - Qín Qióng & Yì Chì Gōng',
    category: '门神画',
    series: '传统木版年画',
    dynasty: '明代',
    origin: '河南朱仙镇',
    description: '朱仙镇木版年画代表作，线条粗犷有力，色彩鲜艳夺目，展现武将威仪。',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 12580,
    author: '承印千年工作室',
    comments: [
      { id: 'c4', userId: 'u4', userName: '年画爱好者', content: '朱仙镇年画的经典之作，保存完好。', date: '2026-04-08', likes: 89 }
    ],
    tags: ['门神', '秦琼', '敬德', '朱仙镇']
  },
  {
    id: 'tra-002',
    title: '武门神（天成年画）',
    titleEn: 'Gate Gods - Tian Cheng',
    category: '门神画',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '河南朱仙镇',
    description: '威风凛凛的武将门神，身披全副盔甲、手持长柄兵器，形成对称之势，镇宅护院。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 8934,
    author: '承印千年工作室',
    comments: [],
    tags: ['门神', '武将', '天成']
  },
  // 传统木版年画 - 吉祥图案
  {
    id: 'tra-003',
    title: '鲤鱼跃龙门',
    titleEn: 'Carp Leaping the Dragon Gate',
    category: '吉祥图案',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '天津杨柳青',
    description: '杨柳青年画经典题材，寓意学业进步、事业腾飞，构图生动优美。',
    image: 'https://images.unsplash.com/photo-1582560475093-d09bc3020944?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 9834,
    author: '承印千年工作室',
    comments: [],
    tags: ['鲤鱼', '龙门', '吉祥', '杨柳青']
  },
  {
    id: 'tra-004',
    title: '对我生财（推车进宝）',
    titleEn: 'Pushing Treasures for Wealth',
    category: '吉祥图案',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '河南朱仙镇',
    description: '活泼可爱的吉祥童子推着装满财宝的小车，寓意财源广进、富贵满堂。',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 7654,
    author: '承印千年工作室',
    comments: [],
    tags: ['童子', '进宝', '朱仙镇', '吉祥']
  },
  {
    id: 'tra-005',
    title: '一团和气',
    titleEn: 'Harmony in Unity',
    category: '吉祥图案',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '苏州桃花坞',
    description: '桃花坞年画代表，圆润可爱的人物形象，表达和合美满的愿景。',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 10234,
    author: '承印千年工作室',
    comments: [],
    tags: ['和气', '桃花坞', '吉祥']
  },
  {
    id: 'tra-006',
    title: '母子情深·六畜兴旺',
    titleEn: 'Mother and Child - Livestock Prosperity',
    category: '吉祥图案',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '河南朱仙镇',
    description: '慈祥的母亲怀抱婴儿，被成群的鸡簇拥，象征家庭幸福、子孙满堂、六畜兴旺。',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&h=600&fit=crop',
    rating: 4.6,
    reviewCount: 6543,
    author: '承印千年工作室',
    comments: [],
    tags: ['母子', '六畜', '朱仙镇', '吉祥']
  },
  // 传统木版年画 - 戏曲故事
  {
    id: 'tra-007',
    title: '牛郎织女',
    titleEn: 'The Cowherd and the Weaver Girl',
    category: '戏曲故事',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '山东潍坊',
    description: '杨家埠年画代表，讲述七夕传说，色彩浓烈，富有民间情趣。',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 8765,
    author: '承印千年工作室',
    comments: [],
    tags: ['牛郎织女', '七夕', '潍坊', '爱情']
  },
  {
    id: 'tra-008',
    title: '花木兰',
    titleEn: 'Mulan',
    category: '戏曲故事',
    series: '传统木版年画',
    dynasty: '民国',
    origin: '河北武强',
    description: '武强年画代表作，故事生动感人，刀法古朴有力。',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800&h=600&fit=crop',
    rating: 4.6,
    reviewCount: 7654,
    author: '承印千年工作室',
    comments: [],
    tags: ['花木兰', '武强', '女英雄']
  },
  {
    id: 'tra-009',
    title: '白蛇传',
    titleEn: 'Legend of the White Snake',
    category: '戏曲故事',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '苏州桃花坞',
    description: '流传千年的爱情传奇，白娘子与许仙的感人故事。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 9123,
    author: '承印千年工作室',
    comments: [],
    tags: ['白蛇传', '桃花坞', '爱情', '传说']
  },
  // 福神画
  {
    id: 'tra-010',
    title: '福禄寿三星',
    titleEn: 'Goddess of Fortune, Prosperity and Longevity',
    category: '福神画',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '四川绵竹',
    description: '绵竹年画珍品，人物造型丰满，色彩明快，寓意吉祥美满。',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 11234,
    author: '承印千年工作室',
    comments: [],
    tags: ['福禄寿', '绵竹', '吉祥']
  },
  // 历史故事
  {
    id: 'tra-011',
    title: '水浒传·一百单八将',
    titleEn: 'Water Margin - 108 Heroes',
    category: '历史故事',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '河南朱仙镇',
    description: '朱仙镇木版年画巨制，人物众多，神态各异，展现英雄豪杰风采。',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
    rating: 5.0,
    reviewCount: 15678,
    author: '承印千年工作室',
    comments: [],
    tags: ['水浒传', '一百单八将', '朱仙镇', '英雄']
  },
  {
    id: 'tra-012',
    title: '二十四孝图',
    titleEn: 'Twenty-Four Filial Exemplars',
    category: '教化图案',
    series: '传统木版年画',
    dynasty: '明代',
    origin: '山西平阳',
    description: '传统孝道故事绘本，教化意义深远，版画技艺精湛。',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 8923,
    author: '承印千年工作室',
    comments: [],
    tags: ['二十四孝', '平阳', '孝道', '教化']
  },
  // 仕女画
  {
    id: 'tra-013',
    title: '红楼梦·金陵十二钗',
    titleEn: 'Dream of Red Chamber - Twelve Beauties of Jinling',
    category: '仕女画',
    series: '传统木版年画',
    dynasty: '清代',
    origin: '上海旧校场',
    description: '海派年画代表仕女图，人物秀美，色彩雅致，再现古典美人风韵。',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 11876,
    author: '承印千年工作室',
    comments: [],
    tags: ['红楼梦', '金陵十二钗', '上海', '仕女']
  },
];

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [works, setWorks] = useState<WoodcutWork[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Force using initial data to ensure our changes take effect
    setWorks(initialWorks);
    localStorage.setItem('woodcut_works', JSON.stringify(initialWorks));

    // Initialize users array if it doesn't exist
    const savedUsers = localStorage.getItem('woodcut_users');
    if (!savedUsers) {
      localStorage.setItem('woodcut_users', JSON.stringify([]));
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('woodcut_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const saveWorks = (newWorks: WoodcutWork[]) => {
    setWorks(newWorks);
    localStorage.setItem('woodcut_works', JSON.stringify(newWorks));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('woodcut_users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem('woodcut_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('woodcut_users') || '[]');

    if (users.find((u: User) => u.email === email)) {
      return false; // User already exists
    }

    const newUser: User & { password: string } = {
      id: `u${Date.now()}`,
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
      joinedDate: new Date().toISOString().split('T')[0],
      password
    };

    users.push(newUser);
    localStorage.setItem('woodcut_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsLoggedIn(true);
    localStorage.setItem('woodcut_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('woodcut_user');
  };

  const addWork = (work: Omit<WoodcutWork, 'id' | 'comments' | 'rating' | 'reviewCount'>) => {
    const newWork: WoodcutWork = {
      ...work,
      id: `user-${Date.now()}`,
      rating: 0,
      reviewCount: 0,
      comments: [],
      isUserUpload: true,
      authorId: user?.id,
      author: user?.username || '匿名用户'
    };
    saveWorks([newWork, ...works]);
  };

  const addComment = (workId: string, content: string) => {
    if (!user) return;

    const updatedWorks = works.map(work => {
      if (work.id === workId) {
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          userId: user.id,
          userName: user.username,
          userAvatar: user.avatar,
          content,
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };
        return {
          ...work,
          comments: [...work.comments, newComment],
          reviewCount: work.reviewCount + 1
        };
      }
      return work;
    });
    saveWorks(updatedWorks);
  };

  const searchWorks = (query: string, filters?: { category?: string; series?: string; dynasty?: string; origin?: string }): WoodcutWork[] => {
    return works.filter(work => {
      const matchesQuery = !query ||
        work.title.toLowerCase().includes(query.toLowerCase()) ||
        work.titleEn.toLowerCase().includes(query.toLowerCase()) ||
        work.description.toLowerCase().includes(query.toLowerCase()) ||
        work.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory = !filters?.category || filters.category === '全部' || work.category === filters.category;
      const matchesSeries = !filters?.series || filters.series === '全部' || work.series === filters.series;
      const matchesDynasty = !filters?.dynasty || filters.dynasty === '全部' || work.dynasty === filters.dynasty;
      const matchesOrigin = !filters?.origin || filters.origin === '全部' || work.origin === filters.origin;

      return matchesQuery && matchesCategory && matchesSeries && matchesDynasty && matchesOrigin;
    });
  };

  const getWorkById = (id: string): WoodcutWork | undefined => {
    return works.find(work => work.id === id);
  };

  const getUserWorks = (): WoodcutWork[] => {
    if (!user) return [];
    return works.filter(work => work.authorId === user.id || work.isUserUpload);
  };

  return (
    <DatabaseContext.Provider value={{
      works,
      user,
      isLoggedIn,
      login,
      register,
      logout,
      addWork,
      addComment,
      searchWorks,
      getWorkById,
      getUserWorks
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within DatabaseProvider');
  }
  return context;
};
