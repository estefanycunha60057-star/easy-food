const prisma = require("../../database/prisma");
const emailService = require("../shared/email.service");

async function listRestaurants() {
  return prisma.restaurant.findMany({
    include: {
      dishes: true
    }
  });
}

async function createRestaurant(data, ownerId) {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: data.name,
      category: data.category,
      rating: data.rating || 0,
      ownerId: ownerId ? Number(ownerId) : null
    }
  });

  try {
    await emailService.sendEmail({
      to: data.ownerEmail || "contato@easyfood.com",
      toName: restaurant.name,
      subject: `Bem-vindo à EasyFood, ${restaurant.name}!`,
      header: `Olá, ${restaurant.name}!`,
      body: `Seu restaurante na categoria ${restaurant.category} foi cadastrado com sucesso.`,
      footer: "Equipe EasyFood"
    });
  } catch (error) {
    console.error("Falha ao enviar e-mail de boas-vindas:", error.message);
  }

  return restaurant;
}

module.exports = {
  listRestaurants,
  createRestaurant
};
