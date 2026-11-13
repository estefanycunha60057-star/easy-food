const prisma = require("../../database/prisma");
const imageService = require("../shared/image.service");

async function createDish(restaurantId, data) {
  const parsedRestaurantId = Number(restaurantId);

  if (Number.isNaN(parsedRestaurantId)) {
    const error = new Error("ID do restaurante inválido");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: parsedRestaurantId }
  });

  if (!restaurant) {
    const error = new Error("Restaurante não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return prisma.dish.create({
    data: {
      name: data.name,
      description: data.description || "",
      price: Number(data.price),
      restaurantId: parsedRestaurantId
    }
  });
}

async function listDishes(restaurantId) {
  const parsedRestaurantId = Number(restaurantId);

  if (Number.isNaN(parsedRestaurantId)) {
    const error = new Error("ID do restaurante inválido");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: parsedRestaurantId }
  });

  if (!restaurant) {
    const error = new Error("Restaurante não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return prisma.dish.findMany({
    where: { restaurantId: parsedRestaurantId }
  });
}

async function uploadDishImage(dishId, buffer) {
  const parsedDishId = Number(dishId);

  if (Number.isNaN(parsedDishId)) {
    const error = new Error("ID do prato inválido");
    error.statusCode = 400;
    throw error;
  }

  const dish = await prisma.dish.findUnique({
    where: { id: parsedDishId }
  });

  if (!dish) {
    const error = new Error("Prato não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const imageUrl = await imageService.processAndSaveImage(buffer, "dishes", 800);

  return prisma.dish.update({
    where: { id: parsedDishId },
    data: { imageUrl }
  });
}

module.exports = {
  createDish,
  listDishes,
  uploadDishImage
};
