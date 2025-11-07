import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import PasteEditor from './components/PasteEditor'
import PasteActions from './components/PasteActions'
import Footer from './components/Footer'

// Pastein – a simple paste tool frontend. This version stores pastes in localStorage
// and can generate a shareable link using the current page's URL with a base64 payload.
// Backend is not required for this minimal experience.

function b64EncodeUnicode(str) {
  return btoa(unescape(encodeURIComponent(str)))
}
function b64DecodeUnicode(str) {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch {
    return ''
  }
}

export default function App() {
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [link, setLink] = useState('')

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('pastein_text')
    if (saved) setText(saved)

    // Load from share URL hash if present: #p=<base64>
    const params = new URLSearchParams(window.location.hash.replace('#', ''))
    const payload = params.get('p')
    if (payload) {
      const decoded = b64DecodeUnicode(payload)
      if (decoded) setText(decoded)
    }
  }, [])

  // Persist locally
  useEffect(() => {
    localStorage.setItem('pastein_text', text)
  }, [text])

  const handleClear = () => {
    setText('')
    setLink('')
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `paste-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const createLink = async () => {
    setSaving(true)
    try {
      const encoded = b64EncodeUnicode(text)
      const url = new URL(window.location.href)
      url.hash = `p=${encoded}`
      setLink(url.toString())
    } finally {
      setSaving(false)
    }
  }

  const saveLocal = () => {
    localStorage.setItem('pastein_text', text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        <section className="mx-auto grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PasteEditor
              value={text}
              onChange={setText}
              onClear={handleClear}
              onDownload={handleDownload}
            />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-medium text-slate-900">About Pastein</h3>
              <p className="mt-1 text-sm text-slate-600">
                Pastein lets you quickly paste, save, and share snippets of text or code. Everything stays on your
                device unless you create a share link.
              </p>
              <ul className="mt-3 list-disc pl-5 text-xs text-slate-600 space-y-1">
                <li>Copy with one click</li>
                <li>Download as a .txt file</li>
                <li>Create a shareable link encoded in the URL</li>
                <li>Auto-saves locally as you type</li>
              </ul>
            </div>

            <PasteActions
              onSaveLocal={saveLocal}
              onCreateLink={createLink}
              link={link}
              saving={saving}
            />

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <p className="text-sm">
                Security note: Share links encode your content in the URL. Avoid using this for secrets. For advanced
                needs (auth, cloud storage), we can wire this to a backend on request.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
