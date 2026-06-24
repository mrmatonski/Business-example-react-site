import { useMemo, useState } from 'react'
import './App.css'

const services = [
  {
    title: 'Conversion Websites',
    copy: 'Custom websites with sharp messaging, fast pages, and clear booking paths.',
  },
  {
    title: 'Local SEO',
    copy: 'Technical cleanup, keyword maps, and content that helps buyers find you.',
  },
  {
    title: 'Growth Systems',
    copy: 'Analytics, lead capture, automations, and simple dashboards for your team.',
  },
]

const pricing = [
  {
    name: 'Launch',
    price: '$3.5k',
    details: 'A focused five-page site for new service businesses.',
  },
  {
    name: 'Scale',
    price: '$7.5k',
    details: 'Strategy, custom design, CMS setup, and SEO foundations.',
  },
  {
    name: 'Partner',
    price: '$2.2k/mo',
    details: 'Monthly improvements, content, reporting, and CRO tests.',
  },
]

const portfolio = [
  ['Rainier Roofing', '+42% quote requests', 'Local service redesign'],
  ['Cascadia Wellness', '3.1x booking rate', 'Clinic website and SEO'],
  ['Soundline Studio', '+68% organic traffic', 'Portfolio CMS build'],
]

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [pages, setPages] = useState(8)
  const [features, setFeatures] = useState('growth')
  const [timeline, setTimeline] = useState('standard')
  const [auditUrl, setAuditUrl] = useState('')
  const [seoKeyword, setSeoKeyword] = useState('')
  const [hasWebsite, setHasWebsite] = useState('yes')
  const [monthlyRevenue, setMonthlyRevenue] = useState(25000)
  const [employees, setEmployees] = useState(8)
  const [proposalSubmitted, setProposalSubmitted] = useState(false)

  const projectEstimate = useMemo(() => {
    const featureCost = { starter: 1200, growth: 3200, ecommerce: 5600 }
    const timelineMultiplier = { relaxed: 0.9, standard: 1, rush: 1.25 }
    const base = 2800 + pages * 375 + featureCost[features]

    return Math.round(base * timelineMultiplier[timeline])
  }, [features, pages, timeline])

  const auditScore = useMemo(() => {
    const lengthBoost = Math.min(auditUrl.length * 2, 24)
    const secureBoost = auditUrl.includes('https') ? 12 : 0
    const brandBoost = auditUrl.includes('.') ? 18 : 0

    return Math.min(100, 46 + lengthBoost + secureBoost + brandBoost)
  }, [auditUrl])

  const seoScore = useMemo(() => {
    const keywordBoost = Math.min(seoKeyword.trim().length * 4, 34)
    const websiteBoost = hasWebsite === 'yes' ? 14 : 4
    const scaleBoost = Math.min(Math.floor(monthlyRevenue / 5000), 18)

    return Math.min(100, 38 + keywordBoost + websiteBoost + scaleBoost)
  }, [hasWebsite, monthlyRevenue, seoKeyword])

  const roi = useMemo(() => {
    const lift = hasWebsite === 'yes' ? 0.18 : 0.32
    const teamFactor = employees > 15 ? 1.2 : employees > 5 ? 1.08 : 1
    const annualGain = monthlyRevenue * 12 * lift * teamFactor
    const netGain = annualGain - projectEstimate
    const roiPercent = Math.round((netGain / projectEstimate) * 100)

    return {
      annualGain,
      netGain,
      roiPercent,
    }
  }, [employees, hasWebsite, monthlyRevenue, projectEstimate])

  const fitLabel =
    monthlyRevenue > 40000 && employees > 5
      ? 'High-priority growth fit'
      : monthlyRevenue > 15000
        ? 'Strong foundation fit'
        : 'Launch-stage fit'

  function handleProposalSubmit(event) {
    event.preventDefault()
    setProposalSubmitted(true)
  }

  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#home">
          Northwest Digital
        </a>
        <div>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="ambient-code" aria-hidden="true">
          <span>{'<SEO />'}</span>
          <span>{'npm run leads'}</span>
          <span>{'ROI.map(growth)'}</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Web agency for service businesses</p>
          <h1>Websites that turn local traffic into qualified leads.</h1>
          <p>
            Northwest Digital builds fast, credible websites with SEO,
            analytics, and conversion systems baked in from day one.
          </p>
          <div className="actions">
            <a className="button primary" href="#estimator">
              Estimate a project
            </a>
            <a className="button secondary" href="#quiz">
              Take the lead quiz
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Agency performance snapshot">
          <div className="code-window" aria-hidden="true">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre>
              <code>{`const leads = traffic
  .filter(visitor => visitor.intent)
  .map(visitor => bookCall(visitor))

return revenue.grow(leads)`}</code>
            </pre>
          </div>
          <span>Average client lift</span>
          <strong>34%</strong>
          <p>More form fills, booking requests, and sales calls within 90 days.</p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Strategy, design, search, and systems under one roof.</h2>
        </div>
        <div className="grid three">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section tools" id="estimator">
        <div className="section-heading">
          <p className="eyebrow">Advanced tools</p>
          <h2>Plan the business case before the first sales call.</h2>
        </div>

        <div className="tool-grid">
          <article className="tool-card">
            <h3>Project Cost Estimator</h3>
            <label>
              Pages
              <input
                max="20"
                min="3"
                onChange={(event) => setPages(Number(event.target.value))}
                type="range"
                value={pages}
              />
              <span>{pages} pages</span>
            </label>
            <label>
              Feature depth
              <select
                onChange={(event) => setFeatures(event.target.value)}
                value={features}
              >
                <option value="starter">Starter site</option>
                <option value="growth">Growth site</option>
                <option value="ecommerce">Ecommerce or portal</option>
              </select>
            </label>
            <label>
              Timeline
              <select
                onChange={(event) => setTimeline(event.target.value)}
                value={timeline}
              >
                <option value="relaxed">Flexible</option>
                <option value="standard">Standard</option>
                <option value="rush">Rush launch</option>
              </select>
            </label>
            <div className="metric">
              <span>Estimated project</span>
              <strong>{currency(projectEstimate)}</strong>
            </div>
          </article>

          <article className="tool-card">
            <h3>Website Audit Tool</h3>
            <label>
              Website URL
              <input
                onChange={(event) => setAuditUrl(event.target.value)}
                placeholder="https://yourcompany.com"
                type="url"
                value={auditUrl}
              />
            </label>
            <div className="score-row">
              <div className="score-ring">{auditScore}</div>
              <p>
                {auditScore > 80
                  ? 'Strong starting point. Optimization can focus on conversion.'
                  : 'Your site likely has speed, trust, or structure opportunities.'}
              </p>
            </div>
          </article>

          <article className="tool-card">
            <h3>SEO Score Checker</h3>
            <label>
              Target keyword
              <input
                onChange={(event) => setSeoKeyword(event.target.value)}
                placeholder="seattle contractor"
                type="text"
                value={seoKeyword}
              />
            </label>
            <div className="score-row">
              <div className="score-ring">{seoScore}</div>
              <p>
                Score reflects keyword clarity, website maturity, and current
                revenue traction.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section split" id="quiz">
        <div>
          <p className="eyebrow">Lead qualification quiz</p>
          <h2>Answer three questions. Get an estimated website ROI.</h2>
          <p>
            This quick model estimates how much additional annual revenue a
            better website could influence for your business.
          </p>
        </div>
        <article className="quiz-card">
          <label>
            Do you have a website?
            <div className="segmented">
              <button
                className={hasWebsite === 'yes' ? 'active' : ''}
                onClick={() => setHasWebsite('yes')}
                type="button"
              >
                Yes
              </button>
              <button
                className={hasWebsite === 'no' ? 'active' : ''}
                onClick={() => setHasWebsite('no')}
                type="button"
              >
                No
              </button>
            </div>
          </label>
          <label>
            Monthly revenue
            <input
              min="0"
              onChange={(event) => setMonthlyRevenue(Number(event.target.value))}
              step="1000"
              type="number"
              value={monthlyRevenue}
            />
          </label>
          <label>
            Number of employees
            <input
              min="1"
              onChange={(event) => setEmployees(Number(event.target.value))}
              type="number"
              value={employees}
            />
          </label>
          <div className="roi-box">
            <span>{fitLabel}</span>
            <strong>{roi.roiPercent}% ROI</strong>
            <p>
              Potential annual lift: {currency(roi.annualGain)}. Estimated net
              gain after build: {currency(roi.netGain)}.
            </p>
          </div>
        </article>
      </section>

      <section className="section" id="pricing">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Simple packages with room to customize.</h2>
        </div>
        <div className="grid three">
          {pricing.map((plan) => (
            <article className="card price-card" key={plan.name}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Example wins from ambitious Northwest brands.</h2>
        </div>
        <div className="portfolio-list">
          {portfolio.map(([name, result, type]) => (
            <article key={name}>
              <span>{type}</span>
              <h3>{name}</h3>
              <strong>{result}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Ready to turn your website into a sales asset?</h2>
        </div>
        <form onSubmit={handleProposalSubmit}>
          <input aria-label="Name" placeholder="Name" type="text" />
          <input aria-label="Email" placeholder="Email" type="email" />
          <textarea aria-label="Project details" placeholder="Tell us about your project" />
          <button type="submit">Request a proposal</button>
          {proposalSubmitted && (
            <p className="submission-message" role="status">
              Thank you for your submission.
            </p>
          )}
        </form>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Built by Michael Maton</span>
      </footer>
    </main>
  )
}

export default App
