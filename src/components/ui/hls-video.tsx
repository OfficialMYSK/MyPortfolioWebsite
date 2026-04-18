import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Hls from 'hls.js'
import { cn } from '@/lib/utils'

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  playbackRate?: number
  volume?: number
}

export function HLSVideo({ src, className, ...props }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(videoRef, { margin: "200px" })

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }

    if (props.playbackRate) {
      video.playbackRate = props.playbackRate;
    }

    if (props.volume !== undefined) {
      video.volume = props.volume;
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src])

  // Sync muted and volume dynamically to the DOM element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (props.muted !== undefined) {
      video.muted = props.muted;
    }
    
    if (props.volume !== undefined) {
      video.volume = props.volume;
    }

    if (isInView && !props.muted && video.paused && props.autoPlay) {
      video.play().catch(e => console.warn("HLSVideo play prevented:", e));
    }
  }, [props.muted, props.volume, isInView, props.autoPlay])

  // Play / Pause based on view intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !props.autoPlay) return;

    if (isInView) {
      if (video.paused) {
        video.play().catch(e => console.warn("InView play prevented:", e));
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isInView, props.autoPlay]);

  if (!src) {
    return <div className={cn("bg-slate-900 object-cover", className)} />
  }

  return (
    <video
      ref={videoRef}
      className={cn("object-cover", className)}
      playsInline
      {...props}
    />
  )
}
