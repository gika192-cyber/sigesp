'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const handleLogin = async () => {
    setLoading(true); setErro('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) { setErro('E-mail ou senha incorretos.'); setLoading(false) }
    else router.push('/dashboard')
  }
  return (
    <div style={{minHeight:'100vh',background:'#0d1117',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,sans-serif',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'400px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{width:'60px',height:'60px',background:'linear-gradient(135deg,#2f81f7,#a371f7)',borderRadius:'16px',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'800',color:'white',marginBottom:'16px'}}>SG</div>
          <h1 style={{color:'#e6edf3',fontSize:'28px',fontWeight:'800',marginBottom:'4px'}}>SIGESP</h1>
          <p style={{color:'#8b949e',fontSize:'14px'}}>Prefeitura de Castro Alves — BA</p>
        </div>
        <div style={{background:'#161b22',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'32px'}}>
          <p style={{color:'#e6edf3',fontWeight:'600',fontSize:'16px',marginBottom:'24px'}}>Acesso ao Sistema</p>
          {erro && <div style={{background:'rgba(248,81,73,0.1)',border:'1px solid rgba(248,81,73,0.3)',borderRadius:'8px',padding:'10px 14px',color:'#f85149',fontSize:'13px',marginBottom:'16px'}}>{erro}</div>}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',color:'#8b949e',fontSize:'13px',marginBottom:'6px'}}>E-mail</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" style={{width:'100%',background:'#0d1117',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'11px 14px',color:'#e6edf3',fontSize:'14px',outline:'none'}}/>
          </div>
          <div style={{marginBottom:'28px'}}>
            <label style={{display:'block',color:'#8b949e',fontSize:'13px',marginBottom:'6px'}}>Senha</label>
            <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••" style={{width:'100%',background:'#0d1117',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'11px 14px',color:'#e6edf3',fontSize:'14px',outline:'none'}}/>
          </div>
          <button onClick={handleLogin} disabled={loading||!email||!senha} style={{width:'100%',background:loading||!email||!senha?'#1c2333':'#2f81f7',border:'none',borderRadius:'8px',padding:'13px',color:loading||!email||!senha?'#6e7681':'white',fontSize:'15px',fontWeight:'600',cursor:loading||!email||!senha?'not-allowed':'pointer'}}>
            {loading?'Entrando...':'Entrar no Sistema'}
          </button>
        </div>
        <p style={{textAlign:'center',color:'#6e7681',fontSize:'12px',marginTop:'24px'}}>Secretaria de Infraestrutura · Castro Alves BA</p>
      </div>
    </div>
  )
}
