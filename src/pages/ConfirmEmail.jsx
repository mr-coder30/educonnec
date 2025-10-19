import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmEmail = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check your email
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a confirmation link to your email address. 
            Please click the link to verify your account and start using CollabHub.
          </p>
          
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Go to Dashboard
            </Link>
            
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Resend confirmation email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail