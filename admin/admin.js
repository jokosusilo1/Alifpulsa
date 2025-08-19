const productsTable = document.querySelector("#products-table tbody");
const saldoTable = document.querySelector("#saldo-table tbody");

async function loadProducts() {
  const res = await fetch("https://your-netlify-site.netlify.app/.netlify/functions/products");
  const products = await res.json();
  productsTable.innerHTML = products.map(p=>`<tr><td>${p.id}</td><td>${p.nama}</td><td>Rp${p.harga_jual.toLocaleString()}</td></tr>`).join("");
}

function loadSaldo() {
  const userSaldo = { "user123": 50000 };
  saldoTable.innerHTML = Object.entries(userSaldo).map(([u,s])=>`<tr><td>${u}</td><td>Rp${s.toLocaleString()}</td></tr>`).join("");
}

document.getElementById("save-markup").addEventListener("click", async () => {
  const percent = parseFloat(document.getElementById("markup").value);
  await fetch("https://your-netlify-site.netlify.app/.netlify/functions/products", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ markup: percent })
  });
  alert("Markup disimpan, refresh produk");
});

document.getElementById("refresh").addEventListener("click", loadProducts);

loadProducts();
loadSaldo();
