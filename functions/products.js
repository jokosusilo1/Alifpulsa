let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 2*60*1000; // cache 2 menit
let markupPercent = 5;

export async function handler(event) {
  const API_KEY = process.env.BUKAOLSHOP_API_KEY;

  if(!API_KEY){
    return { statusCode:500, body:"Error: API key belum di-set di environment variable" };
  }

  const now = Date.now();
  if(cache.data && now - cache.timestamp < CACHE_DURATION){
    return { 
      statusCode:200, 
      headers:{ "Access-Control-Allow-Origin":"*", "Content-Type":"application/json" }, 
      body: JSON.stringify(cache.data) 
    };
  }

  try {
    const res = await fetch("https://bukaolshop.com/api/v1/products", {
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });

    if(!res.ok){
      const text = await res.text();
      return { statusCode: res.status, headers:{ "Access-Control-Allow-Origin":"*" }, body: `Error fetch API: ${text}` };
    }

    const apiProducts = await res.json();

    const products = apiProducts.map(p=>({
      id: p.id,
      nama: p.name,
      harga_jual: Math.ceil(p.price * (1 + markupPercent/100))
    }));

    cache.data = products;
    cache.timestamp = now;

    return { 
      statusCode:200, 
      headers:{ "Access-Control-Allow-Origin":"*", "Content-Type":"application/json" }, 
      body: JSON.stringify(products) 
    };
  } catch(e){
    return { statusCode:500, headers:{ "Access-Control-Allow-Origin":"*" }, body: "Error fetch produk: " + e.message };
  }
}

// Optional: fungsi untuk ubah markup via POST (admin UI)
export async function postHandler(event){
  try{
    const { markup } = JSON.parse(event.body);
    if(typeof markup === "number"){
      markupPercent = markup;
      cache.timestamp = 0; // reset cache
      return { statusCode:200, body:"Markup updated" };
    }
    return { statusCode:400, body:"Invalid markup" };
  }catch(e){
    return { statusCode:500, body:"Error: "+e.message };
  }
}
