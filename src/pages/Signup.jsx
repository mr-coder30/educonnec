import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Icon from '../components/common/Icon'

const Signup = () => {
  const { login } = useAuth()
  const initialFormState = useMemo(() => ({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    studying: '',
    college: '',
    bio: '',
    profilePicture: null,
    institutionName: '',
    contactEmail: '',
    website: '',
    description: '',
    logo: null,
    designation: '',
    phone: '',
    location: ''
  }), [])
  const [formData, setFormData] = useState(initialFormState)
  const [selectedRole, setSelectedRole] = useState('')

  const studyOptions = useMemo(() => (
    ['B.Tech', 'M.Tech', 'PhD', 'B.Sc', 'M.Sc', 'B.A', 'M.A', 'Other']
  ), [])

  const colleges = useMemo(() => (
    ['MIT', 'Stanford', 'Harvard', 'IIT Bombay', 'IIT Delhi', 'University of Tokyo', 'Other']
  ), [])

  const roleOptions = useMemo(() => ([
    {
      value: 'student',
      title: 'Student',
      description: 'Create a learner profile, join events, and find collaborators.',
      icon: 'roleStudent',
      gradient: 'bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500'
    },
    {
      value: 'college',
      title: 'College',
      description: 'Showcase campus initiatives and engage with a vibrant community.',
      icon: 'organization',
      gradient: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500'
    },
    {
      value: 'representative',
      title: 'College Representative',
      description: 'Manage your institution’s presence and connect with students directly.',
      icon: 'collaboration',
      gradient: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500'
    }
  ]), [])

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setFormData({ ...initialFormState })
  }

  const handleRoleReset = () => {
    setSelectedRole('')
    setFormData({ ...initialFormState })
  }

  const activeRole = useMemo(() => (
    roleOptions.find(option => option.value === selectedRole) || null
  ), [roleOptions, selectedRole])

  const renderRoleSpecificFields = () => {
    if (selectedRole === 'student') {
      return (
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/80 p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Personal details
            </h3>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Full name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Aditi Sharma"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Username *
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 hidden sm:flex items-center text-gray-400">
                    educonnec.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="your-handle"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 sm:pl-40 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                  Profile link will be <span className="font-semibold">educonnec.com/your-handle</span>.
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  College email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@yourcollege.edu"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use an institute verified email so teams can trust your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/80 p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Academic snapshot
            </h3>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Current program *
                </label>
                <select
                  name="studying"
                  required
                  value={formData.studying}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your program</option>
                  {studyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  College / University *
                </label>
                <select
                  name="college"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your college</option>
                  {colleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Short bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  placeholder="Share what you love to work on, recent achievements, or interests."
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/80 p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Login security
            </h3>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Create password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Confirm password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-dashed border-blue-300 dark:border-blue-700 bg-blue-50/70 dark:bg-blue-900/20 p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-200">
              Profile photo (optional)
            </h3>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 font-semibold shadow-sm">
                  <Icon name="camera" className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Upload a clear picture of yourself.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recommended square image, JPG or PNG up to 5MB.</p>
                </div>
              </div>
              <label className="inline-flex w-full md:w-auto justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 transition">
                Upload photo
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )
    }

    if (selectedRole === 'college') {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Institution Name *
            </label>
            <input
              type="text"
              name="institutionName"
              required
              value={formData.institutionName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Official Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              About the Institution
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upload Institution Logo
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-dashed border-blue-300 dark:border-blue-700 bg-blue-50/60 dark:bg-blue-900/20 px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 font-semibold shadow-sm">
                  <Icon name="organization" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Upload your institution logo</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG up to 5MB</p>
                </div>
              </div>
              <label className="inline-flex px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 transition">
                Upload
                <input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )
    }

    if (selectedRole === 'representative') {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Designation *
            </label>
            <input
              type="text"
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              College *
            </label>
            <select
              name="college"
              required
              value={formData.college}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select the college you represent</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              About You
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upload Profile Picture
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-dashed border-blue-300 dark:border-blue-700 bg-blue-50/60 dark:bg-blue-900/20 px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 font-semibold shadow-sm">
                  <Icon name="roleStudent" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Upload your profile photo</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG up to 5MB</p>
                </div>
              </div>
              <label className="inline-flex px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 transition">
                Upload
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files.length ? files[0] : null }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedRole) {
      alert('Please choose a category before continuing.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    let userData = {
      id: Date.now(),
      role: selectedRole
    }

    if (selectedRole === 'student') {
      userData = {
        ...userData,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        studying: formData.studying,
        college: formData.college,
        bio: formData.bio,
        profilePicture: formData.profilePicture
          ? URL.createObjectURL(formData.profilePicture)
          : '/default-avatar.png'
      }
    } else if (selectedRole === 'college') {
      userData = {
        ...userData,
        name: formData.institutionName,
        email: formData.contactEmail,
        website: formData.website,
        description: formData.description,
        location: formData.location,
        logo: formData.logo ? URL.createObjectURL(formData.logo) : '/default-avatar.png',
      };
    } else if (selectedRole === 'representative') {
      userData = {
        ...userData,
        name: formData.name,
        designation: formData.designation,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        bio: formData.bio,
        profilePicture: formData.profilePicture
          ? URL.createObjectURL(formData.profilePicture)
          : '/default-avatar.png',
      };
    }

    login(userData)
    setFormData(initialFormState)
    setSelectedRole('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="relative max-w-6xl xl:max-w-7xl w-full">
        <div className="hidden sm:block absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur opacity-60" aria-hidden="true"></div>
        <div className="relative rounded-3xl bg-white/95 dark:bg-gray-900/90 backdrop-blur border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
          <div className="grid xl:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6 sm:gap-10 p-6 sm:p-12 xl:p-14">
              <div className="sm-hidden">
                <div className="flex items-center justify-between text-purple-700">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-purple-400">Educonnec</p>
                    <p className="text-base font-semibold text-purple-700">Create account</p>
                  </div>
                  <button type="button" className="text-xs font-semibold text-purple-500">Need help?</button>
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-flex w-full sm:w-auto justify-center sm:justify-start items-center px-4 py-1 rounded-full bg-white/80 text-purple-700 sm:bg-blue-100 sm:text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 text-xs font-semibold uppercase tracking-wide">
                  Step into Educonnec
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                  Create your vibrant profile
                </h1>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {!selectedRole && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                      Choose how you want to join
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {roleOptions.map((role) => {
                        const isActive = selectedRole === role.value;
                        return (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => handleRoleSelect(role.value)}
                            className={`flex flex-col gap-3 rounded-3xl px-5 py-5 text-left transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                              isActive
                                ? `${role.gradient} text-white shadow-xl scale-[1.02]`
                                : 'bg-white text-gray-900 shadow-md border border-purple-100/60 hover:-translate-y-1 dark:bg-gray-800/80 dark:text-white'
                            }`}
                          >
                            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                              isActive
                                ? 'bg-white/25 text-white'
                                : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-500 dark:text-white dark:bg-white/10'
                            }`}>
                              {role.icon}
                            </span>
                            <div className="space-y-1">
                              <span className={`block text-lg font-semibold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                {role.title}
                              </span>
                              <span className={`block text-sm ${isActive ? 'text-purple-50/90' : 'text-gray-500 dark:text-gray-300'}`}>
                                {role.description}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeRole ? (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-purple-100/90 sm:bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-purple-200 sm:border-blue-200 dark:border-blue-800 px-5 py-5 sm:py-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white text-lg shadow">
                          {activeRole.icon}
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-purple-700 sm:text-blue-700 dark:text-blue-200">
                            You are signing up as {activeRole.title}
                          </p>
                          <p className="text-xs text-purple-600/90 sm:text-blue-600/80 dark:text-blue-300/80">
                            Fill in the details below to personalize your profile.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRoleReset}
                        className="self-start sm:self-auto inline-flex items-center gap-1 rounded-xl border border-purple-300 bg-white px-3 py-1.5 text-sm font-semibold text-purple-600 transition hover:bg-purple-50 sm:border-blue-300 sm:text-blue-600 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                      >
                        Change role
                      </button>
                    </div>

                    {renderRoleSpecificFields()}

                    <div className="space-y-4">
                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-transform hover:-translate-y-0.5"
                        disabled={!selectedRole}
                      >
                        Create account
                      </button>

                      <div className="text-center text-sm text-gray-500 sm:text-gray-600 dark:text-gray-400">
                        Already have an account?
                        {' '}
                        <Link to="/login" className="font-semibold text-purple-600 sm:text-blue-600 dark:text-blue-400 hover:text-blue-500">
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-purple-200/70 dark:border-purple-600/70 bg-white/95 dark:bg-gray-800/70 px-6 py-12 text-center shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white shadow-md">
                      <Icon name="sparkles" className="h-6 w-6" />
                    </span>
                    <p className="text-lg font-semibold text-purple-700 dark:text-purple-200">
                      Select a category to continue
                    </p>
                    <p className="text-xs text-purple-500 max-w-xs sm:hidden">
                      Pick one above to unlock the tailored signup experience.
                    </p>
                  </div>
                )}
              </div>
              <div className="sm:hidden pt-4">
                <div className="mx-auto h-1.5 w-16 rounded-full bg-purple-200"></div>
                <p className="mt-4 text-center text-[11px] text-gray-500">Swipe up to explore more opportunities once you’re in.</p>
              </div>
            </div>

            <div className="relative hidden xl:flex flex-col justify-between bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-12">
              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm font-medium">
                    Why join us?
                  </span>
                  <h2 className="mt-4 text-3xl font-bold leading-tight">
                    Shape the future of campus collaborations
                  </h2>
                </div>

                <ul className="space-y-6 text-sm text-blue-100">
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="sparkles" className="h-5 w-5" /></span>
                    <p>AI-personalized matches that connect you with peers sharing similar goals and skills.</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="rocket" className="h-5 w-5" /></span>
                    <p>Participate in curated hackathons, workshops, and competitions tailored to your passions.</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="collaboration" className="h-5 w-5" /></span>
                    <p>Build your dream team or join others working on exciting real-world ideas.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold mb-2">"CollabHub helped me find the perfect teammates for our national hackathon — we won first place!"</h3>
                  <p className="text-sm text-blue-100">— Aditi Sharma, IIT Bombay</p>
                </div>
                <div className="text-xs text-blue-200/80">
                  Over <span className="font-semibold text-white">10,000+</span> students collaborating across 80 campuses.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup