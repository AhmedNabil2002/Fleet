'use server'

export interface LoginUser {
  username: string
  email: string
  lastActive: string
  UserTypeID: number
  userTypeName: string
  UserDepartmentID: number
  UserDepartmentName: string
  UserOrgID: number
  ImageSrc: string
  OrgLogo: string
  OrgNameAr: string
  OrgNameEn: string
  VehicleID: string | null
}

export type SignInState = {
  error?: string
  success?: boolean
  accessToken?: string
  refreshToken?: string
  user?: LoginUser
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

export async function signIn(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const emailOrUsername = formData.get('emailOrUsername') as string
  const password = formData.get('password') as string

  if (!emailOrUsername || !password) {
    return { error: 'Username and password are required.' }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrUsername,
        password,
        fcmToken: '',
      }),
    })

    const data = await res.json()

    if (!res.ok || data?.status !== 'success') {
      return {
        error: data?.message || data?.error || 'Invalid username or password.',
      }
    }

    const accessToken = data.data.accessToken
    const refreshToken = data.data.refreshToken
    const user = data.data.user as LoginUser

    if (!accessToken) {
      return { error: 'Login succeeded but no token was returned.' }
    }

    return {
      success: true,
      accessToken,
      refreshToken,
      user,
    }
  } catch {
    return { error: 'Unable to connect to the server. Please try again.' }
  }
}