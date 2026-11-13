const dishService = require("./dish.service");

async function create(req, res, next) {
  try {
    const { restaurantId } = req.params;
    const { name, description, price } = req.body;

    if (!name || price === undefined || price === null || Number(price) < 0) {
      return res.status(400).json({
        error: "Nome e preço válido são obrigatórios"
      });
    }

    const dish = await dishService.createDish(restaurantId, {
      name,
      description,
      price
    });

    return res.status(201).json(dish);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  try {
    const { restaurantId } = req.params;
    const dishes = await dishService.listDishes(restaurantId);
    return res.json(dishes);
  } catch (error) {
    return next(error);
  }
}

async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhuma imagem enviada"
      });
    }

    const dish = await dishService.uploadDishImage(req.params.dishId, req.file.buffer);
    return res.json(dish);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  list,
  uploadImage
};
