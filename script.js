const servicos = [
  { icone:"💿", titulo:"Formatação", resumo:"Reinstalação limpa do sistema com backup dos seus arquivos.",
    passos:["Backup de documentos, fotos e favoritos","Particionamento e formatação do disco","Instalação do Windows ou Linux","Drivers, atualizações e programas essenciais","Restauração dos arquivos do cliente"] },
  { icone:"🔧", titulo:"Reparos de hardware", resumo:"Troca de peças com defeito: fontes, memórias, HDs, telas e teclados.",
    passos:["Diagnóstico com testes de componentes","Troca de fonte, RAM, HD/SSD, tela ou teclado","Reparo de conectores e cabos","Testes de estabilidade após o reparo"] },
  { icone:"🧹", titulo:"Limpeza preventiva", resumo:"Remoção de poeira e troca da pasta térmica para evitar superaquecimento.",
    passos:["Desmontagem cuidadosa com pulseira antiestática","Limpeza com ar comprimido e pincel","Troca da pasta térmica do processador","Lubrificação/limpeza das ventoinhas","Medição de temperatura antes e depois"] },
  { icone:"⚙️", titulo:"Manutenção", resumo:"Otimização do sistema, remoção de vírus e programas desnecessários.",
    passos:["Varredura e remoção de vírus e malwares","Desinstalação de programas inúteis","Limpeza de arquivos temporários","Ajuste de inicialização do sistema","Verificação da saúde do disco (S.M.A.R.T.)"] },
  { icone:"🚀", titulo:"Upgrades", resumo:"Instalação de SSD e memória RAM para deixar o PC muito mais rápido.",
    passos:["Análise de compatibilidade das peças","Clonagem do HD antigo para o SSD","Instalação de memória RAM adicional","Comparativo de desempenho"] },
  { icone:"🌐", titulo:"Redes e periféricos", resumo:"Configuração de Wi-Fi, roteadores, impressoras e compartilhamentos.",
    passos:["Configuração e segurança do roteador","Instalação de impressoras em rede","Compartilhamento de pastas","Diagnóstico de conexão lenta"] }
];
const dicas = [
  "Faça limpeza interna do computador a cada 6 meses.",
  "Nunca obstrua as saídas de ar do notebook — evite usá-lo sobre a cama.",
  "Mantenha pelo menos 15% do disco livre para o sistema funcionar bem.",
  "Use um estabilizador ou nobreak para proteger contra quedas de energia.",
  "Faça backup semanal dos arquivos importantes (nuvem ou HD externo).",
  "Mantenha o sistema e o antivírus sempre atualizados.",
  "Troque a pasta térmica a cada 1 ou 2 anos."
];

const lista = document.getElementById("lista-servicos");
const select = document.getElementById("select-servico");
servicos.forEach((s, i) => {
  const c = document.createElement("article");
  c.className = "card";
  c.innerHTML = `<div class="icone">${s.icone}</div><h3>${s.titulo}</h3><p>${s.resumo}</p>`;
  c.onclick = () => abrirModal(i);
  lista.appendChild(c);
  select.add(new Option(s.titulo, s.titulo));
});

// Modal
const modal = document.getElementById("modal");
function abrirModal(i){
  const s = servicos[i];
  document.getElementById("modal-titulo").textContent = `${s.icone} ${s.titulo}`;
  document.getElementById("modal-desc").textContent = s.resumo;
  document.getElementById("modal-passos").innerHTML = s.passos.map(p => `<li>${p}</li>`).join("");
  modal.hidden = false;
}
modal.addEventListener("click", e => { if (e.target === modal || e.target.classList.contains("fechar")) modal.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.hidden = true; });

// Animação ao rolar
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visivel"); }), { threshold:.2 });
document.querySelectorAll(".card").forEach(c => obs.observe(c));

// Contadores
document.querySelectorAll("[data-count]").forEach(el => {
  const alvo = +el.dataset.count; let n = 0;
  const t = setInterval(() => { n += Math.ceil(alvo / 40); if (n >= alvo) { n = alvo; clearInterval(t); } el.textContent = n; }, 30);
});

// Dicas
let d = 0;
const dt = document.getElementById("dica-texto");
dt.textContent = dicas[0];
document.getElementById("nova-dica").onclick = () => {
  dt.style.opacity = 0;
  setTimeout(() => { d = (d + 1) % dicas.length; dt.textContent = dicas[d]; dt.style.opacity = 1; }, 300);
};

// Menu mobile
document.querySelector(".menu-btn").onclick = () => document.querySelector(".nav nav").classList.toggle("aberto");
document.querySelectorAll(".nav nav a").forEach(a => a.onclick = () => document.querySelector(".nav nav").classList.remove("aberto"));

// Formulário
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const ok = document.getElementById("form-ok");
  ok.textContent = `Obrigado, ${f.get("nome")}! Sua solicitação de "${f.get("servico")}" foi recebida.`;
  ok.hidden = false;
  e.target.reset();
});

document.getElementById("ano").textContent = new Date().getFullYear();
