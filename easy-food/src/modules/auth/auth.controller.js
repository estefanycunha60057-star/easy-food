const authService = require("./auth.service");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios"
      });
    }

    const user = await authService.register({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "E-mail e senha são obrigatórios"
      });
    }

    const session = await authService.login({ email, password });
    return res.json(session);
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const profile = await authService.getProfile(req.user.id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhuma imagem enviada"
      });
    }

    const updatedUser = await authService.updateAvatar(req.user.id, req.file.buffer);
    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  me,
  uploadAvatar
};
