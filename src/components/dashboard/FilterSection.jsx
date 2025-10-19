import React, { useState } from 'react'

const postedByOptions = [
  { label: 'All', value: 'all' },
  { label: 'Students', value: 'students' },
  { label: 'Colleges', value: 'colleges' }
]

const categories = [
  'All',
  'Hackathons',
  'Workshops',
  'Technical Fests',
  'Cultural Fests',
  'Events',
  'Conferences',
  'Seminars'
]

const FiltersSection = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    postedBy: 'all',
    category: 'all'
  })

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <section className="rounded-[20px] border border-blue-100 bg-white p-4 shadow-md shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-950 sm:rounded-[24px] sm:p-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Filter by</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Posted by
            <select
              value={filters.postedBy}
              onChange={(event) => handleFilterChange('postedBy', event.target.value)}
              className="w-full rounded-2xl border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-600 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200 dark:focus:ring-blue-500 sm:text-sm"
            >
              {postedByOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Category
            <select
              value={filters.category}
              onChange={(event) => handleFilterChange('category', event.target.value)}
              className="w-full rounded-2xl border border-purple-200 bg-white px-3 py-2 text-xs font-medium text-purple-600 shadow-inner shadow-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-purple-200 dark:focus:ring-purple-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}

export default FiltersSection