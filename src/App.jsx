import { useState, useEffect } from 'react'
import './App.css'

// Import das imagens
import logo from './assets/6.png'
import brandingPersonas from './assets/branding-personas.png'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    tipoNegocio: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interestedCount, setInterestedCount] = useState(847)
  
  // Links WhatsApp
  const WHATSAPP_GROUP = "https://chat.whatsapp.com/Khg8qyMF36x3QSC4SWr5q4"
  const WHATSAPP_CHAT = `https://wa.me/5511955003236?text=${encodeURIComponent(
    "Olá! Me interessei pelo JurisClub™ e gostaria de saber mais sobre o lançamento. Acabei de me cadastrar na lista de espera!"
  )}`

  useEffect(() => {
    const timer = setInterval(() => {
      setInterestedCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Integração Google Sheets via Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbwlfHcnRNGpaf9Y1Pa5vGPTzehqFerTxzKd6fdDAzmLNG7PkaQ5mQboHn0r92jXH1k/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          tipoNegocio: formData.tipoNegocio,
          timestamp: new Date().toISOString()
        })
      })
      
      setIsSubmitted(true)
      setInterestedCount(prev => prev + 1)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setIsSubmitted(true) // Mostrar página de sucesso mesmo com erro
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="success-page">
        <div className="container">
          <div className="success-container">
            <div className="success-icon">🎉</div>
            <h1>Obrigado!</h1>
            <p>Você será <strong>notificado em primeira mão</strong> quando o JurisClub™ estiver pronto!</p>
            
            <div className="success-stats">
              <div className="stat">
                <span className="stat-number">{interestedCount}</span>
                <span className="stat-label">pessoas interessadas</span>
              </div>
            </div>
            
            <div className="success-actions">
              <a href={WHATSAPP_GROUP} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                📱 Entrar no Grupo VIP
              </a>
              <a href={WHATSAPP_CHAT} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                💬 Falar Conosco
              </a>
            </div>
            
            <button onClick={() => setIsSubmitted(false)} className="btn btn-link">
              ← Voltar ao início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <a href="#sobre">Sobre</a>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#lista-vip">Lista VIP</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - LAYOUT CORRETO COMO NA IMAGEM */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* Lado Esquerdo: Logo + Texto */}
            <div className="hero-left">
              <div className="hero-logo">
                <img src={logo} alt="JurisClub" className="logo-main" />
                <h1 className="logo-text">JurisClub</h1>
              </div>
              
              <div className="hero-text">
                <h2 className="hero-title">
                  Você cria, vende e atende.<br />
                  <span className="highlight">A gente cuida da sua proteção legal.</span>
                </h2>
                
                <p className="hero-subtitle">
                  O JurisClub™ está sendo desenvolvido para democratizar o acesso à proteção jurídica para MEI, Freelancers e Criadores de Conteúdo no Brasil.
                </p>
                
                <div className="launch-info">
                  <p className="launch-date">🚀 <strong>Lançamento oficial: Out/2025</strong></p>
                  <p className="contact-info">💬 Fale com nosso time no <a href="mailto:contato@jurisclub.com.br">contato@jurisclub.com.br</a></p>
                </div>
                
                <div className="hero-cta">
                  <a href="#lista-vip" className="btn btn-primary btn-large">
                    🔔 Quero ser notificado
                  </a>
                  <p className="cta-subtitle">Seja o primeiro a ter acesso • Gratuito</p>
                  
                  <div className="social-proof">
                    <span className="social-proof-count">+{interestedCount}</span>
                    <span className="social-proof-text">Empreendedores interessados</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lado Direito: Personas */}
            <div className="hero-right">
              <img src={brandingPersonas} alt="Personas JurisClub" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">⚡</div>
              <h3>Documentos em minutos, não semanas</h3>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💎</div>
              <h3>Qualidade</h3>
              <p>Revisado por advogados especialistas</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🎯</div>
              <h3>Personalização</h3>
              <p>Específico para seu tipo de negócio</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🛡️</div>
              <h3>Segurança</h3>
              <p>Especialistas disponíveis quando precisar</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💰</div>
              <h3>Economia</h3>
              <p>Até 90% mais barato que o tradicional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="signup" id="lista-vip">
        <div className="container">
          <div className="signup-content">
            <div className="signup-text">
              <h2>🔔 Entre para nossa Lista VIP e receba em primeira mão!</h2>
              
              <div className="signup-benefits">
                <div className="signup-benefit">
                  <span className="benefit-icon">🎁</span>
                  Kit Proteção Jurídica GRÁTIS
                </div>
                <div className="signup-benefit">
                  <span className="benefit-icon">💰</span>
                  Acesso antecipado
                </div>
                <div className="signup-benefit">
                  <span className="benefit-icon">📚</span>
                  Materiais exclusivos
                </div>
              </div>
            </div>
            
            <div className="signup-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome completo *</label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <small>Para receber atualizações sobre o lançamento</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp (opcional)</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  />
                  <small>Para atualizações rápidas via WhatsApp</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="tipoNegocio">Tipo do seu negócio *</label>
                  <select
                    id="tipoNegocio"
                    value={formData.tipoNegocio}
                    onChange={(e) => handleInputChange('tipoNegocio', e.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="MEI">MEI (Microempreendedor Individual)</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Criador">Criador de Conteúdo</option>
                    <option value="Consultor">Consultor</option>
                    <option value="Designer">Designer</option>
                    <option value="Desenvolvedor">Desenvolvedor</option>
                    <option value="Coach">Coach/Terapeuta</option>
                    <option value="Vendedor">Vendedor Online</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : '🔔 Quero ser notificado'}
                </button>
              </form>
              
              <div className="form-guarantees">
                <p>✅ Seus dados estão seguros conosco</p>
                <p>✅ Sem spam, apenas atualizações relevantes</p>
                <p>✅ Você pode cancelar a qualquer momento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="JurisClub" />
              <p>Democratizando a proteção jurídica no Brasil</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 JurisClub™. Todos os direitos reservados.</p>
            <p>Em desenvolvimento • Lançamento em breve</p>
          </div>
        </div>
      </footer>
      <a href="https://www.notion.so/Pol-tica-de-Privacidade-28d811415d2880c2865fd517e2a4dbdd" target="_blank">
  Política de Privacidade
</a>
    </div>
  )
}

export default App

