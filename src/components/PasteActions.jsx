import { useEffect, useState } from 'react'
import { Link2, Save, Share2 } from 'lucide-react'

// This component is purely presentational around actions like generate link and save locally
export default function PasteActions({ onSaveLocal, onCreateLink, link, saving }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  const copyLink = async () => {
    if (!link) return
    await navigator.clipboard.writeText(link)
    setCopied(true)
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-900">Quick Actions</h3>
          <p className="text-xs text-slate-500">Save your paste locally or generate a shareable link.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onSaveLocal}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 active:scale-[.98]"
          >
            <Save size={16} /> Save locally
          </button>
          <button
            onClick={onCreateLink}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 active:scale-[.98] disabled:opacity-60"
          >
            <Share2 size={16} /> {saving ? 'Creating...' : 'Create link'}
          </button>
        </div>
      </div>
      {link && (
        <div className="mt-3 flex items-center justify-between rounded-md border border-indigo-200 bg-indigo-50 p-2">
          <div className="truncate text-sm text-indigo-700">{link}</div>
          <button onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs text-indigo-700 hover:bg-indigo-50">
            <Link2 size={14} /> {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      )}
    </div>
  )
}
