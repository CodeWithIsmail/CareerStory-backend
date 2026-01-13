import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authenticationMiddleware.ts';
import { UserRole } from '../../types/customTypes.ts';

// Valid UUID for testing
const MOCK_USER_ID = '550e8400-e29b-41d4-a716-446655440001';

// ============== MOCK REQUEST ==============

export const createMockRequest = (overrides?: Partial<AuthRequest>): Partial<AuthRequest> => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    userId: MOCK_USER_ID,
    role: UserRole.USER,
    validatedQuery: {
      page: 1,
      itemsPerPage: 10,
      orderBy: 'userName',
      sortDirection: 'DESC',
    },
    ...overrides,
  };
};

// ============== MOCK RESPONSE ==============

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

// ============== MOCK NEXT FUNCTION ==============

export const createMockNext = () => jest.fn();

// ============== MOCK DELETE RESULT ==============

export const createMockDeleteResult = (affected: number = 1) => ({
  raw: {},
  affected,
});
