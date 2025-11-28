import { ZodError } from 'zod';

export function formatZodErrors(error: ZodError) {
  return error.issues.map((issue) => {
    let field: string =
      issue.code === 'unrecognized_keys' ? issue.keys[0] : issue.path[0]?.toString();

    return {
      field: field,
      message: issue.message,
    };
  });
}
