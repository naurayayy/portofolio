import { useEffect, useRef, useState } from 'react'
import { SERVICES, FILTERS, PROJECTS, COMMUNITY, CONTACTS } from './data'

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['community', 'Community'],
  ['contact', 'Contact'],
]

const MARQUEE = [
  'UI/UX Design',
  'Front-End Development',
  'Brand & Visual',
  'Clean Interfaces',
  'Interactive Web',
  'Open to Work',
]

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5]
const tilt = (i) => `${TILTS[i % TILTS.length]}deg`
// kemiringan kecil untuk surat (rapi tapi tetap hidup)
const LTILTS = [-1, 0.8, -0.6, 1, -0.9, 0.6, -0.8]
const ltilt = (i) => `${LTILTS[i % LTILTS.length]}deg`

const NOTE_COLORS = [
  ['var(--blue)', 'var(--cream)'],
  ['var(--butter)', 'var(--ink)'],
  ['var(--pink)', 'var(--ink)'],
  ['var(--green)', 'var(--cream)'],
  ['var(--orange)', 'var(--ink)'],
  ['var(--lilac)', 'var(--ink)'],
]

// warna map folder: [background, teks]
const FOLDERS = [
  ['var(--blue)', 'var(--cream)'],
  ['var(--pink)', 'var(--ink)'],
  ['var(--green)', 'var(--cream)'],
  ['var(--orange)', 'var(--ink)'],
  ['var(--lilac)', 'var(--ink)'],
  ['var(--sky)', 'var(--ink)'],
]

const TAPES = [
  'rgba(255,229,0,.8)',
  'rgba(255,46,147,.6)',
  'rgba(138,92,255,.6)',
  'rgba(255,106,31,.65)',
  'rgba(76,201,240,.7)',
]

const STAMPS = ['var(--butter)', 'var(--pink)', 'var(--sky)', 'var(--orange)']

/* ---------- helpers ---------- */

function Reveal({ className = '', children }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Elemen yang bisa digeser (drag) pakai mouse / jari
function Drag({ className = '', children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [grab, setGrab] = useState(false)
  const start = useRef(null)

  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    setGrab(true)
  }
  const move = (e) => {
    if (!start.current) return
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y })
  }
  const up = () => {
    start.current = null
    setGrab(false)
  }

  return (
    <div
      className={`drag ${grab ? 'grabbing' : ''} ${className}`}
      style={{ translate: `${pos.x}px ${pos.y}px` }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      {children}
    </div>
  )
}

// Percikan kecil setiap kali halaman diklik
function Sparkles() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const glyphs = ['✿', '★', '✦', '♥']
    const colors = ['#FF2E93', '#FFE500', '#8A5CFF', '#FF6A1F', '#0B7A3B']
    let id = 0

    const onClick = (e) => {
      const batch = Array.from({ length: 5 }, () => ({
        id: id++,
        x: e.clientX,
        y: e.clientY,
        dx: Math.round((Math.random() - 0.5) * 120),
        dy: Math.round(-30 - Math.random() * 80),
        g: glyphs[Math.floor(Math.random() * glyphs.length)],
        c: colors[Math.floor(Math.random() * colors.length)],
      }))
      setItems((prev) => [...prev, ...batch])
      setTimeout(() => {
        const gone = new Set(batch.map((b) => b.id))
        setItems((prev) => prev.filter((p) => !gone.has(p.id)))
      }, 800)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {items.map((s) => (
        <span
          key={s.id}
          className="spark"
          style={{ left: s.x, top: s.y, color: s.c, '--dx': `${s.dx}px`, '--dy': `${s.dy}px` }}
        >
          {s.g}
        </span>
      ))}
    </>
  )
}

/* ---------- sections ---------- */

function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#about" className="brand" onClick={() => setOpen(false)}>
          Naura<b>✿</b>
        </a>
        <div className={`nav-menu${open ? ' open' : ''}`}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-menu-cta" href="#contact" onClick={() => setOpen(false)}>
            Say hello
          </a>
        </div>
        <a className="nav-cta" href="#contact">
          Say hello
        </a>
        <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i className={`fas fa-${open ? 'times' : 'bars'}`} />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero desk" id="about">
      <div className="wrap hero-grid">
        <div className="torn-wrap">
          <div className="torn hero-copy">
            <span className="eyebrow">
              <i className="fas fa-wand-magic-sparkles" /> Hello there, i'm
            </span>
            <h1>
              Naura
              <em>Khoirunnisa</em>
            </h1>
            <p className="lead">
              UI/UX Designer & Front-End Developer based in Indonesia. I craft bold, playful digital products that
              feel fun to use without losing clarity.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#projects">
                View Projects <i className="fas fa-arrow-right" />
              </a>
              <a className="btn soft" href="#contact">
                Get in touch
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <i className="fas fa-location-dot" /> Indonesia
              </span>
              <span className="live">Open to work</span>
              <span>
                <i className="fas fa-pencil-ruler" /> UI/UX · Front-End
              </span>
            </div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="id-wrap">
            <div className="lanyard" />
            <div className="idcard">
              <span className="id-hole" />
              <div className="id-photo">
                <img src="/naura.png" alt="Portrait of Naura Khoirunnisa" />
              </div>
              <div className="id-info">
                <b>Naura Khoirunnisa</b>
                <span>UI/UX · Front-End</span>
                <span>Indonesia</span>
              </div>
              <div className="id-badge">Open to work</div>
            </div>
          </div>

          <Drag className="stk stk-note">
            <div className="sticky-mini">
              Design with a little mischief ✿<small>(geser aku!)</small>
            </div>
          </Drag>
          <Drag className="stk stk-open">
            <div className="stamp">
              Open to work
              <span>Remote · Freelance</span>
            </div>
          </Drag>
          <Drag className="stk stk-pill1">
            <span className="pill pink">UI/UX</span>
          </Drag>
          <Drag className="stk stk-pill2">
            <span className="pill green">Front-End</span>
          </Drag>
          <Drag className="stk stk-star">
            <span className="round">
              <i className="fas fa-star" />
            </span>
          </Drag>
          <Drag className="stk stk-clip">
            <span className="round lilac">
              <i className="fas fa-paperclip" />
            </span>
          </Drag>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => MARQUEE.map((t) => <span key={`${k}-${t}`}>{t}</span>))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section className="sec grid-paper" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">
            <i className="fas fa-bolt" /> What I do
          </span>
          <div className="sec-head-row">
            <h2>
              Skills & <em>Services</em>
            </h2>
            <p className="sec-sub">
              From wireframe to code, I help bring ideas to life with bold visuals and solid front-end work.
            </p>
          </div>
        </div>
        <div className="notes-grid">
          {SERVICES.map((s, i) => {
            const [c, fg] = NOTE_COLORS[i % NOTE_COLORS.length]
            return (
              <Reveal key={s.title} className="note-slot">
                <article
                  className="note paper"
                  style={{ '--r': tilt(i), '--c': c, '--fg': fg, '--tape': TAPES[i % TAPES.length] }}
                >
                  <span className="tape" />
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ico">
                    <i className={`fas fa-${s.icon}`} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <a className="note-cta" href={s.href}>
                    {s.cta} <i className="fas fa-arrow-right" />
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label={project.title}>
        <span className="tape" style={{ '--tape': TAPES[1] }} />
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <i className="fas fa-times" />
        </button>
        <small>{project.cat}</small>
        <h2>{project.title}</h2>
        <p>{project.modalDesc}</p>
        <img src={project.modalImg} alt={project.title} loading="lazy" />
        <div className="proj-tags">
          {project.tech.map(([n, g]) => (
            <span key={n} className={`tag${g ? ' g' : ''}`}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [filter, setFilter] = useState('all')
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const shown = PROJECTS.filter((p) => filter === 'all' || p.category.includes(filter))

  useEffect(() => {
    setIdx(0)
  }, [filter])

  const cur = shown[idx] || shown[0]
  const pos = Math.max(0, shown.indexOf(cur))
  const go = (d) => setIdx((pos + d + shown.length) % shown.length)
  const colorOf = (p) => FOLDERS[PROJECTS.findIndex((x) => x.id === p.id) % FOLDERS.length]
  const [curBg, curFg] = cur ? colorOf(cur) : FOLDERS[0]

  return (
    <section className="sec desk on-dark" id="projects">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">
            <i className="fas fa-folder-open" /> Selected Work
          </span>
          <div className="sec-head-row">
            <h2>
              Projects I'm <em>proud of</em>
            </h2>
            <p className="sec-sub">A mix of UI/UX and front-end projects built with care.</p>
          </div>
          <div className="chips">
            {FILTERS.map(([k, name]) => (
              <button key={k} className={`chip${filter === k ? ' on' : ''}`} onClick={() => setFilter(k)}>
                {name}
              </button>
            ))}
            <span className="chip-count">{shown.length} Files</span>
          </div>
        </div>

        {cur && (
          <div className="folder" style={{ '--c': curBg, '--fg': curFg }}>
            <div className="ftabs" role="tablist">
              {shown.map((p, i) => {
                const [bg, fg] = colorOf(p)
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={p.id === cur.id}
                    className={`ftab${p.id === cur.id ? ' on' : ''}`}
                    style={{ '--c': bg, '--fg': fg }}
                    onClick={() => setIdx(i)}
                  >
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tt">{p.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="folder-body">
              <span className="f-label">Project File</span>

              <article className="sheet" key={cur.id}>
                <span className="clip" />
                <span className="approved">Approved ✿</span>

                <div className="sheet-media" onClick={() => setPicked(cur)}>
                  <span className="tape" style={{ '--tape': TAPES[pos % TAPES.length] }} />
                  <img src={cur.img} alt={cur.title} />
                  <span className="proj-num">No. {String(pos + 1).padStart(2, '0')}</span>
                  <span className="pj-zoom">
                    <i className="fas fa-up-right-and-down-left-from-center" /> Buka detail
                  </span>
                </div>

                <div className="sheet-text">
                  <span className="proj-tag">{cur.cat}</span>
                  <h3>{cur.title}</h3>
                  <p>{cur.desc}</p>
                  <div className="proj-tags">
                    {cur.tech.map(([n, g]) => (
                      <span key={n} className={`tag${g ? ' g' : ''}`}>
                        {n}
                      </span>
                    ))}
                  </div>
                  <div className="proj-actions">
                    <button className="btn" onClick={() => setPicked(cur)}>
                      View Details <i className="fas fa-arrow-right" />
                    </button>
                    <button className="btn soft">{cur.second}</button>
                  </div>
                </div>
              </article>

              <div className="folder-front">
                <span className="f-count">
                  File {pos + 1} / {shown.length}
                </span>
                <div className="f-arrows">
                  <button className="round" onClick={() => go(-1)} aria-label="Previous project">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <button className="round lilac" onClick={() => go(1)} aria-label="Next project">
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            </div>

            <Drag className="stk stk-pj">
              <span className="stamp">
                Klik tab folder ✿<span>buat ganti file</span>
              </span>
            </Drag>
          </div>
        )}
      </div>
      {picked && <Modal project={picked} onClose={() => setPicked(null)} />}
    </section>
  )
}

function Community() {
  return (
    <section className="sec dots" id="community">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">
            <i className="fas fa-envelope-open-text" /> Beyond the Code
          </span>
          <div className="sec-head-row">
            <h2>
              Community & <em>Leadership</em>
            </h2>
            <p className="sec-sub">Beyond code, I enjoy working with people! Ini surat-surat dari perjalananku.</p>
          </div>
        </div>

        <div className="letters">
          {COMMUNITY.map((c, i) => (
            <Reveal key={`${c.org}-${c.period}`} className="letter-slot">
              <article className="letter" style={{ '--r': ltilt(i), '--tape': TAPES[i % TAPES.length] }}>
                <div className="air" />
                <div className="letter-in">
                  <div className="letter-photo">
                    <span className="tape" />
                    <img
                      src={`/${c.photo}`}
                      alt={`${c.org} - ${c.role}`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
                      }}
                    />
                  </div>
                  <div className="letter-text">
                    <div className="letter-top">
                      <span className="from">
                        <small>No. {String(i + 1).padStart(2, '0')}</small>
                        {c.period}
                      </span>
                      <span className="lstamp" style={{ '--s': STAMPS[i % STAMPS.length] }}>
                        <i className={`fas fa-${c.icon}`} />
                      </span>
                    </div>
                    <h3>{c.org}</h3>
                    <p className="comm-role">{c.role}</p>
                    <p className="comm-desc">{c.desc}</p>
                    <div className="comm-tags">
                      {c.tags.map(([t, g]) => (
                        <span key={t} className={`tag${g ? ' g' : ''}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal className="letter-slot">
            <div className="envelope" style={{ '--tape': TAPES[3] }}>
              <span className="tape" />
              <i className="fas fa-envelope" />
              <p>Masih ada surat yang belum dikirim ✿</p>
              <small>to be continued...</small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const email = CONTACTS.find((c) => c.href?.startsWith('mailto'))
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const send = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Hello from ${name || 'a new friend'}`)
    const body = encodeURIComponent(msg)
    window.location.href = `mailto:${email.text}?subject=${subject}&body=${body}`
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email.text)
    } catch (err) {
      /* abaikan */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const TICKETS = [
    ['var(--butter)', 'var(--ink)'],
    ['var(--sky)', 'var(--ink)'],
    ['var(--cream)', 'var(--ink)'],
  ]

  return (
    <section className="sec contact-sec" id="contact">
      <div className="wrap">
        <div className="contact-head">
          <span className="eyebrow">
            <i className="fas fa-paper-plane" /> Let's talk
          </span>
          <h2>
            Have a project <em>in mind?</em>
          </h2>
          <p>I'd love to hear about it. Tulis kartu pos di bawah ini!</p>
        </div>

        <div className="post-grid">
          <Reveal>
            <div className="postcard">
              <form className="post-form" onSubmit={send}>
                <span className="post-label">Dear Naura,</span>
                <label>
                  <span>Nama kamu</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tulis namamu..." />
                </label>
                <label>
                  <span>Pesan</span>
                  <textarea
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Ceritakan project-mu..."
                  />
                </label>
                <div className="hero-actions">
                  <button className="btn rose" type="submit">
                    Kirim kartu pos <i className="fas fa-paper-plane" />
                  </button>
                  <button className="btn soft" type="button" onClick={copy}>
                    {copied ? 'Copied ✿' : 'Copy email'} <i className={`fas fa-${copied ? 'check' : 'copy'}`} />
                  </button>
                </div>
              </form>
              <div className="post-side">
                <div className="pstamp">
                  <span>✿</span>
                  <small>Indonesia</small>
                </div>
                <div className="postmark">
                  <b>Open to</b>
                  <b>work</b>
                  <small>2026</small>
                </div>
                <div className="addr">
                  <span>To:</span>
                  <b>Naura Khoirunnisa</b>
                  <small>Indonesia 🇮🇩</small>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="tickets">
            {CONTACTS.map((c, i) => {
              const [bg, fg] = TICKETS[i % 3]
              return (
                <Reveal key={c.title}>
                  <div
                    className="ticket paper"
                    style={{ '--r': tilt(i * 2 + 1), '--c': bg, '--fg': fg, '--tape': TAPES[(i + 1) % TAPES.length] }}
                  >
                    <span className="tape" />
                    <span className="ico">
                      <i className={`fas fa-${c.icon}`} />
                    </span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.href ? <a href={c.href}>{c.text}</a> : c.place}</p>
                      <small>{c.note}</small>
                    </div>
                  </div>
                </Reveal>
              )
            })}
            <Drag className="stk stk-hi">
              <span className="stamp">
                Say hi!
                <span>geser aku ♥</span>
              </span>
            </Drag>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <span className="foot-brand">
            Naura<b>✿</b>
          </span>
          <div className="foot-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#community">Community</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Naura Khoirunnisa. All rights reserved.</span>
          <span>
            Designed with <a href="#about">love</a> in Indonesia
          </span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Skills />
        <Projects />
        <Community />
        <Contact />
      </main>
      <Footer />
      <Sparkles />
    </>
  )
}