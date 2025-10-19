import React, { useMemo, useState } from 'react'

const AIChatButton = ({ isOpen: controlledOpen, onOpen, onClose }) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = useMemo(() => typeof controlledOpen === 'boolean', [controlledOpen])
  const isOpen = isControlled ? controlledOpen : internalOpen

  const handleOpen = () => {
    if (onOpen) {
      onOpen()
    } else {
      setInternalOpen(true)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      setInternalOpen(false)
    }
  }

  return (
    <>
      {/* Floating AI Chat Button (hidden on mobile) */}
      <button
        onClick={handleOpen}
        className="hidden sm:flex fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg items-center justify-center text-white transition-all duration-200 z-40"
      >
        <span className="text-lg">🤖</span>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-200 z-40 opacity-0 pointer-events-none"
        id="scrollToTop"
      >
        <span className="text-lg">↑</span>
      </button>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI Assistant
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Hello! I'm your AI assistant. How can I help you today?
              </p>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatButton