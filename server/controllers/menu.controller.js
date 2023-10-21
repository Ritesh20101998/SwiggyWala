const Menu = require('../models/menu.model');

const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const addRecipe = async (req, res) => {
  const { name, description, isVeg, price, ratings, image } = req.body;

  try {
    const newRecipe = new Menu({ name, description, isVeg, price, ratings, image });

    if (!name || !description || !price || !ratings || !image) {
        return res.status(400).json({ error: 'Invalid input', });
    }

    await newRecipe.save();
    res.status(201).json({"message":"Receipe added uccessfully","newRecipe":newRecipe});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateRecipe = async (req, res) => {
  const { name, description, isVeg, price, ratings, image } = req.body;
  const recipeId = req.params.id;

  try {
    const updatedRecipe = await Menu.findByIdAndUpdate(
      recipeId,
      { name, description, isVeg, price, ratings, image },
      { new: true }
    );
    res.status(200).json({"messgae":"receipe updated successfully","updatedReciped":updatedRecipe});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    await Menu.findByIdAndRemove(recipeId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const filterRecipesByVeg = async (req, res) => {
  const isVeg = req.params.isVeg === true;
  try {
    const filteredRecipes = await Menu.find({ isVeg });
    res.status(200).json(filteredRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const sortRecipesByPrice = async (req, res) => {
  try {
    const sortedRecipes = await Menu.find().sort({ price: 1 });
    res.status(200).json(sortedRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getMenu,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  filterRecipesByVeg,
  sortRecipesByPrice,
};
