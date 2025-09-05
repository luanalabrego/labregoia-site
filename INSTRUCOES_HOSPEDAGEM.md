# Instruções de Hospedagem - Site Labrego IA

## 📋 Resumo do Projeto

Site completo da Labrego IA desenvolvido com HTML, CSS e JavaScript, otimizado para hospedagem na Hostinger.

### ✨ Características do Site:
- **Páginas**: 9 páginas completas + página 404
- **Responsivo**: Funciona em desktop, tablet e mobile
- **SEO Otimizado**: Meta tags, sitemap.xml, robots.txt
- **Performance**: Cache, compressão GZIP, otimizações
- **Segurança**: Headers de segurança configurados

---

## 🗂️ Estrutura de Arquivos

```
labrego-ia-site/
├── index.html                 # Página principal
├── 404.html                   # Página de erro personalizada
├── .htaccess                  # Configurações do servidor
├── robots.txt                 # Configurações para buscadores
├── sitemap.xml               # Mapa do site para SEO
├── assets/                    # Imagens e logos
│   ├── LogoPrincipal-1.png
│   ├── LogoPrincipal-2.png
│   ├── Luana.jpg
│   ├── Lucas.jpg
│   ├── VitrinyAI(4).png
│   └── [outras imagens...]
├── css/
│   └── styles.css            # Estilos principais
├── js/
│   └── script.js             # JavaScript principal
└── pages/                    # Páginas internas
    ├── servicos.html         # Página geral de serviços
    ├── vitriny.html          # Página do produto Vitriny AI
    ├── sobre.html            # Página sobre a empresa
    ├── cases.html            # Cases de sucesso
    ├── aplicativos-sob-medida.html
    ├── automacao-processos.html
    ├── inteligencia-artificial.html
    └── agentes-inteligentes.html
```

---

## 🚀 Como Hospedar na Hostinger

### Passo 1: Preparar os Arquivos
1. Faça download de todos os arquivos da pasta `labrego-ia-site/`
2. Mantenha a estrutura de pastas exatamente como está
3. Verifique se todos os arquivos estão presentes

### Passo 2: Upload via File Manager
1. Acesse o **hPanel** da Hostinger
2. Vá em **Arquivos** → **Gerenciador de Arquivos**
3. Navegue até a pasta `public_html`
4. **IMPORTANTE**: Exclua o arquivo `index.html` padrão da Hostinger
5. Faça upload de todos os arquivos mantendo a estrutura:
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   ├── robots.txt
   ├── sitemap.xml
   ├── assets/
   ├── css/
   ├── js/
   └── pages/
   ```

### Passo 3: Configurar Domínio
1. Se usar domínio próprio, configure os DNS
2. Aguarde propagação (até 24h)
3. Teste o acesso: `https://seudominio.com`

### Passo 4: Verificar Funcionamento
Teste todas as páginas:
- ✅ Página principal: `https://seudominio.com`
- ✅ Serviços: `https://seudominio.com/pages/servicos.html`
- ✅ Vitriny: `https://seudominio.com/pages/vitriny.html`
- ✅ Sobre: `https://seudominio.com/pages/sobre.html`
- ✅ Cases: `https://seudominio.com/pages/cases.html`

---

## ⚙️ Configurações Importantes

### .htaccess Configurado
O arquivo `.htaccess` já inclui:
- ✅ Compressão GZIP
- ✅ Cache de arquivos estáticos
- ✅ Headers de segurança
- ✅ Redirecionamento HTTPS
- ✅ URLs amigáveis
- ✅ Página 404 personalizada

### SEO Otimizado
- ✅ `robots.txt` configurado
- ✅ `sitemap.xml` com todas as páginas
- ✅ Meta tags em todas as páginas
- ✅ Estrutura semântica HTML5

### Performance
- ✅ Imagens otimizadas
- ✅ CSS e JS organizados
- ✅ Cache configurado
- ✅ Compressão habilitada

---

## 🔧 Configurações Opcionais

### SSL/HTTPS
A Hostinger oferece SSL gratuito:
1. Vá em **SSL** no hPanel
2. Ative o **SSL gratuito**
3. Aguarde ativação (até 15 minutos)

### Email Profissional
Configure emails como `contato@seudominio.com`:
1. Vá em **Email** no hPanel
2. Crie contas de email
3. Configure no cliente de email

### Formulário de Contato
Para que o formulário de contato envie mensagens por email é necessário configurar um serviço SMTP. Crie um arquivo `.env` com as seguintes variáveis (veja `.env.example`):
```
SMTP_HOST=seu_servidor
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
SMTP_FROM=no-reply@seudominio.com
```
Em produção, defina essas variáveis no painel de hospedagem ou na plataforma (por exemplo, Vercel) que executará a função em `api/contact.js`.

### Backup
Configure backup automático:
1. Vá em **Backup** no hPanel
2. Ative backup automático
3. Configure frequência

---

## 📊 Monitoramento e Analytics

### Google Analytics (Recomendado)
1. Crie conta no Google Analytics
2. Adicione o código de tracking no `<head>` de todas as páginas
3. Configure metas e conversões

### Google Search Console
1. Adicione o site no Search Console
2. Verifique propriedade
3. Envie o sitemap: `https://seudominio.com/sitemap.xml`

---

## 🛠️ Manutenção

### Atualizações de Conteúdo
Para alterar textos, imagens ou informações:
1. Edite os arquivos HTML correspondentes
2. Faça upload via File Manager
3. Limpe cache se necessário

### Adicionar Novas Páginas
1. Crie arquivo HTML na pasta `pages/`
2. Adicione link no menu de navegação
3. Atualize `sitemap.xml`
4. Teste funcionamento

### Monitoramento
- Verifique logs de erro regularmente
- Monitore performance do site
- Acompanhe métricas de SEO
- Teste funcionamento em diferentes dispositivos

---

## 📞 Suporte

### Contatos da Labrego IA
- **Email**: contato@labregoia.com.br
- **WhatsApp**: (11) 93442-7070

### Suporte Hostinger
- **Chat**: Disponível 24/7 no hPanel
- **Base de Conhecimento**: help.hostinger.com.br

---

## ✅ Checklist Final

Antes de considerar a hospedagem concluída:

- [ ] Todos os arquivos foram enviados
- [ ] Estrutura de pastas está correta
- [ ] Página principal carrega corretamente
- [ ] Todas as páginas internas funcionam
- [ ] Imagens estão sendo exibidas
- [ ] Links de navegação funcionam
- [ ] Formulários de contato funcionam
- [ ] Site é responsivo (mobile/desktop)
- [ ] SSL está ativo (HTTPS)
- [ ] Google Analytics configurado
- [ ] Search Console configurado

---

**🎉 Parabéns! Seu site está pronto e otimizado para gerar resultados!**

*Desenvolvido com ❤️ pela equipe Labrego IA*

