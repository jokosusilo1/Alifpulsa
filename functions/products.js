let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 2*60*1000; // 2 menit
let markupPercent = 5;

export async function handler(event) {
  const API_KEY = process.env.BUKAOLSHOP_API_KEY;
  const now = Date.now();
  if(cache.data && now - cache.timestamp < CACHE_DURATION){
    return { statusCode:200, headers:{ "Access-Control-Allow-Origin":"*" }, body: JSON.stringify(cache.data) };
  }

  try {
    const res = await fetch("https://bukaolshop.com/api/v1/products", {
      headers:{ "Authorization":`Bearer ${API_KEY}` }
    });
    const apiProducts = await res.json();

    const products = apiProducts.map(p=>({
      id: p.id,
      nama: p.name,
      harga_jual: Math.ceil(p.price * (1 + markupPercent/100))
    }));

    cache.data = products;
    cache.timestamp = now;

    return { statusCode:200, headers:{ "Access-Control-Allow-Origin":"*" }, body: JSON.stringify(products) };
  } catch(e){
    return { statusCode:500, headers:{ "Access-Control-Allow-Origin":"*" }, body: "Gagal fetch produk" };
  }
}

export function setMarkup(percent){
  markupPercent = percent;
  cache.timestamp = 0;
}
