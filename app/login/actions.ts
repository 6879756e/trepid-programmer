'use server'

import { createClient } from '../utils/supabase/server' // Adjust ../.. based on exact depth if needed
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/error?message=Please enter both email and password')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Redirect to the error page with the specific message from Supabase
    // (e.g., "Invalid login credentials")
    return redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/error?message=Email and password are required')
  }

  // FIX: Ensure email and password are NOT inside a 'data' block
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      // Custom user data (like username) goes inside this data block, 
      // but NOT the email and password.
      data: {
        display_name: 'New User', 
      },
    },
  })

  if (error) {
    return redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/verify')
}