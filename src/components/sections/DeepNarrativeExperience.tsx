import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { usePerformanceMode } from "@/hooks/use-performance-mode"

// ==========================
// PARALLAX MARINE SNOW
// ==========================
const createParticles = (count: number, sizeMin: number, sizeMax: number, blur: number) => {
  return Array.from({ length: count }).map(() => ({
    id: Math.random().toString(36).substring(7),
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * (sizeMax - sizeMin) + sizeMin,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.4 + 0.1,
    wobbleOffset: (Math.random() * 100 + 50) * (Math.random() > 0.5 ? 1 : -1),
    blur: blur,
  }))
}

function ParallaxDepthLayer({ particles, speed, smoothScroll, zIndex }: any) {
  const yOffset = useTransform(smoothScroll, (v: any) => {
    const scrollAmount = v * speed * 100;
    return `-${scrollAmount % 100}vh`;
  });

  const block = (
    <div className="relative w-full h-[100vh]">
      {particles.map((p: any) => (
        <div
          key={p.id}
          className="parallax-particle"
          style={{
            "--dur": p.duration + "s",
            "--del": p.delay + "s",
            "--wobble": p.wobbleOffset + "px",
            "--x": p.left,
            "--y": p.top,
            "--size": p.size + "px",
            "--op": p.opacity,
            "--blur": `blur(${p.blur}px)`
          } as React.CSSProperties}
        />
      ))}
    </div>
  )

  return (
    <motion.div style={{ y: yOffset }} className={`absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden ${zIndex}`}>
      {block}
      {block}
    </motion.div>
  )
}

function PlaceholderImageSet({ smoothScroll, triggers, images, zIndex = 0 }: any) {
  const opacity = useTransform(smoothScroll, triggers.pos, triggers.opacity)
  const scale = useTransform(smoothScroll, triggers.pos, triggers.scale)

  return (
    <motion.div style={{ opacity, scale, zIndex }} className="absolute inset-0 pointer-events-none flex items-center justify-center -translate-y-[5%]">
      {images.map((img: any, i: number) => (
        <motion.img
          key={i}
          src={img.src}
          className={`absolute object-cover rounded-xl shadow-2xl ${img.className}`}
          style={{ ...img.style }}
          animate={img.animate}
          transition={{ repeat: Infinity, ease: "easeInOut", ...img.transition }}
        />
      ))}
    </motion.div>
  )
}

// ==========================
// IMAGE CONFIGS (EXTRACTED)
// ==========================
const configFeelingImages = [
  { src: "/images/main-page/section 1/abstract sketch.webp", className: "w-32 h-32 md:w-52 md:h-52", style: { left: "15%", top: "25%" }, animate: { y: [-15, 15, -15] }, transition: { duration: 8 } },
  { src: "/images/main-page/section 1/handwritten note  idea fragment.webp", className: "w-40 h-40 md:w-60 md:h-60", style: { right: "20%", top: "30%" }, animate: { y: [15, -15, 15] }, transition: { duration: 10 } },
  { src: "/images/main-page/section 1/blurred photo of a previous project.webp", className: "w-24 h-24 md:w-48 md:h-48", style: { left: "25%", bottom: "25%" }, animate: { y: [-20, 20, -20] }, transition: { duration: 12 } },
  { src: "/images/main-page/section 1/mood-like image.webp", className: "w-48 h-48 md:w-64 md:h-64", style: { right: "25%", bottom: "20%" }, animate: { y: [10, -10, 10] }, transition: { duration: 9 } }
];

const configExploreImages = [
  { src: "/images/main-page/section 2/messy prototype.webp", className: "w-32 h-32 md:w-40 md:h-40", style: { left: "8%", top: "15%", transform: "rotate(-4deg)" }, animate: { y: [-5, 5, -5] }, transition: { duration: 8 } },
  { src: "/images/main-page/section 2/code snippet.webp", className: "w-48 h-48 md:w-56 md:h-56", style: { right: "12%", top: "10%", transform: "rotate(3deg)" }, animate: { y: [5, -5, 5] }, transition: { duration: 9 } },
  { src: "/images/main-page/section 2/rough physical build.webp", className: "w-36 h-36 md:w-44 md:h-44", style: { left: "20%", bottom: "10%", transform: "rotate(5deg)" }, animate: { y: [-8, 8, -8] }, transition: { duration: 7 } },
  { src: "/images/main-page/section 2/iteration sketch.webp", className: "w-56 h-56 md:w-64 md:h-64", style: { right: "18%", bottom: "5%", transform: "rotate(-2deg)" }, animate: { y: [8, -8, 8] }, transition: { duration: 10 } },
  { src: "/images/main-page/section 2/test setup photo.webp", className: "w-24 h-24 md:w-32 md:h-32", style: { left: "40%", top: "5%", transform: "rotate(-5deg)" }, animate: { y: [-10, 10, -10] }, transition: { duration: 6 } },
  { src: "/images/main-page/section 2/failure  in-progress moment.webp", className: "w-32 h-32 md:w-40 md:h-40", style: { right: "40%", top: "40%", transform: "rotate(4deg)" }, animate: { y: [6, -6, 6] }, transition: { duration: 8 } },
  { src: "/images/main-page/section 2/second messy prototype or different angle.webp", className: "w-40 h-40 md:w-48 md:h-48", style: { left: "5%", top: "60%", transform: "rotate(-3deg)" }, animate: { y: [-5, 5, -5] }, transition: { duration: 11 } }
];

const configEmotionImages = [
  { src: "/images/main-page/section 4/experience-focused project.webp", className: "w-[22rem] h-auto md:w-[32rem] md:h-auto", style: { left: "8%", top: "35%" }, animate: { y: [-3, 3, -3] }, transition: { duration: 12 } },
  { src: "/images/main-page/section 4/experience-focused project 2.webp", className: "w-[20rem] h-auto md:w-[28rem] md:h-auto", style: { right: "12%", bottom: "25%" }, animate: { y: [3, -3, 3] }, transition: { duration: 14 } }
];

const configEnjoymentImages = [
  { src: "/images/main-page/section 5/Arcade Box (main visual).webp", className: "w-[22rem] h-auto md:w-[32rem] md:h-auto", style: { left: "10%", top: "30%" }, animate: { y: [-15, 15, -15], rotate: [-2, 2, -2] }, transition: { duration: 6 } },
  { src: "/images/main-page/section 5/second angle or detail of Arcade Box.webp", className: "w-[20rem] h-auto md:w-[28rem] md:h-auto", style: { right: "12%", top: "25%" }, animate: { y: [10, -10, 10], rotate: [2, -2, 2] }, transition: { duration: 7 } },
  { src: "/images/main-page/section 5/another playful interaction.webp", className: "w-56 h-auto md:w-[22rem] md:h-auto", style: { left: "40%", bottom: "10%", transform: "translateX(-50%)" }, animate: { y: [-12, 12, -12], rotate: [-1, 1, -1] }, transition: { duration: 8 } }
];

const configImmersionImages = [
  { src: "/images/main-page/section 6/Knibbel project.webp", className: "w-72 h-72 md:w-96 md:h-96 opacity-90", style: { left: "10%", top: "20%", transform: "translateZ(-100px)" }, animate: { y: [-20, 20, -20] }, transition: { duration: 15 } },
  { src: "/images/main-page/section 6/Tinker Imageneers.webp", className: "w-[20rem] h-auto md:w-[32rem] md:h-auto opacity-100", style: { right: "10%", top: "60%", transform: "translateZ(50px)" }, animate: { y: [15, -15, 15] }, transition: { duration: 12 } },
  { src: "/images/main-page/section 6/wide shot of an experience  installation.webp", className: "w-48 h-48 md:w-64 md:h-64 opacity-80", style: { left: "35%", bottom: "15%", transform: "translateZ(-50px)" }, animate: { y: [-10, 10, -10] }, transition: { duration: 10 } },
  { src: "/images/main-page/section 6/detail shot that adds atmosphere.webp", className: "w-80 h-80 md:w-[28rem] md:h-[28rem] opacity-70", style: { right: "25%", top: "10%", transform: "translateZ(-150px)" }, animate: { y: [25, -25, 25] }, transition: { duration: 20 } }
];

const configExperiencesImages = [
  { src: "/images/main-page/section 7/strongest visual design Poster.webp", className: "w-80 h-auto md:w-[26rem] md:h-auto", style: { left: "10%", top: "20%", transform: "translateY(-50%)" }, animate: { y: [-5, 5, -5] }, transition: { duration: 12 } },
  { src: "/images/main-page/section 7/strongest visual design ORIGO.webp", className: "w-72 h-72 md:w-[24rem] md:h-[24rem]", style: { right: "15%", top: "25%", transform: "translateY(-50%)" }, animate: { y: [5, -5, 5] }, transition: { duration: 14 } }
];

const configFeelImages = [
  { src: "/images/main-page/section 8/your single strongest image overall.webp", className: "w-[32rem] h-auto md:w-[56rem] md:h-auto", style: { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }, animate: {}, transition: {} },
];

export function DeepNarrativeExperienceDesktop() {
  const containerRef = useRef<HTMLElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 })

  const { LAYER_BG, LAYER_MD, LAYER_FG } = useMemo(() => {
    return {
      LAYER_BG: createParticles(150, 1, 2.5, 2),
      LAYER_MD: createParticles(100, 1.5, 3.5, 0),
      LAYER_FG: createParticles(30, 3, 6, 0),
    }
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }, 150);
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20, restDelta: 0.0001 })

  const t0 = [0.00, 0.04, 0.08, 0.12]
  const t1 = [0.15, 0.19, 0.23, 0.27]
  const t2 = [0.30, 0.34, 0.38, 0.42]
  const t3 = [0.45, 0.49, 0.53, 0.57]
  const t4 = [0.60, 0.64, 0.68, 0.72]
  const t5 = [0.75, 0.79, 0.83, 0.87]
  const t6 = [0.90, 0.94, 0.98, 1.00]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  const displaceX1 = useTransform(smoothMouseX, [0, windowSize.width], [30, -30])
  const displaceY1 = useTransform(smoothMouseY, [0, windowSize.height], [30, -30])
  const displaceX2 = useTransform(smoothMouseX, [0, windowSize.width], [-40, 40])
  const displaceY2 = useTransform(smoothMouseY, [0, windowSize.height], [-40, 40])
  const displaceX3 = useTransform(smoothMouseX, [0, windowSize.width], [25, -25])
  const displaceX4 = useTransform(smoothMouseX, [0, windowSize.width], [-35, 35])

  const rotateX = useTransform(smoothMouseY, [0, windowSize.height], [15, -15])
  const rotateY = useTransform(smoothMouseX, [0, windowSize.width], [-15, 15])

  const layer1Opacity = useTransform(smoothScroll, t0, [0, 1, 1, 0])
  const layer1Y = useTransform(smoothScroll, t0, ["5%", "0%", "0%", "-5%"])

  const layer2Opacity = useTransform(smoothScroll, t1, [0, 1, 1, 0])
  const depthOverlayOpacity = useTransform(smoothScroll, [0, 1], [0, 0.98])

  const word1Y = useTransform(smoothScroll, t1, ["10%", "0%", "0%", "-10%"])
  const word2Y = useTransform(smoothScroll, t1, ["-10%", "0%", "0%", "10%"])
  const word3Y = useTransform(smoothScroll, t1, ["15%", "0%", "0%", "-15%"])
  const word4Y = useTransform(smoothScroll, t1, ["5%", "0%", "0%", "-5%"])
  const word5Y = useTransform(smoothScroll, t1, ["-5%", "0%", "0%", "5%"])

  const layer3Opacity = useTransform(smoothScroll, [t2[0], t2[1], t5[2], t5[3]], [0, 1, 1, 0])
  const wordEmotionOp = useTransform(smoothScroll, t2, [0, 1, 1, 0])
  const wordEmotionY = useTransform(smoothScroll, t2, ["60px", "0px", "0px", "-60px"])
  const wordEnjoymentOp = useTransform(smoothScroll, t3, [0, 1, 1, 0])
  const wordEnjoymentY = useTransform(smoothScroll, t3, ["60px", "0px", "0px", "-60px"])
  const wordImmersionOp = useTransform(smoothScroll, t4, [0, 1, 1, 0])
  const wordImmersionY = useTransform(smoothScroll, t4, ["60px", "0px", "0px", "-60px"])
  const wordExperiencesOp = useTransform(smoothScroll, t5, [0, 1, 1, 0])
  const wordExperiencesY = useTransform(smoothScroll, t5, ["60px", "0px", "0px", "-60px"])

  const layer4Opacity = useTransform(smoothScroll, t6, [0, 1, 1, 1])
  const layer4Scale = useTransform(smoothScroll, t6, [0.95, 1, 1, 1])


  const configFeeling = { pos: t0, opacity: [0, 0.4, 0.4, 0], scale: [0.5, 0.8, 0.8, 0.4], images: configFeelingImages }
  const configExplore = { pos: t1, opacity: [0.001, 0.4, 0.4, 0.001], scale: [0.6, 0.9, 0.9, 0.5], images: configExploreImages }
  const configEmotion = { pos: t2, opacity: [0, 0.8, 0.8, 0], scale: [0.7, 1, 1, 0.8], images: configEmotionImages }
  const configEnjoyment = { pos: t3, opacity: [0, 0.9, 0.9, 0], scale: [0.8, 1.1, 1.1, 0.8], images: configEnjoymentImages }
  const configImmersion = { pos: t4, opacity: [0, 0.95, 0.95, 0], scale: [0.9, 1.2, 1.2, 0.9], images: configImmersionImages }
  const configExperiences = { pos: t5, opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 1.1, 0.9], images: configExperiencesImages }
  const configFeel = { pos: t6, opacity: [0, 1, 1, 1], scale: [0.9, 1.5, 1.5, 1.5], images: configFeelImages }

  return (
    <section ref={containerRef} className="relative w-full h-[2600vh]">
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-auto"
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
      >
        <motion.div style={{ opacity: depthOverlayOpacity }} className="absolute inset-0 bg-[#000000] pointer-events-none z-[-2]" />

        <ParallaxDepthLayer particles={LAYER_BG} speed={1.5} smoothScroll={smoothScroll} zIndex="z-[0]" />
        <ParallaxDepthLayer particles={LAYER_MD} speed={2.5} smoothScroll={smoothScroll} zIndex="z-[1]" />
        <ParallaxDepthLayer particles={LAYER_FG} speed={5.0} smoothScroll={smoothScroll} zIndex="z-[50]" />

        <div style={{ perspective: 1200 }} className="absolute inset-0 z-[0] transform-gpu">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full">
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configFeeling} images={configFeeling.images} zIndex={-5} />
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configExplore} images={configExplore.images} zIndex={-4} />
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configEmotion} images={configEmotion.images} zIndex={-2} />
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configEnjoyment} images={configEnjoyment.images} zIndex={-2} />
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configImmersion} images={configImmersion.images} zIndex={-2} />
            <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configExperiences} images={configExperiences.images} zIndex={-2} />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-[-1]">
          <PlaceholderImageSet smoothScroll={smoothScroll} triggers={configFeel} images={configFeel.images} />
          <motion.div style={{ opacity: layer4Opacity }} className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        <motion.div style={{ opacity: layer1Opacity, y: layer1Y }} className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent h-[40vh] opacity-50 blur-[2px]" />
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading text-white tracking-wide mix-blend-screen text-center px-4 [text-shadow:0_0_15px_rgba(0,255,255,0.2)] leading-tight">
            My work always starts<br />
            <span className="italic text-primary/90 font-light [text-shadow:0_0_20px_rgba(0,255,255,0.5)]">with a feeling</span>
          </h2>
        </motion.div>

        <motion.div style={{ opacity: layer2Opacity, perspective: 1200 }} className="absolute inset-0 flex items-center justify-center z-[3]">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-5xl h-full flex items-center justify-center transform-gpu will-change-transform">
            <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading italic text-white text-center z-10 px-4 leading-[1.1] tracking-tight [text-shadow:0_0_20px_rgba(0,255,255,0.25)]" style={{ transform: "translateZ(80px)" }}>
              I explore before I design
            </h3>

            {/* Keeping the desktop glass orbs fully intact */}
            <motion.div style={{ y: word1Y, x: displaceX1, z: 120 }} className="absolute left-[15%] top-[15%] pointer-events-auto cursor-default transform-gpu">
              <motion.div animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56 mix-blend-screen opacity-90">
                <video src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ filter: "hue-rotate(-55deg) saturate(250%) brightness(0.6) contrast(1.2)" }} />
                <span className="relative z-10 text-white font-bubble text-xl md:text-2xl tracking-wide">curiosity</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: word2Y, x: displaceX2, z: -40 }} className="absolute right-[20%] top-[15%] pointer-events-auto cursor-default transform-gpu">
              <motion.div animate={{ y: [-10, 10, -10], rotate: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44 mix-blend-screen opacity-90">
                <video src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ filter: "hue-rotate(-55deg) saturate(250%) brightness(0.6) contrast(1.2)" }} />
                <span className="relative z-10 text-white font-bubble text-lg md:text-xl tracking-wide">play</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: word3Y, x: displaceX3, z: 150 }} className="absolute left-[15%] bottom-[15%] pointer-events-auto cursor-default transform-gpu">
              <motion.div animate={{ y: [-20, 20, -20], rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }} className="relative flex items-center justify-center w-60 h-60 md:w-72 md:h-72 mix-blend-screen opacity-90">
                <video src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ filter: "hue-rotate(-55deg) saturate(250%) brightness(0.6) contrast(1.2)" }} />
                <span className="relative z-10 text-white font-bubble text-2xl md:text-3xl tracking-wide">experimentation</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: word4Y, x: displaceX4, z: 40 }} className="absolute right-[10%] bottom-[20%] pointer-events-auto cursor-default transform-gpu">
              <motion.div animate={{ y: [-12, 12, -12], rotate: [1, -3, 1] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }} className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 mix-blend-screen opacity-90">
                <video src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ filter: "hue-rotate(-55deg) saturate(250%) brightness(0.6) contrast(1.2)" }} />
                <span className="relative z-10 text-white font-bubble text-lg md:text-xl tracking-wide">intuition</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: word5Y, x: displaceX1, z: -80 }} className="absolute left-[45%] top-[5%] pointer-events-auto cursor-default transform-gpu">
              <motion.div animate={{ y: [-8, 8, -8], rotate: [-1, 2, -1] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }} className="relative flex items-center justify-center w-44 h-44 md:w-52 md:h-52 mix-blend-screen opacity-80">
                <video src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ filter: "hue-rotate(-55deg) saturate(250%) brightness(0.6) contrast(1.2)" }} />
                <span className="relative z-10 text-white font-bubble text-sm md:text-base tracking-widest uppercase text-center leading-tight">trying<br />things</span>
              </motion.div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none transform-gpu" style={{ transform: "translateZ(60px)" }}>
              <motion.div style={{ x: displaceX2, y: displaceY1 }} className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_15px_5px_rgba(0,255,255,0.4)] opacity-50 mix-blend-screen" />
              <motion.div style={{ x: displaceX3, y: displaceY2 }} className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_10px_3px_rgba(0,255,255,0.5)] opacity-40 mix-blend-screen" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: layer3Opacity }} className="absolute inset-0 flex flex-col items-center justify-center z-[4] w-full">
          <div className="flex flex-row items-center justify-center w-full text-3xl md:text-5xl lg:text-[4.5rem] font-heading text-white px-4 leading-[1.1] tracking-tight">
            <span className="opacity-70 font-light mr-4 md:mr-6 whitespace-nowrap">I design for</span>
            <div className="relative h-[1.2em] w-[150px] md:w-[250px] lg:w-[350px] flex items-center justify-start">
              <motion.span style={{ opacity: wordEmotionOp, y: wordEmotionY }} className="absolute left-0 italic text-primary [text-shadow:0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">emotion</motion.span>
              <motion.span style={{ opacity: wordEnjoymentOp, y: wordEnjoymentY }} className="absolute left-0 italic text-primary [text-shadow:0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">enjoyment</motion.span>
              <motion.span style={{ opacity: wordImmersionOp, y: wordImmersionY }} className="absolute left-0 italic text-primary [text-shadow:0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">immersion</motion.span>
              <motion.span style={{ opacity: wordExperiencesOp, y: wordExperiencesY }} className="absolute left-0 italic text-primary [text-shadow:0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">experiences</motion.span>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: layer4Opacity, scale: layer4Scale }} className="absolute inset-0 flex flex-col items-center justify-center z-[5] text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-heading text-white leading-tight tracking-[0.02em] [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
            <span className="block opacity-60 font-light mb-6">I don't just design things people see</span>
            <span className="block italic text-primary [text-shadow:0_0_30px_rgba(0,255,255,0.15)] leading-[0.9]">I design things people feel</span>
          </h1>
        </motion.div>

      </div>
    </section>
  )
}

// ==========================
// MOBILE NATIVE LAYOUT VARAINT
// ==========================
export function DeepNarrativeExperienceMobile() {
  const LAYER_BG = useMemo(() => createParticles(15, 1, 2.5, 2), []);

  return (
    <section className="relative w-full min-h-[100vh] bg-[#000000] overflow-hidden flex flex-col text-white py-24 px-6 md:px-12 z-0">

      {/* Reduced Particle Background mapped to the full document natively! */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden mix-blend-screen opacity-50">
        {LAYER_BG.map((p: any) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-100 shadow-[0_0_10px_2px_rgba(0,255,255,0.6)] animate-pulse"
            style={{
              top: p.top, left: p.left, width: p.size, height: p.size, filter: `blur(${p.blur}px)`
            }}
          />
        ))}
      </div>

      {/* Intro Hook */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, margin: "-10%" }} className="w-full flex-shrink-0 flex flex-col items-center justify-center min-h-[50vh] pt-20">
        <h2 className="text-4xl md:text-5xl font-heading text-white tracking-wide mix-blend-screen text-center [text-shadow:0_0_15px_rgba(0,255,255,0.2)] leading-tight mb-16">
          My work always starts<br />
          <span className="italic text-primary/90 font-light [text-shadow:0_0_20px_rgba(0,255,255,0.5)]">with a feeling</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 w-full mt-12">
          {configFeelingImages.map((img, i) => (
            <img key={i} src={img.src} alt="feeling" className="w-full h-auto object-cover rounded-xl shadow-2xl opacity-70 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </motion.div>

      {/* Exploration Section */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-10%" }} className="w-full flex flex-col items-center justify-center min-h-[80vh] mt-24">
        <h3 className="text-4xl md:text-5xl font-heading italic text-white text-center leading-[1.1] tracking-tight [text-shadow:0_0_20px_rgba(0,255,255,0.25)] mb-16">
          I explore before I design
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full max-w-3xl">
          <span className="font-bubble text-2xl tracking-wide opacity-80 mix-blend-screen">curiosity</span>
          <span className="font-bubble text-2xl tracking-wide opacity-80 mix-blend-screen">play</span>
          <span className="font-bubble text-3xl tracking-wide opacity-80 mix-blend-screen text-primary">experimentation</span>
          <span className="font-bubble text-2xl tracking-wide opacity-80 mix-blend-screen">intuition</span>
          <span className="font-bubble text-lg tracking-widest uppercase text-center leading-tight opacity-70 mix-blend-screen">trying<br />things</span>
        </div>

        {/* Static Gallery for Exploration */}
        <div className="grid grid-cols-2 gap-4 mt-24">
          {[configExploreImages[1], configExploreImages[2], configExploreImages[0], configExploreImages[3]].map((img, i) => (
            <img key={i} src={img.src} alt="exploration" className="w-full h-auto object-cover rounded-xl shadow-2xl opacity-70 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </motion.div>

      {/* Philosophy Native Scroll Segments */}
      <div className="w-full flex-col flex gap-40 mt-40">
        {[
          { word: "emotion", images: configEmotionImages },
          { word: "enjoyment", images: configEnjoymentImages },
          { word: "immersion", images: configImmersionImages },
          { word: "experiences", images: configExperiencesImages }
        ].map((block, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-20%" }} className="flex flex-col items-center">
            <h4 className="text-3xl md:text-4xl font-heading text-white opacity-80 mb-12 text-center">
              I design for <span className="italic text-primary [text-shadow:0_0_20px_rgba(0,255,255,0.3)] block mt-2 text-4xl">{block.word}</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 items-start w-full">
              {block.images.map((img, i2) => (
                <img key={i2} src={img.src} alt={block.word} className="w-full h-auto object-cover rounded-xl shadow-xl opacity-90 transition-opacity hover:opacity-100" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Finale Segment */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, margin: "-10%" }} className="w-full flex flex-col flex-shrink-0 items-center justify-center min-h-[80vh] mt-40 pb-20">
        <h1 className="text-4xl md:text-6xl font-heading text-white leading-tight tracking-[0.02em] text-center [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
          <span className="block opacity-60 font-light mb-6 text-3xl">I don't just design things people see</span>
          <span className="block italic text-primary [text-shadow:0_0_30px_rgba(0,255,255,0.15)] leading-[1.1]">I design things people feel</span>
        </h1>
        <img src={configFeelImages[0].src} className="w-full h-auto rounded-2xl shadow-2xl mt-16 opacity-90 transition-opacity hover:opacity-100" alt="finale" />
      </motion.div>

    </section>
  )
}

// ==========================
// ROUTER SWITCH
// ==========================
export function DeepNarrativeExperience() {
  const isPerformanceMode = usePerformanceMode();

  if (isPerformanceMode) {
    return <DeepNarrativeExperienceMobile />
  }

  return <DeepNarrativeExperienceDesktop />
}
