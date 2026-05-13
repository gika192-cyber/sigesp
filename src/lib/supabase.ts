import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export interface Equipe { id: string; nome: string; cor: string; icone: string; ativa: boolean; criado_em: string }
export interface Servico { id: string; equipe_id?: string; tipo_id?: string; status: string; data_servico: string; descricao?: string; logradouro?: string; bairro?: string; latitude?: number; longitude?: number; criado_em: string }
export interface Foto { id: string; servico_id: string; fase: string; url: string; criado_em: string }
export interface Usuario { id: string; nome: string; email: string; perfil: string; equipe_id?: string; ativo: boolean }
export interface Demanda { id: string; titulo: string; prioridade: string; status: string; equipe_id?: string; prazo?: string; criado_em: string }
