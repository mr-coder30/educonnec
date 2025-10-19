import React from 'react'

const FullPageLoader = ({ message }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white dark:bg-gray-900">
    <img
      src="https://i.postimg.cc/c1tHCRSr/STUD-CONNECT-1-removebg-preview.png"
      alt="Loading"
      className="h-32 w-32 animate-pulse"
    />
    {message && (
      <p className="text-base font-medium text-gray-600 dark:text-gray-300">
        {message}
      </p>
    )}
  </div>
)

export default FullPageLoader
