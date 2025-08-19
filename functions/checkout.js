let userSaldo = { "user123": 200000 };

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: ""
    };
  }

  try {
    const { userId, produkId } = JSON.parse(event.body);

    const products = [
      { id: 1, nama: "Pulsa 5k", harga_jual: 5250 },
      { id: 2, nama: "Token Game 10k", harga_jual: 10500 },
      { id: 3, nama: "Voucher Game 50k", harga_jual: 52500 }
    ];
    const produk = products.find(p => p.id === produkId);
    if(!produk) return { statusCode: 404, body: "Produk tidak ditemukan" };

    if(!userSaldo[userId] || userSaldo[userId] < produk.harga_jual){
      return { statusCode: 400, body: "Saldo tidak cukup" };
    }

    userSaldo[userId] -= produk.harga_jual;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: JSON.stringify({
        success: true,
        status: "sukses",
        produk: produk.nama,
        harga: produk.harga_jual,
        sisaSaldo: userSaldo[userId]
      })
    };
  } catch(e){
    return { statusCode: 500, body: "Error checkout" };
  }
}
