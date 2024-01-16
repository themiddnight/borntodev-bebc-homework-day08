const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

const products = [
  { id: 1, name: 'Apple', price: 10 },
  { id: 2, name: 'Orange', price: 10 },
  { id: 3, name: 'Banana', price: 10 },
  { id: 4, name: 'Grapes', price: 10 },
  { id: 5, name: 'Watermelon', price: 10 }
];

app.get('/products', (req, res) => {
  res.json({ message: 'Products found', data: products});
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found', data: null });
    return;
  }
  res.json({message: 'Product found', data: product});
});

app.post('/products', (req, res) => {
  const product = req.body;
  if (!product.name || !product.price) {
    res.status(400).json({ message: 'Product name and price are required', data: null });
    return;
  }
  product.id = products.length + 1;
  product.price = +product.price;
  products.push(product);
  res.json({ message: 'Product created', data: product});
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productBody = req.body;
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found', data: null });
    return;
  }
  productBody.id = id;
  productBody.name = productBody.name || products[index].name;
  productBody.price = +productBody.price || products[index].price;
  products[index] = productBody;
  res.json({ message: 'Product updated', data: productBody });
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found', data: null });
    return;
  }
  products.splice(index, 1);
  res.json({ message: `Product ${id} deleted`, data: null });
});

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});