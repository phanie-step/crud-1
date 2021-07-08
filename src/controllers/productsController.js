const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let productId = req.params.id;
    console.log(productId);
    const product = products.find((producto) => {
      return producto.id == productId;
    });
    console.log(product);

    if (product) {
      res.render("detail", { product });
    } else {
      res.render("error");
    }
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    const productInfo = req.body;
    products.push({
      ...productInfo,
      id: products.length + 1,
      image: "img-cafetera-moulinex.jpg",
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const productToEdit = products.find((product) => {
      return product.id == req.params.id;      
    });
    
    if (productToEdit) {
      res.render("product-edit-form", { productToEdit });
    } else {
      res.render("error");
    }
  },
  
  // Update - Method to update
  update: (req, res) => {
    const productInfo = req.body;
    const productIdex = products.findIndex(producto =>{
      return producto.id == req.params.id;
    });

    products[productIdex]={...products[productIdex], ...productInfo};

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    
    const productIdex = products.findIndex(producto =>{
      return producto.id == req.params.id;
    });

    products.splice(productIdex, 1);
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/");
    // Do the magic
  },
};

module.exports = controller;