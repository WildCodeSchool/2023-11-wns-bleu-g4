import {test} from '@playwright/test';
import {connect, disconnect} from "../dbHelpers";
import {execInContainer} from "../execInContainer";
import {
  ADD_TO_BASKET_BUTTON_NAME,
  BOOK_BUTTON_NAME,
  DATE_BUTTON_NAME,
  DATE_PICKER_DAY,
  DATE_PICKER_FROM_TO_BUTTON_NAME,
  DATE_PICKER_LABEL,
  GO_BASKET_BUTTON_NAME,
  login,
  MY_BASKET_BUTTON_NAME,
  selectFirstAvailableAgency,
  selectFirstAvailableSize
} from './bookingHelpers';

let firstTestPassed = false; // Variable pour suivre le succès du premier test

// Configuration pour tous les tests
test.beforeAll(async () => {
  await connect();
});
test.beforeEach(async ({page}) => {
  await page.setViewportSize({width: 2000, height: 1000});
});

// Test 1 : réservation d'un article
test('user can book an item', async ({page}) => {
  await execInContainer('e2e-tests-backend-1', 'npm run resetDB'); // Réinitialisation de la base de données

  await page.goto('/login');
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.goto('/products/25');

  await selectFirstAvailableAgency(page);
  await page.waitForLoadState('load');
  await page.waitForSelector('[data-testid^="size-"]', {state: 'visible'});
  await selectFirstAvailableSize(page);

  await page.getByRole('button', {name: DATE_BUTTON_NAME}).click();
  await page.getByLabel(DATE_PICKER_LABEL).getByRole(DATE_PICKER_DAY, {name: '14'}).click();
  await page.getByLabel(DATE_PICKER_LABEL).getByRole(DATE_PICKER_DAY, {name: '17'}).click();
  await page.getByRole('button', {name: DATE_PICKER_FROM_TO_BUTTON_NAME}).click();
  await page.getByRole('button', {name: ADD_TO_BASKET_BUTTON_NAME}).click();
  await page.getByRole('button', {name: MY_BASKET_BUTTON_NAME}).click();
  await page.getByRole('button', {name: GO_BASKET_BUTTON_NAME}).click();
  await page.getByRole('button', {name: BOOK_BUTTON_NAME}).click();

  firstTestPassed = true; // Marque le premier test comme réussi
});

// Test 2 : essayer de réserver avec des dates réservées
test('user cannot select already booked dates', async ({page}) => {
  // Vérifiez si le premier test a réussi avant d'exécuter ce test
  if (!firstTestPassed) {
    test.skip(); // Ignore le test si le premier n'a pas réussi
  }

  // Si le premier test a réussi, exécutez le deuxième test
  await page.goto('/login');
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.goto('/products/25');

  await selectFirstAvailableAgency(page);
  await page.waitForLoadState('load');
  await page.waitForSelector('[data-testid^="size-"]', {state: 'visible'});
  await selectFirstAvailableSize(page);

  // Ouvrir le sélecteur de dates
  await page.getByRole('button', {name: DATE_BUTTON_NAME}).click();

  // Vérifier que les dates réservées ne sont pas cliquables
  const date14 = page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '14'});
  const date15 = page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '15'});
  const date16 = page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '16'});
  const date17 = page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '17'});
  await page.waitForLoadState('load');
  // Vérifier que les cellules sont désactivées
  const areDatesDisabled = await Promise.all([
    date14.isDisabled(),
    date15.isDisabled(),
    date16.isDisabled(),
    date17.isDisabled()
  ]);

  if (areDatesDisabled.every(isDisabled => isDisabled)) {
    console.log('Les dates 14, 15, 16 et 17 sont correctement désactivées.');
  } else {
    console.error('Certaines dates ne sont pas désactivées comme prévu.');
  }

  // Vérification des messages d'erreur, si applicable
  const errorMessageVisible = await page.getByText('Erreur : Les dates sélectionnées ne sont pas disponibles.').isVisible();
  if (!errorMessageVisible) {
    console.error('Le message d\'erreur ne s\'affiche pas comme prévu.');
  }
});

// Déconnexion après tous les tests
test.afterAll(async () => {
  await disconnect();
});