# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Dev server: node --watch with ts-node/esm loader, reads .env directly
npm start              # Run built output (dist/index.js) — requires `npm run build` first
npm run build          # tsup src/index.ts -> dist/ (ESM)

npm test               # Run all Jest tests
npm test -- storyService.test.ts   # Run a single test file
npm test -- -t "should create story"  # Run tests matching a name pattern
npm run test:coverage  # Coverage is scoped (see jest.config.cjs collectCoverageFrom) to
                        # authService/userService/storyService and their controllers only

npm run lint            # ESLint over src/**/*.{ts,js}
npm run lint:fix
npm run format           # Prettier --write over src
```

There is no separate typecheck script; `tsc` is configured with `noEmit: true` and used implicitly via `tsup`/`ts-node`. Lint-staged runs `eslint --fix` + `prettier --write` on commit (see `lint-staged.config.js`).

## Architecture

**Runtime note:** This is a native ESM TypeScript project. All relative imports use explicit `.ts` extensions (e.g. `import { X } from './foo.ts'`), enabled by `allowImportingTsExtensions` + `ts-node/esm`/`tsx` loaders. Don't drop the extension when adding imports. Jest maps these via `moduleNameMapper` in `jest.config.cjs`.

**Express 5:** async route handlers that `throw` are automatically forwarded to error middleware — no need for manual `try/catch` + `next(err)` in controllers/middleware.

### Request lifecycle (layered architecture)

Every feature (auth, user, story, category) follows the same strict layering — routes → middleware → controller → service → repository → entity:

1. **`routes/*Routes.ts`** — wires an Express `Router`, composing per-route middleware chains: `authenticate` (JWT) → `reqValidation(source, zodSchema, [paramName])` (body/query/param, via `REQ_SOURCE` enum) → `authorize*` (role/ownership) → controller method. Validated query params land on `req.validatedQuery`, not `req.query`.
2. **`controllers/*Controller.ts`** — thin; extracts request data, calls one service method, wraps the result via `ResponseHandler.success/created/noContent`. No business logic, no try/catch.
3. **`services/*Service.ts`** — all business logic. Services call other services directly (e.g. `StoryService` composes `UserService`, `CategoryService`, `AIService`) rather than going through repositories cross-domain. Throws typed errors from `errors/CustomErrors.ts` (`NotFoundError`, `ValidationError`, `ForbiddenError`, `ConflictError`, `DatabaseError`, etc.) — these carry an HTTP status code and a `context` string used for logging.
4. **`repositories/*Repository.ts`** — the only layer that touches `AppDataSource.getRepository(Entity)`. Wraps TypeORM `QueryBuilder`/repository calls. Soft-deletes (`softDelete`) are used for domain entities like `Story`.
5. **`entities/*.ts`** — TypeORM decorated classes (`dataSource.ts` registers them all under `AppDataSource`).
6. **`dto/*Dto.ts`** + **`mappers/*Mapper.ts`** — services return DTOs, never raw entities; mappers convert entity → DTO.

Cross-cutting pieces:
- **Errors:** all thrown errors extend `AppError` (`errors/AppError.ts`). `middlewares/globalErrorMiddleware.ts` → `errors/errorHandler.ts` is the single place that maps error types (Zod errors, `AppError` subclasses, TypeORM `QueryFailedError` postgres codes, JSON syntax errors) to an `ErrorResponse` shape via `ResponseHandler`.
- **Validation:** Zod schemas in `validators/*Validator.ts` build on shared field schemas in `validators/baseSchema.ts`. Pagination has its own composable schema (`basePaginationSchema`) and a generic `PaginationHelper.paginate()` (`utils/paginationUtils.ts`) used by every list endpoint, driven by per-entity `paginationFields.ts` config (searchable fields, entity alias).
- **Responses:** always shaped via `ResponseHandler` (`utils/responseHandler.ts`) into `SuccessResponse`/`ErrorResponse` — don't call `res.json` directly in controllers.
- **Constants:** user-facing strings live in `constants/errorMessages.ts`, `responseMessages.ts`, `validationMessages.ts`, `logMessages.ts`; `constants/context.ts` supplies the `context` strings passed into errors/logs (used for tracing where an error originated). Prefer reusing/extending these over inlining new string literals.
- **Auth:** JWT-based; `authenticationMiddleware.ts` decodes the token onto `req.userId`/`req.role` (typed via the `AuthRequest` interface); `authorizationMiddleware.ts` has role-based (`authorizeRoles`) and ownership-based (`authorizeOwnerOrAdmin`, `authorizeStoryOwnerOrAdmin`) checks that hit the relevant service to check ownership.
- **AI integration:** `services/aiService.ts` calls OpenRouter (`@openrouter/sdk`) to summarize stories; failures are swallowed and logged (returns `null`) rather than failing the request — story/category creation is not meant to hard-fail on AI errors.

### API docs

Swagger/OpenAPI specs live as YAML under `careerstory-openapi/` (`auth.yaml`, `user.yaml`, `story.yaml`, `category.yaml`, `combined.yaml`), replacing the previous inline JSDoc (`src/swagger/`) approach. Served at `/api-docs`.

### Testing

Tests live under `src/__tests__/`: `unit/{controllers,services}/*.test.ts`, with shared `fixtures/index.ts` (factory functions like `createMockStory`, `createCreateStoryDto`) and `helpers/testHelpers.ts` (`createMockRequest`/`Response`/`Next`). Convention: instantiate the real class under test, then replace its private dependency instances with `jest.Mocked<T>` doubles (e.g. `(storyService as any).storyRepository = mockStoryRepository`) rather than using `jest.mock()` module factories for the class under test itself (dependencies are still auto-mocked via `jest.mock('../../../repositories/storyRepository.ts')` at the top of the file). `@openrouter/sdk` is globally mocked via `moduleNameMapper` in `jest.config.cjs` pointing at `src/__tests__/mocks/openrouterSdk.ts`.
