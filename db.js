const { createClient } = require('@supabase/supabase-js');

// Sustituye con las credenciales de tu consola de Supabase 
// (Project Settings > API)
const SUPABASE_URL = 'https://siunvpcpsqmckslfhcpb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B_r3l0RE6RK_TAFYfZTmPg_o-uJ-52i';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;