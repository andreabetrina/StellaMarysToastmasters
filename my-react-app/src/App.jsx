import { useEffect, useMemo, useState } from 'react'
import './App.css'

const scriptItems = [
  { title: 'Meeting Script', category: 'Core', description: 'The opening and flow script for a polished club meeting.' },
  { title: 'President Script', category: 'Leadership', description: 'A formal script for the Club President to lead the meeting.' },
  { title: 'Toastmaster Script', category: 'Meeting Flow', description: 'Guidance for introducing speakers, roles, and transitions.' },
  { title: 'General Evaluator Script', category: 'Evaluation', description: 'A structured framework for delivering objective feedback.' },
  { title: 'Timer Script', category: 'Club Roles', description: 'A clear timing report script with color alerts and summaries.' },
  { title: 'Grammarian Script', category: 'Club Roles', description: 'Tracks language quality, word of the day, and speaking habits.' },
  { title: 'Ah Counter Script', category: 'Club Roles', description: 'Helps identify filler words and improve speaking clarity.' },
  { title: 'Quiz Master Script', category: 'Engagement', description: 'Keeps audience attention with thoughtful recap questions.' },
  { title: 'Vote Counter Script', category: 'Club Roles', description: 'A discreet and accurate voting workflow for club decisions.' },
  { title: 'Sergeant at Arms Script', category: 'Protocol', description: 'Sets the room, welcomes guests, and opens the meeting.' },
]

const resources = [
  'Public Speaking Tips',
  'Leadership Tips',
  'Pathways Guide',
  'Evaluation Guide',
  'Ice Breaker Guide',
]

const excom = [
  { name: 'Sister Mary', position: 'President', bio: 'Guides the club vision, meeting excellence, and member growth.' },
  { name: 'Bro. Daniel', position: 'Vice President Education', bio: 'Curates learning pathways and development opportunities.' },
  { name: 'Sis. Clara', position: 'Vice President Membership', bio: 'Welcomes guests and supports a thriving member experience.' },
  { name: 'Bro. James', position: 'Vice President Public Relations', bio: 'Builds visibility and keeps the club connected.' },
]

const testimonials = [
  'Toastmasters helped me speak with confidence during interviews and class presentations.',
  'The club gave me a space to practice leadership in a supportive environment.',
  'Every meeting feels intentional, warm, and structured for real growth.',
  'I joined for speaking practice and stayed for the community and accountability.',
]

const quoteOfTheWeek = {
  quote: 'Speak with clarity, listen with intention, and lead with generosity.',
  author: 'Toastmasters Mindset',
}

const pathwaysSteps = [
  'Discover your speaking baseline with an Ice Breaker speech.',
  'Build confidence through prepared speeches and feedback cycles.',
  'Take on club roles to strengthen leadership and teamwork.',
  'Advance through Pathways projects and celebrate milestones.',
]

const faqItems = [
  { q: 'Do I need experience to join?', a: 'No. The club welcomes beginners and helps you improve step by step.' },
  { q: 'Can guests attend a meeting?', a: 'Yes. Guests are welcome to attend, observe, and register for future meetings.' },
  { q: 'What should I prepare for my first visit?', a: 'Just bring yourself and a willingness to learn. The club will guide you.' },
  { q: 'How do I access scripts?', a: 'Use the Scripts link in the menu or the Access the Script button in the hero.' },
]

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (path !== window.location.pathname) {
      window.history.replaceState({}, '', path)
    }
  }, [path])

  const navigate = (nextPath) => {
    if (nextPath === path) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return path === '/scripts' ? <ClubSite initialSection="scripts" navigate={navigate} /> : <ClubSite navigate={navigate} />
}

function ClubSite({ initialSection = 'home', navigate }) {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scriptQuery, setScriptQuery] = useState('')
  const [scriptCategory, setScriptCategory] = useState('All')
  const [activeFaq, setActiveFaq] = useState(0)
  const [galleryImage, setGalleryImage] = useState(null)
  const [countdown, setCountdown] = useState('00:00:00')
  const [scrollProgress, setScrollProgress] = useState(0)
  const filteredScripts = useMemo(() => {
    return scriptItems.filter((script) => {
      const matchesQuery = script.title.toLowerCase().includes(scriptQuery.toLowerCase()) || script.description.toLowerCase().includes(scriptQuery.toLowerCase())
      const matchesCategory = scriptCategory === 'All' || script.category === scriptCategory
      return matchesQuery && matchesCategory
    })
  }, [scriptCategory, scriptQuery])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const eventTime = new Date('2026-07-12T14:30:00').getTime()
      const now = Date.now()
      const diff = Math.max(eventTime - now, 0)
      const hours = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      setCountdown(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    if (initialSection === 'scripts') {
      const element = document.getElementById('scripts')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [initialSection])

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'meetings', label: 'Meetings' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'resources', label: 'Resources' },
    { id: 'scripts', label: 'Scripts' },
    { id: 'excom', label: 'EXCOM' },
    { id: 'contact', label: 'Contact' },
  ]

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80', alt: 'Meeting discussion' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80', alt: 'Workshop session' },
    { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', alt: 'Contest celebration' },
    { src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80', alt: 'Team celebration' },
    { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80', alt: 'Leadership learning' },
    { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', alt: 'Social gathering' },
  ]

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <a href="#content" className="skip-link">Skip to content</a>
      <header className="topbar glass-bar">
        <div className="brand-lockup">
          <div className="brand-mark">SM</div>
          <div>
            <p>Stella Mary's Toastmasters Club</p>
            <span>Toastmasters Club</span>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {sections.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
            <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
          </button>
          <a className="button join-button" href="#contact">Join Us</a>
        </div>
      </header>

      <main id="content">
        <section id="home" className="hero-section hero-section--split">
          <div className="hero-copy hero-copy--split reveal">
            <span className="eyebrow">Stella Mary's Toastmasters Club</span>
            <h1>Empowering Leaders. Inspiring Communicators.</h1>
            <p className="hero-description hero-description--hero">
              Build confidence, master public speaking, develop leadership, and become the best version of yourself through Stella Mary's Toastmasters Club.
            </p>
            <div className="hero-actions hero-actions--stacked">
              <button className="button button-primary button-primary--navy" type="button" onClick={() => navigate('/scripts')}>
                🎤 Access Meeting Scripts
              </button>
              <a className="button button-secondary button-secondary--glass" href="#contact">
                🚀 Join Our Club
              </a>
            </div>
            <div className="hero-meta hero-meta--compact hero-meta--labels" aria-label="Club statistics">
              <span>⭐ 60+ Active Members</span>
              <span>🎙 Weekly Meetings</span>
              <span>🏆 Award Winning Club</span>
              <span>📍 Stella Mary's College</span>
            </div>
            <div className="scroll-hint" aria-label="Scroll to explore">
              <span className="mouse-icon" aria-hidden="true"><span /></span>
              <span>Scroll to Explore</span>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-orb orb-one" aria-hidden="true" />
            <div className="hero-orb orb-two" aria-hidden="true" />
            <div className="hero-photo-shell glass-card">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Toastmasters meeting"
              />
              <div className="hero-photo-overlay" />
            </div>
            <div className="hero-meeting-card glass-card">
              <span className="meeting-label">Today's Meeting</span>
              <strong>Theme: Rise &amp; Inspire</strong>
              <div className="hero-meeting-meta">
                <span>Next Meeting</span>
                <span>Friday • 4:00 PM</span>
                <span>Room 301</span>
              </div>
            </div>
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,64 C240,100 400,20 720,54 C1020,86 1170,116 1440,46 L1440,120 L0,120 Z" />
          </svg>
        </section>

        <section className="stats-strip">
          {[
            ['Members Inspired', '100+'],
            ['Speeches Delivered', '250+'],
            ['Leadership Roles', '30+'],
            ['Years of Excellence', '15+'],
          ].map(([label, value]) => (
            <div key={label} className="stat-card">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="section-grid quote-section">
          <div className="quote-card glass-card">
            <span className="eyebrow">Quote of the Week</span>
            <p>{quoteOfTheWeek.quote}</p>
            <span>{quoteOfTheWeek.author}</span>
          </div>
          <div className="timeline-card glass-card">
            <span className="eyebrow">Pathways Journey</span>
            <ol>
              {pathwaysSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="section-grid">
          <SectionHeading title="About Toastmasters" intro="A practical path to stronger speaking and leadership." />
          <div className="cards-grid three-up">
            <InfoCard title="What is Toastmasters?" text="Toastmasters is a global organization that helps people build public speaking, leadership, and communication skills in a structured, supportive setting." />
            <InfoCard title="Benefits of joining" text="Members practice speaking regularly, receive constructive feedback, build confidence, and learn leadership through roles and projects." />
            <InfoCard title="Why Stella Mary's" text="Our club combines student energy, mentorship, and a warm culture that makes personal growth feel attainable and inspiring." />
          </div>
        </section>

        <section id="meetings" className="section-grid">
          <SectionHeading title="Upcoming Meeting" intro="Join us for the next meeting and experience the club in action." />
          <div className="meeting-layout">
            <div className="glass-card meeting-card">
              <div className="meeting-row"><span className="mini-icon">T</span> Theme: Rise &amp; Inspire</div>
              <div className="meeting-row"><span className="mini-icon">W</span> Word of the Day: Momentum</div>
              <div className="meeting-row"><span className="mini-icon">D</span> Date: Friday • 4:00 PM</div>
              <div className="meeting-row"><span className="mini-icon">V</span> Venue: Room 301</div>
              <div className="meeting-row"><span className="mini-icon">G</span> Guest Welcome: Arrive 15 minutes early</div>
              <div className="countdown-box"><span className="mini-icon">⏱</span> Countdown: {countdown}</div>
              <a className="button button-primary full-width" href="#contact">RSVP</a>
            </div>
            <div className="meeting-card accent-panel">
              <p>Meeting highlights</p>
              <ul>
                <li>Prepared speeches</li>
                <li>Impromptu speaking</li>
                <li>Evaluation and feedback</li>
                <li>Recognition and awards</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="events" className="section-grid">
          <SectionHeading title="Hall of Fame" intro="Celebrating excellence, service, and memorable victories." />
          <div className="cards-grid four-up">
            {['Best Speaker', 'Best Evaluator', 'Contest Winners', 'Distinguished Members'].map((item) => (
              <div key={item} className="award-card">
                <span className="award-symbol">★</span>
                <strong>{item}</strong>
                <p>Recognizing exceptional performance and contribution to the club journey.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="section-grid">
          <SectionHeading title="Gallery" intro="Moments from meetings, workshops, contests, and celebrations." />
          <div className="masonry-grid">
            {galleryImages.map((image, index) => (
              <button key={image.src} type="button" className={`gallery-tile tile-${(index % 3) + 1}`} onClick={() => setGalleryImage(image)}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.alt}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="resources" className="section-grid">
          <SectionHeading title="Learning Resources" intro="Helpful guides for growth, preparation, and continued improvement." />
          <div className="cards-grid five-up">
            {resources.map((item) => (
              <div key={item} className="resource-card">
                <span className="award-symbol">▣</span>
                <strong>{item}</strong>
                <p>Practical guidance for members at every stage of the Toastmasters journey.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="scripts" className="section-grid">
          <SectionHeading title="Speech Script Library" intro="Search, filter, and access the scripts used across club meetings." />
          <div className="scripts-toolbar">
            <label className="search-field">
              <input value={scriptQuery} onChange={(event) => setScriptQuery(event.target.value)} placeholder="Search scripts..." />
            </label>
            <label className="search-field select-field">
              <select value={scriptCategory} onChange={(event) => setScriptCategory(event.target.value)}>
                {['All', 'Core', 'Leadership', 'Meeting Flow', 'Evaluation', 'Club Roles', 'Engagement', 'Protocol'].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="cards-grid three-up">
            {filteredScripts.map((script) => (
              <article key={script.title} className="script-card">
                <span className="badge">{script.category}</span>
                <strong>{script.title}</strong>
                <p>{script.description}</p>
                <div className="card-actions">
                  <button type="button" className="text-button"><span className="mini-icon">↓</span> Download</button>
                  <button type="button" className="text-button"><span className="mini-icon">▶</span> View</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid">
          <SectionHeading title="Executive Committee" intro="Meet the leaders guiding the club experience." />
          <div className="cards-grid four-up">
            {excom.map((member) => (
              <article key={member.name} className="excom-card">
                <div className="excom-photo">{member.name.split(' ').map((part) => part[0]).join('')}</div>
                <strong>{member.name}</strong>
                <span>{member.position}</span>
                <p>{member.bio}</p>
                <div className="social-row">
                  <a href="mailto:club@stellamarys.edu"><span className="mini-icon">@</span></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer"><span className="mini-icon">in</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid testimonials-section">
          <SectionHeading title="Testimonials" intro="What members say about their experience." />
          <div className="marquee" aria-label="Member testimonials">
            <div className="marquee-track">
              {[...testimonials, ...testimonials].map((quote, index) => (
                <article key={`${quote}-${index}`} className="testimonial-card">
                  <span className="award-symbol">❝</span>
                  <p>{quote}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid">
          <SectionHeading title="FAQ" intro="Quick answers for new guests and prospective members." />
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <button key={item.q} type="button" className={`faq-item ${activeFaq === index ? 'open' : ''}`} onClick={() => setActiveFaq(index)}>
                <span>{item.q}</span>
                <span className="mini-icon">⌄</span>
                {activeFaq === index ? <p>{item.a}</p> : null}
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="section-grid contact-section">
          <SectionHeading title="Contact" intro="Connect with the club, visit a meeting, or follow us online." />
          <div className="contact-layout">
            <form className="contact-form glass-card">
              <input type="text" placeholder="Your name" aria-label="Your name" />
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <textarea placeholder="Tell us what you want to know" rows="5" aria-label="Your message" />
              <button type="submit" className="button button-primary">Send Message</button>
            </form>
            <div className="contact-card">
              <div><span className="mini-icon">@</span> club@stellamarys.edu</div>
              <div><span className="mini-icon">P</span> +234 000 000 0000</div>
              <div><span className="mini-icon">L</span> Stella Mary's Campus, Nigeria</div>
              <div className="social-links">
                <a href="mailto:club@stellamarys.edu"><span className="mini-icon">@</span> Email</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"><span className="mini-icon">in</span> LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><span className="mini-icon">ig</span> Instagram</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Stella Mary's Toastmasters Club</strong>
          <p>Designed with care by Stella Mary's Toastmasters Club</p>
        </div>
        <div className="footer-links">
          <a href="#about">Quick Links</a>
          <button type="button" className="text-button" onClick={() => navigate('/scripts')}>Scripts</button>
          <a href="#contact">Toastmasters International</a>
        </div>
      </footer>

      {galleryImage ? (
        <button className="lightbox" type="button" onClick={() => setGalleryImage(null)}>
          <img src={galleryImage.src} alt={galleryImage.alt} />
        </button>
      ) : null}
    </div>
  )
}

function SectionHeading({ title, intro }) {
  return (
    <div className="section-heading">
      <span>Stella Mary's Toastmasters Club</span>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}

function InfoCard({ title, text }) {
  return (
    <article className="info-card">
      <span className="award-symbol">◆</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  )
}

export default App
