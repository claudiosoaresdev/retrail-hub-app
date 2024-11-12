export function formatToCurrency(value: number) {
  const valueInReais = value / 100;
  return valueInReais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
