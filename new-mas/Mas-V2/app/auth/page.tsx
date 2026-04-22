'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { signIn, type SignInState } from './actions'

const initialState: SignInState = {}

export default function AuthPage() {
  const [state, action, pending] = useActionState(signIn, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (state.success && state.accessToken && state.user) {
      localStorage.setItem('accessToken', state.accessToken)
      if (state.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken)
      }
      localStorage.setItem('user', JSON.stringify(state.user))
      router.push('/')
    }
  }, [state, router])

  return (
    <div className="min-h-screen w-full bg-[#6C8BE6] flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-16 xl:p-20">
      {/* Inner white card — responsive size */}
      <div
        className="
          w-full
          max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
          bg-white
          rounded-2xl sm:rounded-3xl md:rounded-[40px]
          overflow-hidden
          grid grid-cols-1 md:grid-cols-5
          min-h-[480px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] xl:min-h-[720px]
          shadow-2xl
        "
      >
        {/* Left: Blue branded section */}
        <div
          className="
            md:col-span-2
            bg-[#8AA3EA]
            p-6 sm:p-8 md:p-10 lg:p-14
            flex flex-col
            items-center md:items-start
            justify-center md:justify-between
            text-center md:text-left
            relative
            gap-6 md:gap-0
          "
        >
          {/* Heading */}
          <div>
            <h1
              className="
                text-white
                text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                font-light leading-relaxed
              "
            >
              Run your factory
              <br />
              smarter with
              <br />
              <span className="font-bold text-blue-950">Aureus ERP</span>
              <br />
              built for production.
            </h1>
          </div>

          {/* Logo */}
          <div className="flex items-center md:items-end justify-center md:justify-start md:py-8">
            <div
              className="
                relative
                w-20 h-20
                sm:w-28 sm:h-28
                md:w-36 md:h-36
                lg:w-48 lg:h-48
                xl:w-56 xl:h-56
              "
            >
              <Image
                src="/assets/AUREUS.png"
                alt="Aureus ERP"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Footer — hidden on mobile, visible from md up */}
          <p className="hidden md:block text-white/60 text-[10px] sm:text-xs">
            aureus-erp.com
          </p>
        </div>

        {/* Right: Sign-in form */}
        <div
          className="
            md:col-span-3
            bg-white
            p-6 sm:p-8 md:p-10 lg:p-16 xl:p-20
            flex flex-col justify-center
          "
        >
          <div className="max-w-sm lg:max-w-md mx-auto w-full">
            <h2
              className="
                text-sm sm:text-base lg:text-xl
                font-bold text-gray-900
                mb-6 sm:mb-8 md:mb-12
              "
            >
              Sign-in
            </h2>

            <form action={action} className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Email / Username */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-[15px] text-gray-400 mb-0.5"
                >
                  Email
                </label>
                <input
                  id="emailOrUsername"
                  name="emailOrUsername"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full border-0 border-l-1 px-2 rounded-lg border-b border-gray-300 bg-transparent px-0 py-1 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6C8BE6] focus:outline-none focus:ring-0 transition-colors"
                />
              </div>

              {/* Password with toggle */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[15px] text-gray-400 mb-0.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                  className="block w-full border-0 border-l-1 px-2 rounded-lg border-b border-gray-300 bg-transparent px-0 py-1 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6C8BE6] focus:outline-none focus:ring-0 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-[#6C8BE6] transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-3.5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="size-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {state.error && (
                <div className="rounded-md bg-red-50 border border-red-200 px-3 py-1.5">
                  <p className="text-[11px] text-red-600">{state.error}</p>
                </div>
              )}

              {/* Submit */}
              <div className="pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex w-full justify-center rounded-md bg-[#6C8BE6] px-4 py-2 lg:py-2.5 text-[11px] sm:text-xs font-bold text-white hover:bg-[#5B7AD5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pending ? 'Signing in…' : 'Login'}
                </button>
              </div>
            </form>

            <p className="mt-5 sm:mt-6 text-center text-[11px] sm:text-xs text-gray-500">
              Need factory access?{' '}
              <a
                href="#"
                className="font-bold text-[#6C8BE6] hover:text-[#5B7AD5] transition-colors"
              >
                Contact Admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}