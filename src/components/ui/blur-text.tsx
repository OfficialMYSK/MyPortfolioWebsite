import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  }

  const child = {
    visible: {
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
    },
  }

  return (
    <motion.div
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
