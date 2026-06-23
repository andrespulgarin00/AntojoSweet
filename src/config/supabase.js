import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://gueldppqcdiartqemrgo.supabase.co";
const SUPABASE_KEY = "sb_publishable_qBsG2oQHg4WlGeCYFoUyyg_oDRQWn-U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);