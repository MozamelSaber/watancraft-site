import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Download, ExternalLink, Menu, X } from 'lucide-react';
import photos from './gallery.json';
import './App.css';

const DISCORD = 'https://discord.com/invite/f6YE5Fd3HG';
const YOUTUBE = 'https://www.youtube.com/@TuraChi';
const API = 'https://purple-rice-956f.mozamelsaber.workers.dev';
const ADDRESS = 'play.watancraft.fun';
const WORLD = 'https://www.dropbox.com/scl/fi/ewenuycu1qt1ohhwviyxl/WatanCraft-Season-1.zip?rlkey=g7o638mlk39awokim3wnk1bg2&e=2&st=m814xglx&dl=1';
const ARCHIVE = 'https://www.dropbox.com/scl/fi/58t9r3yneqgajr7rfpb2o/Season-1-Gallery.zip?rlkey=djex3ioig2kr8r9qh7gohnlbl&st=n02dqjuc&dl=1';
const asset = (path:string) => `${import.meta.env.BASE_URL}${path}`;

type Member = { id:string; name:string; avatar:string; key?:string };
const hidden = new Set(['1175892534812221454','868364926002036776','917410857695211540']);
const staff = [
 {name:'TuraChi',role:'Owner & Developer',image:'Turachi.png',link:YOUTUBE},
 {name:'Zako',role:'Co-owner',image:'Zako.png',link:DISCORD},
 {name:'MompAli',role:'Senior Admin',image:'Ali.png',link:'https://youtube.com/@itzrealace'},
 {name:'MrRubik',role:'Senior Admin',image:'MrRubik.jpg',link:DISCORD},
 {name:'Madisa',role:'Game Master',image:'Madisa.png',link:DISCORD},
];
const rules = [
 ['Respect everyone','No insults, harassment, discrimination, bullying, or threats.'],
 ['Respect every build','No griefing, stealing, or taking things without permission.'],
 ['Keep it fair','Cheats, hacks, and unfair third-party tools are not allowed.'],
 ['Keep chat clean','No spamming, repeated messages, or unnecessary mentions.'],
 ['Keep it appropriate','No adult content or inappropriate names and profiles.'],
 ['Trade honestly','No scams or misleading deals with other players.'],
 ['Report exploits','Tell staff about bugs and glitches instead of abusing them.'],
];
const secureAvatar = (url:string) => { try { const u = new URL(url); return u.protocol==='https:' && ['cdn.discordapp.com','media.discordapp.net'].includes(u.hostname); } catch { return false; } };
function Avatar({src,fallback,name}:{src:string;fallback:string;name:string}) {
 return <img src={src} alt={`${name}'s avatar`} loading="lazy" onError={e=>{if(e.currentTarget.src!==new URL(fallback,location.href).href)e.currentTarget.src=fallback;}}/>;
}
function Flag(){ return <span className="afghan-flag" aria-label="Afghanistan"><i/><i/><i/></span>; }

export default function App(){
 const [menu,setMenu] = useState(false);
 const [season,setSeason] = useState(location.pathname.endsWith('/season/1')?1:2);
 const [limit,setLimit] = useState(9);
 const [active,setActive] = useState<number|null>(null);
 const [copied,setCopied] = useState(false);
 const [copyError,setCopyError] = useState(false);
 const [members,setMembers] = useState<Member[]>([]);
 const [memberState,setMemberState] = useState<'loading'|'ready'|'error'>('loading');
 const [retry,setRetry] = useState(0);
 const [avatars,setAvatars] = useState<Record<string,string>>({});
 const modal = useRef<HTMLDialogElement>(null);
 const gallery = photos.filter(p=>p.season===season);

 useEffect(()=>{
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),12000);
  setMemberState('loading');
  fetch(`${API}/1470843290307006588`,{signal:controller.signal})
   .then(r=>{if(!r.ok)throw new Error('Discord unavailable');return r.json();})
   .then(d=>{if(!Array.isArray(d.members))throw new Error('Invalid response');setMembers(d.members.filter((m:Member)=>typeof m.id==='string'&&typeof m.name==='string'&&!hidden.has(m.id)));setMemberState('ready');})
   .catch(()=>setMemberState('error'));
  return ()=>{clearTimeout(timer);controller.abort();};
 },[retry]);
 useEffect(()=>{
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);
  fetch(`${API}/staff`,{signal:controller.signal}).then(r=>{if(!r.ok)throw new Error('Staff unavailable');return r.json();})
   .then(d=>{const next:Record<string,string>={};for(const m of d.members||[]){if(staff.some(s=>s.name===m.key)&&secureAvatar(m.avatar))next[m.key]=m.avatar;}setAvatars(next);}).catch(()=>{});
  return()=>{clearTimeout(timer);controller.abort();};
 },[]);
 useEffect(()=>{
  const d=modal.current;
  if(active!==null){if(d&&!d.open)d.showModal();document.body.style.overflow='hidden';}
  else {if(d?.open)d.close();document.body.style.overflow='';}
  return ()=>{document.body.style.overflow='';};
 },[active]);
 useEffect(()=>{if(location.pathname.includes('/season/')){const timer=setTimeout(()=>document.getElementById('gallery')?.scrollIntoView(),120);return()=>clearTimeout(timer);}},[]);
 async function copyIP(){try{await navigator.clipboard.writeText(ADDRESS);setCopied(true);setCopyError(false);setTimeout(()=>setCopied(false),2300);}catch{setCopyError(true);}}
 function selectSeason(s:number){setSeason(s);setLimit(9);setActive(null);}
 const jumpSeason = (s:number)=>{selectSeason(s);setMenu(false);};
 const closeMenu = ()=>setMenu(false);
 return <>
 <a className="skip" href="#main">Skip to content</a>
 <header className="site-header">
  <a className="brand" href="#top" aria-label="WatanCraft home" onClick={closeMenu}><img src={asset('favicon.png')} alt=""/><span>WATAN<b>CRAFT</b></span></a>
  <nav className={`main-nav ${menu?'is-open':''}`} aria-label="Main navigation"><a href="#experience" onClick={closeMenu}>The experience</a><a href="#seasons" onClick={closeMenu}>Seasons</a><a href="#gallery" onClick={closeMenu}>Gallery</a><a href="#community" onClick={closeMenu}>Community</a><a href="#team" onClick={closeMenu}>Team</a></nav>
  <a href="#join" className="nav-cta">START PLAYING <ArrowUpRight size={17}/></a>
  <button className="mobile-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
 </header>
 <main id="main">
  <section className="hero" id="top">
   <img className="hero-photo" src={asset('gallery/s2-14.webp')} alt="WatanCraft's Afghan-flagged castle above a golden-hour landscape" fetchPriority="high"/>
   <div className="hero-vignette"/>
   <div className="hero-inner container">
    <div className="hero-lead"><span className="hero-overline"><Flag/> AFGHANISTAN'S FIRST & ONLY MINECRAFT SERVER</span><div className="live-line"><span className="pulse"/> SEASON TWO IS LIVE <span className="live-line-separator"/> JAVA + BEDROCK</div>
     <h1>THIS IS<br/><em>WATAN</em><span>CRAFT.</span></h1>
     <p className="hero-description">More than a server. A world built by its players, full of unforgettable places, incredible stories, and a community to call home.</p>
     <div className="hero-actions"><a className="btn btn-primary" href="#join">ENTER THE WORLD <ArrowUpRight size={20}/></a><a className="btn btn-quiet" href="#gallery">EXPLORE THE WORLD <ArrowRight size={18}/></a></div>
    </div>
    <div className="hero-corner"><span className="corner-count">02<span>/02</span></span><div><b>THE WORLD IS YOURS</b><span>Season 2 — Now playing</span></div></div>
    <a className="scroll-indicator" href="#experience">SCROLL TO EXPLORE <ArrowDown size={16}/></a>
   </div>
  </section>
  <div className="join-bar"><div className="container join-bar-inner"><div className="join-bar-intro"><span className="pulse"/> YOUR NEXT ADVENTURE STARTS HERE</div><button className="ip-button" onClick={copyIP} title="Copy server IP"><span>{ADDRESS}</span>{copied?<Check size={20}/>:<Copy size={19}/>}<small>{copied?'COPIED':'COPY IP'}</small></button><span className="bar-divider"/><span className="bar-tag">JAVA <span>+</span> BEDROCK</span><a href={DISCORD} target="_blank" rel="noreferrer" className="bar-discord">JOIN DISCORD <ArrowUpRight size={16}/></a></div>{copyError&&<p className="copy-error" role="status">Could not copy automatically. Select the address above to copy it manually.</p>}</div>
  <section className="experience section container" id="experience"><div className="section-heading experience-heading"><div><span className="section-kicker"><span className="kicker-line"/> NOT YOUR AVERAGE SURVIVAL SERVER</span><h2>ONE SERVER.<br/><span>INFINITE STORIES.</span></h2></div><p>From breathtaking mega-builds to the friendships made along the way — every block has a story. Come write yours.</p></div>
   <div className="feature-grid"><article className="feature-photo tall"><img src={asset('gallery/s2-13.webp')} alt="Detailed guardian and winged statue towering above a desert city" loading="lazy"/><div className="feature-caption"><span>01 / THE BUILDS</span><h3>Built to<br/>blow minds.</h3></div></article><article className="feature-photo"><img src={asset('gallery/s2-10.webp')} alt="Japanese-inspired castle architecture in WatanCraft Season 2" loading="lazy"/><div className="feature-caption"><span>02 / THE ADVENTURE</span><h3>Go beyond<br/>ordinary.</h3></div></article><article className="feature-photo"><img src={asset('gallery/s1-25.webp')} alt="WatanCraft friends posing together in Season 1" loading="lazy"/><div className="feature-caption"><span>03 / THE COMMUNITY</span><h3>Find your<br/>kind of people.</h3></div></article></div>
  </section>
  <section className="season-section section" id="seasons"><div className="container"><div className="section-heading"><div><span className="section-kicker"><span className="kicker-line"/> TWO CHAPTERS. ONE LEGACY.</span><h2>EVERY WORLD<br/><span>LEAVES A MARK.</span></h2></div><p>Two seasons. Thousands of memories. See where the story began, and where it's heading next.</p></div>
   <div className="seasons"><a className="season-card season-2" href="#gallery" onClick={()=>jumpSeason(2)}><img src={asset('gallery/s2-23.webp')} alt="A WatanCraft stone castle with the Afghan flag" loading="lazy"/><div className="season-gradient"/><div className="season-topline"><span className="season-pill"><span className="pulse"/> LIVE NOW</span><span className="season-index">02</span></div><div className="season-bottom"><span className="overline">CURRENT SEASON · JAVA & BEDROCK</span><h3>THE AGE OF<br/>MEGA BUILDS.</h3><span className="season-link">EXPLORE SEASON 2 <ArrowUpRight size={20}/></span></div></a><a className="season-card season-1" href="#gallery" onClick={()=>jumpSeason(1)}><img src={asset('gallery/s1-15.webp')} alt="Enormous dragon builds soaring above a Season 1 city" loading="lazy"/><div className="season-gradient"/><div className="season-topline"><span className="season-pill muted">THE ORIGINAL WORLD</span><span className="season-index">01</span></div><div className="season-bottom"><span className="overline">THE BEGINNING · ARCHIVED</span><h3>WHERE IT<br/>ALL BEGAN.</h3><span className="season-link">REVISIT SEASON 1 <ArrowUpRight size={20}/></span></div></a></div>
  </div></section>
  <section className="gallery-section section container" id="gallery"><div className="section-heading"><div><span className="section-kicker"><span className="kicker-line"/> NO RENDERS. JUST REAL MOMENTS.</span><h2>SEE IT TO<br/><span>BELIEVE IT.</span></h2></div><p>Every shot comes straight from WatanCraft. Explore the architecture, adventures, and memories captured by the community.</p></div>
   <div className="gallery-bar"><div className="gallery-tabs" role="group" aria-label="Choose a season"><button type="button" className={season===2?'selected':''} aria-pressed={season===2} onClick={()=>selectSeason(2)}>SEASON 02 <span>/{photos.filter(p=>p.season===2).length}</span></button><button type="button" className={season===1?'selected':''} aria-pressed={season===1} onClick={()=>selectSeason(1)}>SEASON 01 <span>/{photos.filter(p=>p.season===1).length}</span></button></div><span className="gallery-count">SELECT A PHOTO TO EXPLORE <ArrowUpRight size={16}/></span></div>
   <div className="gallery-grid">{gallery.slice(0,limit).map((p,i)=><button className={`gallery-item ${i===0?'gallery-featured':''}`} key={p.src} onClick={()=>setActive(i)} aria-label={`View ${p.title}`}><img src={asset(p.thumb)} alt={p.alt} loading="lazy"/><span className="gallery-overlay"><span><small>SEASON 0{season}</small>{p.title}</span><ArrowUpRight size={21}/></span></button>)}</div>
   <div className="gallery-bottom"><span>SHOWING {Math.min(limit,gallery.length)} OF {gallery.length} MOMENTS</span>{limit<gallery.length?<button className="btn btn-outline" onClick={()=>setLimit(n=>n+9)}>LOAD MORE MOMENTS <ArrowDown size={17}/></button>:<button className="btn btn-outline" onClick={()=>{setLimit(9);document.getElementById('gallery')?.scrollIntoView();}}>BACK TO THE TOP ↑</button>}</div>
  </section>
  <section className="legacy-section section" id="community"><div className="container legacy-layout"><div className="legacy-intro"><span className="section-kicker"><span className="kicker-line"/> THE PEOPLE MAKE THE WORLD</span><h2>LEGENDS ARE<br/><span>MADE TOGETHER.</span></h2><p>Great builds are better with great people. The WatanCraft community is what turns a Minecraft world into something worth remembering.</p><a href={DISCORD} target="_blank" rel="noreferrer" className="inline-link">FIND YOUR PEOPLE <ArrowUpRight size={19}/></a><div className="legacy-photo"><img src={asset('gallery/s1-19.webp')} alt="Original WatanCraft sign and world" loading="lazy"/></div></div><div className="fame"><div className="fame-heading"><div><span className="overline">THE ORIGINALS</span><h3>SEASON 01 HALL OF FAME</h3></div><span className="fame-glyph">✳</span></div><p>The players who were part of the story from the beginning.</p>{memberState==='loading'?<p className="status-message" role="status">Loading the original crew…</p>:memberState==='error'?<div className="status-message"><span>Hall of fame temporarily unavailable.</span><button onClick={()=>setRetry(n=>n+1)}>TRY AGAIN <ArrowRight size={14}/></button></div>:members.length===0?<p className="status-message">No role holders available at the moment.</p>:<div className="member-grid">{members.map(m=><div className="member" key={m.id}><Avatar src={secureAvatar(m.avatar)?m.avatar:asset('favicon.png')} fallback={asset('favicon.png')} name={m.name}/><span>{m.name}</span></div>)}</div>}</div></div></section>
  <section className="team-section section container" id="team"><div className="section-heading"><div><span className="section-kicker"><span className="kicker-line"/> THE PEOPLE BEHIND THE SERVER</span><h2>MEET THE <span>CREW.</span></h2></div><p>Building the experience and keeping WatanCraft a welcoming place for every player.</p></div><div className="team-grid">{staff.map(s=><a key={s.name} className="team-person" href={s.link} target="_blank" rel="noreferrer"><div className="team-avatar"><Avatar name={s.name} src={avatars[s.name]||asset(s.image)} fallback={asset(s.image)}/><ArrowUpRight size={18}/></div><span className="overline">{s.role}</span><h3>{s.name}</h3></a>)}</div></section>
  <section className="resources-section section container"><div className="resource-header"><span className="section-kicker"><span className="kicker-line"/> A PIECE OF HISTORY</span><h2>KEEP THE <span>MEMORIES.</span></h2><p>Season 1 may be over, but its world is yours to revisit.</p></div><div className="resource-links"><a href={WORLD} target="_blank" rel="noreferrer"><span>01 <b>DOWNLOAD THE SEASON 1 WORLD</b><small>Java world + resource pack · ZIP</small></span><Download size={24}/></a><a href={ARCHIVE} target="_blank" rel="noreferrer"><span>02 <b>DOWNLOAD THE PHOTO ARCHIVE</b><small>Original Season 1 gallery · ZIP</small></span><ArrowUpRight size={25}/></a></div></section>
  <section className="rules-section section container" id="rules"><div><span className="section-kicker"><span className="kicker-line"/> THE GROUND RULES</span><h2>PLAY FAIR.<br/><span>BUILD BIG.</span></h2><p>Just a few things that keep the adventure fun for everyone. Read the full server rules in Discord before joining.</p></div><div className="rules-list">{rules.map(([title,desc],i)=><details key={title}><summary><span>{String(i+1).padStart(2,'0')}</span><b>{title}</b><span className="rule-plus">+</span></summary><p>{desc}</p></details>)}</div></section>
  <section className="join-section" id="join"><img src={asset('gallery/s2-05.webp')} alt="" loading="lazy"/><div className="join-shade"/><div className="container join-layout"><div className="join-copy"><span className="section-kicker"><span className="kicker-line"/> YOU'VE SEEN THE WORLD. NOW LIVE IN IT.</span><h2>YOUR NEXT<br/><span>ADVENTURE</span><br/>STARTS HERE.</h2><p>Java or Bedrock. Builder or explorer. Everyone has a story to make.</p><a className="btn btn-primary" href={DISCORD} target="_blank" rel="noreferrer">JOIN THE DISCORD <ArrowUpRight size={21}/></a></div><div className="how-to"><span className="overline">THREE STEPS. ONE WORLD.</span><div><span>01</span><p>JOIN THE DISCORD<small>Meet the community and read the rules.</small></p></div><div><span>02</span><p>GET WHITELISTED<small>Request access and wait for approval.</small></p></div><div><span>03</span><p>START YOUR STORY<small>Connect on Java or Bedrock and play.</small></p></div><button onClick={copyIP} className="how-ip"><span>{ADDRESS}</span>{copied?<Check size={20}/>:<Copy size={18}/>}</button><small className="how-note">Bedrock connection details are available in Discord.</small></div></div></section>
 </main>
 <footer className="footer"><div className="container"><div className="footer-main"><div><a href="#top" className="brand"><img src={asset('favicon.png')} alt=""/><span>WATAN<b>CRAFT</b></span></a><p>Afghanistan's first & only Minecraft server.<br/>Crafted with pride. Built together.</p></div><div className="footer-links"><a href="#seasons">SEASONS</a><a href="#gallery">GALLERY</a><a href="#team">TEAM</a><a href="#rules">RULES</a></div><div className="footer-links"><a href={DISCORD} target="_blank" rel="noreferrer">DISCORD <ExternalLink size={13}/></a><a href={YOUTUBE} target="_blank" rel="noreferrer">YOUTUBE <ExternalLink size={13}/></a><a href="#join">JOIN SERVER <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} WATANCRAFT. ALL RIGHTS RESERVED.</span><span>NOT AFFILIATED WITH MOJANG OR MICROSOFT.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
 <dialog ref={modal} className="lightbox" aria-label="WatanCraft photo viewer" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null);}} onKeyDown={e=>{if(e.key==='ArrowRight')setActive(i=>i===null?null:(i+1)%gallery.length);else if(e.key==='ArrowLeft')setActive(i=>i===null?null:(i-1+gallery.length)%gallery.length);}}>{active!==null&&<><button className="lightbox-close" aria-label="Close photo" onClick={()=>setActive(null)}><X/></button><img src={asset(gallery[active].src)} alt={gallery[active].alt}/><div className="lightbox-bottom"><button aria-label="Previous photo" onClick={()=>setActive(i=>i===null?null:(i-1+gallery.length)%gallery.length)}><ChevronLeft/></button><span><b>{gallery[active].title}</b><small>SEASON 0{season} · {active+1} / {gallery.length}</small></span><button aria-label="Next photo" onClick={()=>setActive(i=>i===null?null:(i+1)%gallery.length)}><ChevronRight/></button></div></>}</dialog>
 </>;
}
