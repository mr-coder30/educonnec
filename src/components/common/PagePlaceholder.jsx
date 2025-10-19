import React from 'react'

const PagePlaceholder = ({ title, description }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-200 text-2xl font-semibold">
        📌
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        {description && (
          <p className="max-w-2xl text-gray-600 dark:text-gray-300 text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default PagePlaceholder
