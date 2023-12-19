
function createData(nomeCliente, idCobranca, valor) {
    return { nomeCliente, idCobranca, valor };
  }

export const cobrancasPagas = [
    createData('Sara Silva', 723456783, "3500,00"),
    createData('Carlos Prado', 223456782, "400,00"),
    createData('Lara Brito', 323456787, "900,00"),
    createData('Soraia Neves', 423456788, "700,00"),
];

export const cobrancasVencidas = [
  createData('Sara Silva', 223456786, "1000,00"),
  createData('Carlos Prado', 223456780, "400,00"),
  createData('Lara Brito', 223456781, "900,00"),
  createData('Soraia Neves', 223456787, "700,00"),
];

export const cobrancasPrevistas = [
  createData('Sara Silva', 323456789, "2000,00"),
  createData('Carlos Prado', 523456785, "400,00"),
  createData('Lara Brito', 423456784, "900,00"),
  createData('Soraia Neves', 523456783, "700,00"),
];

