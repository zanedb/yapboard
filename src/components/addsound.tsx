'use client'

import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Check } from 'lucide-react'

export default function AddSound() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [link, setLink] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    setStatus('sending')
    fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    }).then((res) => {
      if (res.status == 200) {
        setStatus('sent')
        setTimeout(() => {
          setLink('')
          setStatus('idle')
        }, 7000)
      }
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center p-2 px-4 border-2 rounded-md">
          <Plus size={20} strokeWidth={1.25} className="mr-1" /> Add FX
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {status === 'sent' ? (
          <div className="flex items-center">
            <Check size={20} strokeWidth={1.25} className="mr-2" />
            FX request sent!
          </div>
        ) : (
          <form className="mb-1" onSubmit={onSubmit}>
            <Label htmlFor="link">YouTube/file link</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                id="link"
                defaultValue="100%"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </div>
          </form>
        )}
      </PopoverContent>
    </Popover>
  )
}
