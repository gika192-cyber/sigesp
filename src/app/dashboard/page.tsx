'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ hoje: 0, mes: 0, demandas: 0, equipes: 0 })
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const hoje = new Date().toISOString().split('T')[0]
      const mesInicio = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
      const [a, b, c, d] = await Promise.all([
        supabase.from('servicos').select('*',{count:'exact',head:true}).gte('criado_em', hoje),
        supabase.from('servicos').select('*',{count:'exact',head:true}).gte('criado_em', mesInicio),
        supabase.from('demandas').select('*',{count:'exact',head:true}).eq('status','aberta'),
        supabase.from('equipes').select('*',{count:'exact',head:true}).eq('ativa',true),
      ])
      setStats({ hoje: a.count||0, mes: b.count||0, demandas: c.count||0, equipes: d.count||0 })
      setLoading(false)
    }
    init()
  }, [router])
  if (loading) return <div style={{minHeight:'100vh',background:'#0d1117',display:'flex',alignItems:'center',justifyContent:'center',color:'#8b949e'}}>Carregando...</div>
  return (
    <div style={{minHeight:'100vh',background:'#0d1117',fontFamily:'DM Sans,sans-serif'}}>
      <div style={{background:'#161b22',borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'0 24px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',background:'linear-gradient(135deg,#2f81f7,#a371f7)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'800',fontSize:'12px',color:'white'}}>SG</div>
          <span style={{color:'#e6edf3',fontWeight:'700',fontSize:'15px'}}>SIGESP</span>
          <span style={{color:'#6e7681',fontSize:'13px'}}>· Dashboard</span>
        </div>
        <button onClick={()=>supabase.auth.signOut().then(()=>router.push('/login'))} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px',color:'#8b949e',padding:'6px 14px',cursor:'pointer',fontSize:'13px'}}>Sair</button>
      </div>
      <div style={{padding:'32px 24px',maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{marginBottom:'32px'}}>
          <h1 style={{color:'#e6edf3',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>Painel Geral</h1>
          <p style={{color:'#8b949e',fontSize:'13px'}}>Secretaria de Infraestrutura · Castro Alves BA</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'14px',marginBottom:'32px'}}>
          {[
            {label:'Serviços hoje',value:stats.hoje,icon:'🔧',cor:'#2f81f7'},
            {label:'Serviços no mês',value:stats.mes,icon:'📋',cor:'#3fb950'},
            {label:'Demandas abertas',value:stats.demandas,icon:'⚠️',cor:'#d29922'},
            {label:'Equipes ativas',value:stats.equipes,icon:'👥',cor:'#a371f7'},
          ].map((k,i)=>(
            <div key={i} style={{background:'#161b22',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'20px',borderBottom:`3px solid ${k.cor}`}}>
              <div style={{fontSize:'24px',marginBottom:'12px'}}>{k.icon}</div>
              <div style={{fontSize:'36px',fontWeight:'800',color:'#e6edf3',lineHeight:1,marginBottom:'6px'}}>{k.value}</div>
              <div style={{fontSize:'13px',color:'#8b949e'}}>{k.label}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#161b22',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'24px'}}>
          <p style={{color:'#e6edf3',fontWeight:'600',fontSize:'15px',marginBottom:'16px'}}>Ações Rápidas</p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            {[{l:'+ Novo Serviço',c:'#2f81f7'},{l:'+ Nova Demanda',c:'#d29922'},{l:'👥 Equipes',c:'#3fb950'},{l:'📄 Relatórios',c:'#a371f7'}].map((b,i)=>(
              <button key={i} style={{background:'transparent',border:`1px solid ${b.c}`,borderRadius:'8px',color:b.c,padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'500'}}>{b.l}</button>
            ))}
          </div>
        </div>
        <p style={{color:'#6e7681',fontSize:'12px',textAlign:'center',marginTop:'48px'}}>SIGESP v1.0 · Sistema funcionando ✓</p>
      </div>
    </div>
  )
}
