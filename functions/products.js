export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",  // penting biar bisa dipanggil dari mana aja
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify([
      { id: 1, name: "Pulsa 5K", price: 6000 },
      { id: 2, name: "Pulsa 10K", price: 11000 },
      { id: 3, name: "Pulsa 20K", price: 21000 },
    ]),
  };
}
