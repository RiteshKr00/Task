document.addEventListener("DOMContentLoaded", () => {
  const addProduct = document.getElementById("add-product");
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const rating = document.getElementById("rating");
  const company = document.getElementById("company");
  const featured = document.getElementById("featured");
  const productId = document.getElementById("id");

  addProduct.addEventListener("click", async (e) => {
    e.preventDefault();
    let product = {
      name: name.value,
      price: price.value,
      rating: rating.value,
      company: company.value,
      featured: featured.value,
      productId: productId.value,
    };
    let valid = true;
    function validate() {
      if (
        product.name.length === 0 ||
        product.price <= 0 ||
        product.productId.length === 0 ||
        product.company.length === 0
      )
        valid = false;
      return;
    }
    validate();
    if (valid) {
      const result = await fetch(
        `https://task-production-8ff6.up.railway.app/api/v1/product/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          crossDomain: true,
          body: JSON.stringify(product),
        }
      );
      let products = await result.json();
      console.log(products);
      if (products?.message === "success") {
        alert("Product Added");
      } else if (products?.message === "failure") {
        alert("Enter Unique ProductID");
      }
    } else {
      alert("Enter All the Field");
    }
    //   alert(product);

    //   console.log(new FormData(formElem));
  });
});
