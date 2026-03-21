import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle, { useThemeEffect } from '../../components/ui/ThemeToggle'

// ── Types ──────────────────────────────────────────────────────────────────────

interface ForumReply {
  id: string
  content: string
  authorName: string
  createdAt: string
  likes: number
}

interface ForumPost {
  id: string
  title: string
  content: string
  authorName: string
  subject: 'SSR-FD' | 'SSR-MI' | 'SSR-KS' | 'ML1' | 'ENT1' | 'Generelt'
  tags: string[]
  createdAt: string
  replies: ForumReply[]
  likes: number
}

type SubjectFilter = 'Alle' | ForumPost['subject']
type SortMode = 'newest' | 'active' | 'liked'

// ── Storage ────────────────────────────────────────────────────────────────────

const POSTS_KEY = 'adventure-forum-posts'
const AUTHOR_KEY = 'adventure-forum-author'

function loadPosts(): ForumPost[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY)
    return raw ? (JSON.parse(raw) as ForumPost[]) : []
  } catch { return [] }
}

function savePosts(posts: ForumPost[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Akkurat nå'
  if (diffMins < 60) return `${diffMins} min siden`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} t siden`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} d siden`
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })
}

// ── Subject badge colors ───────────────────────────────────────────────────────

const SUBJECT_COLORS: Record<string, { bg: string; text: string }> = {
  'SSR-FD':  { bg: '#ccfbf1', text: '#0d9488' },
  'SSR-MI':  { bg: '#ffedd5', text: '#c2410c' },
  'SSR-KS':  { bg: '#ede9fe', text: '#7c3aed' },
  'ML1':     { bg: '#dbeafe', text: '#1d4ed8' },
  'ENT1':    { bg: '#fef9c3', text: '#a16207' },
  'Generelt':{ bg: '#f1f5f9', text: '#475569' },
}

const SUBJECTS: ForumPost['subject'][] = ['SSR-FD', 'SSR-MI', 'SSR-KS', 'ML1', 'ENT1', 'Generelt']

// ── New post form ──────────────────────────────────────────────────────────────

function NewPostForm({
  authorName,
  onSave,
  onCancel,
}: {
  authorName: string
  onSave: (post: ForumPost) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState<ForumPost['subject']>('Generelt')
  const [tagsInput, setTagsInput] = useState('')

  function handleSubmit() {
    if (!title.trim() || !content.trim()) return
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    const post: ForumPost = {
      id: genId(),
      title: title.trim(),
      content: content.trim(),
      authorName,
      subject,
      tags,
      createdAt: new Date().toISOString(),
      replies: [],
      likes: 0,
    }
    onSave(post)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div
        className="w-full max-w-xl rounded-2xl p-6 space-y-4"
        style={{ background: 'var(--card-bg)', boxShadow: '0 8px 32px rgba(0,0,0,0.16)' }}
      >
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Nytt innlegg</h2>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Tittel</label>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Hva ønsker du å diskutere?"
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Innhold</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Skriv innlegget ditt her..."
            rows={5}
            className="w-full px-3 py-2 rounded-lg border text-sm resize-none"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Fag</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value as ForumPost['subject'])}
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Tagger (kommaseparert)</label>
            <input
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="tips, eksamen, ..."
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
          >
            Avbryt
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40"
            style={{ background: '#0d9488' }}
          >
            Publiser innlegg
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Full post view ─────────────────────────────────────────────────────────────

function PostView({
  post,
  onBack,
  onLikePost,
  onLikeReply,
  onAddReply,
}: {
  post: ForumPost
  onBack: () => void
  onLikePost: () => void
  onLikeReply: (replyId: string) => void
  onAddReply: (content: string) => void
}) {
  const [replyText, setReplyText] = useState('')
  const colors = SUBJECT_COLORS[post.subject] ?? SUBJECT_COLORS['Generelt']

  function handleReply() {
    if (!replyText.trim()) return
    onAddReply(replyText.trim())
    setReplyText('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-5 hover:opacity-70 transition-opacity"
        style={{ color: '#0d9488' }}
      >
        ← Tilbake til forum
      </button>

      {/* Post */}
      <div className="rounded-2xl p-5 mb-4 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                {post.subject}
              </span>
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{post.content}</p>

        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#0d9488' }}>
              {post.authorName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{post.authorName}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(post.createdAt)}</span>
          </div>
          <button
            onClick={onLikePost}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
            style={{ background: post.likes > 0 ? '#ccfbf1' : 'var(--bg-secondary)', color: post.likes > 0 ? '#0d9488' : 'var(--text-muted)' }}
          >
            ♥ {post.likes}
          </button>
        </div>
      </div>

      {/* Replies */}
      <div className="mb-4 space-y-3">
        {post.replies.length === 0 && (
          <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>Ingen svar ennå – vær den første!</p>
        )}
        {post.replies.map(reply => (
          <div key={reply.id} className="rounded-xl p-4 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{reply.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#7c3aed' }}>
                  {reply.authorName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{reply.authorName}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(reply.createdAt)}</span>
              </div>
              <button
                onClick={() => onLikeReply(reply.id)}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors hover:opacity-80"
                style={{ background: reply.likes > 0 ? '#ccfbf1' : 'var(--bg-secondary)', color: reply.likes > 0 ? '#0d9488' : 'var(--text-muted)' }}
              >
                ♥ {reply.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply input */}
      <div className="rounded-2xl p-4 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <textarea
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          placeholder="Skriv et svar..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border text-sm resize-none mb-3"
          style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        />
        <div className="flex justify-end">
          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40"
            style={{ background: '#0d9488' }}
          >
            Send svar
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Author name prompt ─────────────────────────────────────────────────────────

function AuthorPrompt({ onSave }: { onSave: (name: string) => void }) {
  const [name, setName] = useState('')
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)' }}
    >
      <div className="w-full max-w-sm rounded-2xl p-6 space-y-4" style={{ background: 'var(--card-bg)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Hva heter du?</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Navnet ditt vises på innlegg og svar. Det lagres lokalt i nettleseren.</p>
        <input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onSave(name.trim()) }}
          placeholder="Ditt navn"
          className="w-full px-3 py-2 rounded-lg border text-sm"
          style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        />
        <button
          onClick={() => { if (name.trim()) onSave(name.trim()) }}
          disabled={!name.trim()}
          className="w-full py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40"
          style={{ background: '#0d9488' }}
        >
          Fortsett
        </button>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TeacherForum() {
  useThemeEffect()
  const navigate = useNavigate()

  const [authorName, setAuthorName] = useState<string>(() => localStorage.getItem(AUTHOR_KEY) ?? '')
  const [posts, setPosts] = useState<ForumPost[]>(loadPosts)
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('Alle')
  const [sortMode, setSortMode] = useState<SortMode>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)
  const [openPostId, setOpenPostId] = useState<string | null>(null)
  const [askAuthor, setAskAuthor] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  function requireAuthor(action: () => void) {
    if (authorName) { action(); return }
    setPendingAction(() => action)
    setAskAuthor(true)
  }

  function handleAuthorSave(name: string) {
    setAuthorName(name)
    localStorage.setItem(AUTHOR_KEY, name)
    setAskAuthor(false)
    if (pendingAction) { pendingAction(); setPendingAction(null) }
  }

  function updatePosts(updater: (prev: ForumPost[]) => ForumPost[]) {
    setPosts(prev => {
      const next = updater(prev)
      savePosts(next)
      return next
    })
  }

  function handleNewPost(post: ForumPost) {
    updatePosts(prev => [post, ...prev])
    setShowNewPost(false)
    setOpenPostId(post.id)
  }

  function handleLikePost(postId: string) {
    updatePosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p))
  }

  function handleLikeReply(postId: string, replyId: string) {
    updatePosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, replies: p.replies.map(r => r.id === replyId ? { ...r, likes: r.likes + 1 } : r) }
        : p
    ))
  }

  function handleAddReply(postId: string, content: string) {
    const reply: ForumReply = {
      id: genId(),
      content,
      authorName,
      createdAt: new Date().toISOString(),
      likes: 0,
    }
    updatePosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
    ))
  }

  const filteredPosts = useMemo(() => {
    let result = posts
    if (subjectFilter !== 'Alle') result = result.filter(p => p.subject === subjectFilter)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (sortMode === 'newest') result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    if (sortMode === 'active') result = [...result].sort((a, b) => b.replies.length - a.replies.length)
    if (sortMode === 'liked') result = [...result].sort((a, b) => b.likes - a.likes)
    return result
  }, [posts, subjectFilter, sortMode, searchQuery])

  const openPost = openPostId ? posts.find(p => p.id === openPostId) : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Author prompt */}
      {askAuthor && <AuthorPrompt onSave={handleAuthorSave} />}

      {/* New post modal */}
      <AnimatePresence>
        {showNewPost && (
          <NewPostForm
            authorName={authorName}
            onSave={handleNewPost}
            onCancel={() => setShowNewPost(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div
        className="px-4"
        style={{ background: 'var(--card-bg)', borderBottom: '0.5px solid rgba(0,0,0,0.08)', height: '52px', display: 'flex', alignItems: 'center' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 w-full">
          <span className="text-base font-medium shrink-0" style={{ color: '#0d9488' }}>Businesslaben</span>
          <nav className="hidden sm:flex items-center gap-6">
            <button onClick={() => navigate('/teacher')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Lærer</button>
            <span className="text-sm font-medium" style={{ color: '#0d9488', borderBottom: '2px solid #0d9488', paddingBottom: '2px' }}>Forum</span>
          </nav>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {openPost ? (
            <PostView
              key={openPost.id}
              post={openPost}
              onBack={() => setOpenPostId(null)}
              onLikePost={() => requireAuthor(() => handleLikePost(openPost.id))}
              onLikeReply={replyId => requireAuthor(() => handleLikeReply(openPost.id, replyId))}
              onAddReply={content => requireAuthor(() => handleAddReply(openPost.id, content))}
            />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Page heading */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Lærerforum</h1>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Del erfaringer og tips med kollegaer</p>
                </div>
                <button
                  onClick={() => requireAuthor(() => setShowNewPost(true))}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white flex items-center gap-1.5"
                  style={{ background: '#0d9488' }}
                >
                  + Nytt innlegg
                </button>
              </div>

              {/* Search + sort */}
              <div className="flex gap-2 mb-4">
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Søk i innlegg..."
                  className="flex-1 px-3 py-2 rounded-xl border text-sm"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
                <select
                  value={sortMode}
                  onChange={e => setSortMode(e.target.value as SortMode)}
                  className="px-3 py-2 rounded-xl border text-sm"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <option value="newest">Nyeste</option>
                  <option value="active">Mest aktive</option>
                  <option value="liked">Mest likt</option>
                </select>
              </div>

              {/* Subject filter pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(['Alle', ...SUBJECTS] as SubjectFilter[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSubjectFilter(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
                    style={
                      subjectFilter === s
                        ? { background: '#0d9488', color: '#fff', borderColor: '#0d9488' }
                        : { background: 'var(--card-bg)', color: 'var(--text-muted)', borderColor: 'var(--border)' }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Post list */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
                  <p className="text-4xl mb-3">💬</p>
                  <p className="font-medium">Ingen innlegg ennå</p>
                  <p className="text-sm mt-1">Vær den første til å starte en diskusjon!</p>
                </div>
              )}

              <div className="space-y-3">
                {filteredPosts.map((post, i) => {
                  const colors = SUBJECT_COLORS[post.subject] ?? SUBJECT_COLORS['Generelt']
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setOpenPostId(post.id)}
                      className="rounded-2xl p-4 border cursor-pointer transition-all hover:shadow-md"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                              {post.subject}
                            </span>
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{post.title}</h3>
                          <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{post.content}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#0d9488' }}>
                            {post.authorName.charAt(0).toUpperCase()}
                          </div>
                          <span>{post.authorName}</span>
                        </div>
                        <span>{formatDate(post.createdAt)}</span>
                        <div className="flex items-center gap-1">💬 {post.replies.length}</div>
                        <div className="flex items-center gap-1">♥ {post.likes}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
