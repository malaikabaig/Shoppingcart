const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
let Cart = require('../models/cart.model');

// GET USER'S CART
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD ITEM TO CART
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists for user

      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity += 1;
        cart.items[itemIndex] = productItem;
      } else {
        // Product does not exists in cart, add new item
        cart.items.push({ productId, title, price, image, quantity: 1 });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        items: [{ productId, title, price, image, quantity: 1 }],
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

// UPDATE ITEM QUANTITY
router.post('/update-quantity', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).send('Cart not found');

    let itemIndex = cart.items.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // Agar quantity 0 ya kam hai to item remove kar dein
        cart.items.splice(itemIndex, 1);
      }
      cart = await cart.save();
      res.send(cart);
    } else {
      res.status(404).send('Item not found in cart');
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

// REMOVE ITEM FROM CART
router.post('/remove-item', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).send('Cart not found');

    cart.items = cart.items.filter((item) => item.productId != productId);

    cart = await cart.save();
    res.send(cart);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
