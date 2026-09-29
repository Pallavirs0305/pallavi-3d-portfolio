import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

interface ResumeEntry {
  period: string
  place: string
  role?: string
  points?: string[]
}

const RESUME: ResumeEntry[] = [
  {
    period: 'EDUCATION',
    place: 'B.Com in Tax',
    role: 'Commerce · Taxation',
    points: [
      'Built a foundation in accounting, taxation, financial reporting and business fundamentals.',
    ],
  },
  {
    period: '3+ YEARS',
    place: 'Financial Analysis',
    role: 'Financial Analyst',
    points: [
      'Financial reporting, budgeting, forecasting, variance analysis and decision-ready insights.',
    ],
  },
  {
    period: '2 YEARS',
    place: 'E-commerce Operations',
    role: 'E-commerce Assistant',
    points: [
      'Marketplace operations, product listings, campaign support, performance tracking and day-to-day execution.',
    ],
  },
  {
    period: 'AD OPERATIONS',
    place: 'Market Union',
    role: 'China-based Ad Operations',
    points: [
      'Worked across Google Ads, Meta Ads and Amazon Ads with a strong focus on data and campaign performance.',
    ],
  },
  {
    period: 'NOW',
    place: 'Finance × Tech × Creativity',
    role: 'Building, analysing and designing',
    points: [
      'Advanced Excel, Power BI, SQL, Figma, data storytelling, animation and visual design.',
    ],
  },
]

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
        {entry.role && <motion.div className="tl-role" variants={itemV}>{entry.role}</motion.div>}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((point) => <li key={point}>{point}</li>)}
          </motion.ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        Experience
      </motion.h2>
      <div className="timeline">
        {RESUME.map((entry, index) => <Entry key={entry.place} entry={entry} index={index} />)}
      </div>
    </section>
  )
}
