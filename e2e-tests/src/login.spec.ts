import { expect, test } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import User from "../../backend/src/entities/User";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

const createTestUser = async (email: string, password: string) => {
  const newUser = new User();
  Object.assign(newUser, {
    email,
    password,
    emailVerified: true,
    emailConfirmationToken: null,
  });
  await newUser.save();
};

test("can log in with correct credentials", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";

  await createTestUser(email, password);

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL("/", { timeout: 10000 });
});

test("cannot log in with incorrect password", async ({ page }) => {
  const email = "dave.lopper@website.com";
  const correctPassword = "1T!ESTINng";
  const wrongPassword = "WrongPassword123";

  await createTestUser(email, correctPassword);

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(wrongPassword);
  await page.locator('button[type="submit"]').click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("cannot log in with incorrect email", async ({ page }) => {
  const correctEmail = "dave.lopper@website.com";
  const wrongEmail = "john.doe@mail.com";
  const password = "1T!ESTINng";

  await createTestUser(correctEmail, password);

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(wrongEmail);
  await page.getByPlaceholder("Password").fill(password);
  await page.locator('button[type="submit"]').click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});
