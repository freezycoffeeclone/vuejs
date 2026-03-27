import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabasePublishableKey = process.env.VUE_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey)