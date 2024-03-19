const ProductManager = require("./productManager");

const producto = new ProductManager();

console.log(
  producto.addProduct(
    "Coca",
    "Cola",
    300,
    "https://img1.com",
    "ColaCompany",
    10
  )
);
console.log(
  producto.addProduct(
    "Co2ca",
    "Cofsfsla",
    100,
    "https://img1.com",
    "ColaCompanys",
    102
  )
);
console.log(
  producto.addProduct(
    "Cocfsfs3a",
    "C3olssa",
    30,
    "https://img1.com",
    "ColaCompasnys",
    103
  )
);
