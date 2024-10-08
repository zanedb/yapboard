'use client'

import { useState, useEffect, useRef } from 'react'
import { PlaySquare } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Slider } from '@/components/ui/slider'

export default function SoundEffect({
  filename,
  title,
}: {
  filename: string
  title: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement>(null)
  const path = `/sounds/${filename}`

  const playPause = () => {
    setIsPlaying((prev: boolean) => !prev)
  }

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100 // Update volume on load

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0 // Restart sound
    }
  }, [isPlaying, audioRef])

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="p-4 py-6 flex flex-col items-center shadow-sm md:shadow-md border-2 rounded-lg cursor-pointer"
          onClick={playPause}
        >
          <audio src={path} ref={audioRef} />
          {isPlaying ? (
            <PauseSquare size={40} strokeWidth={1.25} />
          ) : (
            <PlaySquare size={40} strokeWidth={1.25} />
          )}
          <h2 className="mt-2 font-bold">{title}</h2>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={(v) => {
              setVolume(v[0])

              if (audioRef.current) {
                audioRef.current.volume = v[0] / 100
              }
            }}
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function PauseSquare(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <rect width="2" height="8" x="13" y="8"></rect>
      <rect width="2" height="8" x="9" y="8"></rect>
    </svg>
  )
}
