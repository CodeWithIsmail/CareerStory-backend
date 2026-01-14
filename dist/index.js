var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

// src/routes/userRoutes.ts
import { Router } from "express";

// src/repositories/userRepository.ts
import { IsNull } from "typeorm";

// src/dataSource.ts
import "reflect-metadata";
import { DataSource } from "typeorm";

// src/entities/Auth.ts
import { Column as Column3, Entity as Entity2, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column as Column2, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

// src/utils/columnUtils.ts
import { Column } from "typeorm";
function UrlNullableColumn() {
  return Column({
    type: "varchar",
    length: 255,
    nullable: true
  });
}
__name(UrlNullableColumn, "UrlNullableColumn");

// src/config/environment.ts
var ENV = {
  PORT: parseInt(process.env.PORT),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_SECRET: process.env.JWT_SECRET,
  AUTH_JWT_EXPIRES_IN: parseInt(process.env.AUTH_JWT_EXPIRES_IN),
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN),
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  AI_MODEL_NAME: process.env.AI_MODEL_NAME
};

// src/types/customTypes.ts
var TOKEN_TYPE = /* @__PURE__ */ (function(TOKEN_TYPE2) {
  TOKEN_TYPE2["AUTH"] = "AUTH";
  TOKEN_TYPE2["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION";
  return TOKEN_TYPE2;
})({});
var REQ_SOURCE = /* @__PURE__ */ (function(REQ_SOURCE2) {
  REQ_SOURCE2["BODY"] = "body";
  REQ_SOURCE2["PARAM"] = "param";
  REQ_SOURCE2["QUERY"] = "query";
  return REQ_SOURCE2;
})({});
var UserRole = /* @__PURE__ */ (function(UserRole2) {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["USER"] = "USER";
  return UserRole2;
})({});
var tokenExpiryMap = {
  ["AUTH"]: ENV.AUTH_JWT_EXPIRES_IN,
  ["EMAIL_VERIFICATION"]: ENV.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN
};

// src/entities/User.ts
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var _User = class _User {
  constructor() {
    __publicField(this, "userId");
    __publicField(this, "userName");
    __publicField(this, "name");
    __publicField(this, "email");
    __publicField(this, "bio");
    __publicField(this, "organization");
    __publicField(this, "linkedInUrl");
    __publicField(this, "githubUrl");
    __publicField(this, "portfolioUrl");
    __publicField(this, "isEmailVerified");
    __publicField(this, "role");
    __publicField(this, "joinDate");
    __publicField(this, "updatedAt");
    __publicField(this, "deletedAt");
  }
};
__name(_User, "User");
var User = _User;
_ts_decorate([
  PrimaryGeneratedColumn("uuid"),
  _ts_metadata("design:type", String)
], User.prototype, "userId", void 0);
_ts_decorate([
  Column2({
    unique: true,
    length: 50
  }),
  _ts_metadata("design:type", String)
], User.prototype, "userName", void 0);
_ts_decorate([
  Column2({
    length: 100
  }),
  _ts_metadata("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate([
  Column2({
    unique: true,
    length: 255
  }),
  _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
  Column2({
    type: "varchar",
    length: 1e3,
    nullable: true
  }),
  _ts_metadata("design:type", Object)
], User.prototype, "bio", void 0);
_ts_decorate([
  Column2({
    type: "varchar",
    length: 255,
    nullable: true
  }),
  _ts_metadata("design:type", Object)
], User.prototype, "organization", void 0);
_ts_decorate([
  UrlNullableColumn(),
  _ts_metadata("design:type", Object)
], User.prototype, "linkedInUrl", void 0);
_ts_decorate([
  UrlNullableColumn(),
  _ts_metadata("design:type", Object)
], User.prototype, "githubUrl", void 0);
_ts_decorate([
  UrlNullableColumn(),
  _ts_metadata("design:type", Object)
], User.prototype, "portfolioUrl", void 0);
_ts_decorate([
  Column2({
    default: false
  }),
  _ts_metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
_ts_decorate([
  Column2({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  }),
  _ts_metadata("design:type", typeof UserRole === "undefined" ? Object : UserRole)
], User.prototype, "role", void 0);
_ts_decorate([
  CreateDateColumn(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "joinDate", void 0);
_ts_decorate([
  UpdateDateColumn(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "updatedAt", void 0);
_ts_decorate([
  DeleteDateColumn(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "deletedAt", void 0);
User = _ts_decorate([
  Entity({
    name: "users"
  })
], User);

// src/entities/Auth.ts
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var _Auth = class _Auth {
  constructor() {
    __publicField(this, "userId");
    __publicField(this, "hashedPassword");
    __publicField(this, "passwordLastModificationTime");
    __publicField(this, "user");
  }
};
__name(_Auth, "Auth");
var Auth = _Auth;
_ts_decorate2([
  PrimaryColumn("uuid"),
  _ts_metadata2("design:type", String)
], Auth.prototype, "userId", void 0);
_ts_decorate2([
  Column3(),
  _ts_metadata2("design:type", String)
], Auth.prototype, "hashedPassword", void 0);
_ts_decorate2([
  Column3({
    type: "timestamp",
    nullable: true
  }),
  _ts_metadata2("design:type", Object)
], Auth.prototype, "passwordLastModificationTime", void 0);
_ts_decorate2([
  OneToOne(() => User),
  JoinColumn({
    name: "userId",
    referencedColumnName: "userId"
  }),
  _ts_metadata2("design:type", typeof User === "undefined" ? Object : User)
], Auth.prototype, "user", void 0);
Auth = _ts_decorate2([
  Entity2()
], Auth);

// src/entities/Story.ts
import { Entity as Entity4, PrimaryGeneratedColumn as PrimaryGeneratedColumn3, Column as Column5, CreateDateColumn as CreateDateColumn3, UpdateDateColumn as UpdateDateColumn2, ManyToOne, JoinColumn as JoinColumn2, DeleteDateColumn as DeleteDateColumn3, ManyToMany as ManyToMany2, JoinTable } from "typeorm";

// src/entities/Category.ts
import { Entity as Entity3, PrimaryGeneratedColumn as PrimaryGeneratedColumn2, Column as Column4, CreateDateColumn as CreateDateColumn2, ManyToMany, DeleteDateColumn as DeleteDateColumn2 } from "typeorm";
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var _Category = class _Category {
  constructor() {
    __publicField(this, "categoryId");
    __publicField(this, "name");
    __publicField(this, "description");
    __publicField(this, "createdAt");
    __publicField(this, "deletedAt");
    __publicField(this, "stories");
  }
};
__name(_Category, "Category");
var Category = _Category;
_ts_decorate3([
  PrimaryGeneratedColumn2("uuid"),
  _ts_metadata3("design:type", String)
], Category.prototype, "categoryId", void 0);
_ts_decorate3([
  Column4({
    length: 50,
    unique: true
  }),
  _ts_metadata3("design:type", String)
], Category.prototype, "name", void 0);
_ts_decorate3([
  Column4({
    length: 255,
    nullable: true
  }),
  _ts_metadata3("design:type", String)
], Category.prototype, "description", void 0);
_ts_decorate3([
  CreateDateColumn2(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Category.prototype, "createdAt", void 0);
_ts_decorate3([
  DeleteDateColumn2(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Category.prototype, "deletedAt", void 0);
_ts_decorate3([
  ManyToMany(() => Story, (story) => story.categories),
  _ts_metadata3("design:type", Array)
], Category.prototype, "stories", void 0);
Category = _ts_decorate3([
  Entity3("categories")
], Category);

// src/entities/Story.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
var _Story = class _Story {
  constructor() {
    __publicField(this, "storyId");
    __publicField(this, "userId");
    __publicField(this, "title");
    __publicField(this, "body");
    __publicField(this, "summary");
    __publicField(this, "createdAt");
    __publicField(this, "updatedAt");
    __publicField(this, "deletedAt");
    __publicField(this, "user");
    __publicField(this, "categories");
  }
};
__name(_Story, "Story");
var Story = _Story;
_ts_decorate4([
  PrimaryGeneratedColumn3("uuid"),
  _ts_metadata4("design:type", String)
], Story.prototype, "storyId", void 0);
_ts_decorate4([
  Column5("uuid"),
  _ts_metadata4("design:type", String)
], Story.prototype, "userId", void 0);
_ts_decorate4([
  Column5({
    length: 255
  }),
  _ts_metadata4("design:type", String)
], Story.prototype, "title", void 0);
_ts_decorate4([
  Column5({
    type: "text"
  }),
  _ts_metadata4("design:type", String)
], Story.prototype, "body", void 0);
_ts_decorate4([
  Column5({
    type: "text",
    nullable: true
  }),
  _ts_metadata4("design:type", String)
], Story.prototype, "summary", void 0);
_ts_decorate4([
  CreateDateColumn3(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], Story.prototype, "createdAt", void 0);
_ts_decorate4([
  UpdateDateColumn2(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], Story.prototype, "updatedAt", void 0);
_ts_decorate4([
  DeleteDateColumn3(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], Story.prototype, "deletedAt", void 0);
_ts_decorate4([
  ManyToOne(() => User),
  JoinColumn2({
    name: "userId",
    referencedColumnName: "userId"
  }),
  _ts_metadata4("design:type", typeof User === "undefined" ? Object : User)
], Story.prototype, "user", void 0);
_ts_decorate4([
  ManyToMany2(() => Category, (category) => category.stories),
  JoinTable({
    name: "story_categories",
    joinColumn: {
      name: "storyId",
      referencedColumnName: "storyId"
    },
    inverseJoinColumn: {
      name: "categoryId",
      referencedColumnName: "categoryId"
    }
  }),
  _ts_metadata4("design:type", Array)
], Story.prototype, "categories", void 0);
Story = _ts_decorate4([
  Entity4({
    name: "stories"
  })
], Story);

// src/dataSource.ts
var isProduction = process.env.NODE_ENV === "production";
var AppDataSource = new DataSource({
  type: "postgres",
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  synchronize: !isProduction,
  ssl: isProduction ? {
    rejectUnauthorized: false
  } : false,
  entities: [
    User,
    Auth,
    Story,
    Category
  ]
});

// src/constants/errorMessages.ts
var HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};
var ERROR_MESSAGES = {
  AI: {
    SUMMARY_GENERATION_FAILED: "Failed to generate story summary",
    OPENROUTER_API_FAILED: "OpenRouter API failed to generate summary"
  },
  DATABASE: {
    DUPLICATE_ENTRY: "Duplicate entry in database",
    FOREIGN_KEY_CONFLICT: "Foreign key constraint violation",
    NOT_NULL_VIOLATION: "Not null constraint violation",
    INVALID_TYPE: "Invalid data type provided"
  },
  AUTH: {
    INCORRECT_PASSWORD: "Incorrect password",
    NO_TOKEN: "No authentication token provided",
    INVALID_TOKEN: "Invalid authentication token",
    TOKEN_EXPIRED: "Authentication token has expired",
    UNAUTHORIZED: "You do not have permission to perform this action",
    EMAIL_NOT_VERIFIED: "Email address not verified",
    EMAIL_ALREADY_VERIFIED: "Email address is already verified",
    CHANGE_PASSWORD: {
      UPDATE_FAILED: "Failed to update password"
    }
  },
  COMMON: {
    INVALID_JSON: "Invalid JSON format",
    ROUTE_NOT_FOUND: "Requested route not found.",
    INVALID_INPUT: "Invalid input data",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Resource not found",
    CONFLICT: "Conflict occurred",
    INTERNAL_SERVER_ERROR: "Internal server error",
    RATE_LIMIT_EXCEEDED: "Only 1 resend email attempt allowed every 5 minutes. Please try again later."
  },
  USER: {
    UNAUTHORIZED: "No authorized user found",
    NOT_FOUND: "User not found",
    DUPLICATE_EMAIL: "Email already exists",
    DUPLICATE_USERNAME: "Username already exists",
    DUPLICATE_EMAIL_AND_USERNAME: "Email and Username already exist"
  },
  STORY: {
    NOT_FOUND: "Story not found"
  },
  SERVER: {
    INTERNAL_SERVER_ERROR: "Internal server error",
    SERVICE_UNAVAILABLE: "Service temporarily unavailable"
  },
  CATEGORY: {
    DUPLICATE_NAME: "Category with this name already exists",
    CREATE: "Failed to create category",
    FETCH: "Category not found",
    UPDATE: "Failed to update category",
    DELETE: "Failed to delete category"
  }
};

// src/errors/AppError.ts
var _AppError = class _AppError extends Error {
  constructor(message, statusCode, context = "") {
    const fullMessage = message;
    super(fullMessage);
    __publicField(this, "statusCode");
    __publicField(this, "context");
    this.statusCode = statusCode;
    this.context = context;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
__name(_AppError, "AppError");
var AppError = _AppError;

// src/errors/CustomErrors.ts
var _UnauthorizedError = class _UnauthorizedError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.UNAUTHORIZED, context = "") {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED, context);
  }
};
__name(_UnauthorizedError, "UnauthorizedError");
var UnauthorizedError = _UnauthorizedError;
var _ForbiddenError = class _ForbiddenError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.FORBIDDEN, context = "") {
    super(message, HTTP_STATUS_CODES.FORBIDDEN, context);
  }
};
__name(_ForbiddenError, "ForbiddenError");
var ForbiddenError = _ForbiddenError;
var _NotFoundError = class _NotFoundError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.NOT_FOUND, context = "") {
    super(message, HTTP_STATUS_CODES.NOT_FOUND, context);
  }
};
__name(_NotFoundError, "NotFoundError");
var NotFoundError = _NotFoundError;
var _DatabaseError = class _DatabaseError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, context = "") {
    super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, context);
  }
};
__name(_DatabaseError, "DatabaseError");
var DatabaseError = _DatabaseError;
var _ConflictError = class _ConflictError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.CONFLICT, context = "") {
    super(message, HTTP_STATUS_CODES.CONFLICT, context);
  }
};
__name(_ConflictError, "ConflictError");
var ConflictError = _ConflictError;
var _AISummaryError = class _AISummaryError extends AppError {
  constructor(message = ERROR_MESSAGES.AI.SUMMARY_GENERATION_FAILED, context = "") {
    super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, context);
  }
};
__name(_AISummaryError, "AISummaryError");
var AISummaryError = _AISummaryError;
var _BadRequestError = class _BadRequestError extends AppError {
  constructor(message = ERROR_MESSAGES.COMMON.INVALID_INPUT, context = "") {
    super(message, HTTP_STATUS_CODES.BAD_REQUEST, context);
  }
};
__name(_BadRequestError, "BadRequestError");
var BadRequestError = _BadRequestError;

// src/utils/paginationUtils.ts
var _PaginationHelper = class _PaginationHelper {
  static async paginate(query, params, config) {
    const { page, itemsPerPage, sortDirection, orderBy, find } = params;
    const { searchableFields, entityAlias } = config;
    const skip = (page - 1) * itemsPerPage;
    if (find?.trim()) {
      const searchConditions = searchableFields.map((field) => `${String(field)} ILIKE :find `).join(" OR ");
      query.andWhere(`(${searchConditions})`, {
        find: `%${find}%`
      });
    }
    const [data, totalItems] = await query.skip(skip).take(itemsPerPage).orderBy(`${entityAlias}.${orderBy}`, sortDirection).getManyAndCount();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalItems > 0 && page > totalPages) {
      throw new NotFoundError(`Page ${page} does not exist. Total pages: ${totalPages}.`, `fetching ${entityAlias}s`);
    }
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;
    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage
      }
    };
  }
};
__name(_PaginationHelper, "PaginationHelper");
var PaginationHelper = _PaginationHelper;

// src/constants/paginationFields.ts
var storyFindOptions = [
  "stories.title",
  "stories.body",
  "users.userName",
  "users.name",
  "users.email"
];
var userFindOptions = [
  "users.userName",
  "users.email",
  "users.name"
];
var userOrderByOptions = [
  "userId",
  "userName",
  "name",
  "email",
  "joinDate"
];
var storyOrderByOptions = [
  "storyId",
  "userId",
  "title",
  "body",
  "createdAt",
  "updatedAt"
];

// src/mappers/paginationMapper.ts
var mapPaginationConfig = /* @__PURE__ */ __name((entityAlias, searchableFields) => {
  return {
    entityAlias,
    searchableFields
  };
}, "mapPaginationConfig");
var mapPaginatedResponse = /* @__PURE__ */ __name((paginated, mapperFn) => {
  return {
    data: mapperFn(paginated.data),
    pagination: paginated.pagination
  };
}, "mapPaginatedResponse");

// src/repositories/userRepository.ts
var _UserRepository = class _UserRepository {
  constructor() {
    __publicField(this, "userRepository", AppDataSource.getRepository(User));
  }
  async createUser(userData) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }
  async getAllUsers(paginationParams) {
    const query = this.userRepository.createQueryBuilder("users");
    query.where("users.isEmailVerified = :isEmailVerified", {
      isEmailVerified: true
    });
    const paginationConfig = mapPaginationConfig("users", userFindOptions);
    return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  }
  async getUserById(userId) {
    return this.userRepository.findOneBy({
      userId
    });
  }
  async getUserByUsername(userName) {
    return this.userRepository.findOne({
      where: {
        userName,
        deletedAt: IsNull()
      }
    });
  }
  async getUserByUsernameOrEmail(email, userName) {
    return this.userRepository.findOne({
      where: [
        {
          email
        },
        {
          userName
        }
      ],
      withDeleted: true
    });
  }
  async updateUser(userId, updateData) {
    await this.userRepository.update(userId, updateData);
    return this.getUserById(userId);
  }
  async deleteUser(userId) {
    return this.userRepository.softDelete({
      userId,
      deletedAt: IsNull()
    });
  }
};
__name(_UserRepository, "UserRepository");
var UserRepository = _UserRepository;

// src/validators/userValidator.ts
import { z as z2 } from "zod";

// src/constants/validationMessages.ts
var VALIDATION_MESSAGES = {
  URL: {
    INVALID: "URL must be a valid URL",
    MAX: "URL must be at most 255 characters"
  },
  COMMON: {
    AT_LEAST_ONE_FIELD: "At least one field must be provided for update"
  },
  AUTH: {
    TOKEN: {
      INVALID: "Token is invalid"
    },
    CHANGE_PASSWORD: {
      CURRENT_PASSWORD_REQUIRED: "Current password is required"
    }
  },
  USER: {
    USER_ID: {
      INVALID: "User ID must be a valid UUID"
    },
    USERNAME: {
      MIN: "Username must be at least 3 characters",
      MAX: "Username must be at most 50 characters",
      INVALID: "Username can only contain letters, numbers, and underscores",
      REQUIRED: "Username is required"
    },
    NAME: {
      MIN: "Name must be at least 3 characters",
      MAX: "Name must be at most 100 characters",
      REQUIRED: "Name is required"
    },
    ROLE: {
      INVALID: "Role must be ADMIN or USER"
    },
    EMAIL: {
      INVALID: "Email must be a valid email address",
      MAX: "Email must be at most 255 characters",
      REQUIRED: "Email is required"
    }
  },
  STORY: {
    SUMMARY: {
      REQUIRED: "generateSummary must be a boolean value"
    },
    USER_ID: {
      INVALID: "userId must be a valid UUID"
    },
    TITLE: {
      MIN: "Title must be at least 5 characters",
      MAX: "Title must be at most 255 characters",
      REQUIRED: "Title is required"
    },
    BODY: {
      MIN: "Body must be at least 10 characters",
      MAX: "Body must be at most 5000 characters",
      REQUIRED: "Body is required"
    },
    STORY_ID: {
      INVALID: "Story ID must be a valid UUID"
    }
  },
  PASSWORD: {
    REQUIRED: "Password is required",
    MIN: "Password must be at least 6 characters",
    MAX: "Password must be at most 128 characters",
    LOWERCASE: "Password must contain at least one lowercase letter",
    UPPERCASE: "Password must contain at least one uppercase letter",
    NUMBER: "Password must contain at least one number",
    SPECIAL: "Password must contain at least one special character (!@#$%^&*)",
    MISMATCH: "Passwords don't match",
    SAME_AS_CURRENT: "New password must be different from current password"
  },
  SORT_DIRECTION: {
    INVALID: "Sort direction must be either ASC or DESC"
  },
  CATEGORY: {
    NAME: {
      REQUIRED: "Category name is required",
      MAX: "Category name must be at most 50 characters long"
    },
    DESCRIPTION: {
      MAX: "Description must be at most 255 characters long"
    },
    INVALID: "Category ID must be a valid UUID"
  }
};

// src/validators/baseSchema.ts
import { z } from "zod";
var baseUrlSchema = z.url({
  message: VALIDATION_MESSAGES.URL.INVALID
}).trim().max(255, VALIDATION_MESSAGES.URL.MAX);
var baseUserSchema = z.object({
  userId: z.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID),
  userName: z.string().nonempty(VALIDATION_MESSAGES.USER.USERNAME.REQUIRED).min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN).max(50, VALIDATION_MESSAGES.USER.USERNAME.MAX).regex(/^[a-z0-9_]+$/, VALIDATION_MESSAGES.USER.USERNAME.INVALID),
  email: z.string().nonempty(VALIDATION_MESSAGES.USER.EMAIL.REQUIRED).email({
    message: VALIDATION_MESSAGES.USER.EMAIL.INVALID
  }).trim().max(255, VALIDATION_MESSAGES.USER.EMAIL.MAX).transform((email) => email.toLowerCase()),
  name: z.string().trim().nonempty(VALIDATION_MESSAGES.USER.NAME.REQUIRED).min(3, VALIDATION_MESSAGES.USER.NAME.MIN).max(100, VALIDATION_MESSAGES.USER.NAME.MAX),
  bio: z.string().trim().max(1e3).nullable().optional(),
  organization: z.string().trim().max(255).nullable().optional(),
  linkedInUrl: baseUrlSchema.nullable().optional(),
  githubUrl: baseUrlSchema.nullable().optional(),
  portfolioUrl: baseUrlSchema.nullable().optional(),
  isEmailVerified: z.boolean().default(false),
  role: z.enum(UserRole, {
    message: VALIDATION_MESSAGES.USER.ROLE.INVALID
  }).default(UserRole.USER),
  joinDate: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable().optional()
});
var basePasswordSchema = z.string({
  message: VALIDATION_MESSAGES.PASSWORD.REQUIRED
}).trim().nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED).min(6, VALIDATION_MESSAGES.PASSWORD.MIN).max(128, VALIDATION_MESSAGES.PASSWORD.MAX).regex(/[a-z]/, VALIDATION_MESSAGES.PASSWORD.LOWERCASE).regex(/[A-Z]/, VALIDATION_MESSAGES.PASSWORD.UPPERCASE).regex(/[0-9]/, VALIDATION_MESSAGES.PASSWORD.NUMBER).regex(/[^A-Za-z0-9]/, VALIDATION_MESSAGES.PASSWORD.SPECIAL);
var baseStorySchema = z.object({
  title: z.string().trim().nonempty(VALIDATION_MESSAGES.STORY.TITLE.REQUIRED).min(5, VALIDATION_MESSAGES.STORY.TITLE.MIN).max(255, VALIDATION_MESSAGES.STORY.TITLE.MAX),
  body: z.string().trim().nonempty(VALIDATION_MESSAGES.STORY.BODY.REQUIRED).min(10, VALIDATION_MESSAGES.STORY.BODY.MIN).max(5e3, VALIDATION_MESSAGES.STORY.BODY.MAX),
  categoryIds: z.array(z.uuid(VALIDATION_MESSAGES.CATEGORY.INVALID))
});
var basePaginationSchema = z.object({
  find: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  itemsPerPage: z.coerce.number().int().min(1).max(100).default(10),
  sortDirection: z.enum([
    "ASC",
    "DESC"
  ], {
    message: VALIDATION_MESSAGES.SORT_DIRECTION.INVALID
  }).default("ASC")
});
var baseCategorySchema = z.object({
  name: z.string({
    message: VALIDATION_MESSAGES.CATEGORY.NAME.REQUIRED
  }).min(1, VALIDATION_MESSAGES.CATEGORY.NAME.REQUIRED).max(50, VALIDATION_MESSAGES.CATEGORY.NAME.MAX),
  description: z.string().max(255, VALIDATION_MESSAGES.CATEGORY.DESCRIPTION.MAX).optional().nullable()
});

// src/validators/userValidator.ts
var createUserSchema = baseUserSchema.pick({
  userName: true,
  email: true,
  name: true
}).strict();
var updateUserProfileSchema = baseUserSchema.pick({
  name: true,
  bio: true,
  organization: true,
  linkedInUrl: true,
  githubUrl: true,
  portfolioUrl: true
}).strict().partial().refine((data) => Object.keys(data).length > 0, {
  message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD
});
var userProfileSchema = baseUserSchema.omit({
  deletedAt: true
}).strip();
var updateUserStatusSchema = baseUserSchema.pick({
  isEmailVerified: true,
  role: true
}).strict().partial().refine((data) => Object.keys(data).length > 0, {
  message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD
});
var updateUserRoleSchema = z2.object({
  role: z2.enum(UserRole, {
    message: VALIDATION_MESSAGES.USER.ROLE.INVALID
  })
}).strict();
var userParamSchema = z2.uuidv4(VALIDATION_MESSAGES.USER.USER_ID.INVALID);

// src/mappers/userMapper.ts
var mapUserToProfileDto = /* @__PURE__ */ __name((user) => userProfileSchema.parse(user), "mapUserToProfileDto");
var mapUsersToProfileDtoList = /* @__PURE__ */ __name((users) => users.map((user) => mapUserToProfileDto(user)), "mapUsersToProfileDtoList");

// src/utils/userUtils.ts
var checkForDuplicateUser = /* @__PURE__ */ __name((isExistingUser, user, context) => {
  if (isExistingUser) {
    if (isExistingUser.email == user.email && isExistingUser.userName == user.userName) throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL_AND_USERNAME, context);
    else if (isExistingUser.email === user.email) throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_EMAIL, context);
    else throw new ConflictError(ERROR_MESSAGES.USER.DUPLICATE_USERNAME, context);
  }
}, "checkForDuplicateUser");

// src/constants/context.ts
var CONTEXT = {
  MIDDLEWARE: {
    SYNTAX: "syntax error",
    AUTHENTICATION: "authentication",
    AUTHORIZATION: "authorization",
    VALIDATION: "Validation error",
    APPLICATION: "application error",
    DATABASE: "database error",
    UNEXPECTED: "unexpected error",
    UNKNOWN: "unknown error",
    EMAIL_CONFIRMATION: "email confirmation"
  },
  USER: {
    CREATE: "creating user",
    FETCH: "fetching user",
    UPDATE: "updating user",
    DELETE: "deleting user",
    EMAIL_VERIFICATION: "updating email verification status",
    UPDATE_ROLE: "updating user role"
  },
  STORY: {
    CREATE: "creating story",
    FETCH: "fetching story",
    UPDATE: "updating story",
    DELETE: "deleting story"
  },
  AUTH: {
    LOGIN: "user login",
    SIGNUP: "user signup",
    CONFIRM_EMAIL: "confirming email",
    RESEND_CONFIRMATION_EMAIL: "resending confirmation email",
    CHANGE_PASSWORD: "changing password"
  },
  CATEGORY: {
    CREATE: "creating category",
    FETCH: "fetching category",
    UPDATE: "updating category",
    DELETE: "deleting category"
  },
  AI: {
    SUMMARY_GENERATION: "AI summary generation"
  }
};

// src/services/userService.ts
var _UserService = class _UserService {
  constructor() {
    __publicField(this, "userRepository", new UserRepository());
  }
  async createUser(user) {
    const isExistingUser = await this.userRepository.getUserByUsernameOrEmail(user.email, user.userName);
    checkForDuplicateUser(isExistingUser, user, CONTEXT.USER.CREATE);
    const newUser = await this.userRepository.createUser(user);
    if (!newUser) {
      throw new DatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, CONTEXT.USER.CREATE);
    }
    return mapUserToProfileDto(newUser);
  }
  async getAllUsers(paginationParams) {
    const paginatedUsers = await this.userRepository.getAllUsers(paginationParams);
    return mapPaginatedResponse(paginatedUsers, mapUsersToProfileDtoList);
  }
  async getUserById(userId) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.FETCH);
    }
    return mapUserToProfileDto(user);
  }
  async getUserByUsername(userName) {
    const user = await this.userRepository.getUserByUsername(userName);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER.UNAUTHORIZED, CONTEXT.USER.FETCH);
    }
    return mapUserToProfileDto(user);
  }
  async updateUser(userId, updateData) {
    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if (!updatedUser) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.UPDATE);
    }
    return mapUserToProfileDto(updatedUser);
  }
  async deleteUser(userId) {
    const result = await this.userRepository.deleteUser(userId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.USER.DELETE);
    }
  }
};
__name(_UserService, "UserService");
var UserService = _UserService;

// src/utils/responseHandler.ts
var _SuccessResponse = class _SuccessResponse {
  constructor(statusCode, message, result) {
    __publicField(this, "success", true);
    __publicField(this, "statusCode");
    __publicField(this, "message");
    __publicField(this, "result");
    this.statusCode = statusCode;
    this.message = message;
    if (result !== void 0 && result !== null) this.result = result;
  }
};
__name(_SuccessResponse, "SuccessResponse");
var SuccessResponse = _SuccessResponse;
var _ErrorResponse = class _ErrorResponse {
  constructor(statusCode, message, details) {
    __publicField(this, "success", false);
    __publicField(this, "statusCode");
    __publicField(this, "message");
    __publicField(this, "details");
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
};
__name(_ErrorResponse, "ErrorResponse");
var ErrorResponse = _ErrorResponse;
var _ResponseHandler = class _ResponseHandler {
  static success(res, result, message, statusCode = HTTP_STATUS_CODES.OK) {
    const response = new SuccessResponse(statusCode, message, result);
    res.status(statusCode).json(response);
  }
  static created(res, result, message) {
    this.success(res, result, message, HTTP_STATUS_CODES.CREATED);
  }
  static error(res, message, statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, details) {
    const response = new ErrorResponse(statusCode, message, details);
    res.status(statusCode).json(response);
  }
  static noContent(res) {
    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
  }
};
__name(_ResponseHandler, "ResponseHandler");
var ResponseHandler = _ResponseHandler;

// src/constants/responseMessages.ts
var RESPONSE_MESSAGES = {
  AUTH: {
    EMAIL_CONFIRMATION: {
      SUCCESS: "Email confirmed successfully",
      RESEND: "Confirmation email resent successfully"
    },
    PASSWORD_CHANGE: {
      SUCCESS: "Password changed successfully"
    },
    LOGIN: {
      SUCCESS: "User logged in successfully"
    }
  },
  USER: {
    CREATE: {
      SUCCESS: "User created successfully"
    },
    FETCH: {
      ALL_SUCCESS: "Users retrieved successfully",
      BY_ID_SUCCESS: "User retrieved successfully",
      PROFILE_SUCCESS: "User profile retrieved successfully"
    },
    UPDATE: {
      SUCCESS: "User updated successfully",
      ROLE: "User role updated successfully"
    }
  },
  STORY: {
    CREATE: {
      SUCCESS: "Story created successfully"
    },
    FETCH: {
      ALL_SUCCESS: "Stories retrieved successfully",
      BY_ID_SUCCESS: "Story retrieved successfully",
      BY_USER_SUCCESS: "User stories retrieved successfully"
    },
    UPDATE: {
      SUCCESS: "Story updated successfully"
    }
  },
  CATEGORY: {
    CREATE: {
      SUCCESS: "Category created successfully"
    },
    FETCH: {
      ALL_SUCCESS: "Categories retrieved successfully",
      BY_ID_SUCCESS: "Category retrieved successfully",
      BY_NAME_SUCCESS: "Category retrieved successfully"
    },
    UPDATE: {
      SUCCESS: "Category updated successfully"
    },
    DELETE: {
      SUCCESS: "Category deleted successfully"
    }
  }
};

// src/controllers/userController.ts
var _UserController = class _UserController {
  constructor() {
    __publicField(this, "userService", new UserService());
    __publicField(this, "getAllUsers", /* @__PURE__ */ __name(async (req, res) => {
      const users = await this.userService.getAllUsers(req.validatedQuery);
      return ResponseHandler.success(res, users, RESPONSE_MESSAGES.USER.FETCH.ALL_SUCCESS);
    }, "getAllUsers"));
    __publicField(this, "getUserById", /* @__PURE__ */ __name(async (req, res) => {
      const user = await this.userService.getUserById(req.params.userId);
      return ResponseHandler.success(res, user, RESPONSE_MESSAGES.USER.FETCH.BY_ID_SUCCESS);
    }, "getUserById"));
    __publicField(this, "getCurrentUserProfile", /* @__PURE__ */ __name(async (req, res) => {
      const user = await this.userService.getUserById(req.userId);
      return ResponseHandler.success(res, user, RESPONSE_MESSAGES.USER.FETCH.PROFILE_SUCCESS);
    }, "getCurrentUserProfile"));
    __publicField(this, "updateUser", /* @__PURE__ */ __name(async (req, res) => {
      const updatedUser = await this.userService.updateUser(req.params.userId, req.body);
      return ResponseHandler.success(res, updatedUser, RESPONSE_MESSAGES.USER.UPDATE.SUCCESS);
    }, "updateUser"));
    __publicField(this, "updateUserProfile", /* @__PURE__ */ __name(async (req, res) => {
      const updatedUser = await this.userService.updateUser(req.userId, req.body);
      return ResponseHandler.success(res, updatedUser, RESPONSE_MESSAGES.USER.UPDATE.SUCCESS);
    }, "updateUserProfile"));
    __publicField(this, "deleteUser", /* @__PURE__ */ __name(async (req, res) => {
      await this.userService.deleteUser(req.params.userId);
      return ResponseHandler.noContent(res);
    }, "deleteUser"));
  }
};
__name(_UserController, "UserController");
var UserController = _UserController;

// src/middlewares/reqValidationMiddleware.ts
var reqValidation = /* @__PURE__ */ __name((source, schema, paramName) => {
  return (req, _res, next) => {
    switch (source) {
      case REQ_SOURCE.BODY:
        req.body = schema.parse(req.body);
        break;
      case REQ_SOURCE.PARAM:
        req.params[paramName] = schema.parse(req.params[paramName]);
        break;
      case REQ_SOURCE.QUERY:
        req.validatedQuery = schema.parse(req.query);
        break;
    }
    next();
  };
}, "reqValidation");

// src/validators/paginationValidator.ts
import { z as z3 } from "zod";
var userPaginationSchema = basePaginationSchema.extend({
  orderBy: z3.enum(userOrderByOptions).default("userName")
}).strict();
var storyPaginationSchema = basePaginationSchema.extend({
  category: z3.preprocess((val) => {
    if (val === void 0) return void 0;
    return Array.isArray(val) ? val : [
      val
    ];
  }, z3.array(z3.string()).optional()),
  orderBy: z3.enum(storyOrderByOptions).default("userId")
}).strict();

// src/utils/tokenUtils.ts
import jwt from "jsonwebtoken";
function generateToken(user, tokenType) {
  const payload = {
    userId: user.userId,
    role: user.role,
    tokenType
  };
  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: tokenExpiryMap[tokenType]
  });
  return token;
}
__name(generateToken, "generateToken");
function verifyToken(token) {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.MIDDLEWARE.AUTHENTICATION);
  }
}
__name(verifyToken, "verifyToken");
function generateTokenError(error) {
  if (error instanceof jwt.TokenExpiredError) throw new UnauthorizedError(ERROR_MESSAGES.AUTH.TOKEN_EXPIRED, CONTEXT.AUTH.CONFIRM_EMAIL);
  if (error instanceof jwt.JsonWebTokenError) throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.AUTH.CONFIRM_EMAIL);
  else throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.AUTH.CONFIRM_EMAIL);
}
__name(generateTokenError, "generateTokenError");

// src/middlewares/authenticationMiddleware.ts
var authenticate = /* @__PURE__ */ __name(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN, CONTEXT.MIDDLEWARE.AUTHENTICATION);
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  const userService = new UserService();
  const user = await userService.getUserById(decoded.userId);
  if (!user) {
    throw new UnauthorizedError(ERROR_MESSAGES.USER.NOT_FOUND, CONTEXT.MIDDLEWARE.AUTHENTICATION);
  }
  req.userId = decoded.userId;
  req.role = decoded.role;
  next();
}, "authenticate");

// src/validators/storyValidator.ts
import { z as z5 } from "zod";

// src/validators/categoryValidator.ts
import { z as z4 } from "zod";
var createCategorySchema = baseCategorySchema.strict();
var updateCategorySchema = baseCategorySchema.partial().strict().refine((data) => Object.keys(data).length > 0, {
  message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD
});
var categoryResponseSchema = baseCategorySchema.extend({
  categoryId: z4.uuidv4(),
  createdAt: z4.date()
}).strip();
var categoryParamSchema = z4.uuidv4(VALIDATION_MESSAGES.CATEGORY.INVALID);

// src/validators/storyValidator.ts
var createStorySchema = baseStorySchema.extend({
  categoryIds: baseStorySchema.shape.categoryIds.default([]),
  generateSummary: z5.boolean({
    message: VALIDATION_MESSAGES.STORY.SUMMARY.REQUIRED
  })
}).strict();
var updateStorySchema = baseStorySchema.extend({
  generateSummary: z5.boolean()
}).partial().strict().refine((data) => Object.keys(data).length > 0, {
  message: VALIDATION_MESSAGES.COMMON.AT_LEAST_ONE_FIELD
});
var storyResponseSchema = baseStorySchema.omit({
  categoryIds: true
}).extend({
  storyId: z5.uuidv4(),
  createdAt: z5.date(),
  updatedAt: z5.date(),
  summary: z5.string().nullable().optional(),
  categories: categoryResponseSchema.pick({
    categoryId: true,
    name: true,
    description: true
  }).array().default([]),
  user: userProfileSchema.pick({
    userId: true,
    userName: true,
    name: true,
    organization: true
  }).strip().nullable().optional()
}).strip();
var storyParamSchema = z5.uuidv4(VALIDATION_MESSAGES.STORY.STORY_ID.INVALID);

// src/mappers/storyMapper.ts
var mapStoryToDto = /* @__PURE__ */ __name((story) => storyResponseSchema.parse(story), "mapStoryToDto");
var mapStoriesToDtoList = /* @__PURE__ */ __name((stories) => stories.map((story) => mapStoryToDto(story)), "mapStoriesToDtoList");

// src/repositories/storyRepository.ts
import { IsNull as IsNull2 } from "typeorm";
var _StoryRepository = class _StoryRepository {
  constructor() {
    __publicField(this, "storyRepository", AppDataSource.getRepository(Story));
  }
  async createStory(storyData, categories) {
    const newStory = this.storyRepository.create({
      ...storyData,
      categories
    });
    return this.storyRepository.save(newStory);
  }
  async getStories(paginationParams, userId, categoryName) {
    const query = this.storyRepository.createQueryBuilder("stories").leftJoinAndSelect("stories.user", "users").leftJoinAndSelect("stories.categories", "categories");
    if (userId) {
      query.andWhere("stories.userId = :userId", {
        userId
      });
    }
    if (categoryName && categoryName.length > 0) {
      query.andWhere("LOWER(categories.name) IN (:...categoryName)", {
        categoryName: categoryName.map((name) => name.toLowerCase())
      });
    }
    const paginationConfig = mapPaginationConfig("stories", storyFindOptions);
    return PaginationHelper.paginate(query, paginationParams, paginationConfig);
  }
  async getStoryById(storyId) {
    return this.storyRepository.findOne({
      where: {
        storyId
      },
      relations: [
        "user",
        "categories"
      ]
    });
  }
  async updateStory(storyId, updateData, categories) {
    const { categoryIds, ...restUpdateData } = updateData;
    if (Object.keys(restUpdateData).length > 0) {
      await this.storyRepository.update(storyId, restUpdateData);
    }
    if (categories !== void 0) {
      const story = await this.storyRepository.findOne({
        where: {
          storyId
        },
        relations: [
          "categories"
        ]
      });
      story.categories = categories;
      await this.storyRepository.save(story);
    }
    return this.getStoryById(storyId);
  }
  async deleteStory(storyId) {
    return this.storyRepository.softDelete({
      storyId,
      deletedAt: IsNull2()
    });
  }
};
__name(_StoryRepository, "StoryRepository");
var StoryRepository = _StoryRepository;

// src/repositories/categoryRepository.ts
import { In, IsNull as IsNull3 } from "typeorm";
var _CategoryRepository = class _CategoryRepository {
  constructor() {
    __publicField(this, "categoryRepository", AppDataSource.getRepository(Category));
  }
  async createCategory(categoryData) {
    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }
  async updateCategory(categoryId, updateData) {
    await this.categoryRepository.update(categoryId, updateData);
    return this.getCategoryById(categoryId);
  }
  async getAllCategories() {
    return this.categoryRepository.find({
      where: {
        deletedAt: IsNull3()
      },
      order: {
        name: "ASC"
      }
    });
  }
  async getCategoryById(categoryId) {
    return this.categoryRepository.findOneBy({
      categoryId,
      deletedAt: IsNull3()
    });
  }
  async getCategoriesByIds(categoryIds) {
    return this.categoryRepository.findBy({
      categoryId: In(categoryIds),
      deletedAt: IsNull3()
    });
  }
  async getCategoryByName(name) {
    return this.categoryRepository.findOne({
      where: {
        name
      },
      withDeleted: true
    });
  }
  async deleteCategory(categoryId) {
    return this.categoryRepository.softDelete({
      categoryId,
      deletedAt: IsNull3()
    });
  }
};
__name(_CategoryRepository, "CategoryRepository");
var CategoryRepository = _CategoryRepository;

// src/mappers/categoryMapper.ts
var mapCategoryToDto = /* @__PURE__ */ __name((category) => categoryResponseSchema.parse(category), "mapCategoryToDto");
var mapCategoriesToDtoList = /* @__PURE__ */ __name((categories) => categories.map((category) => mapCategoryToDto(category)), "mapCategoriesToDtoList");

// src/services/categoryService.ts
var _CategoryService = class _CategoryService {
  constructor() {
    __publicField(this, "categoryRepository", new CategoryRepository());
  }
  async createCategory(categoryData) {
    const isExistingCategory = await this.categoryRepository.getCategoryByName(categoryData.name);
    if (isExistingCategory) {
      throw new ConflictError(ERROR_MESSAGES.CATEGORY.DUPLICATE_NAME, CONTEXT.CATEGORY.CREATE);
    }
    const newCategory = await this.categoryRepository.createCategory(categoryData);
    if (!newCategory) {
      throw new DatabaseError(ERROR_MESSAGES.CATEGORY.CREATE, CONTEXT.CATEGORY.CREATE);
    }
    return mapCategoryToDto(newCategory);
  }
  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return mapCategoriesToDtoList(categories);
  }
  async getCategoryById(categoryId) {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }
  async getCategoriesByIds(categoryIds) {
    const categories = await this.categoryRepository.getCategoriesByIds(categoryIds);
    return categories;
  }
  async getCategoryByName(name) {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.FETCH, CONTEXT.CATEGORY.FETCH);
    }
    return mapCategoryToDto(category);
  }
  async updateCategory(categoryId, updateData) {
    const updatedCategory = await this.categoryRepository.updateCategory(categoryId, updateData);
    if (!updatedCategory) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.UPDATE, CONTEXT.CATEGORY.UPDATE);
    }
    return mapCategoryToDto(updatedCategory);
  }
  async deleteCategory(categoryId) {
    const result = await this.categoryRepository.deleteCategory(categoryId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.CATEGORY.DELETE, CONTEXT.CATEGORY.DELETE);
    }
  }
};
__name(_CategoryService, "CategoryService");
var CategoryService = _CategoryService;

// src/services/aiService.ts
import { OpenRouter } from "@openrouter/sdk";

// src/utils/logger.ts
import winston from "winston";
var customFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }),
  // winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);
var transports = [
  // new winston.transports.File({
  //   filename: path.join(logsDir, 'error.log'),
  //   level: 'error',
  //   maxsize: 5242880,
  //   maxFiles: 5,
  // }),
  // new winston.transports.File({
  //   filename: path.join(logsDir, 'combined.log'),
  //   maxsize: 5242880,
  //   maxFiles: 10,
  // }),
  new winston.transports.Console({
    level: "debug",
    silent: ENV.NODE_ENV === "production",
    format: winston.format.combine(winston.format.colorize(), winston.format.printf(({ level, message, timestamp, context, ...meta }) => {
      let metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
      return `${timestamp} [${level}] ${message} ${context ? `(${context})` : ""} ${metaStr}`.trim();
    }))
  })
];
var logger = winston.createLogger({
  level: ENV.LOG_LEVEL || "info",
  format: customFormat,
  transports
});
var logger_default = logger;

// src/services/aiService.ts
var _AIService = class _AIService {
  constructor() {
    __publicField(this, "openRouter", new OpenRouter({
      apiKey: ENV.OPENROUTER_API_KEY
    }));
    __publicField(this, "modelName", ENV.AI_MODEL_NAME);
  }
  async generateStorySummary(title, body) {
    try {
      const prompt = `You are an expert career coach. Summarize the following interview experience in a concise and structured manner suitable for quick reading. Focus on actionable insights, key takeaways, and guidance a job seeker could immediately use. Include:
- Overall interview process (briefly)
- Main challenges and solutions
- Practical advice for future candidates
- Notable achievements or outcomes

Keep the summary short, ideally 5-7 sentences, while retaining essential information. Make it readable and informative for a job seeker who wants a quick overview. Don't include any styling like bullet points or numbering, bold italics underlines. Just give in plain text.

Story:
Title: ${title}
Body:
${body}

Summary:`;
      const response = await this.openRouter.chat.send({
        model: this.modelName,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      });
      const summary = response.choices?.[0]?.message?.content || "";
      return summary;
    } catch (error) {
      logger_default.error(CONTEXT.AI.SUMMARY_GENERATION, {
        message: "Error generating story summary",
        error
      });
      return null;
    }
  }
};
__name(_AIService, "AIService");
var AIService = _AIService;

// src/services/storyService.ts
var _StoryService = class _StoryService {
  constructor() {
    __publicField(this, "storyRepository", new StoryRepository());
    __publicField(this, "userService", new UserService());
    __publicField(this, "categoryService", new CategoryService());
    __publicField(this, "aiService", new AIService());
  }
  async createStory(story) {
    let categories = [];
    if (story.categoryIds.length > 0) {
      categories = await this.validateAndFetchCategories(story.categoryIds, CONTEXT.STORY.CREATE);
    }
    let summary = null;
    if (story.generateSummary) {
      summary = await this.aiService.generateStorySummary(story.title, story.body);
    }
    const newStoryData = {
      ...story,
      summary
    };
    const newStory = await this.storyRepository.createStory(newStoryData, categories);
    if (!newStory) {
      throw new DatabaseError(ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR, CONTEXT.STORY.CREATE);
    }
    return mapStoryToDto(newStory);
  }
  async getStories(paginationParams, userId) {
    let paginatedStories;
    if (userId) {
      await this.userService.getUserById(userId);
    }
    paginatedStories = await this.storyRepository.getStories(paginationParams, userId, paginationParams.category);
    return mapPaginatedResponse(paginatedStories, mapStoriesToDtoList);
  }
  async getStoryById(storyId) {
    const story = await this.storyRepository.getStoryById(storyId);
    if (!story) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.FETCH);
    }
    return mapStoryToDto(story);
  }
  async updateStory(storyId, updateData) {
    const story = await this.getStoryById(storyId);
    let updatedStory;
    const { generateSummary, ...newUpdateData } = updateData;
    if (generateSummary) {
      const summary = await this.aiService.generateStorySummary(updateData.title || story.title, updateData.body || story.body);
      newUpdateData["summary"] = summary;
    }
    if (updateData.categoryIds !== void 0) {
      const categories = await this.validateAndFetchCategories(updateData.categoryIds, CONTEXT.STORY.UPDATE);
      updatedStory = await this.storyRepository.updateStory(storyId, newUpdateData, categories);
    } else updatedStory = await this.storyRepository.updateStory(storyId, newUpdateData);
    if (!updatedStory) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.UPDATE);
    }
    return mapStoryToDto(updatedStory);
  }
  async deleteStory(storyId) {
    const result = await this.storyRepository.deleteStory(storyId);
    if (result.affected === 0) {
      throw new NotFoundError(ERROR_MESSAGES.STORY.NOT_FOUND, CONTEXT.STORY.DELETE);
    }
  }
  async storyAuthorUserId(storyId) {
    const story = await this.getStoryById(storyId);
    return story.user?.userId;
  }
  async validateAndFetchCategories(categoryIds, context) {
    const categories = await this.categoryService.getCategoriesByIds(categoryIds);
    const validCategoryIds = categories.map((category) => category.categoryId);
    const invalidCategoryIds = categoryIds.filter((categoryId) => !validCategoryIds.includes(categoryId));
    if (invalidCategoryIds.length > 0) {
      throw new NotFoundError(`${ERROR_MESSAGES.CATEGORY.FETCH}: Invalid category IDs - ${invalidCategoryIds.join(", ")}`, context);
    }
    return categories;
  }
};
__name(_StoryService, "StoryService");
var StoryService = _StoryService;

// src/middlewares/authorizationMiddleware.ts
var authorizeRoles = /* @__PURE__ */ __name((...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.role)) {
      throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
    }
    next();
  };
}, "authorizeRoles");
var authorizeStoryOwnerOrAdmin = /* @__PURE__ */ __name(async (req, _res, next) => {
  const storyService = new StoryService();
  const storyId = req.params.storyId;
  const storyAuthorUserId = await storyService.storyAuthorUserId(storyId);
  if (req.userId !== storyAuthorUserId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
}, "authorizeStoryOwnerOrAdmin");
var authorizeOwnerOrAdmin = /* @__PURE__ */ __name((req, _res, next) => {
  const resourceOwnerId = req.params.userId;
  if (req.userId !== resourceOwnerId && req.role !== UserRole.ADMIN) {
    throw new ForbiddenError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, CONTEXT.MIDDLEWARE.AUTHORIZATION);
  }
  next();
}, "authorizeOwnerOrAdmin");

// src/routes/userRoutes.ts
var userRouter = Router();
var userController = new UserController();
userRouter.get("/", reqValidation(REQ_SOURCE.QUERY, userPaginationSchema), userController.getAllUsers).get("/profile", authenticate, userController.getCurrentUserProfile).patch("/profile", authenticate, reqValidation(REQ_SOURCE.BODY, updateUserProfileSchema), userController.updateUserProfile).patch("/change-role/:userId", authenticate, authorizeRoles(UserRole.ADMIN), reqValidation(REQ_SOURCE.PARAM, userParamSchema, "userId"), reqValidation(REQ_SOURCE.BODY, updateUserRoleSchema), userController.updateUser).get("/:userId", reqValidation(REQ_SOURCE.PARAM, userParamSchema, "userId"), userController.getUserById).delete("/:userId", authenticate, reqValidation(REQ_SOURCE.PARAM, userParamSchema, "userId"), authorizeOwnerOrAdmin, userController.deleteUser);
var userRoutes_default = userRouter;

// src/errors/errorHandler.ts
import { z as z6 } from "zod";
import { QueryFailedError } from "typeorm";

// src/utils/formatZodErrors.ts
function formatZodErrors(error) {
  return error.issues.map((issue) => {
    let field = issue.code === "unrecognized_keys" ? issue.keys[0] : issue.path[0]?.toString();
    return {
      field,
      message: issue.message
    };
  });
}
__name(formatZodErrors, "formatZodErrors");

// src/errors/errorHandler.ts
var _ErrorHandler = class _ErrorHandler {
  static handleError(error, res, context = "") {
    let statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR;
    let errorDetails;
    if (error instanceof SyntaxError && "body" in error) {
      statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      message = ERROR_MESSAGES.COMMON.INVALID_JSON;
      logger_default.error(CONTEXT.MIDDLEWARE.SYNTAX, {
        context,
        errorMessage: error.message
      });
    } else if (error instanceof z6.ZodError) {
      statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      message = ERROR_MESSAGES.COMMON.INVALID_INPUT;
      errorDetails = formatZodErrors(error);
      logger_default.error(CONTEXT.MIDDLEWARE.VALIDATION, {
        context,
        errorCount: errorDetails.length,
        details: errorDetails
      });
    } else if (error instanceof AISummaryError) {
      statusCode = error.statusCode;
      message = error.message;
      logger_default.error(CONTEXT.AI.SUMMARY_GENERATION, {
        context,
        statusCode,
        message
      });
    } else if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;
      logger_default.error(CONTEXT.MIDDLEWARE.APPLICATION, {
        context,
        statusCode,
        message
      });
    } else if (error instanceof QueryFailedError) {
      const pgError = error;
      switch (pgError.code) {
        case "23505":
          statusCode = HTTP_STATUS_CODES.CONFLICT;
          message = ERROR_MESSAGES.DATABASE.DUPLICATE_ENTRY;
          break;
        case "23503":
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.FOREIGN_KEY_CONFLICT;
          break;
        case "23502":
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.NOT_NULL_VIOLATION;
          break;
        case "22P02":
          statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
          message = ERROR_MESSAGES.DATABASE.INVALID_TYPE;
          break;
      }
    } else if (error instanceof Error) {
      logger_default.error(CONTEXT.MIDDLEWARE.UNEXPECTED, {
        context,
        errorMessage: error.message,
        stack: error.stack
      });
    }
    ResponseHandler.error(res, message, statusCode, errorDetails);
  }
};
__name(_ErrorHandler, "ErrorHandler");
var ErrorHandler = _ErrorHandler;

// src/middlewares/globalErrorMiddleware.ts
var globalErrorMiddleware = /* @__PURE__ */ __name((err, req, res, _next) => {
  const context = `${req.method} ${req.originalUrl}`;
  ErrorHandler.handleError(err, res, context);
}, "globalErrorMiddleware");

// src/middlewares/notFoundMiddleware.ts
function routeNotFoundMiddleware(req, _res, next) {
  const error = new NotFoundError(ERROR_MESSAGES.COMMON.ROUTE_NOT_FOUND, `${req.method} ${req.originalUrl}`);
  next(error);
}
__name(routeNotFoundMiddleware, "routeNotFoundMiddleware");

// src/constants/logMessages.ts
var LOG_MESSAGES = {
  USER: {
    CREATE: {
      START: "Creating a new user",
      SUCCESS: "User created successfully",
      DUPLICATE_EMAIL: "Email already exists.",
      DUPLICATE_USERNAME: "Username already exists.",
      FAILED: "Failed to create user."
    },
    FETCH: {
      ALL_START: "Fetching all users",
      ALL_SUCCESS: "Users fetched successfully",
      BY_ID_START: "Fetching user by ID",
      BY_ID_SUCCESS: "User fetched successfully",
      BY_ID_NOT_FOUND: "User not found"
    },
    UPDATE: {
      START: "Updating user",
      SUCCESS: "User updated successfully",
      NOT_FOUND_UPDATE: "User not found for update"
    },
    DELETE: {
      START: "Deleting user",
      SUCCESS: "User deleted successfully",
      NOT_FOUND_DELETE: "User not found for deletion"
    }
  },
  STORY: {
    CREATE: {
      START: "Creating a new story",
      SUCCESS: "Story created successfully",
      FAILED: "Failed to create story",
      USER_NOT_FOUND: "User not found for story creation"
    },
    FETCH: {
      ALL_START: "Fetching all stories",
      ALL_SUCCESS: "Stories fetched successfully",
      BY_ID_START: "Fetching story by ID",
      BY_ID_SUCCESS: "Story fetched successfully",
      BY_ID_NOT_FOUND: "Story not found",
      BY_USER_START: "Fetching stories by user",
      BY_USER_SUCCESS: "User stories fetched successfully"
    },
    UPDATE: {
      START: "Updating story",
      SUCCESS: "Story updated successfully",
      NOT_FOUND: "Story not found for update"
    },
    DELETE: {
      START: "Deleting story",
      SUCCESS: "Story deleted successfully",
      NOT_FOUND: "Story not found for deletion"
    }
  },
  DATABASE: {
    CONNECTION: {
      SUCCESS: "Database connected successfully",
      FAILED: "Failed to connect to the database"
    }
  },
  SERVER: {
    RUNNING: "Server is running on port"
  }
};

// src/routes/storyRoutes.ts
import { Router as Router2 } from "express";

// src/controllers/storyController.ts
var _StoryController = class _StoryController {
  constructor() {
    __publicField(this, "storyService", new StoryService());
    __publicField(this, "createStory", /* @__PURE__ */ __name(async (req, res) => {
      const newStory = await this.storyService.createStory({
        ...req.body,
        userId: req.userId
      });
      return ResponseHandler.created(res, newStory, RESPONSE_MESSAGES.STORY.CREATE.SUCCESS);
    }, "createStory"));
    __publicField(this, "getAllStories", /* @__PURE__ */ __name(async (req, res) => {
      const stories = await this.storyService.getStories(req.validatedQuery, req.userId);
      return ResponseHandler.success(res, stories, RESPONSE_MESSAGES.STORY.FETCH.ALL_SUCCESS);
    }, "getAllStories"));
    __publicField(this, "getStoriesByUser", /* @__PURE__ */ __name(async (req, res) => {
      const stories = await this.storyService.getStories(req.validatedQuery, req.params.userId);
      return ResponseHandler.success(res, stories, RESPONSE_MESSAGES.STORY.FETCH.BY_USER_SUCCESS);
    }, "getStoriesByUser"));
    __publicField(this, "getStoryById", /* @__PURE__ */ __name(async (req, res) => {
      const story = await this.storyService.getStoryById(req.params.storyId);
      return ResponseHandler.success(res, story, RESPONSE_MESSAGES.STORY.FETCH.BY_ID_SUCCESS);
    }, "getStoryById"));
    __publicField(this, "updateStory", /* @__PURE__ */ __name(async (req, res) => {
      const updatedStory = await this.storyService.updateStory(req.params.storyId, req.body);
      return ResponseHandler.success(res, updatedStory, RESPONSE_MESSAGES.STORY.UPDATE.SUCCESS);
    }, "updateStory"));
    __publicField(this, "deleteStory", /* @__PURE__ */ __name(async (req, res) => {
      await this.storyService.deleteStory(req.params.storyId);
      return ResponseHandler.noContent(res);
    }, "deleteStory"));
  }
};
__name(_StoryController, "StoryController");
var StoryController = _StoryController;

// src/routes/storyRoutes.ts
var storyRouter = Router2();
var storyController = new StoryController();
storyRouter.post("/", authenticate, reqValidation(REQ_SOURCE.BODY, createStorySchema), storyController.createStory).get("/", reqValidation(REQ_SOURCE.QUERY, storyPaginationSchema), storyController.getAllStories).get("/user/:userId", reqValidation(REQ_SOURCE.PARAM, userParamSchema, "userId"), reqValidation(REQ_SOURCE.QUERY, storyPaginationSchema), storyController.getStoriesByUser).get("/:storyId", reqValidation(REQ_SOURCE.PARAM, storyParamSchema, "storyId"), storyController.getStoryById).patch("/:storyId", authenticate, reqValidation(REQ_SOURCE.PARAM, storyParamSchema, "storyId"), authorizeStoryOwnerOrAdmin, reqValidation(REQ_SOURCE.BODY, updateStorySchema), storyController.updateStory).delete("/:storyId", authenticate, reqValidation(REQ_SOURCE.PARAM, storyParamSchema, "storyId"), authorizeStoryOwnerOrAdmin, storyController.deleteStory);
var storyRoutes_default = storyRouter;

// src/routes/authRoutes.ts
import { Router as Router3 } from "express";

// src/utils/passwordUtils.ts
import bcrypt from "bcrypt";
async function generateHashedPassword(password) {
  return await bcrypt.hash(password, ENV.SALT_ROUNDS);
}
__name(generateHashedPassword, "generateHashedPassword");
async function validateUserPassword(password, hashedPassword, context) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INCORRECT_PASSWORD, context);
  }
}
__name(validateUserPassword, "validateUserPassword");

// src/mappers/authMapper.ts
var mapSignupToCreateUser = /* @__PURE__ */ __name((signup) => ({
  userName: signup.userName,
  name: signup.name,
  email: signup.email
}), "mapSignupToCreateUser");
var mapSignUpToCreateAuth = /* @__PURE__ */ __name(async (userId, password) => ({
  userId,
  hashedPassword: await generateHashedPassword(password)
}), "mapSignUpToCreateAuth");
var updateAuthMapper = /* @__PURE__ */ __name((hashedPassword, passwordLastModificationTime) => ({
  hashedPassword,
  passwordLastModificationTime
}), "updateAuthMapper");

// src/repositories/authRepository.ts
var _AuthRepository = class _AuthRepository {
  constructor() {
    __publicField(this, "authRepository", AppDataSource.getRepository(Auth));
  }
  async createAuth(authData) {
    const auth = this.authRepository.create(authData);
    return this.authRepository.save(auth);
  }
  async getAuthByUserId(userId) {
    return this.authRepository.findOne({
      where: {
        userId
      },
      relations: [
        "user"
      ]
    });
  }
  async updatePassword(userId, updateData) {
    await this.authRepository.update({
      userId
    }, updateData);
    return this.getAuthByUserId(userId);
  }
};
__name(_AuthRepository, "AuthRepository");
var AuthRepository = _AuthRepository;

// src/utils/emailUtils.ts
import nodemailer from "nodemailer";

// src/emails/passwordChange.ts
function createPasswordChangeConfirmation(userName, timestamp) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2a6df4; margin-bottom: 16px;">CareerStory</h2>

      <p>Hi ${userName},</p>

      <p>Your password has been changed successfully on <strong>${timestamp}</strong>.</p>
      
      <div style="background-color: #e8f5e9; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4caf50;">
        <p style="margin: 0; color: #2e7d32;">\u2713 Password change completed</p>
      </div>
      
      <p>If you didn't make this change, please contact support immediately and reset your password.</p>
      
      <p><strong>Security Tips:</strong></p>
      <ul style="color: #666;">
        <li>Use a strong, unique password</li>
        <li>Don't share your password with anyone</li>
        <li>Update your password regularly</li>
        <li>Be cautious of phishing emails</li>
      </ul>
      
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} CareerStory
      </p>
    </div>
  `;
}
__name(createPasswordChangeConfirmation, "createPasswordChangeConfirmation");

// src/emails/emailVerification.ts
function createVerificationEmail(newUser, verificationLink) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2a6df4; margin-bottom: 16px;">CareerStory</h2>

      <p>Hi ${newUser.userName},</p>

      <p>Welcome to CareerStory. Please confirm your email address to activate your account.</p>

      <p>
        <a href="${verificationLink}" 
           style="background: #2a6df4; color: white; padding: 10px 18px; 
                  text-decoration: none; border-radius: 4px;">
          Confirm Email
        </a>
      </p>

      <p>If the button does not work, you can use this link:</p>
      <p style="word-break: break-all; color: #2a6df4;">${verificationLink}</p>

      <p>This link expires in 24 hours.</p>

      <p>If you did not request this, you can safely ignore this email.</p>

      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} CareerStory
      </p>
    </div>
  `;
}
__name(createVerificationEmail, "createVerificationEmail");

// src/utils/emailUtils.ts
var transporter = nodemailer.createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS
  }
});
var sendPasswordChangeConfirmationEmail = /* @__PURE__ */ __name(async (userName, email, timestamp) => {
  const mailOptions = {
    from: `"CareerStory" <${ENV.EMAIL_USER}>`,
    to: email,
    subject: "Password Changed Successfully \u2013 CareerStory",
    html: createPasswordChangeConfirmation(userName, timestamp)
  };
  await transporter.sendMail(mailOptions);
}, "sendPasswordChangeConfirmationEmail");
var sendVerificationEmail = /* @__PURE__ */ __name(async (newUser, token) => {
  const verificationLink = `${ENV.BACKEND_URL}/auth/confirm-email/${token}`;
  const mailOptions = {
    from: `"CareerStory" <${ENV.EMAIL_USER}>`,
    to: newUser.email,
    subject: `Confirm Your Email \u2013 CareerStory`,
    html: createVerificationEmail(newUser, verificationLink)
  };
  await transporter.sendMail(mailOptions);
}, "sendVerificationEmail");

// src/services/authService.ts
import jwt2 from "jsonwebtoken";
var _AuthService = class _AuthService {
  constructor() {
    __publicField(this, "userService", new UserService());
    __publicField(this, "authRepository", new AuthRepository());
  }
  async signup(signupDto) {
    const createUserDto = mapSignupToCreateUser(signupDto);
    const newUser = await this.userService.createUser(createUserDto);
    const authData = await mapSignUpToCreateAuth(newUser.userId, signupDto.password);
    await this.authRepository.createAuth(authData);
    await this.sendVerificationEmail(newUser);
    return newUser;
  }
  async sendVerificationEmail(newUser) {
    const emailVerificationToken = generateToken(newUser, TOKEN_TYPE.EMAIL_VERIFICATION);
    await sendVerificationEmail(newUser, emailVerificationToken);
  }
  async resendConfirmationEmail(userName) {
    const user = await this.userService.getUserByUsername(userName);
    if (user.isEmailVerified) {
      throw new BadRequestError(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED, CONTEXT.AUTH.RESEND_CONFIRMATION_EMAIL);
    }
    await this.sendVerificationEmail(user);
  }
  async confirmEmail(token) {
    try {
      const decoded = jwt2.verify(token, ENV.JWT_SECRET);
      if (decoded.tokenType !== TOKEN_TYPE.EMAIL_VERIFICATION) {
        throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, CONTEXT.AUTH.CONFIRM_EMAIL);
      }
      const userId = decoded.userId;
      await this.userService.updateUser(userId, {
        isEmailVerified: true
      });
    } catch (error) {
      generateTokenError(error);
    }
  }
  async login(loginDto) {
    const user = await this.userService.getUserByUsername(loginDto.userName);
    if (!user.isEmailVerified) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED, CONTEXT.AUTH.LOGIN);
    }
    const auth = await this.getAuthByUserId(user.userId, CONTEXT.AUTH.LOGIN);
    await validateUserPassword(loginDto.password, auth.hashedPassword, CONTEXT.AUTH.LOGIN);
    const accessToken = generateToken(user, TOKEN_TYPE.AUTH);
    return {
      accessToken,
      expiresIn: ENV.AUTH_JWT_EXPIRES_IN,
      user
    };
  }
  async getAuthByUserId(userId, context) {
    const auth = await this.authRepository.getAuthByUserId(userId);
    if (!auth) {
      throw new UnauthorizedError(ERROR_MESSAGES.USER.UNAUTHORIZED, context);
    }
    return auth;
  }
  async changePassword(userId, changePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const auth = await this.getAuthByUserId(userId, CONTEXT.AUTH.CHANGE_PASSWORD);
    await validateUserPassword(currentPassword, auth.hashedPassword, CONTEXT.AUTH.CHANGE_PASSWORD);
    const hashedNewPassword = await generateHashedPassword(newPassword);
    const lastModificationTime = /* @__PURE__ */ new Date();
    const updateData = updateAuthMapper(hashedNewPassword, lastModificationTime);
    const result = await this.authRepository.updatePassword(userId, updateData);
    if (!result) {
      throw new DatabaseError(ERROR_MESSAGES.AUTH.CHANGE_PASSWORD.UPDATE_FAILED, CONTEXT.AUTH.CHANGE_PASSWORD);
    }
    await sendPasswordChangeConfirmationEmail(result.user.userName, result.user.email, lastModificationTime.toLocaleString());
  }
};
__name(_AuthService, "AuthService");
var AuthService = _AuthService;

// src/controllers/authController.ts
var _AuthController = class _AuthController {
  constructor() {
    __publicField(this, "authService", new AuthService());
    __publicField(this, "signup", /* @__PURE__ */ __name(async (req, res) => {
      const newUser = await this.authService.signup(req.body);
      return ResponseHandler.created(res, newUser, RESPONSE_MESSAGES.USER.CREATE.SUCCESS);
    }, "signup"));
    __publicField(this, "login", /* @__PURE__ */ __name(async (req, res) => {
      const user = await this.authService.login(req.body);
      return ResponseHandler.success(res, user, RESPONSE_MESSAGES.AUTH.LOGIN.SUCCESS);
    }, "login"));
    __publicField(this, "confirmEmail", /* @__PURE__ */ __name(async (req, res) => {
      try {
        await this.authService.confirmEmail(req.params.token);
        return res.redirect(`${ENV.FRONTEND_URL}/email-confirmation-status?status=success`);
      } catch (error) {
        let errorCode = "verification_failed";
        if (error.message === ERROR_MESSAGES.AUTH.TOKEN_EXPIRED) {
          errorCode = "token_expired";
        } else if (error.message === ERROR_MESSAGES.AUTH.INVALID_TOKEN) {
          errorCode = "invalid_token";
        } else if (error.message === ERROR_MESSAGES.USER.NOT_FOUND) {
          errorCode = "user_not_found";
        } else if (error.message === ERROR_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED) {
          errorCode = "already_verified";
        }
        return res.redirect(`${ENV.FRONTEND_URL}/email-confirmation-status?status=error&code=${errorCode}`);
      }
    }, "confirmEmail"));
    __publicField(this, "resendConfirmationEmail", /* @__PURE__ */ __name(async (req, res) => {
      await this.authService.resendConfirmationEmail(req.params.userName);
      return ResponseHandler.success(res, null, RESPONSE_MESSAGES.AUTH.EMAIL_CONFIRMATION.RESEND);
    }, "resendConfirmationEmail"));
    __publicField(this, "changePassword", /* @__PURE__ */ __name(async (req, res) => {
      await this.authService.changePassword(req.userId, req.body);
      return ResponseHandler.success(res, null, RESPONSE_MESSAGES.AUTH.PASSWORD_CHANGE.SUCCESS);
    }, "changePassword"));
  }
};
__name(_AuthController, "AuthController");
var AuthController = _AuthController;

// src/middlewares/rateLimitMiddleware.ts
import { rateLimit } from "express-rate-limit";
var createRateLimitError = /* @__PURE__ */ __name((message) => ({
  success: false,
  statusCode: 429,
  message
}), "createRateLimitError");
var resendEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1e3,
  max: 1,
  message: createRateLimitError(ERROR_MESSAGES.COMMON.RATE_LIMIT_EXCEEDED),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: /* @__PURE__ */ __name((req) => req.params.userName || "unknown", "keyGenerator")
});

// src/validators/authValidator.ts
import { z as z7 } from "zod";
var signupSchema = baseUserSchema.pick({
  userName: true,
  email: true,
  name: true
}).extend({
  password: basePasswordSchema,
  confirmPassword: basePasswordSchema
}).strict().refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
  path: [
    "confirmPassword"
  ]
});
var loginSchema = z7.object({
  userName: z7.string().nonempty(VALIDATION_MESSAGES.USER.USERNAME.REQUIRED),
  password: z7.string().nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
}).strict();
var emailResendSchema = z7.string().min(3, VALIDATION_MESSAGES.USER.USERNAME.MIN);
var changePasswordSchema = z7.object({
  currentPassword: basePasswordSchema,
  newPassword: basePasswordSchema,
  confirmPassword: z7.string({
    message: VALIDATION_MESSAGES.PASSWORD.REQUIRED
  }).nonempty(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
}).strict().refine((data) => data.currentPassword !== data.newPassword, {
  message: VALIDATION_MESSAGES.PASSWORD.SAME_AS_CURRENT,
  path: [
    "newPassword"
  ]
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: VALIDATION_MESSAGES.PASSWORD.MISMATCH,
  path: [
    "confirmPassword"
  ]
});
var tokenPayloadSchema = z7.object({
  userId: z7.uuidv4(),
  role: z7.enum(UserRole),
  tokenType: z7.enum(TOKEN_TYPE)
}).strict();
var tokenParamSchema = z7.jwt(VALIDATION_MESSAGES.AUTH.TOKEN.INVALID);
var authResponseSchema = z7.object({
  accessToken: z7.string(),
  expiresIn: z7.number(),
  user: tokenPayloadSchema.omit({
    tokenType: true
  })
}).strip();
var createAuthSchema = z7.object({
  userId: z7.uuidv4(),
  hashedPassword: z7.string()
}).strict();
var changePasswordResponseSchema = z7.object({
  message: z7.string(),
  timestamp: z7.date()
}).strip();

// src/routes/authRoutes.ts
var authRouter = Router3();
var authController = new AuthController();
authRouter.post("/signup", reqValidation(REQ_SOURCE.BODY, signupSchema), authController.signup).post("/login", reqValidation(REQ_SOURCE.BODY, loginSchema), authController.login).get("/confirm-email/:token", reqValidation(REQ_SOURCE.PARAM, tokenParamSchema, "token"), authController.confirmEmail).post("/resend-confirm-email/:userName", reqValidation(REQ_SOURCE.PARAM, emailResendSchema, "userName"), resendEmailLimiter, authController.resendConfirmationEmail).post("/change-password", authenticate, reqValidation(REQ_SOURCE.BODY, changePasswordSchema), authController.changePassword);
var authRoutes_default = authRouter;

// src/routes/categoryRoutes.ts
import { Router as Router4 } from "express";

// src/controllers/categoryController.ts
var _CategoryController = class _CategoryController {
  constructor() {
    __publicField(this, "categoryService", new CategoryService());
    __publicField(this, "createCategory", /* @__PURE__ */ __name(async (req, res) => {
      const newCategory = await this.categoryService.createCategory(req.body);
      return ResponseHandler.created(res, newCategory, RESPONSE_MESSAGES.CATEGORY.CREATE.SUCCESS);
    }, "createCategory"));
    __publicField(this, "getAllCategories", /* @__PURE__ */ __name(async (_req, res) => {
      const categories = await this.categoryService.getAllCategories();
      return ResponseHandler.success(res, categories, RESPONSE_MESSAGES.CATEGORY.FETCH.ALL_SUCCESS);
    }, "getAllCategories"));
    __publicField(this, "updateCategory", /* @__PURE__ */ __name(async (req, res) => {
      const updatedCategory = await this.categoryService.updateCategory(req.params.categoryId, req.body);
      return ResponseHandler.success(res, updatedCategory, RESPONSE_MESSAGES.CATEGORY.UPDATE.SUCCESS);
    }, "updateCategory"));
    __publicField(this, "deleteCategory", /* @__PURE__ */ __name(async (req, res) => {
      await this.categoryService.deleteCategory(req.params.categoryId);
      return ResponseHandler.noContent(res);
    }, "deleteCategory"));
  }
};
__name(_CategoryController, "CategoryController");
var CategoryController = _CategoryController;

// src/routes/categoryRoutes.ts
var categoryRouter = Router4();
var categoryController = new CategoryController();
categoryRouter.get("/", categoryController.getAllCategories).post("/", authenticate, authorizeRoles(UserRole.ADMIN), reqValidation(REQ_SOURCE.BODY, createCategorySchema), categoryController.createCategory).patch("/:categoryId", authenticate, authorizeRoles(UserRole.ADMIN), reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, "categoryId"), reqValidation(REQ_SOURCE.BODY, updateCategorySchema), categoryController.updateCategory).delete("/:categoryId", authenticate, authorizeRoles(UserRole.ADMIN), reqValidation(REQ_SOURCE.PARAM, categoryParamSchema, "categoryId"), categoryController.deleteCategory);
var categoryRoutes_default = categoryRouter;

// src/swagger/swaggerConfig.ts
import swaggerJsdoc from "swagger-jsdoc";
var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CareerStory API",
      version: "1.0.0",
      description: "API documentation for CareerStory, a platform for sharing recruitment experience stories for software engineers. This documentation provides details about the available endpoints, request/response formats, authentication methods, and error handling.",
      contact: {
        name: "CareerStory",
        url: "https://github.com/CodeWithIsmail/CarrerStory-backend"
      }
    },
    servers: [
      {
        url: ENV.BACKEND_URL,
        description: "Development server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT Bearer token for authentication"
        }
      },
      schemas: {
        // ==========================================
        // RESPONSE MODELS
        // ==========================================
        User: {
          type: "object",
          description: "User profile data returned in responses",
          required: [
            "userId",
            "userName",
            "email",
            "name",
            "isEmailVerified",
            "role",
            "joinDate",
            "updatedAt"
          ],
          properties: {
            userId: {
              type: "string",
              format: "uuid"
            },
            userName: {
              type: "string",
              minLength: 3,
              maxLength: 50
            },
            email: {
              type: "string",
              format: "email"
            },
            name: {
              type: "string",
              minLength: 3,
              maxLength: 100
            },
            bio: {
              type: "string",
              maxLength: 1e3,
              nullable: true
            },
            organization: {
              type: "string",
              maxLength: 255,
              nullable: true
            },
            linkedInUrl: {
              type: "string",
              format: "uri",
              nullable: true
            },
            githubUrl: {
              type: "string",
              format: "uri",
              nullable: true
            },
            portfolioUrl: {
              type: "string",
              format: "uri",
              nullable: true
            },
            isEmailVerified: {
              type: "boolean"
            },
            role: {
              type: "string",
              enum: [
                "USER",
                "ADMIN"
              ]
            },
            joinDate: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Story: {
          type: "object",
          description: "Story with author and categories",
          required: [
            "storyId",
            "userId",
            "title",
            "body",
            "createdAt",
            "updatedAt"
          ],
          properties: {
            storyId: {
              type: "string",
              format: "uuid"
            },
            userId: {
              type: "string",
              format: "uuid"
            },
            title: {
              type: "string",
              minLength: 5,
              maxLength: 255
            },
            body: {
              type: "string",
              minLength: 10,
              maxLength: 5e3
            },
            summary: {
              type: "string",
              nullable: true
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "string",
                    format: "uuid"
                  },
                  name: {
                    type: "string"
                  },
                  description: {
                    type: "string",
                    nullable: true
                  }
                }
              }
            },
            user: {
              type: "object",
              nullable: true,
              properties: {
                userId: {
                  type: "string",
                  format: "uuid"
                },
                userName: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                organization: {
                  type: "string",
                  nullable: true
                }
              }
            }
          }
        },
        Category: {
          type: "object",
          description: "Story category",
          required: [
            "categoryId",
            "name",
            "createdAt"
          ],
          properties: {
            categoryId: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 50
            },
            description: {
              type: "string",
              maxLength: 255,
              nullable: true
            },
            createdAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        AuthResponse: {
          type: "object",
          description: "Login response with JWT token",
          required: [
            "accessToken",
            "expiresIn",
            "user"
          ],
          properties: {
            accessToken: {
              type: "string",
              description: "JWT access token"
            },
            expiresIn: {
              type: "integer",
              description: "Token expiry in seconds"
            },
            user: {
              $ref: "#/components/schemas/User"
            }
          }
        },
        // ==========================================
        // REQUEST MODELS - Authentication
        // ==========================================
        SignupRequest: {
          type: "object",
          description: "User registration",
          required: [
            "userName",
            "email",
            "name",
            "password",
            "confirmPassword"
          ],
          properties: {
            userName: {
              type: "string",
              minLength: 3,
              maxLength: 50,
              pattern: "^[a-z0-9_]+$",
              example: "ismail_hossain"
            },
            email: {
              type: "string",
              format: "email",
              example: "ismail@example.com"
            },
            name: {
              type: "string",
              minLength: 3,
              maxLength: 100,
              example: "ismail hossain"
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 128,
              description: "Must include uppercase, lowercase, number, special character",
              example: "SecurePass123!"
            },
            confirmPassword: {
              type: "string",
              example: "SecurePass123!"
            }
          }
        },
        LoginRequest: {
          type: "object",
          description: "User login",
          required: [
            "userName",
            "password"
          ],
          properties: {
            userName: {
              type: "string",
              example: "ismail_hossain"
            },
            password: {
              type: "string",
              example: "SecurePass123!"
            }
          }
        },
        UpdatePasswordRequest: {
          type: "object",
          description: "Change user password",
          required: [
            "currentPassword",
            "newPassword",
            "confirmPassword"
          ],
          properties: {
            currentPassword: {
              type: "string",
              example: "CurrentPass123!"
            },
            newPassword: {
              type: "string",
              minLength: 6,
              maxLength: 128,
              description: "Must include uppercase, lowercase, number, special character",
              example: "NewSecurePass123!"
            },
            confirmPassword: {
              type: "string",
              example: "NewSecurePass123!"
            }
          }
        },
        // ==========================================
        // REQUEST MODELS - User
        // ==========================================
        UpdateUserProfileRequest: {
          type: "object",
          description: "Update user profile (at least one field required)",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 100
            },
            bio: {
              type: "string",
              maxLength: 1e3,
              nullable: true
            },
            organization: {
              type: "string",
              maxLength: 255,
              nullable: true
            },
            linkedInUrl: {
              type: "string",
              format: "uri",
              nullable: true
            },
            githubUrl: {
              type: "string",
              format: "uri",
              nullable: true
            },
            portfolioUrl: {
              type: "string",
              format: "uri",
              nullable: true
            }
          }
        },
        UpdateUserRoleRequest: {
          type: "object",
          description: "\u26A0\uFE0F ADMIN ONLY - Update user role. Requires admin privileges.",
          required: [
            "role"
          ],
          properties: {
            role: {
              type: "string",
              enum: [
                "USER",
                "ADMIN"
              ]
            }
          }
        },
        // ==========================================
        // REQUEST MODELS - Story
        // ==========================================
        CreateStoryRequest: {
          type: "object",
          description: "Create a new story",
          required: [
            "title",
            "body",
            "generateSummary"
          ],
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 255,
              example: "My Journey to Google"
            },
            body: {
              type: "string",
              minLength: 10,
              maxLength: 5e3
            },
            categoryIds: {
              type: "array",
              items: {
                type: "string",
                format: "uuid"
              },
              default: []
            },
            generateSummary: {
              type: "boolean",
              description: "Auto-generate AI summary"
            }
          }
        },
        UpdateStoryRequest: {
          type: "object",
          description: "Update story (at least one field required)",
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 255
            },
            body: {
              type: "string",
              minLength: 10,
              maxLength: 5e3
            },
            categoryIds: {
              type: "array",
              items: {
                type: "string",
                format: "uuid"
              }
            },
            generateSummary: {
              type: "boolean"
            }
          }
        },
        // ==========================================
        // REQUEST MODELS - Category
        // ==========================================
        CreateCategoryRequest: {
          type: "object",
          description: "\u26A0\uFE0F ADMIN ONLY - Create Category. Requires admin privileges.",
          required: [
            "name"
          ],
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 50,
              example: "Frontend Development"
            },
            description: {
              type: "string",
              maxLength: 255,
              nullable: true
            }
          }
        },
        UpdateCategoryRequest: {
          type: "object",
          description: "\u26A0\uFE0F ADMIN ONLY - Update category (at least one field required). Requires admin privileges.",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 50
            },
            description: {
              type: "string",
              maxLength: 255,
              nullable: true
            }
          }
        },
        // ==========================================
        // RESPONSE WRAPPERS
        // ==========================================
        SuccessResponse: {
          type: "object",
          description: "Standard success response",
          required: [
            "success",
            "statusCode",
            "message"
          ],
          properties: {
            success: {
              type: "boolean",
              enum: [
                true
              ]
            },
            statusCode: {
              type: "integer"
            },
            message: {
              type: "string"
            },
            result: {
              type: "object",
              description: "Response data (varies by endpoint)"
            }
          }
        },
        PaginatedResponse: {
          type: "object",
          description: "Paginated list response",
          properties: {
            success: {
              type: "boolean",
              enum: [
                true
              ]
            },
            statusCode: {
              type: "integer"
            },
            message: {
              type: "string"
            },
            result: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object"
                  }
                },
                pagination: {
                  $ref: "#/components/schemas/PaginationMetadata"
                }
              }
            }
          }
        },
        PaginationMetadata: {
          type: "object",
          description: "Pagination info",
          properties: {
            totalItems: {
              type: "integer"
            },
            totalPages: {
              type: "integer"
            },
            currentPage: {
              type: "integer"
            },
            itemsPerPage: {
              type: "integer"
            },
            hasNextPage: {
              type: "boolean"
            },
            hasPreviousPage: {
              type: "boolean"
            },
            nextPage: {
              type: "integer",
              nullable: true
            },
            previousPage: {
              type: "integer",
              nullable: true
            }
          }
        },
        ErrorResponse: {
          type: "object",
          description: "Standard error response",
          required: [
            "success",
            "statusCode",
            "message"
          ],
          properties: {
            success: {
              type: "boolean",
              enum: [
                false
              ]
            },
            statusCode: {
              type: "integer"
            },
            message: {
              type: "string"
            },
            details: {
              type: "array",
              description: "Validation error details",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  },
                  code: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        BadRequestError: {
          description: "Bad request - Invalid input or operation",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        UnauthorizedError: {
          description: "Authentication required - Missing or invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        ForbiddenError: {
          description: "Forbidden - Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        ValidationError: {
          description: "Validation error - Invalid request body/params",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        ConflictError: {
          description: "Conflict - Resource already exists (duplicate email/username)",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        InternalServerError: {
          description: "Internal server error - Database or AI service failure",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and email verification"
      },
      {
        name: "Users",
        description: "User profile management"
      },
      {
        name: "Stories",
        description: "Story management"
      },
      {
        name: "Categories",
        description: "Story category management"
      }
    ]
  },
  apis: [
    "./src/swagger/docs/*.ts"
  ]
};
var specs = swaggerJsdoc(options);
var swaggerUiOptions = {
  customSiteTitle: "CareerStory API Documentation"
};

// src/index.ts
import cors from "cors";
var PORT = ENV.PORT;
var app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
app.use("/api/v1/auth", authRoutes_default);
app.use("/api/v1/users", userRoutes_default);
app.use("/api/v1/stories", storyRoutes_default);
app.use("/api/v1/categories", categoryRoutes_default);
app.use(routeNotFoundMiddleware);
app.use(globalErrorMiddleware);
var startServer = /* @__PURE__ */ __name(async () => {
  try {
    await AppDataSource.initialize();
    logger_default.info(LOG_MESSAGES.DATABASE.CONNECTION.SUCCESS);
    app.listen(PORT, () => {
      logger_default.info(LOG_MESSAGES.SERVER.RUNNING, {
        port: PORT
      });
    });
  } catch (error) {
    logger_default.error("Failed to connect to the database or start server", error);
    process.exit(1);
  }
}, "startServer");
startServer();
