const fs = require("fs");

class ProductManager {
  #products;
  #path;
  static idProducto = 0;

  constructor() {
    this.#products = this.#leerProductosInFile();
    this.#path = "./data/productos.json";
  }

  #asignarIdProducto() {
    let id = 1;
    if (this.#products.length != 0)
      id = this.#products[this.#products.length - 1].id + 1;
    return id;
  }

  #leerProductosInFile() {
    try {
      if (fs.existsSync(this.#path))
        return JSON.parse(fs.readFileSync(this.#path, "utf-8"));

      return [];
    } catch (error) {
      console.log(`Ocurrio un error al leer el producto, ${error}`);
    }
  }

  #guardarArchivo() {
    try {
      fs.writeFileSync(this.#path, JSON.stringify(this.#products));
    } catch (error) {
      console.log(`Ocurrio un error al guardar el producto, ${error}`);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Todos los parametro son requeridos [title, description, price, thumbnail, code, stock] ";

    const codeRepetido = this.#products.some((e) => e.code == code);

    if (codeRepetido)
      return `El codigo ${code} ya se encuentra registrado en otro producto`;

    ProductManager.idProducto = ProductManager.idProducto + 1;
    const id = this.#asignarIdProducto();
    const nuevoProducto = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.#products.push(nuevoProducto);
    this.#guardarArchivo();

    return `Producto agregado exitosamente!`;
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    const producto = this.#products.find((e) => e.id == id);
    if (producto) return producto;
    else return `No se encontro el producto con id ${id}`;
  }

  updateProduct(id, objetoUpdate) {
    let msg = `El producto con id ${id} no existe`;

    const index = this.#products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const { id, ...rest } = objetoUpdate;
      this.#products[index] = { ...this.#products[index], ...rest };
      this.#guardarArchivo();
      msg = "Producto actualizado";
    }

    return msg;
  }

  deleteProduct(id) {
    let msg = `El producto con id ${id} no existe`;
    const index = this.#products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.#products = this.#products.filter((p) => p.id !== id);
      this.#guardarArchivo();
      msg = "Producto Elminado!";
    }

    return msg;
  }
}

module.exports = ProductManager;
