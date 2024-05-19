import { createClient } from "@supabase/supabase-js"

export default function supabase() {
    const supabaseUrl = `${__SUPABASEURL__}`
    const supabaseKey = `${__SUPABASEKEY__}`
    const supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
}