import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aemnvaxqwivckkzqsjjw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const SUPABASE_LS_AUTH_KEY = 'sb-aemnvaxqwivckkzqsjjw-auth-token'

export const supabase = createClient(supabaseUrl, supabaseKey)
