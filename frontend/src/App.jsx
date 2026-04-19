import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { level1Questions, level2Skillsets, level3Activities, level4Vibes, level5Tags, MASTER_TAGS } from './questions';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/* ── Fonts ── */
(()=>{
  if (document.getElementById('up-fonts')) return;
  const l = document.createElement('link');
  l.id = 'up-fonts'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(l);
})();

/* ── Styles ── */
(()=>{
  if (document.getElementById('up-styles')) return;
  const s = document.createElement('style');
  s.id = 'up-styles';
  s.textContent = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  :root{
    --cream:  #FFFBF0;
    --paper:  #FFF8E7;
    --ink:    #1A1208;
    --muted:  #7A6A52;
    --coral:  #FF5C35;
    --violet: #7C3AED;
    --amber:  #D97706;
    --sky:    #0284C7;
    --lime:   #65A30D;
    --rose:   #E11D48;
    --ff-d:   'Fraunces', serif;
    --ff-b:   'Plus Jakarta Sans', sans-serif;
    --r:16px; --rs:10px;
    --s1:3px 3px 0 #1A1208;
    --s2:4px 4px 0 #1A1208;
    --s3:6px 6px 0 #1A1208;
    --s4:8px 8px 0 #1A1208;
  }

  html,body,#root{
    min-height:100vh;background:var(--cream);color:var(--ink);
    font-family:var(--ff-b);-webkit-font-smoothing:antialiased;overflow-x:hidden;
  }

  /* gradient blobs */
  @keyframes drift1{0%{transform:translate(0,0)}20%{transform:translate(130px,50px)}40%{transform:translate(90px,140px)}60%{transform:translate(-40px,110px)}80%{transform:translate(-60px,25px)}100%{transform:translate(0,0)}}
  @keyframes drift2{0%{transform:translate(0,0)}20%{transform:translate(-110px,70px)}40%{transform:translate(-160px,15px)}60%{transform:translate(-90px,-55px)}80%{transform:translate(-20px,-35px)}100%{transform:translate(0,0)}}
  @keyframes drift3{0%{transform:translate(-50%,0)}25%{transform:translate(calc(-50% + 130px),-90px)}50%{transform:translate(calc(-50% + 70px),-160px)}75%{transform:translate(calc(-50% - 90px),-70px)}100%{transform:translate(-50%,0)}}
  html::before{content:'';position:fixed;top:-280px;left:-280px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,92,53,0.26) 0%,transparent 68%);pointer-events:none;filter:blur(55px);animation:drift1 24s ease-in-out infinite;z-index:0}
  html::after{content:'';position:fixed;top:-240px;right:-280px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 68%);pointer-events:none;filter:blur(55px);animation:drift2 28s ease-in-out infinite;z-index:0}
  body::after{content:'';position:fixed;bottom:-280px;left:50%;width:750px;height:750px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.21) 0%,transparent 68%);pointer-events:none;filter:blur(65px);animation:drift3 26s ease-in-out infinite;z-index:0}

  /* dot grid */
  body::before{
    content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
    background-image:radial-gradient(circle,rgba(26,18,8,0.08) 1.5px,transparent 1.5px);
    background-size:28px 28px;
  }

  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-thumb{background:rgba(26,18,8,0.18);border-radius:99px}

  /* level rail */
  .lrail{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;height:5px;background:rgba(26,18,8,0.07);border-bottom:1px solid rgba(26,18,8,0.1)}
  .lrail .seg{flex:1;transition:background .5s;border-right:1px solid rgba(26,18,8,0.12)}
  .lrail .seg:last-child{border-right:none}
  .lrail .seg.done{background:rgba(26,18,8,0.15)}
  @keyframes railPulse{0%,100%{opacity:1}50%{opacity:.55}}
  .lrail .seg.a1{background:var(--coral);animation:railPulse 1.8s ease-in-out infinite}
  .lrail .seg.a2{background:var(--violet);animation:railPulse 1.8s ease-in-out infinite}
  .lrail .seg.a3{background:var(--amber);animation:railPulse 1.8s ease-in-out infinite}
  .lrail .seg.a4{background:var(--sky);animation:railPulse 1.8s ease-in-out infinite}
  .lrail .seg.a5{background:var(--lime);animation:railPulse 1.8s ease-in-out infinite}

  /* progress bar */
  .ptrack{width:100%;height:8px;background:rgba(26,18,8,0.07);border-radius:99px;border:1.5px solid rgba(26,18,8,0.2);overflow:hidden;margin-bottom:1.5rem}
  .pfill{height:100%;border-radius:99px;transition:width .4s cubic-bezier(.4,0,.2,1)}

  /* card */
  .card{background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);box-shadow:var(--s3);padding:2.25rem 2rem;position:relative}
  .card::after,.flipfront::after,.flipback::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.4'/></svg>");opacity:.045;mix-blend-mode:multiply}
  .flipfront{position:relative}.flipback{position:relative}

  /* intro path node */
  .pnode:hover{transform:translate(-1px,-1px) scale(1.1);box-shadow:5px 5px 0 var(--ink) !important}
  .pnode:active{transform:translate(2px,2px) scale(1) !important;box-shadow:1px 1px 0 var(--ink) !important}

  /* stamp */
  .stamp{display:inline-flex;align-items:center;gap:.4rem;padding:.3rem .85rem;border:2px solid var(--ink);border-radius:99px;font-family:var(--ff-b);font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;box-shadow:var(--s1);margin-bottom:.9rem}

  /* ── SMOOTHED BUTTON TRANSITIONS ── */
  @keyframes ripple{to{transform:translate(-50%,-50%) scale(60);opacity:0}}
  .ripple{position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.35);transform:translate(-50%,-50%) scale(0);animation:ripple .6s ease-out forwards;pointer-events:none}
  .btn{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;padding:.95rem 1.5rem;border:2px solid var(--ink);border-radius:var(--rs);font-family:var(--ff-b);font-size:.95rem;font-weight:800;cursor:pointer;transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, color .2s ease-out;box-shadow:var(--s2);position:relative;overflow:hidden}
  .btn:hover:not(:disabled){transform:translate(-1px,-1px);box-shadow:5px 5px 0 var(--ink)}
  .btn:active:not(:disabled){transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}
  .btn:disabled{opacity:.32;cursor:not-allowed;box-shadow:2px 2px 0 var(--ink)}
  .btn.coral{background:var(--coral);color:#fff}
  .btn.violet{background:var(--violet);color:#fff}
  .btn.amber{background:var(--amber);color:#fff}
  .btn.sky{background:var(--sky);color:#fff}
  .btn.lime{background:var(--lime);color:#fff}
  .btn.ghost{background:var(--cream);color:var(--ink)}

  /* choice buttons */
  .cpair{display:flex;gap:.75rem}
  .cbtn{flex:1;padding:1.05rem 1rem;border:2px solid var(--ink);border-radius:var(--rs);background:var(--cream);color:var(--ink);font-family:var(--ff-b);font-size:.88rem;font-weight:700;cursor:pointer;transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, color .2s ease-out, border-color .2s ease-out;box-shadow:var(--s1)}
  .cbtn:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink)}
  .cbtn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
  .cbtn.yes:hover{background:var(--lime);color:#fff;border-color:var(--lime);box-shadow:4px 4px 0 #3d6b08}
  .cbtn.no:hover{background:var(--rose);color:#fff;border-color:var(--rose);box-shadow:4px 4px 0 #7f1134}

  /* flip card */
  .flipwrap{perspective:1200px;width:100%}
  .flipinner{position:relative;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,0,.2,1)}
  .flipinner.flipped{transform:rotateY(180deg)}
  .flipfront{backface-visibility:hidden;-webkit-backface-visibility:hidden;background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);box-shadow:var(--s3);padding:2.25rem 2rem}
  .flipback{position:absolute;top:0;left:0;width:100%;min-height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);box-shadow:var(--s3);padding:2.25rem 2rem}

  /* responsive layouts */
  .l1grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:2rem}
  @media(max-width:520px){.l1grid{grid-template-columns:1fr}}
  .tbtns{display:flex;gap:.6rem;margin-bottom:1.5rem}
  @media(max-width:480px){.tbtns{flex-direction:column}}

  /* tier buttons L2 */
  .tbtn{flex:1;padding:.9rem .6rem;border:2px solid var(--ink);border-radius:var(--rs);background:var(--cream);color:var(--ink);font-family:var(--ff-b);font-size:.82rem;font-weight:700;cursor:pointer;text-align:center;transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, color .2s ease-out, border-color .2s ease-out;box-shadow:var(--s1);line-height:1.3}
  .tbtn:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink)}
  .tbtn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
  .tbtn.sel{background:var(--violet);color:#fff;border-color:var(--violet);box-shadow:4px 4px 0 #4c1d95}

  /* swipe */
  @keyframes swR{to{transform:translateX(130%) rotate(12deg);opacity:0}}
  @keyframes swL{to{transform:translateX(-130%) rotate(-12deg);opacity:0}}
  .swr{animation:swR .3s ease-in forwards}
  .swl{animation:swL .3s ease-in forwards}

  .swbtn{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;cursor:pointer;border:2.5px solid var(--ink);transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, color .2s ease-out;}
  .swbtn:hover{transform:translate(-1px,-1px)}
  .swbtn:active{transform:translate(2px,2px)}
  .swno{background:#fff0f0;box-shadow:4px 4px 0 var(--ink);color:var(--rose)}
  .swyes{background:#f0fff4;box-shadow:4px 4px 0 var(--ink);color:var(--lime)}
  .swno:hover{background:var(--rose);color:#fff;box-shadow:4px 4px 0 #7f1134}
  .swyes:hover{background:var(--lime);color:#fff;box-shadow:4px 4px 0 #3d6b08}

  /* vibes */
  .vgrid{display:grid;grid-template-columns:1fr;gap:.75rem}
  @media(min-width:540px){.vgrid{grid-template-columns:1fr 1fr}}
  .vcard{display:flex;align-items:flex-start;gap:.9rem;padding:1rem;border:2px solid var(--ink);border-radius:var(--rs);background:var(--cream);cursor:pointer;text-align:left;transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, border-color .2s ease-out;box-shadow:var(--s1)}
  .vcard:hover:not(:disabled){transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink)}
  .vcard:active:not(:disabled){transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
  .vcard.sel{background:#EDE9FE;border-color:var(--violet);box-shadow:4px 4px 0 var(--violet)}
  .vcard:disabled{opacity:.28;cursor:not-allowed;filter:grayscale(.6)}
  .vi{font-size:1.9rem;line-height:1;flex-shrink:0}
  .vn{font-family:var(--ff-b);font-weight:800;font-size:.9rem;margin-bottom:.2rem}
  .vd{font-size:.77rem;color:var(--muted);line-height:1.4}
  .vchip{font-family:var(--ff-b);font-size:.66rem;font-weight:800;padding:.18rem .5rem;border:2px solid var(--ink);border-radius:6px;background:var(--paper);flex-shrink:0;align-self:flex-start;margin-left:auto;white-space:nowrap}
  .vcard.sel .vchip{background:var(--violet);color:#fff;border-color:var(--violet)}

  /* budget */
  .bbudget{font-family:var(--ff-b);font-size:.85rem;font-weight:800;padding:.35rem 1rem;border:2px solid var(--ink);border-radius:99px;background:var(--paper);box-shadow:var(--s1);transition:background .3s,color .3s}
  .bbudget.empty{background:var(--rose);color:#fff;border-color:var(--rose);box-shadow:3px 3px 0 #7f1134}

  /* pyramid */
  .ptier{display:flex;justify-content:center;gap:.6rem;margin-bottom:.65rem}
  .pslot{display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed rgba(26,18,8,0.18);border-radius:var(--rs);background:rgba(26,18,8,.03);cursor:pointer;padding:.65rem .4rem;min-height:88px;transition:transform .15s ease-out, box-shadow .15s ease-out, border-color .2s ease-out, background .2s ease-out}
  .pslot:hover{transform:translateY(-2px)}
  .pslot.peak.f{background:#ECFDF5;border:2px solid var(--lime);box-shadow:3px 3px 0 var(--lime)}
  .pslot.core.f{background:#EDE9FE;border:2px solid var(--violet);box-shadow:3px 3px 0 var(--violet)}
  .pslot.base.f{background:#FFF7ED;border:2px solid var(--amber);box-shadow:3px 3px 0 var(--amber)}
  .pslot.f:hover{transform:translate(-1px,-1px)}
  .pi{font-size:1.6rem;line-height:1;margin-bottom:.25rem}
  .pn{font-family:var(--ff-b);font-size:.56rem;font-weight:800;text-align:center;line-height:1.2}
  .pe{font-size:.55rem;font-weight:700;color:rgba(26,18,8,.2);text-transform:uppercase;letter-spacing:.1em}

  /* tag chips */
  .tchip{display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .8rem;border:2px solid var(--ink);border-radius:99px;background:var(--cream);color:var(--ink);font-family:var(--ff-b);font-size:.78rem;font-weight:700;cursor:pointer;transition:transform .15s ease-out, box-shadow .15s ease-out, background .2s ease-out, color .2s ease-out, border-color .2s ease-out;box-shadow:2px 2px 0 var(--ink)}
  .tchip:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--ink);background:var(--lime);color:#fff;border-color:var(--lime)}
  .tchip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}

  /* tooltip */
  .ht{position:relative;overflow:visible !important}
  .ht .tt{visibility:hidden;width:max-content;max-width:200px;background:var(--ink);color:var(--cream);text-align:center;border-radius:8px;padding:.5rem .75rem;position:absolute;z-index:200;bottom:110%;left:50%;transform:translateX(-50%);opacity:0;transition:opacity .15s;font-family:var(--ff-b);font-size:.72rem;font-weight:500;pointer-events:none}
  .ht:hover .tt{visibility:visible;opacity:1}

  /* results */
  .rgrid{display:grid;grid-template-columns:1fr;gap:1rem}
  @media(min-width:640px){.rgrid{grid-template-columns:repeat(3,1fr)}}
  .rcard{background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);padding:1.75rem 1.5rem;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .2s ease-out, box-shadow .2s ease-out;box-shadow:var(--s2)}
  .rcard:hover{transform:translate(-2px,-2px);box-shadow:var(--s4)}
  .rcard.win{background:#ECFDF5;border-color:var(--lime);box-shadow:6px 6px 0 var(--lime)}
  .rbadge{position:absolute;top:-2px;right:1.25rem;font-family:var(--ff-b);font-size:.63rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:.27rem .7rem;border:2px solid var(--ink);border-top:none;border-radius:0 0 8px 8px;background:var(--ink);color:var(--cream)}
  .rcard.win .rbadge{background:var(--lime);border-color:var(--lime)}
  .rfac{font-family:var(--ff-b);font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:.35rem;margin-top:.4rem}
  .rcard h3{font-family:var(--ff-d);font-weight:900;font-size:1.2rem;line-height:1.2;margin-bottom:.6rem}
  .rcard p{font-size:.82rem;color:var(--muted);line-height:1.5;flex:1;margin-bottom:1rem}
  .srow{border-top:1.5px solid rgba(26,18,8,0.1);padding-top:.75rem;display:flex;justify-content:space-between;align-items:center}
  .slabel{font-family:var(--ff-b);font-size:.6rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
  .sval{font-family:var(--ff-d);font-weight:900;font-size:1.2rem;color:var(--lime)}

  /* start */
  .sscreen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;z-index:1}
  .slogo{font-family:var(--ff-d);font-weight:900;font-size:clamp(4rem,14vw,7rem);line-height:.88;letter-spacing:-.04em;color:var(--ink);text-align:center;margin-bottom:.5rem}
  .ssub{font-family:var(--ff-b);font-size:.78rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:2.5rem;text-align:center}
  .scard{background:var(--paper);border:2.5px solid var(--ink);border-radius:var(--r);box-shadow:var(--s4);padding:2.5rem 2.25rem;width:100%;max-width:420px;text-align:center}
  .ninput{width:100%;background:var(--cream);border:2px solid var(--ink);border-radius:var(--rs);padding:.9rem 1.1rem;font-family:var(--ff-b);font-size:1rem;font-weight:600;color:var(--ink);text-align:center;outline:none;margin-bottom:1rem;box-shadow:inset 2px 2px 0 rgba(26,18,8,.05);transition:border-color .2s ease-out}
  .ninput::placeholder{color:var(--muted);font-weight:500}
  .ninput:focus{border-color:var(--coral)}

  /* done */
  .dwrap{max-width:440px;width:100%;text-align:center;background:var(--paper);border:2.5px solid var(--ink);border-radius:var(--r);box-shadow:var(--s4);padding:3rem 2.5rem}
  .dicon{width:72px;height:72px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:2.2rem;margin:0 auto 1.25rem;border:2px solid var(--ink);box-shadow:var(--s1)}
  .dtitle{font-family:var(--ff-d);font-weight:900;font-size:2rem;letter-spacing:-.02em;margin-bottom:.5rem}
  .dsub{font-size:.9rem;color:var(--muted);margin-bottom:2rem;font-weight:500}

  /* calculating */
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  .cdots{display:flex;gap:.75rem;justify-content:center;margin-bottom:2rem}
  .cdot{width:16px;height:16px;border-radius:50%;border:2px solid var(--ink);animation:bounce .8s ease-in-out infinite}
  .cdot:nth-child(2){animation-delay:.12s}
  .cdot:nth-child(3){animation-delay:.24s}

  /* float shapes */
  .fshape{position:fixed;pointer-events:none;z-index:0;border:2.5px solid var(--ink)}
  @keyframes floatY{0%,100%{transform:translateY(0) rotate(var(--rot,0deg))}50%{transform:translateY(-18px) rotate(var(--rot,0deg))}}
  @media(max-width:860px){.fshape{display:none}}

  /* fade-up */
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .4s cubic-bezier(.4,0,.2,1) both}

  /* misc */
  .lhrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem}
  .lcnt{font-family:var(--ff-b);font-size:.72rem;font-weight:700;color:var(--muted);background:rgba(26,18,8,.06);padding:.25rem .75rem;border:1.5px solid rgba(26,18,8,.15);border-radius:99px}

  /* all majors modal */
  .amoverlay{position:fixed;inset:0;z-index:300;background:rgba(26,18,8,.45);display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeUp .2s ease both}
  .ammodal{background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);box-shadow:var(--s4);width:100%;max-width:640px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden}
  .amhead{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.5rem;border-bottom:2px solid rgba(26,18,8,.1);flex-shrink:0}
  .amhead h2{font-family:var(--ff-d);font-weight:900;font-size:1.3rem;margin:0}
  .amclose{width:32px;height:32px;border-radius:50%;border:2px solid var(--ink);background:var(--cream);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;box-shadow:var(--s1);transition:transform .12s,box-shadow .12s}
  .amclose:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--ink)}
  .amclose:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}
  .amlist{overflow-y:auto;padding:1.2rem 1.5rem;display:flex;flex-direction:column;gap:.75rem}
  .amrow{display:flex;flex-direction:column;gap:.3rem}
  .aminfo{display:flex;justify-content:space-between;align-items:baseline}
  .amname{font-family:var(--ff-b);font-size:.82rem;font-weight:700}
  .amfac{font-size:.68rem;color:var(--muted);font-weight:500}
  .ampct{font-family:var(--ff-b);font-size:.78rem;font-weight:800}
  .amtrack{width:100%;height:10px;background:rgba(26,18,8,.07);border-radius:99px;border:1.5px solid rgba(26,18,8,.12);overflow:hidden}
  @keyframes barGrow{from{width:0}to{width:var(--target,0%)}}
  .amfill{height:100%;border-radius:99px;animation:barGrow .7s cubic-bezier(.4,0,.2,1) both}

  /* done icon pop + confetti */
  @keyframes popIn{0%{transform:scale(0) rotate(-10deg)}70%{transform:scale(1.18) rotate(4deg)}100%{transform:scale(1) rotate(0deg)}}
  .dicon{animation:popIn .5s cubic-bezier(.4,0,.2,1) both}
  @keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-100px) rotate(720deg);opacity:0}}
  .cdot-c{position:absolute;width:9px;height:9px;border-radius:50%;animation:confettiFall .9s ease-out both;pointer-events:none}

  /* info button */
  .infobtn{position:fixed;bottom:1.25rem;right:1.25rem;z-index:200;width:38px;height:38px;border-radius:50%;border:2px solid var(--ink);background:var(--paper);cursor:pointer;font-size:1.1rem;font-weight:900;letter-spacing:.05em;display:flex;align-items:center;justify-content:center;box-shadow:var(--s2);transition:transform .15s ease-out,box-shadow .15s ease-out}
  .infobtn:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 var(--ink)}
  .infobtn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
  .infocard{position:fixed;bottom:4.5rem;right:1.25rem;z-index:200;background:var(--paper);border:2px solid var(--ink);border-radius:var(--r);box-shadow:var(--s3);padding:1.1rem 1.3rem;min-width:210px;animation:fadeUp .2s cubic-bezier(.4,0,.2,1) both}
  .infocard p{font-size:.78rem;font-weight:600;color:var(--ink);line-height:1.7;margin:0}
  .infocard span{color:var(--muted);font-weight:500}

`;
  document.head.appendChild(s);
})();

const S = (p) => <div className="fshape" style={{animation:`floatY ${p.dur||4}s ease-in-out infinite`,animationDelay:`${p.delay||0}s`,'--rot':p.rot||'0deg',width:p.size||28,height:p.size||28,borderRadius:p.circle?'50%':p.rot==='45deg'?'3px':'4px',borderColor:`var(--${p.c||'ink'})`,...p.pos}}/>;

const Shapes = () => (
  <>
    <S circle size={30} c="coral"  pos={{top:'10%', left:'3%'}}  dur={4.2} delay={0}  />
    <S        size={24} c="violet" pos={{top:'32%', left:'5%'}}  dur={5.5} delay={0.8} rot="18deg"/>
    <S        size={20} c="amber"  pos={{top:'55%', left:'2.5%'}}dur={3.8} delay={1.5} rot="45deg"/>
    <S circle size={18} c="sky"    pos={{top:'76%', left:'6%'}}  dur={4.8} delay={0.4} />
    <S        size={22} c="lime"   pos={{top:'88%', left:'3.5%'}}dur={5.2} delay={1.1} rot="45deg"/>
    <S        size={26} c="violet" pos={{top:'8%',  right:'3%'}} dur={4.5} delay={0.6} rot="45deg"/>
    <S circle size={22} c="coral"  pos={{top:'28%', right:'5%'}} dur={3.6} delay={1.3} />
    <S        size={28} c="sky"    pos={{top:'52%', right:'2.5%'}}dur={5.0} delay={0.2} rot="12deg"/>
    <S circle size={20} c="lime"   pos={{top:'72%', right:'6%'}} dur={4.1} delay={1.7} />
    <S        size={24} c="amber"  pos={{top:'86%', right:'3.5%'}}dur={4.7} delay={0.9} rot="45deg"/>
  </>
);

const Confetti = () => (
  <>
    {[{c:'var(--coral)',l:'42%',d:'0s'},{c:'var(--violet)',l:'54%',d:'.08s'},{c:'var(--amber)',l:'36%',d:'.13s'},
      {c:'var(--lime)',l:'62%',d:'.05s'},{c:'var(--sky)',l:'48%',d:'.17s'},{c:'var(--rose)',l:'57%',d:'.1s'}]
      .map((dot,i)=><span key={i} className="cdot-c" style={{background:dot.c,left:dot.l,top:'28%',animationDelay:dot.d}}/>)}
  </>
);

const LEVELS = [
  {name:'Myth Buster',     color:'var(--coral)',  desc:'We start by shattering common university stereotypes to make sure you are approaching your options with a completely open mind.'},
  {name:'Dealbreakers',    color:'var(--violet)', desc:'Every career has its downsides. In this stage, you will define your boundaries by deciding which types of challenges, responsibilities, or daily grinds are absolute dealbreakers for you.'},
  {name:'Energy Profile',  color:'var(--amber)',  desc:'Success requires sustainable drive. Through a rapid-fire assessment, we will map out the types of interactions, problems, and environments that naturally fuel you versus the ones that leave you completely drained.'},
  {name:'The Vibe Budget', color:'var(--sky)',    desc:'You have a limited budget of credits. Spend them to build your ideal day-to-day working environment.'},
  {name:'The Pyramid',     color:'var(--lime)',   desc:'The final challenge. Stack your core priorities to feed the algorithm and calculate your perfect match.'},
];

const W = ({children,max='740px'}) => (
  <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:max,margin:'0 auto',padding:'clamp(1rem,4vw,2rem)'}}>
    {children}
  </div>
);

const LH = ({label,bg,idx,total,pct}) => (
  <>
    <div className="lhrow">
      <span className="stamp" style={{background:bg,color:'#fff',borderColor:'rgba(26,18,8,0.5)'}}>{label}</span>
      <span className="lcnt">{idx} / {total}</span>
    </div>
    <div className="ptrack"><div className="pfill" style={{width:`${pct}%`,background:bg}}/></div>
  </>
);

const Done = ({icon,ibg,title,sub,bl,bc,next,lvl,accent}) => (
  <div style={{display:'flex',justifyContent:'center'}} className="fu">
    <div className="dwrap" style={{position:'relative',overflow:'visible'}}>
      <Confetti/>
      {accent&&<div style={{position:'absolute',top:0,left:0,right:0,height:4,background:`var(--${accent})`,borderRadius:'calc(var(--r) - 2px) calc(var(--r) - 2px) 0 0'}}/>}
      {lvl&&<div style={{display:'flex',gap:'.4rem',justifyContent:'center',marginBottom:'1.1rem',marginTop:'.25rem'}}>
        {[1,2,3,4,5].map(n=>(
          <div key={n} style={{width:n<=lvl?24:8,height:8,borderRadius:99,background:n<=lvl?`var(--${accent})`:'rgba(26,18,8,.1)',transition:'width .3s'}}/>
        ))}
      </div>}
      <div className="dicon" style={{background:ibg}}>{icon}</div>
      <div className="dtitle">{title}</div>
      <div className="dsub">{sub}</div>
      <button className={`btn ${bc}`} onClick={next}><span>{bl}</span><span>→</span></button>
    </div>
  </div>
);

export default function App() {
  const [view, setView]     = useState('start');
  const [username, setUsername] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [introStop, setIntroStop] = useState(null);
  const [nameErr, setNameErr] = useState(false);
  const [showL4Hint, setShowL4Hint] = useState(false);
  const [l1Flipped, setL1Flipped] = useState(false);

  const [l1Index, setL1Index] = useState(0);
  const currentL1  = level1Questions?.[l1Index] || {};
  const progressL1 = level1Questions?.length ? ((l1Index+1)/level1Questions.length)*100 : 0;

  const [l2Index, setL2Index]           = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);
  const currentL2  = level2Skillsets?.[l2Index] || {};
  const progressL2 = level2Skillsets?.length ? ((l2Index+1)/level2Skillsets.length)*100 : 0;

  const [l3Index, setL3Index]           = useState(0);
  const [drainsBucket, setDrainsBucket] = useState([]);
  const [energyBucket, setEnergyBucket] = useState([]);
  const [swipeDir, setSwipeDir]         = useState(null);
  const [dragX, setDragX]               = useState(0);
  const touchStartX                     = useRef(null);
  const isDragging                      = useRef(false);
  const currentL3  = level3Activities?.[l3Index] || {};
  const progressL3 = level3Activities?.length ? (l3Index/level3Activities.length)*100 : 0;

  const [budget, setBudget]                = useState(100);
  const [displayBudget, setDisplayBudget]  = useState(100);
  const budgetRafRef                       = useRef(null);
  const [purchasedVibes, setPurchasedVibes]= useState([]);

  const [placedTags, setPlacedTags] = useState([]);
  const availableTags = level5Tags.filter(t => !placedTags.some(pt=>pt.id===t.id));

  const [finalResults, setFinalResults] = useState(null);
  const [allResults, setAllResults] = useState(null);
  const [showAllMajors, setShowAllMajors] = useState(false);

  const lvl = view.startsWith('l1')?1:view.startsWith('l2')?2:view.startsWith('l3')?3:view.startsWith('l4')?4:view.startsWith('l5')?5:0;

  useEffect(()=>{ window.scrollTo(0,0); },[view]);

  useEffect(()=>{
    const handler = e => {
      const btn = e.target.closest('.btn');
      if(!btn) return;
      const rect = btn.getBoundingClientRect();
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.left = `${e.clientX-rect.left}px`;
      r.style.top  = `${e.clientY-rect.top}px`;
      btn.appendChild(r);
      setTimeout(()=>r.remove(), 600);
    };
    document.addEventListener('click', handler);
    return ()=>document.removeEventListener('click', handler);
  },[]);

  useEffect(()=>{
    if(budgetRafRef.current) cancelAnimationFrame(budgetRafRef.current);
    const from = displayBudget;
    const to   = budget;
    const dur  = 350;
    let t0 = null;
    const tick = (now) => {
      if(!t0) t0=now;
      const p = Math.min((now-t0)/dur,1);
      const e = 1-(1-p)*(1-p);
      setDisplayBudget(Math.round(from+(to-from)*e));
      if(p<1) budgetRafRef.current=requestAnimationFrame(tick);
      else budgetRafRef.current=null;
    };
    budgetRafRef.current=requestAnimationFrame(tick);
    return ()=>{ if(budgetRafRef.current) cancelAnimationFrame(budgetRafRef.current); };
  },[budget]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Logic unchanged ── */
  const startApp = () => {
    if (!username) { setNameErr(true); return; }
    axios.post(`${API}/users/`,{username,email:`${username}@guc.edu.eg`}).catch(()=>{});
    setView('intro');
  };
  const saveScore = (tag, level, value) => {
    if (MASTER_TAGS && MASTER_TAGS.includes(tag) && value > 0)
      axios.post(`${API}/users/${username}/add-score`, { tag, level, value }).catch(()=>{});
  };
  const nextL1 = () => {
    setL1Flipped(false);
    l1Index<(level1Questions?.length||0)-1 ? setL1Index(l1Index+1) : setView('l1-done');
  };
  const confirmL2 = () => {
    if(selectedTier!==null&&currentL2.tag) saveScore(currentL2.tag, 'L2', (selectedTier+1)/3);
    setSelectedTier(null);
    l2Index<(level2Skillsets?.length||0)-1 ? setL2Index(l2Index+1) : setView('l2-done');
  };
  const handleL3Swipe = (ok) => {
    if(swipeDir) return;
    setSwipeDir(ok?'right':'left');
    setTimeout(()=>{
      if(ok){setEnergyBucket(p=>[...p,currentL3]);if(currentL3.tag)saveScore(currentL3.tag,'L3',1.0);}
      else setDrainsBucket(p=>[...p,currentL3]);
      setSwipeDir(null);
      l3Index<(level3Activities?.length||0)-1 ? setL3Index(l3Index+1) : setView('l3-done');
    },300);
  };
  const toggleVibe = (vibe) => {
    const sel=purchasedVibes.some(v=>v.id===vibe.id);
    if(sel){setPurchasedVibes(purchasedVibes.filter(v=>v.id!==vibe.id));setBudget(budget+vibe.cost);}
    else if(budget>=vibe.cost){setPurchasedVibes([...purchasedVibes,vibe]);setBudget(budget-vibe.cost);}
  };
  const finishLevel4 = () => {purchasedVibes.forEach(v=>{if(v.tag)saveScore(v.tag,'L4',1.0);});setView('l4-done');};

  const handlePlaceTag  = (tag)=>{ if(placedTags.length<8) setPlacedTags([...placedTags,tag]); };
  const handleRemoveTag = (tag)=> setPlacedTags(placedTags.filter(t=>t.id!==tag.id));

  const finishLevel5 = () => {
    setView('calculating');
    placedTags.forEach((tag,i)=>{
      const value = i===0 ? 1.0 : (i>=1&&i<=3) ? 0.5 : 0.0;
      if(value>0) saveScore(tag.tag,'L5',value);
    });
    setTimeout(()=>{
      axios.get(`${API}/users/${username}/recommendations`)
        .then(r=>{setFinalResults(r.data.top_majors);setAllResults(r.data.all_majors);axios.post(`${API}/users/${username}/save-final-result?major=${r.data.top_majors[0].major}`);setView('results');})
        .catch(()=>setView('results'));
    },3000);
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflowX:'hidden'}}>
      <Shapes/>
      {/* Fixed corner buttons */}
      {showInfo&&(
        <div className="infocard">
          <p>By: <span>Omar El Henawy</span></p>
          <p>Email: <span>ohenawy@gmail.com</span></p>
        </div>
      )}
      <button className="infobtn" onClick={()=>setShowInfo(s=>!s)}>···</button>

      {/* Level rail */}
      {lvl>0&&view!=='calculating'&&view!=='results'&&(
        <div className="lrail">
          {[1,2,3,4,5].map(n=>(
            <div key={n} className={`seg ${lvl===n?`a${n}`:lvl>n?'done':''}`}/>
          ))}
        </div>
      )}

      {/* ══ START ══ */}
      {view==='start'&&(
        <div className="sscreen">
          {[
            {w:80,top:'8%',left:'6%',bg:'#FFE4DB',rot:'12deg',delay:'0s',circle:true},
            {w:60,top:'14%',right:'7%',bg:'#EDE9FE',rot:'-8deg',delay:'-2s',circle:false},
            {w:50,bottom:'12%',left:'9%',bg:'#ECFDF5',rot:'20deg',delay:'-4s',circle:false},
            {w:68,bottom:'17%',right:'5%',bg:'#FEF9C3',rot:'-15deg',delay:'-1s',circle:true},
            {w:44,top:'45%',left:'3%',bg:'#E0F2FE',rot:'5deg',delay:'-3s',circle:false},
          ].map((sh,i)=>(
            <div key={i} className="fshape" style={{
              width:sh.w,height:sh.w,
              top:sh.top,bottom:sh.bottom,left:sh.left,right:sh.right,
              background:sh.bg,'--rot':sh.rot,
              borderRadius:sh.circle?'50%':'16px',
              animation:`floatY ${5+i*.8}s ease-in-out infinite`,
              animationDelay:sh.delay,
            }}/>
          ))}

          <div style={{position:'relative',zIndex:1,textAlign:'center',marginBottom:'2rem'}}>
            <div className="slogo">Uni<span style={{color:'var(--coral)'}}>-</span><br/>Path</div>
            <div className="ssub">Stop Guessing. Start Growing.</div>
          </div>

          <div className="scard fu" style={{position:'relative',zIndex:1}}>
            <p style={{fontSize:'.85rem',fontWeight:600,color:'var(--muted)',marginBottom:'1.1rem'}}>What's your name? </p>
            <input className="ninput" placeholder="..."
              style={nameErr?{borderColor:'var(--rose)',boxShadow:'0 0 0 3px rgba(225,29,72,.15)'}:{}}
              onChange={e=>{setUsername(e.target.value);setNameErr(false);}}
              onKeyDown={e=>e.key==='Enter'&&startApp()}/>
            {nameErr&&<p style={{fontSize:'.78rem',color:'var(--rose)',fontWeight:700,marginTop:'-.5rem',marginBottom:'.75rem',textAlign:'center'}}>Please enter your name first!</p>}
            <button className="btn coral" onClick={startApp}><span>Let's Go</span><span></span></button>
          </div>
        </div>
      )}

      {/* ══ INTRO ══ */}
      {view==='intro'&&(
        <W max="580px"><div className="fu" style={{paddingTop:'1rem',paddingBottom:'2rem'}}>

          {/* Hook */}
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div className="stamp" style={{background:'var(--coral)',color:'#fff',borderColor:'rgba(26,18,8,.5)'}}>Your Journey Ahead</div>
            <p style={{marginTop:'1rem',fontFamily:'var(--ff-d)',fontWeight:700,fontSize:'1.08rem',lineHeight:1.6,color:'var(--ink)'}}>
              Finding your ideal major isn't just about what you are good at — it is about how you want to live and work. We are going to map your academic DNA across five stages:
            </p>
          </div>

          {/* Path */}
          <div style={{position:'relative',paddingLeft:'1.5rem'}}>
            {/* Dashed connecting line */}
            <div style={{position:'absolute',left:'calc(1.5rem + 21px)',top:22,bottom:22,width:2,background:'repeating-linear-gradient(to bottom,rgba(26,18,8,.28) 0,rgba(26,18,8,.28) 6px,transparent 6px,transparent 13px)'}}/>

            {LEVELS.map((lv,i)=>(
              <div key={i} style={{marginBottom:'1rem',position:'relative',zIndex:1}}>
                <div style={{display:'flex',alignItems:'flex-start',gap:'1rem',cursor:'pointer'}}
                  onClick={()=>setIntroStop(introStop===i?null:i)}>
                  {/* Node */}
                  <div className="pnode" style={{width:44,height:44,borderRadius:'50%',background:lv.color,border:'2.5px solid var(--ink)',boxShadow:'3px 3px 0 var(--ink)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'.9rem',color:'#fff',flexShrink:0,transition:'transform .15s,box-shadow .15s'}}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  {/* Label */}
                  <div style={{paddingTop:'.35rem',flex:1}}>
                    <div style={{fontFamily:'var(--ff-b)',fontSize:'.58rem',fontWeight:800,letterSpacing:'.13em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'.18rem'}}>
                      Level {String(i+1).padStart(2,'0')}
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'.5rem'}}>
                      <span style={{fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'1.08rem',lineHeight:1.15}}>{lv.name}</span>
                      <span style={{fontSize:'.65rem',opacity:.45,flexShrink:0,transition:'transform .2s',display:'inline-block',transform:introStop===i?'rotate(180deg)':'rotate(0deg)'}}>▼</span>
                    </div>
                  </div>
                </div>
                {introStop===i&&(
                  <div className="fu" style={{marginLeft:'3.5rem',marginTop:'.45rem',background:'var(--paper)',border:'2px solid var(--ink)',borderRadius:12,padding:'.9rem 1.1rem',fontSize:'.83rem',fontWeight:500,color:'var(--muted)',lineHeight:1.6,boxShadow:'3px 3px 0 var(--ink)'}}>
                    {lv.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="btn coral" style={{marginTop:'1.5rem'}} onClick={()=>setView('l1-q')}>
            <span>Begin</span><span>🚀</span>
          </button>
        </div></W>
      )}

      {/* ══ L1 ══ */}
      {view==='l1-q'&&(
        <W><div className="fu">
          <LH label="Level 1 — Myth Buster" bg="var(--coral)" idx={l1Index+1} total={level1Questions?.length} pct={progressL1}/>
          <div className="flipwrap">
            <div className={`flipinner${l1Flipped?' flipped':''}`}>
              {/* Front */}
              <div className="flipfront" style={{borderColor:'var(--coral)',boxShadow:'6px 6px 0 rgba(255,92,53,.3)'}}>
                <div style={{display:'inline-block',background:'#FFE4DB',color:'var(--coral)',border:'2px solid var(--coral)',borderRadius:'99px',padding:'.3rem 1rem',fontSize:'.68rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:'1.25rem',boxShadow:'2px 2px 0 var(--coral)'}}>
                  {currentL1.major}
                </div>
                <div style={{fontSize:'.6rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.1em',color:'var(--coral)',marginBottom:'.6rem'}}>The Stereotype</div>
                <div style={{fontSize:'.95rem',fontStyle:'italic',lineHeight:1.55,fontWeight:500,marginBottom:'2rem',color:'var(--ink)',opacity:.8}}>"{currentL1.myth}"</div>
                <button className="btn coral" onClick={()=>setL1Flipped(true)}><span>Why is this wrong?</span><span>→</span></button>
              </div>
              {/* Back */}
              <div className="flipback" style={{borderColor:'var(--lime)',boxShadow:'6px 6px 0 rgba(101,163,13,.3)'}}>
                <div style={{display:'inline-block',background:'#F0FDF4',color:'var(--lime)',border:'2px solid var(--lime)',borderRadius:'99px',padding:'.3rem 1rem',fontSize:'.68rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:'1.25rem',boxShadow:'2px 2px 0 var(--lime)'}}>
                  The Reality
                </div>
                <div style={{fontSize:'.95rem',lineHeight:1.55,fontWeight:600,marginBottom:'2rem'}}>{currentL1.reality}</div>
                <button className="btn lime" onClick={nextL1}><span>Got it, Next</span><span>→</span></button>
              </div>
            </div>
          </div>
        </div></W>
      )}
      {view==='l1-done'&&<W><Done icon="✨" ibg="#FFE4DB" title="Level 1 Done!" sub="Myths busted. You're already smarter." bl="Start Level 2" bc="coral" next={()=>setView('l2-q')} lvl={1} accent="coral"/></W>}

      {/* ══ L2 ══ */}
      {view==='l2-q'&&(
        <W><div className="fu">
          <LH label="Level 2 — Dealbreakers" bg="var(--violet)" idx={l2Index+1} total={level2Skillsets?.length} pct={progressL2}/>
          <div className="card" style={{textAlign:'center',borderColor:'var(--violet)',boxShadow:'6px 6px 0 rgba(124,58,237,.3)'}}>
            <div style={{minHeight:'110px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.5rem'}}>
              {selectedTier===null?(
                <div style={{fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'clamp(1.8rem,6vw,2.8rem)',letterSpacing:'-.02em'}}>{currentL2.skill}</div>
              ):(
                <div style={{fontSize:'1.05rem',color:'var(--violet)',fontWeight:700,lineHeight:1.4,padding:'0 .5rem'}}>
                  "{currentL2.tiers?.[selectedTier]?.desc}"
                </div>
              )}
            </div>
            <div className="tbtns">
              {currentL2.tiers?.map((tier,idx)=>(
                <button key={idx} className={`tbtn ${selectedTier===idx?'sel':''}`}
                  onClick={()=>setSelectedTier(selectedTier===idx?null:idx)}>
                  {tier.label}
                </button>
              ))}
            </div>
            <button className="btn violet" disabled={selectedTier===null} onClick={confirmL2}>
              <span>Confirm</span><span>→</span>
            </button>
          </div>
        </div></W>
      )}
      {view==='l2-done'&&<W><Done icon="🔥" ibg="#EDE9FE" title="Level 2 Done!" sub="Dealbreakers mapped. Time for the energy check." bl="Start Level 3" bc="violet" next={()=>setView('l3-q')} lvl={2} accent="violet"/></W>}

      {/* ══ L3 ══ */}
      {view==='l3-q'&&(
        <W><div className="fu" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{width:'100%'}}>
            <LH label="Level 3 — Energy Check" bg="var(--amber)" idx={l3Index+1} total={level3Activities?.length} pct={progressL3}/>
          </div>

          <div style={{position:'relative',width:'100%',maxWidth:'420px',marginBottom:'1.75rem'}}>
            <div key={l3Index}
              className={swipeDir==='left'?'swl':swipeDir==='right'?'swr':''}
              style={{background:'linear-gradient(160deg,#FFFBF0,#FFF3D0)',border:'2px solid rgba(217,119,6,.45)',borderRadius:'var(--r)',boxShadow:'6px 6px 0 rgba(217,119,6,.22)',padding:'3.5rem 2rem',textAlign:'center',transform:swipeDir?'':dragX?`translateX(${dragX}px) rotate(${dragX/18}deg)`:'',cursor:'grab',userSelect:'none',transition:swipeDir||isDragging.current?'none':'transform .3s ease-out'}}
              onTouchStart={e=>{if(swipeDir)return;touchStartX.current=e.touches[0].clientX;isDragging.current=true;}}
              onTouchMove={e=>{if(!isDragging.current||swipeDir)return;setDragX(e.touches[0].clientX-touchStartX.current);}}
              onTouchEnd={()=>{if(!isDragging.current)return;isDragging.current=false;if(Math.abs(dragX)>80){handleL3Swipe(dragX>0);}setDragX(0);}}
              onMouseDown={e=>{if(swipeDir)return;touchStartX.current=e.clientX;isDragging.current=true;}}
              onMouseMove={e=>{if(!isDragging.current||swipeDir)return;setDragX(e.clientX-touchStartX.current);}}
              onMouseUp={()=>{if(!isDragging.current)return;isDragging.current=false;if(Math.abs(dragX)>80){handleL3Swipe(dragX>0);}setDragX(0);}}
              onMouseLeave={()=>{if(isDragging.current){isDragging.current=false;setDragX(0);}}}>

              <div style={{fontSize:'.62rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.14em',color:'var(--amber)',marginBottom:'1rem'}}>
                How does this feel?
              </div>
              <div style={{fontFamily:'var(--ff-d)',fontSize:'clamp(1.4rem,5vw,2rem)',fontWeight:900,lineHeight:1.25}}>
                {currentL3.task}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:'0 1.5rem',marginTop:'-28px',position:'relative',zIndex:10}}>
              <button className="swbtn swno" onClick={()=>handleL3Swipe(false)}>✗</button>
              <button className="swbtn swyes" onClick={()=>handleL3Swipe(true)}>✓</button>
            </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',width:'100%',maxWidth:'420px',padding:'0 2rem'}}>
            <span style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',transition:'color .15s,transform .15s',color:dragX<-30?'var(--rose)':'rgba(26,18,8,.3)',transform:dragX<-30?'scale(1.12)':'scale(1)'}}>I'd Rather not</span>
            <span style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',transition:'color .15s,transform .15s',color:dragX>30?'var(--lime)':'rgba(26,18,8,.3)',transform:dragX>30?'scale(1.12)':'scale(1)'}}>Sure,Yeah</span>
          </div>

          <div style={{display:'flex',gap:'.75rem',marginTop:'1.5rem',justifyContent:'center'}}>
            <div style={{background:'#FFF0F0',border:'2px solid var(--rose)',borderRadius:'10px',padding:'.4rem 1rem',fontSize:'.72rem',fontWeight:800,color:'var(--rose)',boxShadow:'2px 2px 0 rgba(225,29,72,.3)'}}>✗ {drainsBucket.length}</div>
            <div style={{background:'#F0FDF4',border:'2px solid var(--lime)',borderRadius:'10px',padding:'.4rem 1rem',fontSize:'.72rem',fontWeight:800,color:'var(--lime)',boxShadow:'2px 2px 0 rgba(101,163,13,.3)'}}>✓ {energyBucket.length}</div>
          </div>
        </div></W>
      )}
      {view==='l3-done'&&<W><Done icon="⚡" ibg="#FEF9C3" title="Level 3 Done!" sub="Energy map locked. Time to build your vibe." bl="Start Level 4" bc="amber" next={()=>setView('l4-q')} lvl={3} accent="amber"/></W>}

      {/* ══ L4 ══ */}
      {view==='l4-q'&&(
        <W max="680px"><div className="fu">
          <div className="lhrow">
            <span className="stamp" style={{background:'var(--sky)',color:'#fff',borderColor:'rgba(26,18,8,.5)'}}>Level 4 — Vibe Budget</span>
            <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
              <button onClick={()=>setShowL4Hint(h=>!h)} style={{width:32,height:32,borderRadius:'50%',border:'2px solid var(--ink)',background:showL4Hint?'var(--amber)':'var(--paper)',cursor:'pointer',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--s1)',transition:'background .2s,transform .15s,box-shadow .15s',flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.transform='translate(-1px,-1px)';e.currentTarget.style.boxShadow='3px 3px 0 var(--ink)'}} onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='var(--s1)'}}>💡</button>
              <span className={`bbudget ${budget===0?'empty':''}`}>💰 {displayBudget} credits</span>
            </div>
          </div>
          {showL4Hint&&(
            <div className="fu" style={{background:'#FFFBEB',border:'2px solid var(--amber)',borderRadius:'var(--rs)',padding:'.9rem 1.1rem',marginBottom:'.9rem',boxShadow:'3px 3px 0 var(--amber)',fontSize:'.85rem',fontWeight:500,color:'var(--ink)',lineHeight:1.6}}>
              💡 Spend your budget to build your ideal working environment. Choose wisely — and remember, you don't have to spend every single credit to advance.
            </div>
          )}
          <div className="ptrack"><div className="pfill" style={{width:'80%',background:'var(--sky)'}}/></div>

          <div className="vgrid" style={{marginBottom:'1.1rem'}}>
            {level4Vibes.map(vibe=>{
              const sel=purchasedVibes.some(v=>v.id===vibe.id);
              const ok=budget>=vibe.cost;
              return(
                <button key={vibe.id} className={`vcard ${sel?'sel':''}`}
                  onClick={()=>toggleVibe(vibe)} disabled={!sel&&!ok}>
                  <span className="vi">{vibe.icon}</span>
                  <div style={{flex:1}}><div className="vn">{vibe.name}</div><div className="vd">{vibe.desc}</div></div>
                  <span className="vchip">{vibe.cost}pt</span>
                </button>
              );
            })}
          </div>
          <button className="btn sky" disabled={purchasedVibes.length===0} onClick={finishLevel4}>
            <span>{purchasedVibes.length>0?'Lock In My Vibe':'Pick something first'}</span>
            {purchasedVibes.length>0&&<span>→</span>}
          </button>
        </div></W>
      )}
      {view==='l4-done'&&<W><Done icon="🎯" ibg="#E0F2FE" title="Level 4 Done!" sub="Vibe locked. One final boss level!" bl="Enter The Pyramid" bc="sky" next={()=>setView('l5-q')} lvl={4} accent="sky"/></W>}

      {/* ══ L5 ══ */}
      {view==='l5-q'&&(
        <W max="700px"><div className="fu">
          <div style={{textAlign:'center',marginBottom:'1.75rem'}}>
            <span className="stamp" style={{background:'var(--lime)',color:'#fff',borderColor:'rgba(26,18,8,.5)',margin:'0 auto .75rem',display:'inline-flex'}}>Level 5 — The Pyramid</span>
            <div style={{fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'clamp(1.7rem,5vw,2.3rem)',letterSpacing:'-.02em',marginBottom:'.4rem'}}>Build Your Career Pyramid</div>
            <p style={{fontSize:'.82rem',color:'var(--muted)',fontWeight:500}}>Tap the tags below to fill the slots. Tap a filled slot to remove.</p>
          </div>

          {/* CHANGED: Restored to 8-slot pyramid logic */}
          <div style={{background:'var(--paper)',border:'2px solid var(--lime)',borderRadius:'var(--r)',boxShadow:'6px 6px 0 rgba(101,163,13,.3)',padding:'1.75rem 1.5rem 1.5rem',marginBottom:'1.1rem'}}>
            {[
              {slots:[0],       cls:'peak',label:'🏆 Peak',      sub:'Most important · 3× weight'},
              {slots:[1,2,3],   cls:'core',label:'💜 Core',       sub:'Important · 2× weight'},
              {slots:[4,5,6,7], cls:'base',label:'🔶 Foundation', sub:'Nice to have · 1× weight'},
            ].map((tier,ti)=>(
              <div key={ti} style={{marginBottom:'.75rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'.35rem'}}>
                  <span style={{fontSize:'.6rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.1em',color:'var(--muted)'}}>{tier.label}</span>
                  <span style={{fontSize:'.58rem',fontWeight:900,padding:'.1rem .45rem',borderRadius:99,border:'1.5px solid var(--ink)',background:ti===0?'var(--lime)':ti===1?'var(--violet)':'var(--amber)',color:'#fff',flexShrink:0}}>{ti===0?'3×':ti===1?'2×':'1×'}</span>
                  <span style={{fontSize:'.56rem',color:'var(--muted)',opacity:.65}}>— {tier.sub}</span>
                </div>
                <div className="ptier">
                  {tier.slots.map(idx=>(
                    <div key={idx}
                      className={`pslot ${tier.cls} ${placedTags[idx]?'f ht':''}`}
                      /* CHANGED: Dynamic widths fit perfectly for an 8-slot array (1-3-4 pattern) */
                      style={{width:`${tier.slots.length===1?155:tier.slots.length===3?120:90}px`}}
                      onClick={()=>placedTags[idx]&&handleRemoveTag(placedTags[idx])}>
                      {placedTags[idx]?(
                        <>
                          <span className="pi">{placedTags[idx].icon}</span>
                          <span className="pn">{placedTags[idx].name}</span>
                          {placedTags[idx].desc&&<span className="tt">{placedTags[idx].desc}</span>}
                        </>
                      ):(
                        <span className="pe">Slot {idx+1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* tag bank */}
          <div style={{background:'var(--paper)',border:'2px solid var(--ink)',borderRadius:'var(--r)',boxShadow:'var(--s2)',padding:'1.25rem',marginBottom:'1.1rem'}}>
            <div style={{fontSize:'.63rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'.1em',color:'var(--muted)',marginBottom:'.85rem',textAlign:'center'}}>
              Your Tag Bank — tap to place
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',justifyContent:'center'}}>
              {availableTags.map(tag=>(
                <button key={tag.id} className="tchip ht" onClick={()=>handlePlaceTag(tag)}>
                  <span style={{fontSize:'1rem'}}>{tag.icon}</span>
                  {tag.name}
                  {tag.desc&&<span className="tt">{tag.desc}</span>}
                </button>
              ))}
              {availableTags.length===0&&<span style={{fontSize:'.82rem',fontWeight:700,color:'var(--lime)'}}>🎉 Pyramid complete!</span>}
            </div>
          </div>

          {/* CHANGED: Updated math required limit to 8 */}
          <button className="btn lime"
            disabled={placedTags.length<8}
            style={placedTags.length===8?{boxShadow:'6px 6px 0 #3d6b08'}:{}}
            onClick={finishLevel5}>
            <span>{placedTags.length<8?`Fill ${8-placedTags.length} more slot${8-placedTags.length===1?'':'s'}`:'Reveal My Major Match 🎓'}</span>
          </button>
        </div></W>
      )}

      {/* ══ CALCULATING ══ */}
      {view==='calculating'&&(
        <div className="fu" style={{textAlign:'center',position:'relative',zIndex:1,padding:'2rem'}}>
          <div className="cdots">
            {['var(--coral)','var(--violet)','var(--lime)'].map((bg,i)=>(<div key={i} className="cdot" style={{background:bg}}/>))}
          </div>
          <div style={{fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'1.9rem',marginBottom:'.5rem'}}>Crunching the numbers…</div>
          <div style={{fontSize:'.85rem',color:'var(--muted)',fontWeight:500}}>Matching you across {placedTags.length*20} data points</div>
        </div>
      )}

      {/* ══ RESULTS ══ */}
      {view==='results'&&(
        <W max="920px"><div className="fu">
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div style={{fontFamily:'var(--ff-d)',fontWeight:900,fontSize:'clamp(2rem,6vw,3.2rem)',letterSpacing:'-.03em',lineHeight:1,marginBottom:'.75rem'}}>
              🎓 {username ? `${username}'s` : 'Your'} Uni-Path Matches
            </div>
            <p style={{fontSize:'.88rem',color:'var(--muted)',fontWeight:500}}>Based on aptitudes, dealbreakers, energy &amp; priorities.</p>
          </div>

          {!finalResults?(
            <div style={{background:'#FFF0F0',border:'2px solid var(--rose)',borderRadius:'var(--r)',padding:'1.5rem',textAlign:'center',fontWeight:700,color:'var(--rose)',boxShadow:'var(--s2)'}}>
              ⚠️ Could not reach the server. Make sure your Python backend is running!
            </div>
          ):(
            <div className="rgrid">
              {finalResults.map((m,i)=>(
                <div key={i} className={`rcard fu ${i===0?'win':''}`} style={{animationDelay:`${0.1+i*0.2}s`,...(i===0?{marginTop:'-14px'}:{})}}>
                  {i===0&&<div style={{position:'absolute',top:0,left:0,right:0,height:4,background:'linear-gradient(90deg,var(--lime),var(--sky))',borderRadius:'calc(var(--r) - 2px) calc(var(--r) - 2px) 0 0'}}/>}
                  <div className="rbadge" style={i===0?{background:'var(--lime)',borderColor:'var(--lime)'}:{}}>{i===0?'🏆 Best Match':`#${i+1}`}</div>
                  <div className="rfac" style={i===0?{color:'var(--lime)',fontWeight:800}:{}}>{m.faculty}</div>
                  <h3>{m.major}</h3>
                  <p>{m.description}</p>
                  <div className="srow">
                    <span className="slabel">Match Score</span>
                    <span className="sval">{Math.round(m.score)}%</span>
                  </div>
                  <div style={{width:'100%',height:6,background:'rgba(26,18,8,.07)',borderRadius:99,border:'1.5px solid rgba(26,18,8,.1)',overflow:'hidden',marginTop:'.6rem'}}>
                    <div className="fu" style={{height:'100%',borderRadius:99,background:i===0?'var(--lime)':i===1?'var(--violet)':'var(--amber)',width:`${m.score}%`,transition:'width .8s cubic-bezier(.4,0,.2,1)',animationDelay:`${0.3+i*0.2}s`}}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'2.5rem',flexWrap:'wrap'}}>
            {allResults&&(
              <button className="btn ghost" style={{maxWidth:220,display:'inline-flex',width:'auto',padding:'.85rem 2rem'}}
                onClick={()=>setShowAllMajors(true)}>
                <span>View All Majors</span><span>📊</span>
              </button>
            )}
            <button className="btn ghost" style={{maxWidth:200,display:'inline-flex',width:'auto',padding:'.85rem 2rem'}}
              onClick={()=>window.location.reload()}>
              <span>← Start Over</span>
            </button>
          </div>

          {showAllMajors&&allResults&&(
            <div className="amoverlay" onClick={()=>setShowAllMajors(false)}>
              <div className="ammodal" onClick={e=>e.stopPropagation()}>
                <div className="amhead">
                  <h2>All Majors Match</h2>
                  <button className="amclose" onClick={()=>setShowAllMajors(false)}>✕</button>
                </div>
                <div className="amlist">
                  {allResults.map((m,i)=>{
                    const colors=['var(--coral)','var(--violet)','var(--amber)','var(--sky)','var(--lime)','var(--rose)'];
                    const color=colors[i%colors.length];
                    return(
                      <div key={i} className="amrow">
                        <div className="aminfo">
                          <div>
                            <div className="amname">#{i+1} {m.major}</div>
                            <div className="amfac">{m.faculty}</div>
                          </div>
                          <div className="ampct" style={{color}}>{Math.round(m.score)}%</div>
                        </div>
                        <div className="amtrack">
                          <div className="amfill" style={{'--target':`${m.score}%`,background:color,animationDelay:`${i*0.04}s`}}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div></W>
      )}

    </div>
  );
}