/**
 * Funções utilitárias puras.
 * Não dependem do DOM nem alteram estado externo.
 */

export function arredondarMoeda(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarTempo(minutos) {
  const horas = Math.floor(minutos / 60);
  const restante = minutos % 60;

  if (horas === 0) return `${restante} min`;
  if (restante === 0) return `${horas}h`;
  return `${horas}h ${restante}min`;
}

/**
 * Converte uma coleção de elementos de atalho em dados simples.
 * map() evita acoplamento da regra de negócio ao DOM.
 */
export function mapearAtalhos(botoes) {
  return Array.from(botoes).map((botao) => ({
    elemento: botao,
    valor: Number(botao.dataset.valor),
  }));
}

/**
 * Soma valores de uma coleção usando reduce().
 */
export function somarValores(valores) {
  return arredondarMoeda(
    valores.reduce((total, valor) => total + Number(valor), 0)
  );
}

/**
 * Procura um atalho pelo valor usando find().
 */
export function encontrarAtalho(atalhos, valor) {
  return atalhos.find((atalho) => atalho.valor === Number(valor));
}
