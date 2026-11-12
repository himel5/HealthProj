import { useEffect, useRef, useState } from 'react'
import './App.css'

const skills = [
  ['Market intelligence', 'Global market mapping, competitor profiling, MECE segmentation, value-chain and pricing analysis'],
  ['CRM & QA', 'Salesforce fundamentals, functional and regression testing, test-case design, JIRA, TestRail and Zephyr'],
  ['Technology', 'Python, C++, JavaScript, HTML, CSS, MATLAB, AWS, Git, GitHub and Simulink'],
]

const projects = [
  ['01', 'Digital Stethoscope using Op-Amp', 'Electronics · Signal processing', 'Designed a digital stethoscope circuit using an operational amplifier, applying signal-processing techniques to improve sound amplification and diagnostic audio capture.'],
  ['02', 'Drone Communication Enhancement', 'Wireless systems · Ongoing', 'Explored approaches to improve communication reliability, reduce latency and support real-time data transmission for drone systems.'],
]

const Arrow = () => <span aria-hidden="true">↗</span>
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [quality, setQuality] = useState('1080p')
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }
  const seek = (value: number) => {
    if (videoRef.current) videoRef.current.currentTime = value
    setProgress(value)
  }
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) void playerRef.current?.requestFullscreen()
    else void document.exitFullscreen()
  }
  const changeSpeed = (value: string) => {
    const next = Number(value)
    setSpeed(next)
    if (videoRef.current) videoRef.current.playbackRate = next
  }
  const changeVolume = (value: string) => {
    const next = Number(value)
    setVolume(next)
    if (videoRef.current) videoRef.current.volume = next
  }
  return <div className="video-player glass" ref={playerRef}>
    <video ref={videoRef} preload="metadata" playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)} onEnded={() => setPlaying(false)}>
      <source src="/Presenter_explaining_creative_portfolio_1080p.mp4" type="video/mp4" />
    </video>
    <div className="video-overlay"><span className="video-kicker">A glimpse into the process</span><button className="video-big-play" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>{playing ? 'Ⅱ' : '▶'}</button></div>
    <div className="video-controls">
      <input className="video-progress" type="range" min="0" max={duration || 0} step="0.1" value={progress} onChange={(event) => seek(Number(event.target.value))} aria-label="Video progress" />
      <div className="video-control-row"><button onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>{playing ? 'Ⅱ' : '▶'}</button><span className="video-time">{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')} / {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span><span className="video-spacer" /><label className="video-select">Quality<select value={quality} onChange={(event) => setQuality(event.target.value)}><option value="1080p">1080p · original</option></select></label><label className="video-select">Speed<select value={speed} onChange={(event) => changeSpeed(event.target.value)}><option value="0.75">0.75×</option><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><input className="volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => changeVolume(event.target.value)} aria-label="Volume" /><button onClick={toggleFullscreen} aria-label="Toggle fullscreen">⛶</button></div>
    </div>
  </div>
}
const goTo = (event: React.MouseEvent<HTMLAnchorElement>, path: string, close?: () => void) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  close?.()
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}
const Header = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="nav glass">
    <a className="brand" href="/" onClick={(event) => goTo(event, '/', close)}>H<span>.</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
      <span /><span /><span />
    </button>
    <nav className={open ? 'nav-links is-open' : 'nav-links'}>
      <a href="/about" onClick={(event) => goTo(event, '/about', close)}>About</a><a href="/experience" onClick={(event) => goTo(event, '/experience', close)}>Experience</a><a href="/toolkit" onClick={(event) => goTo(event, '/toolkit', close)}>Toolkit</a><a href="/work" onClick={(event) => goTo(event, '/work', close)}>Work</a><a href="/education" onClick={(event) => goTo(event, '/education', close)}>Education</a>
      <a className="nav-contact" href="/contact" onClick={(event) => goTo(event, '/contact', close)}>Let's connect <Arrow /></a>
    </nav>
  </header>
}
const Page = ({ children }: { children: React.ReactNode }) => <><Header /><main className="page-wrap">{children}</main></>

function Home() {
  return <Page><section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> Available for opportunities</p><h1>Researching<br /><em>what's next.</em></h1><p className="hero-intro">I'm Himel, a market research analyst and engineering graduate who turns complex industries into clear, actionable insights.</p><div className="hero-actions"><a className="button button-primary" href="/contact" onClick={(event) => goTo(event, '/contact')}>Let's talk <Arrow /></a><a className="button button-quiet" href="/Himel_Choudhury_Updated.pdf" download>Download CV <span>↓</span></a></div></div><div className="hero-orbit glass"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core"><span>HC</span><small>BUILD<br />WITH<br />CLARITY</small></div><div className="orbit-label label-top">ANALYSIS</div><div className="orbit-label label-right">STRATEGY</div><div className="orbit-label label-bottom">ENGINEERING</div></div></section><section className="home-video"><div><p className="eyebrow">01 / In motion</p><h2>Ideas are<br /><em>better seen.</em></h2></div><VideoPlayer /></section><div className="home-links"><a href="/about" onClick={(event) => goTo(event, '/about')}>Explore the portfolio <Arrow /></a><span>Agartala · India</span></div></Page>
}

function About() {
  return <Page><section className="inner-page"><p className="eyebrow">01 / Perspective</p><h1>Curiosity is<br /><em>a competitive edge.</em></h1><div className="inner-copy"><p className="lead">I bring an engineer's instinct for systems and an analyst's eye for the signal in the noise.</p><p>My work spans global B2B market research, competitive intelligence and technical analysis. I build structured market landscapes, map ecosystems and translate primary-source research into decisions people can act on.</p><div className="stat-row"><div><strong>01</strong><span>Engineering<br />foundation</span></div><div><strong>03</strong><span>Core domains<br />of expertise</span></div><div><strong>∞</strong><span>Questions<br />worth asking</span></div></div></div></section></Page>
}

function Experience() {
  return <Page><section className="inner-page"><p className="eyebrow">02 / Experience</p><h1>From research<br /><em>to relevance.</em></h1><article className="experience-card glass"><div className="experience-meta"><span>May — Oct 2026</span><span>01</span></div><div className="experience-main"><p className="company">Future Market Insights</p><h3>Market Research Analyst</h3><p className="experience-summary">Conducted global B2B market research across industrial, technology, materials, energy and logistics sectors.</p><ul><li>Mapped manufacturers, suppliers and solution providers across geographies.</li><li>Developed MECE market segmentations covering trends, pricing, value chains and competition.</li><li>Synthesized official websites, annual reports, investor relations materials and regulatory sources.</li><li>Assessed competitor positioning and identified potential white-space opportunities.</li></ul></div></article></section></Page>
}

function Toolkit() {
  return <Page><section className="inner-page"><p className="eyebrow">03 / Toolkit</p><h1>Built to<br /><em>connect dots.</em></h1><div className="skill-grid">{skills.map(([title, text], i) => <article className="skill-card" key={title}><span className="skill-index">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section></Page>
}

function Work() {
  return <Page><section className="inner-page"><p className="eyebrow">04 / Selected work</p><h1>Ideas in<br /><em>motion.</em></h1><div className="project-list">{projects.map(([number, title, tag, text]) => <article className="project-row" key={number}><span className="project-number">{number}</span><div><p className="project-tag">{tag}</p><h3>{title}</h3><p className="project-text">{text}</p></div><span className="project-arrow"><Arrow /></span></article>)}</div></section></Page>
}

function Education() {
  return <Page><section className="inner-page"><p className="eyebrow">05 / Foundation</p><h1>Always<br /><em>learning.</em></h1><div className="education-card glass"><p className="project-tag">2022 — 2026</p><h3>B.Tech, Electronics & Telecommunications Engineering</h3><p>Kalinga Institute of Industrial Technology<br />Bhubaneswar, Odisha</p><hr /><p className="project-tag">Academic projects</p><p>Digital Stethoscope using Op-Amp<br />Drone Communication Enhancement</p></div></section></Page>
}

function Contact() {
  return <Page><section className="contact-section"><p className="eyebrow">06 / Contact</p><h1>Have a question<br /><em>worth exploring?</em></h1><a className="email-link" href="mailto:choudhuryhimel03@gmail.com">choudhuryhimel03@gmail.com <Arrow /></a><div className="contact-footer"><span>Agartala, Tripura · India</span><a href="tel:+919366664729">+91 93666 64729</a><span>© 2026 Himel Choudhury</span></div></section></Page>
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  useEffect(() => { document.title = path === '/' ? "Himel's Portfolio" : `${path.slice(1).replace(/^\w/, (c) => c.toUpperCase())} — Himel's Portfolio` }, [path])
  const pages: Record<string, React.ReactNode> = { '/': <Home />, '/about': <About />, '/experience': <Experience />, '/toolkit': <Toolkit />, '/work': <Work />, '/education': <Education />, '/contact': <Contact /> }
  return <div key={path} className="route-view">{pages[path] || <Home />}</div>
}

export default App
