export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  en: {
    title: 'Selected Work',
    closeLabel: 'Close',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Focus',
    visitLabel: 'Open',
    detailPlaceholder: 'Project details coming soon.',
    phImageLabel: 'Project visual',
    phButtonLabel: 'Open project',
    countLabel: (n) => `${n} projects`,
    sections: [
      {
        id: 'fpa',
        no: '01',
        title: 'FP&A & Financial Modelling',
        tagline: 'Planning · Forecasting · Variance Analysis',
        items: [
          { name: 'Multi-Entity Budgeting Models', meta: '8+ models · 5 business units', slug: 'budgeting-models' },
          { name: '13-Week Rolling Forecasts', meta: 'Cash-flow & planning support', slug: 'rolling-forecasts' },
          { name: 'Variance & Cost Analysis', meta: '$100M+ spend analysis', slug: 'variance-analysis' },
        ],
        footer: 'Financial modelling · budgeting · forecasting · P&L analysis',
      },
      {
        id: 'bi',
        no: '02',
        title: 'Business Intelligence',
        tagline: 'Power BI · DAX · Advanced Excel',
        items: [
          { name: 'Leadership Reporting Automation', meta: '12+ workflows', slug: 'reporting-automation' },
          { name: 'Executive KPI Dashboards', meta: '8 real-time dashboards', slug: 'executive-dashboards' },
          { name: 'Reconciliation & Controls', meta: '50+ balance sheet accounts', slug: 'financial-controls' },
        ],
        footer: 'Power BI · DAX · Excel · reporting automation · KPI dashboards',
      },
      {
        id: 'ecom',
        no: '03',
        title: 'E-Commerce Finance',
        tagline: 'Revenue · Inventory · Performance',
        items: [
          { name: 'Multi-Platform P&L Monitoring', meta: '$500K+ monthly operations', slug: 'ecommerce-finance' },
          { name: 'Inventory & Procurement Analytics', meta: '150+ to 200+ SKUs', slug: 'inventory-analytics' },
          { name: 'PPC & ROAS Analysis', meta: 'GA4 · Google Ads · Meta Ads · Amazon Ads', slug: 'ppc-analysis' },
        ],
        footer: 'Shopify · WooCommerce · Amazon Seller Central · GA4 · PPC',
      },
      {
        id: 'creative',
        no: '04',
        title: 'Creative Technology',
        tagline: 'UI/UX · Motion · Interactive Experiments',
        items: [
          { name: 'Interactive Portfolio', meta: 'React · Three.js · WebGL', slug: 'interactive-portfolio' },
          { name: 'Visual Experiments', meta: 'Animation · Vector · Creative coding', slug: 'visual-experiments' },
        ],
        footer: 'Figma · Procreate Dreams · CorelDRAW · React · Three.js',
      },
    ],
  },
  zh: {
    title: 'Selected Work',
    closeLabel: '关闭',
    openLabel: '探索',
    hint: '继续下滑',
    awardsLabel: 'Focus',
    visitLabel: '打开',
    detailPlaceholder: '项目详情即将补充。',
    phImageLabel: '项目视觉',
    phButtonLabel: '打开项目',
    countLabel: (n) => `${n} 个项目`,
    sections: [
      {
        id: 'fpa',
        no: '01',
        title: 'FP&A 与财务建模',
        tagline: '预算 · 预测 · 差异分析',
        items: [
          { name: '多实体预算模型', meta: '8+ 个模型 · 5 个业务单元' },
          { name: '13 周滚动预测', meta: '现金流与规划支持' },
          { name: '差异与成本分析', meta: '100M+ 美元支出分析' },
        ],
        footer: '财务建模 · 预算 · 预测 · P&L 分析',
      },
      {
        id: 'bi',
        no: '02',
        title: '商业智能',
        tagline: 'Power BI · DAX · Advanced Excel',
        items: [
          { name: '管理层报告自动化', meta: '12+ 个工作流' },
          { name: '高管 KPI 仪表板', meta: '8 个实时仪表板' },
          { name: '对账与财务控制', meta: '50+ 个资产负债表账户' },
        ],
        footer: 'Power BI · DAX · Excel · 报告自动化 · KPI',
      },
      {
        id: 'ecom',
        no: '03',
        title: '电商财务',
        tagline: '收入 · 库存 · 经营分析',
        items: [
          { name: '多平台 P&L 监控', meta: '每月 500K+ 美元运营' },
          { name: '库存与采购分析', meta: '150+ 至 200+ SKUs' },
          { name: 'PPC 与 ROAS 分析', meta: 'GA4 · Google Ads · Meta Ads · Amazon Ads' },
        ],
        footer: 'Shopify · WooCommerce · Amazon Seller Central · GA4 · PPC',
      },
      {
        id: 'creative',
        no: '04',
        title: '创意技术',
        tagline: 'UI/UX · 动效 · 交互实验',
        items: [
          { name: '交互式个人主页', meta: 'React · Three.js · WebGL' },
          { name: '视觉实验', meta: 'Animation · Vector · Creative coding' },
        ],
        footer: 'Figma · Procreate Dreams · CorelDRAW · React · Three.js',
      },
    ],
  },
}

export const SECTION_COVERS: Record<string, string> = {
  fpa: `${import.meta.env.BASE_URL}works/covers/fpa.jpg`,
  bi: `${import.meta.env.BASE_URL}works/covers/bi.jpg`,
  ecom: `${import.meta.env.BASE_URL}works/covers/ecom.jpg`,
  creative: `${import.meta.env.BASE_URL}works/covers/creative.jpg`,
}

export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
