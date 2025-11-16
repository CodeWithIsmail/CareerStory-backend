import { AppDataSource } from "./data-source.ts";

try {
  await AppDataSource.initialize();
} catch (error) {
  console.log(error);
}
