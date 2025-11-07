import { Rocket } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white shadow-md">
            <Rocket size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-none">Pastein</h1>
            <p className="text-xs text-slate-500">Snip, save, and share code</p>
          </div>
        </div>
        <a
          href="https://pastein.app"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          Help
        </a>
      </div>
    </header>
  )
}
