"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const RegisterInput_1 = require("../types/RegisterInput");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const UserMutationResponse_1 = require("../types/UserMutationResponse");
const LoginInput_1 = require("../types/LoginInput");
const auth_1 = require("../utils/auth");
let UserResolver = class UserResolver {
    async register(registerInput) {
        const { username, password } = registerInput;
        const existingUser = await User_1.User.findOne({ where: [{ username }] });
        if (existingUser) {
            return {
                code: 400,
                success: false,
                message: "Duplicated username",
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        const newUser = User_1.User.create({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        return {
            code: 200,
            success: true,
            message: "User registration successful",
            user: newUser,
        };
    }
    async login({ username, password }) {
        const existingUser = await User_1.User.findOne({ where: [{ username }] });
        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: "User not found",
            };
        }
        const isPassword = await argon2_1.default.verify(existingUser.password, password);
        if (!isPassword) {
            return {
                code: 400,
                success: false,
                message: "Incorrect password",
            };
        }
        return {
            code: 200,
            success: true,
            message: "Logged in successfully",
            user: existingUser,
            accessToken: (0, auth_1.createToken)(existingUser),
        };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((_return) => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)("registerInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)((_return) => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)("loginInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map