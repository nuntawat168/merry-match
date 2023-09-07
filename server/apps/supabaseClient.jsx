import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gacngpsoekbrifxahpkg.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhY25ncHNvZWticmlmeGFocGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1Mzk4MTQsImV4cCI6MjAwOTExNTgxNH0.FsPo5sRvcobf8AchCc51g32FGRBVtuSw0oXSPKuJwms'

export const supabase = createClient(supabaseUrl,supabaseAnonKey)