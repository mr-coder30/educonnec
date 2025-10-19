import React from 'react'

import Icon from '../components/common/Icon'
import { useDashboardData } from './DashboardDataContext'

const toneStyles = {
  success: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-700 shadow-emerald-500/20',
  info: 'border-blue-200/80 bg-blue-50/90 text-blue-700 shadow-blue-500/20',
  warning: 'border-amber-200/80 bg-amber-50/90 text-amber-700 shadow-amber-500/20'
}

const DashboardNotificationCenter = () => {
  const { alerts, dismissAlert } = useDashboardData()

  if (!alerts.length) return null

  return (
    <div className="fixed inset-x-4 top-20 z-[9999] flex flex-col gap-3 sm:items-end sm:justify-start">
      {alerts.map((alert) => {
        const styles = toneStyles[alert.tone] ?? toneStyles.info
        return (
          <div
            key={alert.id}
            className={`flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur ${styles}`}
            role="status"
            aria-live="polite"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70 shadow-inner">
              <Icon name={alert.tone === 'success' ? 'sparkles' : 'notification'} className="h-4 w-4 text-blue-500" />
            </span>
            <div className="flex-1">
              <p className="leading-snug text-current">{alert.message}</p>
              {alert.description && (
                <p className="mt-1 text-xs font-normal text-blue-500/80">{alert.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissAlert(alert.id)}
              className="rounded-full border border-white/70 px-2 py-1 text-xs text-blue-500 transition hover:bg-white/70"
            >
              Dismiss
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardNotificationCenter
