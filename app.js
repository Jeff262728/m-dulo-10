import { Parquimetro, ParquimetroApp } from './classes.js';
import {
  formatarMoeda,
  formatarTempo,
  somarValores,
  mapearAtalhos,
  encontrarAtalho,
} from './utils.js';

function testarMetodos() {
  console.log('=== Testes Parquímetro Digital do módulo 7 refatorado para o módulo 10 ===');

  const parquimetroTeste = new Parquimetro(1, 30, 1);

  console.log('Teste R$ 0,50:', parquimetroTeste.calcular(0.5));
  console.log('Teste R$ 1,00:', parquimetroTeste.calcular(1));
  console.log('Teste R$ 2,50:', parquimetroTeste.calcular(2.5));
  console.log('Teste R$ 4,00:', parquimetroTeste.calcular(4));

  console.log('formatarTempo(90):', formatarTempo(90));
  console.log('formatarMoeda(2.5):', formatarMoeda(2.5));
  console.log('somarValores([1, 2, 5]):', somarValores([1, 2, 5]));

  const atalhosTeste = [
    { valor: 1 },
    { valor: 2 },
    { valor: 5 },
  ];
  console.log('find() - atalho R$ 2:', encontrarAtalho(atalhosTeste, 2));
  console.log('=== Fim dos testes ===');
}

document.addEventListener('DOMContentLoaded', () => {
  // Os métodos são testados antes da integração com a interface.
  testarMetodos();

  const elementos = {
    form: document.getElementById('formValor'),
    input: document.getElementById('valorInput'),
    telaPrincipal: document.getElementById('telaPrincipal'),
    telaSecundaria: document.getElementById('telaSecundaria'),
  };

  const atalhos = mapearAtalhos(document.querySelectorAll('.moeda'));

  // Exemplo de find() aplicado aos dados reais da interface.
  console.log('Atalho de R$ 5 encontrado:', encontrarAtalho(atalhos, 5));

  const parquimetro = new Parquimetro(1.0, 30, 1.0);
  new ParquimetroApp(parquimetro, elementos, atalhos);
});
