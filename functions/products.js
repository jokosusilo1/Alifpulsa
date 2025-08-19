exports.handler = async (event, context) => {
  try {
    // Daftar produk contoh (nanti bisa diganti dari API Digiflazz)
    const produk = [
      { id: 1, nama: "Pulsa 5.000", harga_beli: 5000 },
      { id: 2, nama: "Pulsa 10.000", harga_beli: 10000 },
      { id: 3, nama: "Pulsa 20.000", harga_beli: 20000 },
      { id: 4, nama: "Pulsa 50.000", harga_beli: 50000 }
    ];

    // Tentukan margin harga jual (contoh: +1000)
    const margin = 1000;

    // Hitung harga jual
    const produkDenganHargaJual = produk.map(p => ({
      id: p.id,
      nama: p.nama,
      harga_jual: p.harga_beli + margin
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produkDenganHargaJual)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Terjadi kesalahan di server" })
    };
  }
};
