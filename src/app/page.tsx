import sounds from '../lib/sounds.json'
import SoundEffect from '@/components/soundeffect'
import AddSound from '@/components/addsound'

export default function Home() {
  return (
    <main className="p-4">
      <header className="flex justify-between items-baseline">
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Yapboard
        </h1>
        <AddSound />
      </header>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {sounds.map((sound) => (
          <li key={sound.filename}>
            <SoundEffect title={sound.title} filename={sound.filename} />
          </li>
        ))}
      </ul>
    </main>
  )
}
