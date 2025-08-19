let userSaldo = { "user123": 50000 };

export async function handler(event) {
  if(event.httpMethod==="OPTIONS") return { statusCode:200, headers:{ "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET,POST,OPTIONS"}, body:"" };

  try {
    const { userId, produkId } = JSON.parse(event.body);

    const productsRes = await fetch("https://your-netlify-site.netlify.app/.netlify/functions/products");
    const products = await productsRes.json();

    const produk = products.find(p=>p.id===produkId);
    if(!produk) return { statusCode:404, body:"Produk tidak ditemukan" };
    if(!userSaldo[userId] || userSaldo[userId]<produk.harga_jual) return { statusCode:400, body:"Saldo tidak cukup" };

    userSaldo[userId]-=produk.harga_jual;

    // Backend memanggil Open API Bukaolshop
    // API key tetap aman, frontend tidak tahu

    return { statusCode:200, headers:{ "Access-Control-Allow-Origin":"*" }, body: JSON.stringify({ success:true, produk:produk.nama, harga:produk.harga_jual, sisaSaldo:userSaldo[userId] }) };
  } catch(e){
    return { statusCode:500, body:"Error checkout" };
  }
}
