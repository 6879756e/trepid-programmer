'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, headers } from 'next/headers' // <--- 1. Add 'headers' here
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const cookieStore = await cookies()
  const origin = (await headers()).get('origin') // <--- 2. Get the current website URL

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // 3. Use the dynamic origin instead of localhost
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    redirect('/error')
  }

  redirect('/check-email')
}