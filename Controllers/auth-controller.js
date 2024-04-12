const Auth = require("../Models/Auth");
const ApiError = require("../utils/ApiError");
const TokenService = require("../services/token-service")
const bcrypt = require("bcrypt");

class AuthController {
    async register(req, res, next) {
        try {
            if (!req.body.login || !req.body.username || !req.body.password) {
                return next(ApiError.BadRequest("Check all fields"));
            }

            const [userByLogin] = await Auth.getUserByLogin(req.body.login);
            if (userByLogin.length > 0) {
                return next(ApiError.BadRequest("User with this login already exist"));
            }

            const data = await Auth.addUser(req.body)

            let tokens = TokenService.generateTokens({
                login: req.body.login,
                username: req.body.username,
                id: data[0].insertId,
            });

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(201).json(
                {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            if (!req.body.login || !req.body.password) {
                return next(ApiError.BadRequest("Check all fields"));
            }

            const [user] = await Auth.getUserByLogin(req.body.login);
            if (user.length === 0) {
                return next(ApiError.BadRequest("User with this login not found"));
            }

            let isPassword = bcrypt.compareSync(req.body.password, user[0].password);
            if (isPassword) {
                let tokens = TokenService.generateTokens({
                    login: user[0].login,
                    username: user[0].username,
                    id: user[0].id,
                });

                res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

                return res.status(201).json(
                    {
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                    });
            }

            return res.json(user);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return next(ApiError.Unauthorized());
            }

            const userData = TokenService.validateRefreshToken(refreshToken);
            if(!userData) {
                return next(ApiError.Unauthorized());
            }
            let tokens = TokenService.generateTokens({
                login: userData.login,
                username: userData.username,
                id: userData.id,
            });

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(201).json(
                {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                });

        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('refreshToken');
            res.status(200).json('logout');
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController();