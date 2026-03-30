import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { cn } from '@/lib/utils'

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  playbackRate?: number
}

export function HLSVideo({ src, className, ...props }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

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

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src])

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
