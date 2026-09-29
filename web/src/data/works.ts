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
    title: 'Selected Projects',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Highlights',
    visitLabel: 'Open project',
    detailPlaceholder: 'Project notes will live here.',
    phImageLabel: 'Project visual',
    phButtonLabel: 'External link',
    countLabel: (n) => `${n} projects`,
    sections: [
      {
        id: 'forecast',
        no: '01',
        title: 'Financial Modelling',
        tagline: 'Forecast · Scenario · Decision support',
        items: [
          { name: 'Revenue Forecast Engine', meta: 'Forecasting', slug: 'revenue-forecast-engine' },
          { name: 'Scenario Analysis Model', meta: 'Planning', slug: 'scenario-analysis' },
          { name: 'Working Capital Analysis', meta: 'Cash flow', slug: 'working-capital-analysis' },
        ],
        footer: 'Excel · Forecasting · Variance Analysis',
      },
      {
        id: 'revenue',
        no: '02',
        title: 'Revenue & Collections',
        tagline: 'Subscription · Billing · Cash collection',
        items: [
          { name: 'Subscription Revenue Model', meta: 'SaaS finance', slug: 'subscription-revenue-model' },
          { name: 'Collection Engine', meta: 'Collections', slug: 'collection-engine' },
          { name: 'Billing Plan Engine', meta: 'Billing', slug: 'billing-plan-engine' },
        ],
        footer: 'Revenue recognition · Collections · Working capital',
      },
      {
        id: 'bi',
        no: '03',
        title: 'Dashboards & BI',
        tagline: 'Turning finance data into decisions',
        items: [
          { name: 'Executive Finance Dashboard', meta: 'Power BI', slug: 'executive-finance-dashboard' },
          { name: 'Performance Reporting', meta: 'Excel + Power BI', slug: 'performance-reporting' },
          { name: 'Data Analysis Workflows', meta: 'SQL · Excel', slug: 'data-analysis-workflows' },
        ],
        footer: 'Power BI · Advanced Excel · SQL',
      },
      {
        id: 'creative',
        no: '04',
        title: 'Finance × Creativity',
        tagline: 'Design, interaction and visual storytelling',
        items: [
          { name: 'Interactive Portfolio', meta: 'React · UI/UX', slug: 'interactive-portfolio' },
          { name: 'Motion & Animation Studies', meta: 'Procreate Dreams', slug: 'motion-animation' },
          { name: 'Visual Design Experiments', meta: 'Figma · Vector', slug: 'visual-design' },
        ],
        footer: 'Figma · Procreate Dreams · Vector design',
      },
    ],
  },
  zh: {
    title: 'Selected Projects',
    closeLabel: '返回',
    openLabel: '展开',
    hint: '继续下滑',
    awardsLabel: '重点',
    visitLabel: '打开项目',
    detailPlaceholder: '项目说明将在这里展示。',
    phImageLabel: '项目视觉',
    phButtonLabel: '外部链接',
    countLabel: (n) => `${n} 个项目`,
    sections: [],
  },
}

export const SECTION_COVERS: Record<string, string> = {}

export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, group) => n + group.items.length, 0)
  return 0
}
