import React, { useState } from 'react';

import logo from './assets/logo.jpg';
import bartender from './assets/bartender.jpg';
import trago from './assets/trago.jpg';
import chorizo from './assets/chorizo.jpg';
import lomo from './assets/lomoalapimienta.jpg';
import entrana from './assets/entrana.jpg';
import cocinero from './assets/cocinero.jpg';
import tiraCerdo from './assets/tiradecerdo.jpg';
import mozo from './assets/mozo.jpg';
import chuleta from './assets/chuleta-de-cerdo.jpg';
import heroBg from './assets/imagen-referencial.png';

const menuData = {
  carnes: [
    { img: lomo,    badge: 'Signature',    name: 'Lomo a la Pimienta',    desc: 'Corte suave con reducción de pimienta verde y cognac. Maduración 21 días.',   price: 'S/ 68' },
    { img: entrana, badge: null,           name: 'Entraña Fina Angus',    desc: 'Sabor intenso, jugosidad extrema. Corte argentino de res Angus certificada.', price: 'S/ 72' },
    { img: chorizo, badge: null,           name: 'Chorizo Artesanal',     desc: 'Embutido premium elaborado en casa con especias de origen natural.',           price: 'S/ 38' },
  ],
  cerdo: [
    { img: tiraCerdo, badge: "Chef's Pick", name: 'Tira de Cerdo Ahumada', desc: 'Costillas con notas de madera de manzano. 6 horas de ahumado lento.',       price: 'S/ 55' },
    { img: chuleta,   badge: null,          name: 'Chuleta de Cerdo',      desc: 'Jugosa y dorada con guarnición rústica de vegetales de temporada.',          price: 'S/ 48' },
    { img: null,      badge: null,          name: null,                    desc: '"La paciencia es el ingrediente secreto." — Chef Fuego Real',                price: null   },
  ],
  cocteleria: [
    { img: trago, badge: 'Signature', name: 'Brasa Negroni',      desc: 'Gin ahumado, Campari, vermouth rosso. Maridaje perfecto con carnes.',        price: 'S/ 36' },
    { img: trago, badge: null,        name: 'Old Fashioned Real',  desc: 'Bourbon añejo, bitter de naranja, azúcar morena artesanal.',                 price: 'S/ 38' },
    { img: trago, badge: null,        name: 'Fuego Sour',          desc: 'Pisco premium, reducción de ají amarillo, cítricos, espuma de albúmina.',   price: 'S/ 32' },
  ],
};

const marqueeItems = [
  'Lomo a la Pimienta','Entraña Fina Angus','Tira de Cerdo Ahumada',
  'Chorizo Artesanal','Coctelería de Autor','Chuleta Premium',
];

export default function App() {
  const [activeTab, setActiveTab] = useState('carnes');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background:'#080706', color:'#d4c5a9', fontFamily:"'Josefin Sans',sans-serif", fontWeight:300, overflowX:'hidden', minHeight:'100vh' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@100;300;400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::selection { background:rgba(180,140,60,0.4); color:#f0e6cc; }

        .fr-nav-cta {
          font-family:'Josefin Sans',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:4px; text-transform:uppercase; color:#b48c3c;
          border:1px solid rgba(180,140,60,0.5); background:transparent;
          cursor:pointer; padding:10px 24px; transition:all 0.3s ease;
        }
        .fr-nav-cta:hover { background:rgba(180,140,60,0.15); color:#e8d5a3; }

        .fr-hamburger {
          display:none; flex-direction:column; gap:5px;
          cursor:pointer; background:none; border:none; padding:4px;
        }
        .fr-hamburger span { display:block; width:24px; height:1px; background:#b48c3c; }

        .fr-mobile-overlay {
          display:none; position:fixed; inset:0; z-index:200;
          background:rgba(8,7,6,0.97); flex-direction:column;
          align-items:center; justify-content:center; gap:40px;
        }
        .fr-mobile-overlay.open { display:flex; }
        .fr-mobile-overlay a {
          font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:300;
          color:#f0e6cc; text-decoration:none; letter-spacing:2px; transition:color 0.3s;
        }
        .fr-mobile-overlay a:hover { color:#b48c3c; }
        .fr-mobile-close {
          position:absolute; top:24px; right:28px;
          background:none; border:none; color:#b48c3c; font-size:28px; cursor:pointer;
        }

        .fr-hero-btn-circle {
          width:56px; height:56px; border:1px solid rgba(180,140,60,0.5); border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgba(180,140,60,0.1); transition:all 0.4s ease; flex-shrink:0;
        }
        .fr-hero-btn:hover .fr-hero-btn-circle { background:rgba(180,140,60,0.25); transform:scale(1.1); }

        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .fr-marquee-track { display:flex; white-space:nowrap; animation:marqueeScroll 30s linear infinite; }

        .fr-arte-card-img {
          width:100%; height:420px; object-fit:cover;
          filter:brightness(0.6) saturate(0.7);
          transition:filter 0.6s ease,transform 0.7s ease; display:block;
        }
        .fr-arte-card:hover .fr-arte-card-img { filter:brightness(0.8) saturate(1); transform:scale(1.04); }
        .fr-arte-card-arrow {
          position:absolute; top:24px; right:24px; width:36px; height:36px;
          border:1px solid rgba(180,140,60,0); border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgba(8,7,6,0.5); transition:all 0.4s ease; opacity:0;
        }
        .fr-arte-card:hover .fr-arte-card-arrow { opacity:1; border-color:rgba(180,140,60,0.5); }

        .fr-menu-item { background:#0a0806; transition:background 0.3s ease; cursor:pointer; }
        .fr-menu-item:hover { background:#100c07; }
        .fr-menu-item-img {
          width:100%; height:100%; object-fit:cover;
          filter:brightness(0.55) saturate(0.6);
          transition:filter 0.5s,transform 0.6s; display:block;
        }
        .fr-menu-item:hover .fr-menu-item-img { filter:brightness(0.75) saturate(1); transform:scale(1.06); }
        .fr-menu-order { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:#6b5c40; transition:color 0.3s; }
        .fr-menu-item:hover .fr-menu-order { color:#b48c3c; }

        .fr-menu-tab {
          font-family:'Josefin Sans',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:4px; text-transform:uppercase; color:#6b5c40;
          background:none; border:none; padding:16px 24px; cursor:pointer;
          position:relative; transition:color 0.3s ease; white-space:nowrap;
        }
        .fr-menu-tab::after {
          content:''; position:absolute; bottom:-1px; left:0; right:0;
          height:2px; background:#b48c3c; transform:scaleX(0); transition:transform 0.3s ease;
        }
        .fr-menu-tab.active { color:#e8d5a3; }
        .fr-menu-tab.active::after { transform:scaleX(1); }
        .fr-menu-tab:hover { color:#c4a870; }

        .fr-exp-block { position:relative; overflow:hidden; }
        .fr-exp-block::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(to right,transparent,#b48c3c,transparent);
          transform:scaleX(0); transition:transform 0.5s ease;
        }
        .fr-exp-block:hover::before { transform:scaleX(1); }

        .fr-btn-primary {
          font-family:'Josefin Sans',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:4px; text-transform:uppercase; color:#080706;
          background:#b48c3c; border:none; padding:18px 40px; cursor:pointer; transition:all 0.3s ease;
        }
        .fr-btn-primary:hover { background:#c9a050; }
        .fr-btn-secondary {
          font-family:'Josefin Sans',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:4px; text-transform:uppercase; color:#b48c3c;
          background:transparent; border:1px solid rgba(180,140,60,0.4);
          padding:18px 40px; cursor:pointer; transition:all 0.3s ease;
        }
        .fr-btn-secondary:hover { border-color:#b48c3c; background:rgba(180,140,60,0.08); }

        .fr-footer-social { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:#6b5c40; cursor:pointer; transition:color 0.3s; }
        .fr-footer-social:hover { color:#b48c3c; }

        /* ── TABLET ≤900px ── */
        @media (max-width:900px) {
          .fr-nav-cta { display:none !important; }
          .fr-hamburger { display:flex !important; }

          .fr-hero-content { grid-template-columns:1fr !important; padding:0 32px !important; }
          .fr-hero-left { padding-right:0 !important; border-right:none !important; border-bottom:1px solid rgba(180,140,60,0.2) !important; padding-bottom:48px !important; }
          .fr-hero-right { padding-left:0 !important; padding-top:40px !important; }
          .fr-hero-stat-grid { grid-template-columns:repeat(4,1fr) !important; }

          .fr-philosophy { grid-template-columns:1fr !important; padding:80px 40px !important; gap:32px !important; }
          .fr-phil-label { flex-direction:row !important; align-items:center !important; gap:24px !important; }
          .fr-phil-num { font-size:48px !important; }
          .fr-phil-title { writing-mode:horizontal-tb !important; transform:none !important; }

          .fr-arte-grid { grid-template-columns:1fr !important; }
          .fr-arte-section { padding:0 24px 60px !important; }
          .fr-arte-card-img { height:300px !important; }

          .fr-menu-inner { padding:0 32px !important; }
          .fr-menu-grid { grid-template-columns:1fr 1fr !important; }

          .fr-exp-strip { grid-template-columns:1fr !important; }
          .fr-exp-border-r { border-right:none !important; border-bottom:1px solid rgba(180,140,60,0.15) !important; }

          .fr-footer { grid-template-columns:1fr 1fr !important; gap:40px !important; padding:48px 40px 32px !important; }
          .fr-footer-bottom { flex-direction:column !important; gap:16px !important; text-align:center !important; padding:20px 40px !important; }
        }

        /* ── MOBILE ≤600px ── */
        @media (max-width:600px) {
          .fr-nav { padding:16px 20px !important; }
          .fr-nav-brand span { font-size:13px !important; letter-spacing:4px !important; }

          .fr-hero-content { padding:0 20px !important; }
          .fr-hero-h1 { font-size:42px !important; }
          .fr-hero-stat-grid { grid-template-columns:1fr 1fr !important; }
          .fr-hero-stat-num { font-size:28px !important; }

          .fr-philosophy { padding:60px 20px !important; }
          .fr-phil-text { font-size:22px !important; }

          .fr-arte-section { padding:0 16px 48px !important; }
          .fr-section-header { gap:16px !important; margin-bottom:32px !important; padding:0 !important; }
          .fr-section-line { display:none !important; }
          .fr-arte-card-img { height:240px !important; }

          .fr-menu-section { padding:60px 0 !important; }
          .fr-menu-inner { padding:0 16px !important; }
          .fr-menu-tabs { overflow-x:auto !important; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .fr-menu-tabs::-webkit-scrollbar { display:none; }
          .fr-menu-grid { grid-template-columns:1fr !important; }

          .fr-exp-block { padding:36px 20px !important; }

          .fr-reserva { padding:72px 20px !important; }
          .fr-reserva-btns { flex-direction:column !important; align-items:stretch !important; }
          .fr-btn-primary, .fr-btn-secondary { text-align:center; width:100%; }

          .fr-footer { grid-template-columns:1fr !important; gap:32px !important; padding:40px 20px 28px !important; }
          .fr-footer-bottom { padding:20px !important; flex-direction:column !important; gap:14px !important; text-align:center !important; }
          .fr-footer-socials { gap:20px !important; }
        }
      `}</style>

      {/* MOBILE OVERLAY */}
      <div className={`fr-mobile-overlay${menuOpen?' open':''}`}>
        <button className="fr-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {['Nuestra Historia','La Carta','Arte & Servicio','Reservar'].map(item => (
          <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
      </div>

      {/* ── NAV ── */}
      <nav className="fr-nav" style={{ position:'sticky', top:0, zIndex:100, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 48px', background:'rgba(8,7,6,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(180,140,60,0.2)' }}>
        <div className="fr-nav-brand" style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:40, height:40, border:'1px solid rgba(180,140,60,0.5)', borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
            <img src={logo} alt="Fuego Real" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontWeight:100, fontSize:16, letterSpacing:6, color:'#e8d5a3', textTransform:'uppercase' }}>Fuego Real</span>
        </div>
        <button className="fr-nav-cta">Reservar Mesa</button>
        <button className="fr-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menú">
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── HERO ── */}
      <header style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:80, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src={heroBg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.25, filter:'saturate(0.5)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(8,7,6,0.6),rgba(8,7,6,0.3) 50%,#080706)' }} />
        </div>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(180,140,60,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(180,140,60,0.04) 1px,transparent 1px)', backgroundSize:'80px 80px' }} />
        <div style={{ position:'absolute', left:48, top:0, bottom:0, width:1, background:'linear-gradient(to bottom,transparent,rgba(180,140,60,0.3) 30%,rgba(180,140,60,0.3) 70%,transparent)' }} />
        <div style={{ position:'absolute', right:48, top:0, bottom:0, width:1, background:'linear-gradient(to bottom,transparent,rgba(180,140,60,0.3) 30%,rgba(180,140,60,0.3) 70%,transparent)' }} />

        <div className="fr-hero-content" style={{ position:'relative', zIndex:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, maxWidth:1200, margin:'0 auto', padding:'0 80px', width:'100%' }}>
          {/* Left */}
          <div className="fr-hero-left" style={{ paddingRight:60, borderRight:'1px solid rgba(180,140,60,0.2)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
              <div style={{ width:40, height:1, background:'#b48c3c', flexShrink:0 }} />
              <span style={{ fontSize:10, letterSpacing:5, textTransform:'uppercase', color:'#b48c3c' }}>Desde 2018 · Trujillo</span>
            </div>
            <h1 className="fr-hero-h1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(42px,6vw,88px)', fontWeight:300, lineHeight:1, color:'#f0e6cc', marginBottom:8, letterSpacing:-1 }}>
              ROBO<br />
              <em style={{ fontStyle:'italic', color:'#b48c3c' }}>a la Parrilla</em>
            </h1>
            <p style={{ fontSize:11, letterSpacing:4, textTransform:'uppercase', color:'#6b5c40', marginTop:24, marginBottom:48, lineHeight:2 }}>
              Cortes madurados · Mixología de autor<br />Servicio impecable
            </p>
            <button className="fr-hero-btn" style={{ display:'inline-flex', alignItems:'center', gap:20, fontFamily:"'Josefin Sans',sans-serif", fontSize:10, fontWeight:400, letterSpacing:4, textTransform:'uppercase', color:'#f0e6cc', cursor:'pointer', border:'none', background:'none', padding:0 }}>
              <div className="fr-hero-btn-circle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#b48c3c" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </div>
              Descubre la Carta
            </button>
          </div>

          {/* Right */}
          <div className="fr-hero-right" style={{ paddingLeft:60, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div className="fr-hero-stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(180,140,60,0.2)', marginBottom:40 }}>
              {[['12+','Cortes Premium'],['7','Años de Fuego'],['48','Mesas Privadas'],['★ 5','Experiencia']].map(([num,label]) => (
                <div key={label} style={{ background:'#080706', padding:'20px 12px' }}>
                  <span className="fr-hero-stat-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:300, color:'#b48c3c', lineHeight:1, display:'block', marginBottom:6 }}>{num}</span>
                  <span style={{ fontSize:9, letterSpacing:2, textTransform:'uppercase', color:'#6b5c40' }}>{label}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:17, color:'#8a7558', lineHeight:1.7, borderLeft:'2px solid rgba(180,140,60,0.4)', paddingLeft:20 }}>
              "PROBANDO PROBANDO PROBANDO"
            </p>
          </div>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <div style={{ overflow:'hidden', borderTop:'1px solid rgba(180,140,60,0.2)', borderBottom:'1px solid rgba(180,140,60,0.2)', padding:'16px 0', background:'rgba(180,140,60,0.04)' }}>
        <div className="fr-marquee-track">
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, padding:'0 40px', fontSize:10, letterSpacing:6, textTransform:'uppercase', color:'#6b5c40' }}>
              <span style={{ width:4, height:4, background:'#b48c3c', borderRadius:'50%', flexShrink:0 }}/>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PHILOSOPHY ── */}
      <section className="fr-philosophy" style={{ padding:'120px 80px', maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 2fr', gap:80, alignItems:'center' }}>
        <div className="fr-phil-label" style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="fr-phil-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:80, fontWeight:300, color:'rgba(180,140,60,0.2)', lineHeight:1 }}>01</div>
          <div className="fr-phil-title" style={{ fontSize:10, letterSpacing:5, textTransform:'uppercase', color:'#b48c3c', writingMode:'vertical-rl', transform:'rotate(180deg)', whiteSpace:'nowrap' }}>Nuestra Filosofía</div>
        </div>
        <p className="fr-phil-text" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,42px)', fontWeight:300, fontStyle:'italic', lineHeight:1.5, color:'#c8b48a' }}>
          El fuego es nuestro lenguaje. Cada corte es una{' '}
          <span style={{ color:'#f0e6cc' }}>obra en proceso</span>, trabajada con precisión y respeto. No cocinamos:{' '}
          <span style={{ color:'#f0e6cc' }}>revelamos</span>.
        </p>
      </section>

      {/* ── ARTE & SERVICIO ── */}
      <section className="fr-arte-section" style={{ padding:'0 48px 100px' }}>
        <div className="fr-section-header" style={{ display:'flex', alignItems:'baseline', gap:32, maxWidth:1200, margin:'0 auto 60px', padding:'0 32px' }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:300, color:'#b48c3c', border:'1px solid rgba(180,140,60,0.3)', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>02</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(26px,4vw,52px)', fontWeight:300, color:'#f0e6cc', letterSpacing:-0.5 }}>Arte & Servicio</h2>
          <div className="fr-section-line" style={{ flex:1, height:1, background:'rgba(180,140,60,0.2)', marginBottom:8 }}/>
        </div>
        <div className="fr-arte-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:2, maxWidth:1200, margin:'0 auto' }}>
          {[
            { img:cocinero,  tag:'Cocina',     name:'Maestros del Fuego' },
            { img:bartender, tag:'Bar',         name:'Alta Coctelería'   },
            { img:mozo,      tag:'Experiencia', name:'Servicio Exclusivo'},
          ].map(card => (
            <div key={card.name} className="fr-arte-card" style={{ position:'relative', overflow:'hidden', background:'#111009', cursor:'pointer' }}>
              <img className="fr-arte-card-img" src={card.img} alt={card.name}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'40px 28px 28px', background:'linear-gradient(to top,rgba(8,7,6,0.95),transparent)' }}>
                <span style={{ fontSize:9, letterSpacing:4, textTransform:'uppercase', color:'#b48c3c', marginBottom:8, display:'block' }}>{card.tag}</span>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, color:'#f0e6cc', lineHeight:1.2 }}>{card.name}</div>
              </div>
              <div className="fr-arte-card-arrow">
                <svg width="14" height="14" fill="none" stroke="#b48c3c" strokeWidth="1.5"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="fr-menu-section" style={{ padding:'100px 0', background:'#050403', borderTop:'1px solid rgba(180,140,60,0.15)', borderBottom:'1px solid rgba(180,140,60,0.15)' }}>
        <div className="fr-menu-inner" style={{ maxWidth:1200, margin:'0 auto', padding:'0 80px' }}>
          <div className="fr-section-header" style={{ display:'flex', alignItems:'baseline', gap:32, marginBottom:48 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:300, color:'#b48c3c', border:'1px solid rgba(180,140,60,0.3)', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>03</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(26px,4vw,52px)', fontWeight:300, color:'#f0e6cc', letterSpacing:-0.5 }}>Selección Premium</h2>
            <div className="fr-section-line" style={{ flex:1, height:1, background:'rgba(180,140,60,0.2)', marginBottom:8 }}/>
          </div>

          <div className="fr-menu-tabs" style={{ display:'flex', borderBottom:'1px solid rgba(180,140,60,0.2)', marginBottom:60 }}>
            {[['carnes','Carnes'],['cerdo','Cerdo'],['cocteleria','Coctelería']].map(([key,label]) => (
              <button key={key} className={`fr-menu-tab${activeTab===key?' active':''}`} onClick={() => setActiveTab(key)}>{label}</button>
            ))}
          </div>

          <div className="fr-menu-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {menuData[activeTab].map((item,i) =>
              item.name ? (
                <div key={i} className="fr-menu-item">
                  <div style={{ height:240, overflow:'hidden', position:'relative' }}>
                    <img className="fr-menu-item-img" src={item.img} alt={item.name}/>
                    {item.badge && (
                      <span style={{ position:'absolute', top:16, left:16, background:'rgba(180,140,60,0.9)', color:'#080706', fontSize:8, letterSpacing:3, textTransform:'uppercase', padding:'4px 10px' }}>{item.badge}</span>
                    )}
                  </div>
                  <div style={{ padding:'24px 24px 28px' }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:'#e8d5a3', marginBottom:8, lineHeight:1.2 }}>{item.name}</div>
                    <div style={{ fontSize:11, color:'#6b5c40', lineHeight:1.8, letterSpacing:0.5 }}>{item.desc}</div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20, paddingTop:20, borderTop:'1px solid rgba(180,140,60,0.15)' }}>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:'#b48c3c' }}>{item.price}</span>
                      <span className="fr-menu-order">Ordenar →</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} style={{ background:'#070504', display:'flex', alignItems:'center', minHeight:340 }}>
                  <div style={{ padding:'40px 28px', fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:'#6b5c40', fontStyle:'italic', lineHeight:1.8 }}>{item.desc}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE STRIP ── */}
      <div className="fr-exp-strip" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid rgba(180,140,60,0.15)' }}>
        {[
          { num:'I',   title:'Leña Seleccionada', desc:'Trabajamos exclusivamente con madera de quebracho y espino para lograr el calor perfecto.',
            icon:<svg viewBox="0 0 24 24" width="20" height="20" stroke="#b48c3c" fill="none" strokeWidth="1"><path d="M12 2C8 8 4 10 4 16c0 4 3.5 6 8 6s8-2 8-6c0-6-4-8-8-14z"/></svg> },
          { num:'II',  title:'Maduración Propia', desc:'Nuestros cortes reposan entre 21 y 45 días en cámaras de temperatura controlada.',
            icon:<svg viewBox="0 0 24 24" width="20" height="20" stroke="#b48c3c" fill="none" strokeWidth="1"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3"/></svg> },
          { num:'III', title:'Servicio de Autor',  desc:'Cada visita es irrepetible. Nuestro equipo diseña experiencias gastronómicas personalizadas.',
            icon:<svg viewBox="0 0 24 24" width="20" height="20" stroke="#b48c3c" fill="none" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
        ].map((block,i) => (
          <div key={block.num} className={`fr-exp-block${i<2?' fr-exp-border-r':''}`}
            style={{ padding:'60px 48px', borderRight:i<2?'1px solid rgba(180,140,60,0.15)':'none' }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:56, fontWeight:300, color:'rgba(180,140,60,0.15)', position:'absolute', top:24, right:24, lineHeight:1 }}>{block.num}</span>
            <div style={{ width:48, height:48, border:'1px solid rgba(180,140,60,0.3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28 }}>{block.icon}</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, color:'#e8d5a3', marginBottom:12 }}>{block.title}</h3>
            <p style={{ fontSize:11, color:'#6b5c40', lineHeight:2, letterSpacing:0.5 }}>{block.desc}</p>
          </div>
        ))}
      </div>

      {/* ── RESERVA CTA ── */}
      <section className="fr-reserva" style={{ padding:'120px 80px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 80% at 50% 50%,rgba(120,70,10,0.12),transparent 70%)' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24, marginBottom:40 }}>
          <div style={{ width:80, height:1, background:'rgba(180,140,60,0.4)' }}/>
          <div style={{ width:8, height:8, border:'1px solid #b48c3c', transform:'rotate(45deg)' }}/>
          <div style={{ width:80, height:1, background:'rgba(180,140,60,0.4)' }}/>
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(34px,5vw,72px)', fontWeight:300, color:'#f0e6cc', lineHeight:1.1, marginBottom:16 }}>
          Reserva tu<br /><em style={{ fontStyle:'italic', color:'#b48c3c' }}>Experiencia</em>
        </h2>
        <p style={{ fontSize:11, letterSpacing:4, color:'#6b5c40', textTransform:'uppercase', marginBottom:48 }}>Mesas disponibles de martes a domingo</p>
        <div className="fr-reserva-btns" style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <button className="fr-btn-primary">Reservar Mesa</button>
          <button className="fr-btn-secondary">Ver Carta Completa</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="fr-footer" style={{ borderTop:'1px solid rgba(180,140,60,0.2)', padding:'60px 80px 40px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:60, background:'#040302' }}>
        <div>
          <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontWeight:100, fontSize:20, letterSpacing:8, textTransform:'uppercase', color:'#e8d5a3', marginBottom:12 }}>Fuego Real</div>
          <div style={{ fontSize:10, color:'#6b5c40', letterSpacing:3, textTransform:'uppercase', lineHeight:2 }}>La Perfección a la Brasa<br/>Trujillo, Perú</div>
        </div>
        <div>
          <div style={{ fontSize:9, letterSpacing:4, textTransform:'uppercase', color:'#b48c3c', marginBottom:20 }}>Contacto</div>
          {['Av. España 1204, Trujillo','+51 999 000 000','hola@fuegoreal.pe'].map(t=>(
            <p key={t} style={{ fontSize:11, color:'#6b5c40', lineHeight:2, marginBottom:4 }}>{t}</p>
          ))}
        </div>
        <div>
          <div style={{ fontSize:9, letterSpacing:4, textTransform:'uppercase', color:'#b48c3c', marginBottom:20 }}>Horarios</div>
          {['Mar — Jue: 12pm – 10pm','Vie — Sáb: 12pm – 12am','Dom: 12pm – 9pm'].map(t=>(
            <p key={t} style={{ fontSize:11, color:'#6b5c40', lineHeight:2, marginBottom:4 }}>{t}</p>
          ))}
        </div>
      </footer>
      <div className="fr-footer-bottom" style={{ borderTop:'1px solid rgba(180,140,60,0.1)', padding:'24px 80px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'#040302' }}>
        <span style={{ fontSize:10, color:'#3d3425', letterSpacing:2 }}>© 2026 Fuego Real · Todos los derechos reservados</span>
        <div className="fr-footer-socials" style={{ display:'flex', gap:24 }}>
          {['Instagram','Facebook','TikTok'].map(s=>(
            <span key={s} className="fr-footer-social">{s}</span>
          ))}
        </div>
      </div>

    </div>
  );
}
