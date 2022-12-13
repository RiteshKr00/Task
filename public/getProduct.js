document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetch");
  const element = document.querySelector("#product-table");
  fetchButton.addEventListener("click", async () => {
    const result = await fetch(`https://task-production-8ff6.up.railway.app/api/v1/product/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
    });
    let product = await result.json();
    let body = ``;
    product.map(
      ({ company, featured, name, price, productId, rating, createdAt }) => {
        body += `<tr>
      <td>${productId}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td>${featured}</td>
      <td>${rating}</td>
      <td>${company}</td>
      <td>${createdAt}</td>
    </tr>`;
      }
    );
    body = `<tr>
    <th>ProductId</th>
    <th>Name</th>
    <th>Price</th>
    <th>Featured</th>
    <th>Rating</th>
    <th>Company</th>
    <th>CreatedAt</th>
  </tr>${body}`;
    element.innerHTML = body;
    console.log(product);
  });
});
