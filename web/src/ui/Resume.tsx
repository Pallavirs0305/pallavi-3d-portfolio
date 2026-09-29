import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pallaviraghurs',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Pallavirs0305',
  },
]

interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  points?: string[]
  groups?: ResumeGroup[]
}

const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Experience',
    entries: [
      {
        period: 'May 2022 – May 2023',
        place: 'UnitedHealth Group',
        role: 'Enrollment & Eligibility Representative',
        points: [
          'Processed 500+ monthly enrollments with 99.8% accuracy.',
          'Reduced processing errors by 12% and turnaround time from 8 hours to 6.4 hours.',
          'Resolved 100+ monthly service exceptions while meeting 98%+ SLA targets.',
        ],
      },
      {
        period: 'Feb 2024 – Mar 2025',
        place: 'Optum · UnitedHealth Group',
        role: 'Financial Analyst',
        points: [
          'Supported a $100M+ annual budget; improved forecast accuracy by 18%.',
          'Built and maintained 8+ multi-entity models for annual budgeting, rolling 13-week forecasts, and strategic planning.',
          'Identified 25+ cost-saving opportunities valued at $2.3M+.',
          'Reconciled 50+ balance sheet accounts daily with 99.8% accuracy.',
          'Automated 12+ reporting workflows using Power BI and Advanced Excel, reducing the monthly reporting cycle from 15 days to 9 days.',
          'Developed 8 real-time leadership dashboards and supported reporting for 6 department heads.',
        ],
      },
      {
        period: 'Jan 2024 – May 2025',
        place: 'Independent Collaboration',
        role: 'E-Commerce & Supply Chain Finance Associate',
        points: [
          'Managed SKU-level financial controls across 200+ product lines and reduced inventory variance by 8%.',
          'Built Power BI and Excel dashboards across Shopify, WooCommerce, and Amazon.',
          'Analyzed GA4 and PPC performance, contributing to a 22% improvement in ROAS.',
          'Reconciled Amazon Seller Central settlements totaling $200K+.',
        ],
      },
      {
        period: 'Jun 2025 – Present',
        place: 'E-Commerce Operations',
        role: 'E-Commerce Assistant & Financial Operations',
        points: [
          'Managed $500K+ in monthly financial operations across a multi-platform e-commerce ecosystem.',
          'Maintained revenue and inventory reconciliations across 3 platforms and 150+ SKUs.',
          'Delivered monthly KPI dashboards and performance insights to executive management.',
          'Reduced procurement-to-dispatch turnaround time by 15%.',
          'Supported campaign P&L and pricing analysis, contributing to a 12% improvement in campaign ROI and an 8% increase in average order value.',
        ],
      },
    ],
  },
  zh: {
    title: 'Experience',
    entries: [
      {
        period: '2022 – 2023',
        place: 'UnitedHealth Group',
        role: 'Enrollment & Eligibility Representative',
      },
      {
        period: '2024 – 2025',
        place: 'Optum · UnitedHealth Group',
        role: 'Financial Analyst',
      },
      {
        period: '2024 – 2025',
        place: 'Independent Collaboration',
        role: 'E-Commerce & Supply Chain Finance Associate',
      },
      {
        period: '2025 – 至今',
        place: 'E-Commerce Operations',
        role: 'E-Commerce Assistant & Financial Operations',
      },
    ],
  },
}

const POINT_ORDER = FOCUS_POINTS
const EASE = [0.22, 1, 0.36, 1]

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.link ? (
          <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
            {group.heading}
          </a>
        ) : (
          <span>{group.heading}</span>
        )}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => (
            <a
              key={l.id}
              className="tl-logo"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              title={l.label}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>{entry.period}</motion.div>
        <motion.div className="tl-head" variants={itemV}>
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => <li key={i}>{p}</li>)}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => <Entry key={i} entry={e} index={i} />)}
      </div>
    </section>
  )
}
