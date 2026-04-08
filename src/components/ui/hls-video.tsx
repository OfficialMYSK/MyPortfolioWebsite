import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { cn } from '@/lib/utils'

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  playbackRate?: number
  volume?: number
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

    // When unmuting, some browsers may pause the video if it changed playback policies.
    // So we attempt to resume playback if it's paused.
    if (!props.muted && video.paused) {
      video.play().catch(e => console.warn("HLSVideo play prevented:", e));
    }
  }, [props.muted, props.volume])

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
