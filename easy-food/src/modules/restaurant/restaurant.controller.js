const restaurantService = require("./restaurant.service");

async function list(req, res, next) {
  try {
    const restaurants = await restaurantService.listRestaurants();
    return res.json(restaurants);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, category, rating } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        error: "Nome e categoria são obrigatórios"
      });
    }

    const restaurant = await restaurantService.createRestaurant(
      {
        name,
        category,
        rating,
        ownerEmail: req.user?.email
      },
      req.user?.id
    );

    return res.status(201).json(restaurant);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  create
};
