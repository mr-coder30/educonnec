import React, { useMemo, useState } from 'react'

const collaborations = {
  current: [
    {
      id: 'collab-1',
      eventName: 'XR Innovation Parade',
      summary: 'SCAD teams up with IIT Bombay to build immersive demo pods for Techfest visitors.',
      partners: [
        { name: 'SCAD', logo: '/logos/scad.png' },
        { name: 'IIT Bombay', logo: '/logos/iitb.png' }
      ],
      hero: '/collabs/xr-parade.jpg'
    },
    {
      id: 'collab-2',
      eventName: 'Climate Data Hack Series',
      summary: 'MIT and NTU Singapore co-host a six-week data expedition focused on coastal resilience.',
      partners: [
        { name: 'MIT', logo: '/logos/mit.png' },
        { name: 'NTU Singapore', logo: '/logos/ntu.png' }
      ],
      hero: '/collabs/climate-hack.jpg'
    },
    {
      id: 'collab-3',
      eventName: 'Design Futures Residency',
      summary: 'Srishti and UCLA media labs curate a storytelling residency across art campuses.',
      partners: [
        { name: 'Srishti', logo: '/logos/srishti.png' },
        { name: 'UCLA', logo: '/logos/ucla.png' }
      ],
      hero: '/collabs/design-residency.jpg'
    }
  ],
  past: [
    {
      id: 'collab-4',
      eventName: 'BioDesign Sprint',
      summary: 'Imperial College London & Harvard med innovation clubs ran a remote-first biodesign sprint.',
      partners: [
        { name: 'Imperial College London', logo: '/logos/imperial.png' },
        { name: 'Harvard', logo: '/logos/harvard.png' }
      ],
      hero: '/collabs/bio-design.jpg'
    },
    {
      id: 'collab-5',
      eventName: 'Open Source Commons',
      summary: 'Stanford and IIT Bombay maintained shared OSS tooling for campus hackathons.',
      partners: [
        { name: 'Stanford', logo: '/logos/stanford.png' },
        { name: 'IIT Bombay', logo: '/logos/iitb.png' }
      ],
      hero: '/collabs/oss-commons.jpg'
    }
  ]
}

const tabs = [
  { key: 'current', label: 'Current Collaborations', highlight: 'from-purple-500 via-indigo-500 to-blue-500' },
  { key: 'past', label: 'Past Collaborations', highlight: 'from-slate-500 via-slate-600 to-slate-700' }
]

const CollegesCollabs = () => {
  const [activeTab, setActiveTab] = useState('current')

  const visibleCollabs = useMemo(() => collaborations[activeTab] ?? [], [activeTab])

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-20 sm:px-6 lg:px-8">
      <header className="rounded-[28px] border border-purple-200/70 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">Campus alliances</p>
          <h1 className="text-3xl font-bold">College collaborations</h1>
          <p className="text-sm text-white/85 sm:text-base">Explore how campuses co-host fests, hackathons, and shared residencies to amplify their impact.</p>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-purple-100 bg-white/95 p-1 text-sm font-semibold text-purple-500 shadow-sm shadow-purple-500/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-purple-900/40 dark:bg-slate-900/80 dark:text-purple-200">
          {tabs.map(({ key, label, highlight }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap rounded-full px-5 py-2 transition ${
                activeTab === key
                  ? `bg-gradient-to-r ${highlight} text-white shadow-md shadow-purple-500/30`
                  : 'text-purple-600 dark:text-purple-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-full border border-purple-100 bg-white px-4 py-2 text-xs font-semibold text-purple-500 shadow-sm transition hover:border-purple-300 hover:bg-purple-50 dark:border-purple-900/40 dark:bg-slate-900/80 dark:text-purple-200"
        >
          ✨ Submit a collaboration
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {visibleCollabs.map((collab) => (
          <article
            key={collab.id}
            className="group relative overflow-hidden rounded-[28px] border border-purple-100 bg-white/95 p-5 shadow-sm shadow-purple-500/10 transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/30 dark:border-purple-900/40 dark:bg-slate-900"
          >
            {collab.hero && (
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-80" style={{ backgroundImage: `url(${collab.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-hidden="true"></div>
            )}
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold leading-tight text-gray-900 break-words whitespace-normal dark:text-white sm:text-lg">{collab.eventName}</h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple-500 shadow-sm dark:border-purple-700 dark:bg-slate-900/60">{activeTab === 'current' ? 'Live' : 'Archive'}</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{collab.summary}</p>
              <div className="flex items-center gap-3">
                {collab.partners.map((partner) => (
                  <div key={partner.name} className="flex items-center gap-2 rounded-full border border-purple-100 bg-white/80 px-3 py-1 text-[11px] font-semibold text-purple-500 shadow-inner dark:border-purple-800 dark:bg-slate-900/60 dark:text-purple-200">
                    <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/40">
                      {partner.logo ? <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover" /> : partner.name.charAt(0)}
                    </span>
                    <span className="whitespace-normal leading-tight">{partner.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Co-hosted initiative</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="translate-y-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-xs font-semibold text-purple-500 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:bg-slate-900/70 dark:text-purple-200"
                  >
                    View event
                  </button>
                  <button
                    type="button"
                    className="translate-y-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-600 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:bg-slate-900/70 dark:text-blue-200"
                  >
                    Share update
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {visibleCollabs.length === 0 && (
        <div className="rounded-[28px] border border-dashed border-purple-200 bg-white/80 p-10 text-center text-sm text-gray-500 shadow-inner dark:border-purple-900/40 dark:bg-slate-900/70 dark:text-gray-400">
          No collaborations listed yet. Use the submit button to notify the network.
        </div>
      )}

      <section className="rounded-[28px] border border-purple-100 bg-white/95 p-6 shadow-inner shadow-purple-500/10 dark:border-purple-900/40 dark:bg-slate-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-purple-500 dark:text-purple-300">Collaboration graph (mock)</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">Interactive network coming soon</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCollabs.map((collab) => (
            <div key={collab.id} className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-sm dark:border-purple-800 dark:bg-slate-900/70">
              <div className="flex -space-x-2">
                {collab.partners.map((partner) => (
                  <span key={partner.name} className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-purple-200 text-xs font-semibold text-purple-600 shadow-sm dark:border-slate-800 dark:bg-purple-900/40 dark:text-purple-200">
                    {partner.logo ? <img src={partner.logo} alt={partner.name} className="h-full w-full rounded-full object-cover" /> : partner.name.charAt(0)}
                  </span>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{collab.eventName}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CollegesCollabs
