const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../../database/prisma");
const imageService = require("../shared/image.service");

async function register({ name, email, password }) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    const error = new Error("E-mail já cadastrado");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true
    }
  });

  return user;
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error("Credenciais inválidas");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error("Credenciais inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl
    }
  };
}

async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      createdAt: true
    }
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

async function updateAvatar(userId, buffer) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) }
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const avatarUrl = await imageService.processAndSaveImage(buffer, "users", 400);

  return prisma.user.update({
    where: { id: Number(userId) },
    data: { avatarUrl },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true
    }
  });
}

module.exports = {
  register,
  login,
  getProfile,
  updateAvatar
};
