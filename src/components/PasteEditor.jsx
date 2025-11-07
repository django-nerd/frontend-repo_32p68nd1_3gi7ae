import { useEffect, useRef, useState } from 'react'
import { Copy, Download, Share2, Trash2 } from 'lucide-react'

export default function PasteEditor({ value, onChange, onClear, onDownload }) {
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1200)
    return () => clearTimeout(t)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // fallback
      textareaRef.current?.select()
      document.execCommand('copy')
      setCopied(true)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600">Your paste</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 active:scale-[.98]"
          >
            <Copy size={16} /> {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 active:scale-[.98]"
          >
            <Download size={16} /> Download
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 active:scale-[.98]"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type your text/code here..."
        className="h-[300px] w-full resize-y rounded-lg border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
      <p className="mt-2 text-xs text-slate-500">
        Tip: Use Ctrl/⌘ + A then Ctrl/⌘ + C to copy everything quickly.
      </p>
    </div>
  )
}
