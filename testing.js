const ProductManager = require("./productManager");

const producto = new ProductManager();

console.log(
  producto.addProduct("lapto", "lenovo", 222, "https://img1.com", "s23h", 20)
);
console.log(producto.getProducts());
