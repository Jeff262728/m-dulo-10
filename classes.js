import { arredondarMoeda, formatarMoeda, formatarTempo } from './utils.js';

/**
 * Classe de regra de negócio.
 * Não conhece HTML/DOM.
 */
export class Parquimetro {
  constructor(precoPorFracao = 1.0, minutosPorFracao = 30, valorMinimo = 1.0) {
    this.precoPorFracao = precoPorFracao;
    this.minutosPorFracao = minutosPorFracao;
    this.valorMinimo = valorMinimo;
  }

  calcular(valorInserido) {
    if (
      typeof valorInserido !== 'number' ||
      !Number.isFinite(valorInserido) ||
      valorInserido <= 0
    ) {
      return { sucesso: false, mensagem: 'Informe um valor válido.' };
    }

    if (valorInserido < this.valorMinimo) {
      return {
        sucesso: false,
        mensagem: `Valor insuficiente. Mínimo aceito: ${formatarMoeda(this.valorMinimo)}`,
      };
    }

    const fracoes = Math.floor(valorInserido / this.precoPorFracao);
    const valorUtilizado = arredondarMoeda(fracoes * this.precoPorFracao);
    const minutos = fracoes * this.minutosPorFracao;
    const troco = arredondarMoeda(valorInserido - valorUtilizado);

    return {
      sucesso: true,
      minutos,
      troco,
      valorUtilizado,
    };
  }

  formatarTempo(minutos) {
    return formatarTempo(minutos);
  }
}

/**
 * Classe responsável pela interface e pelos eventos.
 */
export class ParquimetroApp {
  constructor(parquimetro, elementos, atalhos) {
    this.parquimetro = parquimetro;
    this.form = elementos.form;
    this.input = elementos.input;
    this.telaPrincipal = elementos.telaPrincipal;
    this.telaSecundaria = elementos.telaSecundaria;
    this.atalhos = atalhos;

    this._bindEventos();
  }

  _bindEventos() {
    this.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      this.processarValor();
    });

    this.input.addEventListener('input', () => {
      this.atualizarPrevia();
    });

    this.atalhos.forEach(({ elemento, valor }) => {
      elemento.addEventListener('click', () => {
        const valorAtual = Number(this.input.value) || 0;
        this.input.value = (valorAtual + valor).toFixed(2);
        this.input.dispatchEvent(new Event('input', { bubbles: true }));
        this.input.focus();
      });
    });
  }

  processarValor() {
    const valorInserido = Number(this.input.value);
    const resultado = this.parquimetro.calcular(valorInserido);

    if (!resultado.sucesso) {
      this._renderizarErro(resultado.mensagem);
      return resultado;
    }

    this._renderizarSucesso(valorInserido, resultado);
    return resultado;
  }

  atualizarPrevia() {
    const valor = Number(this.input.value);

    if (!valor) {
      this.telaPrincipal.textContent = 'R$ 0,00';
      this.telaSecundaria.textContent = 'insira o valor';
      this.telaPrincipal.classList.remove('ativo', 'erro');
      return;
    }

    const resultado = this.parquimetro.calcular(valor);

    if (!resultado.sucesso) {
      this._renderizarErro(resultado.mensagem);
      return;
    }

    this._renderizarSucesso(valor, resultado);
  }

  _renderizarSucesso(valorInserido, { minutos, troco, valorUtilizado }) {
    const tempoFormatado = this.parquimetro.formatarTempo(minutos);

    this.telaPrincipal.textContent = `Tempo: ${tempoFormatado}`;
    this.telaPrincipal.classList.remove('erro');
    this.telaPrincipal.classList.add('ativo');

    this.telaSecundaria.textContent =
      troco > 0
        ? `Inserido: ${formatarMoeda(valorInserido)} · Utilizado: ${formatarMoeda(valorUtilizado)} · Troco: ${formatarMoeda(troco)}`
        : `Utilizado: ${formatarMoeda(valorUtilizado)} · Sem troco`;
  }

  _renderizarErro(mensagem) {
    this.telaPrincipal.textContent = 'Erro';
    this.telaPrincipal.classList.remove('ativo');
    this.telaPrincipal.classList.add('erro');
    this.telaSecundaria.textContent = mensagem;
  }
}
