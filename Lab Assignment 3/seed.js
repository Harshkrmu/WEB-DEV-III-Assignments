require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const data = [
  { name: 'Study Table', sku: 'FURN-TB-812', category: 'Furniture', price: 3999, quantity: 2, reorderLevel: 4, supplier: 'IKEA India' },
  { name: 'Office Chair', sku: 'FURN-CH-101', category: 'Furniture', price: 5499, quantity: 15, reorderLevel: 5, supplier: 'Godrej Interio' },
  { name: 'Wireless Mouse', sku: 'ELEC-MS-201', category: 'Electronics', price: 799, quantity: 3, reorderLevel: 10, supplier: 'Logitech' },
  { name: 'Mechanical Keyboard', sku: 'ELEC-KB-202', category: 'Electronics', price: 3499, quantity: 25, reorderLevel: 8, supplier: 'Keychron' },
  { name: 'Bluetooth Speaker', sku: 'ELEC-SP-203', category: 'Electronics', price: 2499, quantity: 40, reorderLevel: 10, supplier: 'boAt' },
  { name: 'Laptop 15 inch', sku: 'ELEC-LP-204', category: 'Electronics', price: 54999, quantity: 28, reorderLevel: 5, supplier: 'Dell' },
  { name: 'Cotton T-Shirt', sku: 'APRL-TS-301', category: 'Apparel', price: 499, quantity: 60, reorderLevel: 20, supplier: 'Roadster' },
  { name: 'Denim Jacket', sku: 'APRL-JK-302', category: 'Apparel', price: 2299, quantity: 18, reorderLevel: 10, supplier: 'Levis' },
  { name: 'Notebook A4', sku: 'STNY-NB-701', category: 'Stationery', price: 90, quantity: 5, reorderLevel: 30, supplier: 'Classmate' },
  { name: 'Gel Pen Pack of 15', sku: 'STNY-PN-713', category: 'Stationery', price: 120, quantity: 40, reorderLevel: 20, supplier: 'Cello Pens' },
  { name: 'Basmati Rice 5kg', sku: 'GROC-RC-901', category: 'Grocery', price: 650, quantity: 50, reorderLevel: 15, supplier: 'India Gate' },
  { name: 'Olive Oil 1L', sku: 'GROC-OL-902', category: 'Grocery', price: 899, quantity: 4, reorderLevel: 12, supplier: 'Figaro' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log(`Seeded ${data.length} products`);
  await mongoose.disconnect();
})();
