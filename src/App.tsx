import React, { useState, useEffect, useRef } from 'react';

const STYLES = `
  @import url("https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium");
  @import url("https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg");

  :root {
    --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
    --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
  }

  body {
    font-family: var(--font-body);
    margin: 0;
    padding: 0;
    background-color: #b81414;
    overflow-x: hidden;
    height: 100vh;
    width: 100vw;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }

  .video-blend {
    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%), radial-gradient(circle at 55% 48%, black 60%, transparent 100%);
    -webkit-mask-composite: intersect;
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%), radial-gradient(circle at 55% 48%, black 60%, transparent 100%);
    mask-composite: intersect;
  }

  @keyframes cinematicReveal {
    0% { transform: scale(0.95); opacity: 0; filter: blur(10px); }
    50% { opacity: 1; filter: blur(0px); }
    100% { transform: scale(1); opacity: 1; filter: blur(0px); }
  }

  .cinematic-text {
    animation: cinematicReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes progressGrow {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  .loader-bar {
    animation: progressGrow 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  .timeline-item {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .timeline-item:hover {
    transform: translateX(6px);
  }
  .timeline-item:hover .timeline-dot {
    transform: scale(1.4);
    background-color: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }

  @keyframes neonGlowPulse {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.8)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.4)); }
    50% { filter: drop-shadow(0 0 18px rgba(56, 189, 248, 1)) drop-shadow(0 0 30px rgba(56, 189, 248, 0.7)); }
  }

  .neon-walker {
    animation: neonGlowPulse 2s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes chaoticFloat1 {
    0% { transform: translate(0px, 0px) rotate(-3deg); }
    33% { transform: translate(-20px, -25px) rotate(3deg); }
    66% { transform: translate(15px, -15px) rotate(-1deg); }
    100% { transform: translate(0px, 0px) rotate(-3deg); }
  }
  @keyframes chaoticFloat2 {
    0% { transform: translate(0px, 0px) rotate(2deg); }
    33% { transform: translate(20px, -20px) rotate(-3deg); }
    66% { transform: translate(-15px, -30px) rotate(3deg); }
    100% { transform: translate(0px, 0px) rotate(2deg); }
  }
  @keyframes chaoticFloat3 {
    0% { transform: translate(0px, 0px) rotate(-2deg); }
    33% { transform: translate(-20px, -20px) rotate(4deg); }
    66% { transform: translate(15px, -25px) rotate(-2deg); }
    100% { transform: translate(0px, 0px) rotate(-2deg); }
  }
  @keyframes chaoticFloat4 {
    0% { transform: translate(0px, 0px) rotate(3deg); }
    33% { transform: translate(20px, -30px) rotate(-2deg); }
    66% { transform: translate(-20px, -20px) rotate(2deg); }
    100% { transform: translate(0px, 0px) rotate(3deg); }
  }

  .float-1 { animation: chaoticFloat1 5s ease-in-out infinite; }
  .float-2 { animation: chaoticFloat2 6s ease-in-out infinite; }
  .float-3 { animation: chaoticFloat3 5.5s ease-in-out infinite; }
  .float-4 { animation: chaoticFloat4 6.5s ease-in-out infinite; }

  .work-card-interactive {
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .work-card-interactive:hover {
    transform: translateY(-6px) !important;
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .apple-liquid-glass-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .apple-liquid-glass-box {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%);
    backdrop-filter: blur(40px) saturate(220%);
    -webkit-backdrop-filter: blur(40px) saturate(220%);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    box-shadow: 
      0 40px 100px rgba(0, 0, 0, 0.5), 
      inset 0 1px 2px rgba(255, 255, 255, 0.6), 
      inset 0 -2px 6px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(255, 255, 255, 0.1);
    border-radius: 2.5rem;
  }

  @keyframes fadeInModal {
    from { opacity: 0; transform: scale(0.95) translateY(12px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .canva-slide {
    transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
  }

  .profile-link {
    transition: all 0.3s ease;
  }
  .profile-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
  }

  .glossy-3d-ball {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 32% 32%, #ffffff 0%, #e2e8f0 35%, #94a3b8 70%, #475569 100%);
    box-shadow: 
      inset -14px -14px 28px rgba(0, 0, 0, 0.55),
      inset 8px 8px 20px rgba(255, 255, 255, 0.95),
      0 20px 45px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    user-select: none;
    will-change: left, top;
  }
  .glossy-3d-ball::after {
    content: '';
    position: absolute;
    top: 12%;
    left: 16%;
    width: 24%;
    height: 12%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    filter: blur(2px);
    transform: rotate(-35deg);
  }
  .glossy-3d-ball:hover {
    box-shadow: 
      inset -12px -12px 24px rgba(0, 0, 0, 0.4),
      inset 10px 10px 24px rgba(255, 255, 255, 1),
      0 0 45px rgba(255, 255, 255, 0.95);
    filter: brightness(1.15);
  }
`;

function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function GlossyKineticCluster() {
  const containerRef = useRef<HTMLDivElement>(null);

  const ballsData = useRef([
    { id: 1, name: 'Python', icon: '/python.png', homeX: 160, homeY: 200, size: 95 },
    { id: 2, name: 'C++', icon: '/cpp.png', homeX: 280, homeY: 150, size: 95 },
    { id: 3, name: 'JavaScript', icon: '/js.png', homeX: 200, homeY: 290, size: 105 },
    { id: 4, name: 'HTML/CSS', icon: '/htmlcss.png', homeX: 310, homeY: 230, size: 100 },
    { id: 5, name: 'React', icon: '/react.png', homeX: 130, homeY: 340, size: 95 },
    { id: 6, name: 'Firebase', icon: '/firebase.png', homeX: 240, homeY: 370, size: 95 },
    { id: 7, name: 'Canva', icon: '/canva.png', homeX: 110, homeY: 240, size: 95 },
    { id: 8, name: 'CapCut', icon: '/capcut.png', homeX: 280, homeY: 310, size: 95 },
  ]);

  const [renderBalls, setRenderBalls] = useState(
    ballsData.current.map((b) => ({ ...b, x: b.homeX, y: b.homeY, vx: 0, vy: 0 }))
  );

  const interactionState = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    interactionState.current.vx = currentX - interactionState.current.prevX;
    interactionState.current.vy = currentY - interactionState.current.prevY;
    interactionState.current.x = currentX;
    interactionState.current.y = currentY;
    interactionState.current.prevX = currentX;
    interactionState.current.prevY = currentY;
  };

  const handleMouseLeave = () => {
    interactionState.current.x = -1000;
    interactionState.current.y = -1000;
    interactionState.current.vx = 0;
    interactionState.current.vy = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.touches[0].clientX - rect.left;
    const currentY = e.touches[0].clientY - rect.top;

    interactionState.current.x = currentX;
    interactionState.current.y = currentY;
    interactionState.current.vx = 15;
    interactionState.current.vy = 15;
  };

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      const threshold = 18;
      if (acc.x && acc.y && (Math.abs(acc.x) > threshold || Math.abs(acc.y) > threshold)) {
        setRenderBalls((prev) =>
          prev.map((ball) => ({
            ...ball,
            vx: (Math.random() - 0.5) * 45,
            vy: (Math.random() - 0.5) * 45,
          }))
        );
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const updatePhysics = () => {
      interactionState.current.vx *= 0.85;
      interactionState.current.vy *= 0.85;

      setRenderBalls((prev) =>
        prev.map((ball, idx) => {
          const origin = ballsData.current[idx];
          let { x, y, vx, vy } = ball;

          const dx = interactionState.current.x - x;
          const dy = interactionState.current.y - y;
          const distToInteraction = Math.sqrt(dx * dx + dy * dy);

          const hitRadius = 160;

          if (distToInteraction < hitRadius) {
            const speed = Math.sqrt(interactionState.current.vx ** 2 + interactionState.current.vy ** 2);
            const impulse = Math.max(speed * 1.6, 16);

            const angle = Math.atan2(y - interactionState.current.y, x - interactionState.current.x);
            vx += Math.cos(angle) * impulse;
            vy += Math.sin(angle) * impulse;
          }

          const spring = 0.0055; 
          const friction = 0.93;

          const returnVx = (origin.homeX - x) * spring;
          const returnVy = (origin.homeY - y) * spring;

          vx = (vx + returnVx) * friction;
          vy = (vy + returnVy) * friction;

          x += vx;
          y += vy;

          return { ...ball, x, y, vx, vy };
        })
      );

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className="relative w-full h-[460px] sm:h-[520px] overflow-visible flex items-center justify-center sm:justify-start"
      style={{ marginLeft: window.innerWidth > 768 ? '40px' : '0px' }}
    >
      {renderBalls.map((ball) => (
        <div
          key={ball.id}
          className="glossy-3d-ball absolute"
          style={{
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img 
            src={ball.icon} 
            alt={ball.name} 
            className="w-[58%] h-[58%] object-contain filter drop-shadow-md pointer-events-none" 
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isCanvaExpanded, setIsCanvaExpanded] = useState(false);
  const [isWebsiteExpanded, setIsWebsiteExpanded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [currentCanvaIndex, setCurrentCanvaIndex] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(true);

  const [cardPhase, setCardPhase] = useState<'hidden' | 'stacked' | 'spread'>('hidden');

  const [escapeOffsets, setEscapeOffsets] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    if (activeNav === 'Work') {
      setCardPhase('hidden');
      const timer1 = setTimeout(() => setCardPhase('stacked'), 80);
      const timer2 = setTimeout(() => setCardPhase('spread'), 950);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeNav]);

  const canvaDesigns = [
    { src: '/canva 1.png', title: 'Canva Design 01' },
    { src: '/canva 2.png', title: 'Canva Design 02' },
    { src: '/canva 3.png', title: 'Canva Design 03' },
    { src: '/canva 4.png', title: 'Canva Design 04' },
    { src: '/canva 5.png', title: 'Canva Design 05' },
    { src: '/canva 6.png', title: 'Canva Design 06' },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCanvaExpanded) {
      interval = setInterval(() => {
        setFadeAnim(false);
        setTimeout(() => {
          setCurrentCanvaIndex((prev) => (prev + 1) % canvaDesigns.length);
          setFadeAnim(true);
        }, 200);
      }, 1500); 
    }
    return () => clearInterval(interval);
  }, [isCanvaExpanded, canvaDesigns.length]);

  const [walkerTranslateY, setWalkerTranslateY] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const showreelVideoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  const prevX = useRef<number | null>(null);
  const targetTime = useRef<number>(0);
  const isSeeking = useRef<boolean>(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 1400);

  // Robust Mobile Auto Play Ping-Pong Loop for Character Video
  const mobileDirRef = useRef<number>(1);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    let animationId: number;
    const updateMobileVideo = () => {
      const vid = videoRef.current;
      if (vid && !isNaN(vid.duration) && vid.duration > 0) {
        let nextTime = vid.currentTime + mobileDirRef.current * 0.035;
        if (nextTime >= vid.duration) {
          nextTime = vid.duration;
          mobileDirRef.current = -1;
        } else if (nextTime <= 0) {
          nextTime = 0;
          mobileDirRef.current = 1;
        }
        vid.currentTime = nextTime;
      }
      animationId = requestAnimationFrame(updateMobileVideo);
    };

    animationId = requestAnimationFrame(updateMobileVideo);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderFadeOut(true);
      const removeTimer = setTimeout(() => setIsLoading(false), 700);
      return () => clearTimeout(removeTimer);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setPillsVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCardVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.duration) {
      vid.currentTime = vid.duration - 0.1;
    }
  };

  useEffect(() => {
    const targetKey = hoveredNav || activeNav;
    const currentItem = navItemRefs.current[targetKey];
    const container = navContainerRef.current;

    if (currentItem && container) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = currentItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    }
  }, [hoveredNav, activeNav, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeNav === 'Journey' && timelineContainerRef.current) {
        const container = timelineContainerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;

        if (scrollHeight > 0) {
          let progress = scrollTop / scrollHeight;
          progress = Math.max(0, Math.min(1, progress));
          const maxTravel = container.clientHeight - 120;
          setWalkerTranslateY(progress * maxTravel);
        }
      }
    };

    const containerEl = timelineContainerRef.current;
    if (containerEl) {
      containerEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (containerEl) {
        containerEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeNav]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && (activeNav === 'Home' || activeNav === 'Languages')) {
        const video = videoRef.current;
        if (video && !isNaN(video.duration) && video.duration > 0) {
          if (prevX.current === null) {
            prevX.current = e.clientX;
            return;
          }
          const currentX = e.clientX;
          const delta = currentX - prevX.current;
          prevX.current = currentX;

          const sensitivity = 0.8;
          const offset = (delta / window.innerWidth) * sensitivity * video.duration;
          
          targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + offset));
          triggerSeek();
        }
      }

      if (activeNav === 'Contact') {
        setEscapeOffsets((prev) => {
          return prev.map((offset, idx) => {
            const balloonEl = document.getElementById(`balloon-${idx}`);
            if (!balloonEl) return offset;
            const rect = balloonEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const triggerRadius = 150;
            if (dist < triggerRadius) {
              const angle = Math.atan2(dy, dx);
              const pushStrength = 22;
              return {
                x: offset.x - Math.cos(angle) * pushStrength,
                y: offset.y - Math.sin(angle) * pushStrength,
              };
            }
            return offset;
          });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeNav]);

  const triggerSeek = () => {
    const video = videoRef.current;
    if (!video || isSeeking.current) return;

    if (Math.abs(video.currentTime - targetTime.current) > 0.02) {
      isSeeking.current = true;
      video.currentTime = targetTime.current;
    }
  };

  const handleSeeked = () => {
    isSeeking.current = false;
    triggerSeek();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('naman.edu.in@gmail.com').then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  const navItems = ['Home', 'Journey', 'Work', 'Languages', 'Contact'];

  const journeyMilestones = [
    {
      year: "Classes 1st - 12th",
      title: "St. Anselm's Sr. Sec. School",
      description: "Completed foundational schooling from 1st to 12th grade, building strong academic discipline, leadership qualities, and core values."
    },
    {
      year: "2026",
      title: "BTech Student at Bennett University",
      description: "Pursuing engineering, diving deep into computer science fundamentals, full-stack web development, and interactive UI/UX design systems.",
      subTopics: [
        "1. Learning Python — Mastering syntax, data structures, scripting, and problem-solving fundamentals.",
        "2. Learning C++ — Object-oriented programming, memory management, STL, and algorithmic efficiency."
      ]
    }
  ];

  const workProjects = [
    {
      title: "GFG Marvel Event Website",
      description: "An interactive event website built for GeeksforGeeks chapter, featuring Marvel-themed design, event details, and registration flow.",
      tech: ["HTML", "CSS", "JavaScript", "Responsive", "Firebase"],
      liveUrl: "https://gfg-marvel-event.vercel.app/",
      repoUrl: "https://github.com/namannnjain/Marvel-event",
      isImage: true,
      imageSrc: "/preview.png",
      stackStyle: { transform: cardPhase === 'hidden' ? 'translateX(-110vw) rotate(-20deg)' : cardPhase === 'stacked' ? 'translateX(0vw) translateY(30px) rotate(-4deg) scale(0.96)' : 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: cardPhase === 'hidden' ? 0 : 1, zIndex: 3 }
    },
    {
      title: "Video Edit Showreel",
      description: "A cinematic compilation of video edits, visual effects, and motion graphics crafted using professional post-production suites.",
      tech: ["CapCut", "After Effects", "DaVinci Resolve", "Motion Graphics"],
      liveUrl: "#",
      repoUrl: "#",
      isVideo: true,
      videoSrc: "/edit.mp4",
      stackStyle: { transform: cardPhase === 'hidden' ? 'translateX(-110vw) rotate(-20deg)' : cardPhase === 'stacked' ? 'translateX(0vw) translateY(15px) rotate(0deg) scale(0.98)' : 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: cardPhase === 'hidden' ? 0 : 1, zIndex: 2 }
    },
    {
      title: "Canva Creative Designs",
      description: "A curated collection of digital graphics, social media creatives, and marketing posters designed professionally using Canva.",
      tech: ["Canva", "Typography", "Color Theory", "Branding"],
      liveUrl: "#",
      repoUrl: "#",
      isCanva: true,
      stackStyle: { transform: cardPhase === 'hidden' ? 'translateX(-110vw) rotate(-20deg)' : cardPhase === 'stacked' ? 'translateX(0vw) translateY(0px) rotate(4deg) scale(1)' : 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: cardPhase === 'hidden' ? 0 : 1, zIndex: 1 }
    }
  ];

  return (
    <>
      <style>{STYLES}</style>

      {isWebsiteExpanded && (
        <div className="apple-liquid-glass-overlay">
          <div className="apple-liquid-glass-box p-6 max-w-5xl w-[85vw] h-[85vh] flex flex-col items-center relative">
            <div className="w-full flex justify-between items-center mb-3">
              <h2 className="text-white text-[20px] sm:text-[24px] font-medium drop-shadow" style={{ fontFamily: 'var(--font-heading)' }}>
                GFG Marvel Event Website — Live Preview
              </h2>
              <button 
                onClick={() => setIsWebsiteExpanded(false)}
                className="text-white hover:text-white px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[13px] cursor-pointer transition-all border border-white/40 shadow-sm"
              >
                Close Preview
              </button>
            </div>
            
            <div className="w-full flex-grow rounded-2xl overflow-hidden bg-black/30 border border-white/25 relative flex items-center justify-center shadow-inner">
              {isIframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md z-10 gap-3">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/90 text-[13px] font-mono">Loading Live Website...</p>
                </div>
              )}
              <iframe
                src="https://gfg-marvel-event.vercel.app/"
                title="GFG Marvel Event Website"
                className="w-full h-full border-0 bg-white"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      {isVideoExpanded && (
        <div className="apple-liquid-glass-overlay">
          <div className="apple-liquid-glass-box p-6 max-w-3xl w-[75vw] flex flex-col items-center relative">
            <div className="w-full flex justify-between items-center mb-3">
              <h2 className="text-white text-[24px] font-medium drop-shadow" style={{ fontFamily: 'var(--font-heading)' }}>
                Video Edit Showreel
              </h2>
              <button 
                onClick={() => {
                  setIsVideoExpanded(false);
                  if (showreelVideoRef.current) {
                    showreelVideoRef.current.pause();
                    showreelVideoRef.current.currentTime = 0;
                  }
                }}
                className="text-white hover:text-white px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[13px] cursor-pointer transition-all border border-white/40 shadow-sm"
              >
                Close Preview
              </button>
            </div>
            <div className="w-full h-[58vh] max-h-[58vh] rounded-2xl overflow-hidden bg-black/35 border border-white/25 mb-3 flex items-center justify-center shadow-inner">
              <video
                ref={showreelVideoRef}
                src="/edit.mp4"
                className="w-full h-full object-cover"
                playsInline
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}

      {isCanvaExpanded && (
        <div className="apple-liquid-glass-overlay">
          <div className="apple-liquid-glass-box p-6 max-w-3xl w-[75vw] flex flex-col items-center relative">
            <div className="w-full flex justify-between items-center mb-3">
              <h2 className="text-white text-[24px] font-medium drop-shadow" style={{ fontFamily: 'var(--font-heading)' }}>
                {canvaDesigns[currentCanvaIndex].title}
              </h2>
              <button 
                onClick={() => setIsCanvaExpanded(false)}
                className="text-white hover:text-white px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[13px] cursor-pointer transition-all border border-white/40 shadow-sm"
              >
                Close Preview
              </button>
            </div>
            <div className="w-full h-[60vh] rounded-2xl overflow-hidden bg-black/35 border border-white/25 mb-3 flex items-center justify-center p-2 relative shadow-inner">
              <img
                src={canvaDesigns[currentCanvaIndex].src}
                alt={canvaDesigns[currentCanvaIndex].title}
                className={`max-w-full max-h-full object-contain canva-slide ${fadeAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              />
              <div className="absolute top-3 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[12px] text-white font-mono border border-white/30">
                {currentCanvaIndex + 1} / {canvaDesigns.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-[#b81414] via-[#b81414]/80 to-transparent pointer-events-none z-[8]" />

      {isLoading && (
        <div 
          className={`fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            loaderFadeOut ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="text-center relative">
            <div className="absolute inset-0 bg-[#b81414] opacity-20 filter blur-3xl rounded-full transform scale-150 pointer-events-none" />
            <h1 
              className="text-white text-[34px] sm:text-[48px] tracking-tight cinematic-text mb-4 font-medium relative z-10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Naman Jain&reg;
            </h1>
            <div className="w-40 h-[2px] bg-white/10 mx-auto overflow-hidden rounded-full relative z-10">
              <div className="h-full bg-white loader-bar" />
            </div>
            <p className="text-white/40 text-[13px] tracking-widest uppercase mt-3 relative z-10 font-mono">
              Loading Experience
            </p>
          </div>
        </div>
      )}
      
      {/* Background Character Video with Sharp Mobile Layout and No Blur */}
      <video
        ref={videoRef}
        src="/me.mp4"
        className="fixed z-0 pointer-events-none object-cover"
        style={{
          width: window.innerWidth < 768 ? '100vw' : '75vw',
          height: window.innerWidth < 768 ? '45vh' : '85vh',
          right: window.innerWidth < 768 ? '0' : '-5vw',
          top: window.innerWidth < 768 ? '6vh' : '10vh',
          objectPosition: window.innerWidth < 768 ? 'center 15%' : '70% center',
          opacity: (activeNav === 'Journey' || activeNav === 'Work' || activeNav === 'Contact') ? 0.15 : 1,
        }}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
      />

      <nav className="fixed top-0 w-full z-[10] flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5 bg-[#b81414]/80 backdrop-blur-md">
        <div className="flex flex-row items-center cursor-pointer" onClick={() => setActiveNav('Home')}>
          <span 
            className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Naman Jain&reg;
          </span>
        </div>

        <div 
          ref={navContainerRef}
          className="hidden md:flex flex-row items-center text-[23px] text-white font-normal gap-8 relative"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navItems.map((item) => (
            <button
              key={item}
              ref={(el) => { navItemRefs.current[item] = el; }}
              onClick={() => setActiveNav(item)}
              onMouseEnter={() => setHoveredNav(item)}
              className={`pb-1 cursor-pointer focus:outline-none transition-opacity ${
                activeNav === item ? 'opacity-100 font-medium' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {item}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-[2px] bg-white pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
            }}
          />
        </div>

        <button 
          className="md:hidden flex flex-col gap-[5px] justify-center items-center w-6 h-6 z-[11] relative outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      <div 
        className={`fixed inset-0 bg-[#b81414]/95 backdrop-blur-md flex flex-col justify-center px-8 gap-8 z-[9] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`}
      >
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActiveNav(item);
              setIsMenuOpen(false);
            }}
            className="text-left text-[32px] font-medium text-white hover:opacity-60 focus:outline-none"
          >
            {item}
          </button>
        ))}
      </div>

      {activeNav === 'Home' ? (
        <main className="relative z-[1] w-full h-screen flex flex-col justify-end md:justify-center px-5 sm:px-8 md:px-10 pb-6 sm:pb-12 md:pb-0 overflow-hidden">
          <div className="max-w-xl relative z-10 w-full mt-auto sm:mt-0 pt-48 sm:pt-0">
            <div 
              className="select-none mb-2.5 sm:mb-6 text-white font-normal"
              style={{ fontSize: 'clamp(15px, 3.6vw, 26px)', lineHeight: 1.25 }}
            >
              Hey there, meet Naman Jain,<br />A Student at Bennett university
            </div>

            <p 
              className="text-white mb-3.5 sm:mb-6 font-normal"
              style={{ fontSize: 'clamp(15px, 3.6vw, 26px)', lineHeight: 1.3, minHeight: '44px' }}
            >
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] cursor-blink" />
              )}
            </p>

            <div 
              className="pill-container"
              style={{
                opacity: pillsVisible ? 1 : 0,
                transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease'
              }}
            >
              <button 
                onClick={handleCopy}
                className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[12px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 gap-2 sm:gap-3 group cursor-pointer"
              >
                <span>
                  Reach us: <span className="underline underline-offset-1">naman.edu.in@gmail.com</span>
                </span>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3 h-3 sm:w-[14px] sm:h-[14px] transition-transform group-hover:scale-110"
                >
                  {hasCopied ? (
                    <path d="M20 6L9 17l-5-5" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </main>
      ) : activeNav === 'Journey' ? (
        <main ref={timelineContainerRef} className="relative z-[1] w-full h-screen pt-28 pb-16 px-5 sm:px-8 md:px-16 max-w-4xl mx-auto cinematic-text overflow-y-auto no-scrollbar">
          <div className="mb-8">
            <h1 className="text-[36px] sm:text-[48px] font-medium text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              My Learning Journey
            </h1>
            <p className="text-white/80 text-[18px] sm:text-[20px]">
              The milestones, education, and continuous learning path that shaped my engineering mindset.
            </p>
          </div>

          <div className="border-l-2 border-white/30 pl-8 sm:pl-12 ml-4 space-y-10 relative min-h-[75vh]">
            
            <div 
              className="absolute -left-[70px] w-32 h-32 pointer-events-none z-20 neon-walker"
              style={{ transform: `translateY(${walkerTranslateY}px)`, top: '0px' }}
            >
              <img 
                src="/walking.png" 
                alt="Walking Icon" 
                className="w-full h-full object-contain" 
              />
            </div>

            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="relative timeline-item pb-4">
                <div className="timeline-dot absolute -left-[41px] sm:-left-[49px] top-1.5 w-4 h-4 bg-white rounded-full border-4 border-[#b81414] transition-all duration-300" />
                
                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-[13px] font-mono mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-[24px] sm:text-[28px] font-medium text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {milestone.title}
                </h3>
                <p className="text-white/90 text-[15px] sm:text-[17px] leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {milestone.subTopics && (
                  <div className="flex flex-col gap-3 mt-3 pl-4 border-l-2 border-white/25 py-1">
                    {milestone.subTopics.map((sub, sIndex) => (
                      <div key={sIndex} className="p-3.5 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/30 transition-all">
                        <span className="text-white text-[15px] sm:text-[17px] font-medium block" style={{ fontFamily: 'var(--font-heading)' }}>
                          {sub.split('—')[0]}
                        </span>
                        <span className="text-white/70 text-[13px] sm:text-[15px] mt-0.5 block">
                          {sub.split('—')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/30 transition-colors">
            <h3 className="text-[20px] font-medium text-white mb-1">Always Evolving</h3>
            <p className="text-white/80 text-[15px]">
              Currently exploring advanced web animations, cloud architectures, and building production-grade interactive interfaces at Bennett University.
            </p>
          </div>
        </main>
      ) : activeNav === 'Work' ? (
        <main className="relative z-[1] w-full h-screen pt-28 pb-16 px-5 sm:px-8 md:px-16 max-w-6xl mx-auto cinematic-text overflow-y-auto no-scrollbar">
          <div className="mb-12">
            <h1 className="text-[36px] sm:text-[48px] font-medium text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              My Work & Profiles
            </h1>
            <p className="text-white/80 text-[18px] sm:text-[20px]">
              A showcase of my personal projects, experiments, and professional presence across platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch overflow-hidden">
            {workProjects.map((project, index) => (
              <div 
                key={index} 
                className="work-card-interactive p-6 rounded-3xl bg-[#a51212] overflow-hidden shadow-2xl"
                style={project.stackStyle}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div style={{ minHeight: '140px' }}>
                      <h3 className="text-[24px] sm:text-[26px] font-medium text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-[15px] sm:text-[17px] leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    {project.isImage && project.imageSrc ? (
                      <div 
                        className="w-full h-48 mb-5 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative cursor-pointer group flex items-center justify-center"
                        onClick={() => {
                          setIsIframeLoading(true);
                          setIsWebsiteExpanded(true);
                        }}
                      >
                        <img 
                          src={project.imageSrc} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] text-white font-mono pointer-events-none border border-white/20">
                          Click for Live Preview
                        </div>
                      </div>
                    ) : null}

                    {project.isVideo && project.videoSrc ? (
                      <div 
                        className="w-full h-48 mb-5 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative cursor-pointer group flex items-center justify-center"
                        onClick={() => setIsVideoExpanded(true)}
                      >
                        <video
                          ref={cardVideoRef}
                          src={project.videoSrc}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          playsInline
                          preload="metadata"
                          onLoadedMetadata={handleCardVideoLoadedMetadata}
                        />
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] text-white font-mono pointer-events-none border border-white/20">
                          Click for Live Preview
                        </div>
                      </div>
                    ) : null}

                    {project.isCanva ? (
                      <div 
                        className="w-full h-48 mb-5 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative cursor-pointer group flex items-center justify-center"
                        onClick={() => setIsCanvaExpanded(true)}
                      >
                        <img
                          src="/canva 1.png"
                          alt="Canva Thumbnail"
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] text-white font-mono pointer-events-none border border-white/20">
                          Click for Live Preview
                        </div>
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((techItem) => (
                        <span key={techItem} className="px-3 py-1 bg-black/30 text-white/80 rounded-full text-[11px] font-mono tracking-tight">
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-5">
                    {project.isImage ? (
                      <>
                        <button 
                          onClick={() => {
                            setIsIframeLoading(true);
                            setIsWebsiteExpanded(true);
                          }}
                          className="px-4 py-2 bg-white text-black rounded-full text-[14px] font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                          Live Preview
                        </button>
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white/80 hover:text-white text-[14px] underline underline-offset-4"
                        >
                          Codebase
                        </a>
                      </>
                    ) : project.isVideo ? (
                      <button 
                        onClick={() => setIsVideoExpanded(true)}
                        className="w-full py-2 bg-white text-black rounded-full text-[15px] font-medium hover:bg-black hover:text-white transition-colors cursor-pointer text-center"
                      >
                        Click for Live Preview
                      </button>
                    ) : project.isCanva ? (
                      <button 
                        onClick={() => setIsCanvaExpanded(true)}
                        className="w-full py-2 bg-white text-black rounded-full text-[15px] font-medium hover:bg-black hover:text-white transition-colors cursor-pointer text-center"
                      >
                        Click for Live Preview
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-16">
            <h2 className="text-[32px] sm:text-[40px] font-medium text-white tracking-tight mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Professional Presence
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <a 
                href="https://www.linkedin.com/in/naman-jain-905b00428/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="profile-link flex items-center gap-6 p-8 bg-[#a51212] rounded-3xl border border-white/10"
              >
                <div className="p-4 bg-white rounded-2xl w-20 h-20 flex items-center justify-center shrink-0 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#0a66c2]" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-medium text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>LinkedIn</h3>
                  <p className="text-white/70 text-[15px]">Connect with me professionally, view endorsements and updates.</p>
                </div>
              </a>

              <a 
                href="https://github.com/namannnjain" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="profile-link flex items-center gap-6 p-8 bg-[#a51212] rounded-3xl border border-white/10"
              >
                <div className="p-4 bg-white rounded-2xl w-20 h-20 flex items-center justify-center shrink-0 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-black" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-medium text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>GitHub</h3>
                  <p className="text-white/70 text-[15px]">Explore my repositories, open-source code and contributions.</p>
                </div>
              </a>
            </div>
          </div>
        </main>
      ) : activeNav === 'Languages' ? (
        <main className="relative z-[1] w-full h-screen pt-32 pb-16 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto cinematic-text flex flex-col justify-center overflow-hidden">
          <div className="mb-4" style={{ marginLeft: window.innerWidth > 768 ? '45px' : '0px', marginTop: '10px' }}>
            <h2 className="text-[34px] sm:text-[44px] font-medium text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              My Learning
            </h2>
          </div>

          <div className="w-full">
            <GlossyKineticCluster />
          </div>
        </main>
      ) : activeNav === 'Contact' ? (
        <main className="relative z-[1] w-full h-screen pt-28 pb-10 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col items-center justify-start overflow-hidden cinematic-text">
          <div className="text-center mb-4 mt-6 z-10">
            <h1 className="text-[32px] sm:text-[42px] font-medium text-white tracking-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              Get In Touch
            </h1>
            <p className="text-white/80 text-[14px] sm:text-[16px]">
              Catch the flying hot air balloons and click their icons to connect!
            </p>
          </div>

          {/* Floating Balloons Container properly sized */}
          <div className="relative w-full h-[52vh] flex justify-around items-start px-4 z-10">
            {[
              { id: 1, name: 'Gmail', icon: '/gmail.png', link: 'mailto:naman.edu.in@gmail.com', floatClass: 'float-1' },
              { id: 2, name: 'LinkedIn', icon: '/linkedin.png', link: 'https://www.linkedin.com/in/naman-jain-905b00428/', floatClass: 'float-2' },
              { id: 3, name: 'GitHub', icon: '/github.png', link: 'https://github.com/namannnjain', floatClass: 'float-3' },
              { id: 4, name: 'Outlook', icon: '/outlook.png', link: 'mailto:naman@outlook.com', floatClass: 'float-4' },
            ].map((item, idx) => {
              const offset = escapeOffsets[idx];
              return (
                <div
                  key={item.id}
                  id={`balloon-${idx}`}
                  className={`flex flex-col items-center absolute transition-transform duration-300 ease-out ${item.floatClass}`}
                  style={{
                    left: `${12 + idx * 21}%`,
                    top: `${6 + (idx % 2) * 6}%`,
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                  }}
                >
                  {/* Hot Air Balloon Image */}
                  <img 
                    src="/hotbaloon.png" 
                    alt="Hot Air Balloon" 
                    className="w-20 sm:w-28 md:w-32 object-contain filter drop-shadow-lg pointer-events-none" 
                  />
                  
                  {/* Rope hanging down */}
                  <div className="w-[2px] h-10 bg-white/70 -mt-1" />

                  {/* Clickable App Icon */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 transition-transform hover:scale-110 cursor-pointer group"
                  >
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-xl filter drop-shadow" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </main>
      ) : null}
    </>
  );
}