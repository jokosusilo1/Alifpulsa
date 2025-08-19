export async function handler() {
  const products = [
    { id: 1, nama: "Pulsa 5k", harga: 5000 },
    { id: 2, nama: "Token Game 10k", harga: 10000 },
    { id: 3, nama: "Voucher Game 50k", harga: 50000 }
  ];

  const finalProducts = products.map(p => ({
    ...p,
    harga_jual: Math.ceil(p.harga * 1.05)
  }));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    },
    body: JSON.stringify(finalProducts)
  };
}
