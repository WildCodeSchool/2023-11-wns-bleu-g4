import {Page} from '@playwright/test';

export const LOGIN_EMAIL = 'customer@gmail.com';
export const LOGIN_PASSWORD = 'Customer42@!';
export const AGENCY_BUTTON_NAME = 'Sélectionner une agence';
export const SIZE_BUTTON_SELECTOR = 'button[data-testid^="size-"]:not([disabled])';
export const DATE_BUTTON_NAME = 'Select a date';
export const ADD_TO_BASKET_BUTTON_NAME = 'Add to basket';
export const BOOK_BUTTON_NAME = 'Book';

export async function login(page: Page) {
  await page.getByPlaceholder('Email').fill(LOGIN_EMAIL);
  await page.getByPlaceholder('Password').fill(LOGIN_PASSWORD);
  await page.locator('button[type="submit"]').click();
}

export async function selectFirstAvailableAgency(page: Page) {
  await page.getByTestId('agency').click();
  const firstAvailableAgency = page.locator('[data-testid^="agency-"]:not([disabled])');
  await firstAvailableAgency.waitFor({state: 'visible', timeout: 60000});

  if (await firstAvailableAgency.isVisible()) {
    await firstAvailableAgency.click();
  } else {
    console.error('L’agence n’est pas visible ou cliquable.');
  }
}

export async function selectFirstAvailableSize(page: Page) {
  const sizesVisible = await page.$$(SIZE_BUTTON_SELECTOR);
  if (sizesVisible.length > 0) {
    await sizesVisible[0].click();
  } else {
    console.error('Aucune taille disponible ou tous les boutons sont désactivés.');
  }
}
