import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'removed', label: 'Removed' }
]

const AddRepresentativeModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    role: 'Community Representative',
    status: 'pending',
    events: true,
    wall: true,
    collaborations: false
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department.trim() || 'General',
      role: form.role.trim() || 'Community Representative',
      status: form.status,
      assignedRights: {
        events: form.events,
        wall: form.wall,
        collaborations: form.collaborations
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Invite representative</h3>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Full name *</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Email *</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Department</span>
              <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="e.g. Innovation Lab" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Role title</span>
              <input type="text" name="role" value={form.role} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="radio" name="status" value="pending" checked={form.status === 'pending'} onChange={handleChange} className="h-4 w-4" />
              Pending approval
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="radio" name="status" value="active" checked={form.status === 'active'} onChange={handleChange} className="h-4 w-4" />
              Activate instantly
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Permissions</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                { key: 'events', label: 'Create events' },
                { key: 'wall', label: 'Post on wall' },
                { key: 'collaborations', label: 'Manage collaborations' }
              ].map((permission) => (
                <label key={permission.key} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="checkbox" name={permission.key} checked={form[permission.key]} onChange={handleChange} className="h-4 w-4" />
                  {permission.label}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30">
              Send invite
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const PermissionModal = ({ rep, onClose, onSave }) => {
  const [permissions, setPermissions] = useState({
    events: rep.assignedRights.events,
    wall: rep.assignedRights.wall,
    collaborations: rep.assignedRights.collaborations
  })

  const handleChange = (event) => {
    const { name, checked } = event.target
    setPermissions((previous) => ({ ...previous, [name]: checked }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(permissions)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Manage permissions</h3>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Create events</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Allow this rep to publish and edit campus events.</p>
            </div>
            <input type="checkbox" name="events" checked={permissions.events} onChange={handleChange} className="h-5 w-5" />
          </label>
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Post on wall</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Give access to publish notices and respond to comments.</p>
            </div>
            <input type="checkbox" name="wall" checked={permissions.wall} onChange={handleChange} className="h-5 w-5" />
          </label>
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Manage collaborations</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Allow this rep to coordinate partner college requests.</p>
            </div>
            <input type="checkbox" name="collaborations" checked={permissions.collaborations} onChange={handleChange} className="h-5 w-5" />
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const CollegeAdminRepresentatives = () => {
  const {
    representatives,
    approveRepresentative,
    removeRepresentative,
    promoteRepresentative,
    updateRepresentativePermissions,
    addRepresentative
  } = useCollegeAdminData()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [permissionTarget, setPermissionTarget] = useState(null)

  const filteredRepresentatives = useMemo(() => {
    const sanitized = searchTerm.trim().toLowerCase()
    return representatives
      .filter((rep) => {
        if (statusFilter === 'all') return true
        return rep.status === statusFilter
      })
      .filter((rep) => {
        if (!sanitized) return true
        return [rep.name, rep.email, rep.department, rep.role].some((field) => field?.toLowerCase().includes(sanitized))
      })
  }, [representatives, searchTerm, statusFilter])

  const handleInvite = (payload) => {
    addRepresentative(payload)
  }

  const handlePermissionSave = (permissions) => {
    if (!permissionTarget) return
    updateRepresentativePermissions(permissionTarget.id, permissions)
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Manage representatives</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Approve new signups, fine-tune permissions, and empower campus leads.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900">
            <Icon name="search" className="h-4 w-4 text-slate-400" />
            <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search representatives" className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200" />
          </div>
          <button type="button" onClick={() => setShowAddModal(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30">
            <Icon name="plus" className="h-4 w-4" />
            Invite representative
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setStatusFilter(filter.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              statusFilter === filter.id
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
                : 'border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="hidden rounded-[28px] border border-slate-200/70 bg-white/95 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80 lg:block">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-50/60 dark:bg-slate-900/40">
            <tr>
              {['Name', 'Email', 'Department', 'Role', 'Status', 'Actions'].map((column) => (
                <th key={column} scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {filteredRepresentatives.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-300">
                  No representatives found for the selected filters.
                </td>
              </tr>
            )}
            {filteredRepresentatives.map((rep) => (
              <tr key={rep.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-base font-semibold text-blue-600 dark:bg-white/10 dark:text-blue-200">
                      {rep.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{rep.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{rep.since !== '—' ? `Since ${rep.since}` : 'Awaiting activation'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{rep.email}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{rep.department || '—'}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{rep.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    rep.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                      : rep.status === 'pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
                  }`}> {rep.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    {rep.status !== 'active' && (
                      <button type="button" onClick={() => approveRepresentative(rep.id)} className="rounded-full border border-emerald-200 px-3 py-1 text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40">
                        Approve
                      </button>
                    )}
                    {rep.status !== 'removed' && (
                      <button type="button" onClick={() => removeRepresentative(rep.id)} className="rounded-full border border-slate-200 px-3 py-1 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        Remove
                      </button>
                    )}
                    <button type="button" onClick={() => promoteRepresentative(rep.id)} className="rounded-full border border-blue-200 px-3 py-1 text-blue-500 transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/40">
                      Promote
                    </button>
                    <button type="button" onClick={() => setPermissionTarget(rep)} className="rounded-full border border-purple-200 px-3 py-1 text-purple-500 transition hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-200 dark:hover:bg-purple-900/40">
                      Permissions
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {filteredRepresentatives.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 text-center text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            No representatives found for the selected filters.
          </div>
        )}
        {filteredRepresentatives.map((rep) => (
          <article key={rep.id} className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 text-lg font-semibold text-blue-600 dark:bg-white/10 dark:text-blue-200">
                  {rep.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{rep.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300">{rep.department || rep.role}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                rep.status === 'active'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                  : rep.status === 'pending'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
              }`}>{rep.status}</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="break-all">{rep.email}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Permissions: {['events', 'wall', 'collaborations'].filter((key) => rep.assignedRights[key]).join(', ') || 'None'}.</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
              {rep.status !== 'active' && (
                <button type="button" onClick={() => approveRepresentative(rep.id)} className="rounded-xl border border-emerald-200 px-3 py-2 text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40">
                  Approve
                </button>
              )}
              <button type="button" onClick={() => setPermissionTarget(rep)} className="rounded-xl border border-purple-200 px-3 py-2 text-purple-500 transition hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-200 dark:hover:bg-purple-900/40">
                Permissions
              </button>
              <button type="button" onClick={() => promoteRepresentative(rep.id)} className="rounded-xl border border-blue-200 px-3 py-2 text-blue-500 transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/40">
                Promote
              </button>
              <button type="button" onClick={() => removeRepresentative(rep.id)} className="rounded-xl border border-slate-200 px-3 py-2 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {showAddModal && <AddRepresentativeModal onClose={() => setShowAddModal(false)} onSubmit={handleInvite} />}
      {permissionTarget && (
        <PermissionModal
          rep={permissionTarget}
          onClose={() => setPermissionTarget(null)}
          onSave={(permissions) => handlePermissionSave(permissions)}
        />
      )}
    </div>
  )
}

export default CollegeAdminRepresentatives
