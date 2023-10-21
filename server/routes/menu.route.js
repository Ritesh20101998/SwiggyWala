const express = require('express');
const menuRouter = express.Router();
const menuController = require('../controllers/menu.controller')

menuRouter.get("/",(req,res)=>{
    res.send("Welcome to Menu Section...")
})

menuRouter.get('/getMenu', menuController.getMenu);
menuRouter.post('/addRecipe', menuController.addRecipe);
menuRouter.put('/menu/:id', menuController.updateRecipe);
menuRouter.delete('/menu/:id', menuController.deleteRecipe);
menuRouter.get('/menu/filter/:isVeg', menuController.filterRecipesByVeg);
menuRouter.get('/menu/sort/price', menuController.sortRecipesByPrice);

module.exports = menuRouter;
