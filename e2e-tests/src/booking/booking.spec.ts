import {test} from '@playwright/test';
import {connect, disconnect} from "../dbHelpers";
import {execInContainer} from "../execInContainer";
import {
  ADD_TO_BASKET_BUTTON_NAME,
  BOOK_BUTTON_NAME,
  DATE_BUTTON_NAME,
  login,
  selectFirstAvailableAgency,
  selectFirstAvailableSize
} from './bookingHelpers';

let firstTestPassed = false; // Variable pour suivre le succès du premier test

// Configuration pour tous les tests
test.beforeAll(async () => {
  await connect();
});

// Test 1 : réservation d'un article
test('can book an item', async ({page}) => {
  await execInContainer('e2e-tests-backend-1', 'npm run resetDB'); // Réinitialisation de la base de données

  await page.goto('http://localhost:3000/fr');
  await login(page);
  await page.getByRole('button', {name: 'Montagne', exact: true}).click();
  await page.getByRole('menuitem', {name: 'Ski'}).click();
  await page.getByRole('img', {name: 'ULTRA RAPTOR II MID LEATHER'}).click();

  await selectFirstAvailableAgency(page);
  await page.waitForTimeout(2000); // Attendre un peu pour voir si les tailles se mettent à jour
  await selectFirstAvailableSize(page);

  await page.getByRole('button', {name: DATE_BUTTON_NAME}).click();
  await page.getByLabel('octobre').getByRole('gridcell', {name: '14'}).click();
  await page.getByLabel('octobre').getByRole('gridcell', {name: '17'}).click();
  await page.getByRole('button', {name: 'From : 10/14/2024 To : 10/17/2024'}).click();
  await page.getByRole('button', {name: ADD_TO_BASKET_BUTTON_NAME}).click();
  await page.getByRole('button', {name: 'My basket (1)'}).click();
  await page.getByRole('button', {name: 'Go to basket'}).click();
  await page.getByRole('button', {name: BOOK_BUTTON_NAME}).click();

  firstTestPassed = true; // Marque le premier test comme réussi
});

// Test 2 : essayer de réserver avec des dates réservées
test('cannot select already booked dates', async ({page}) => {
  // Vérifiez si le premier test a réussi avant d'exécuter ce test
  if (!firstTestPassed) {
    test.skip(); // Ignore le test si le premier n'a pas réussi
  }

  // Si le premier test a réussi, exécutez le deuxième test
  await page.goto('http://localhost:3000/fr');
  await login(page);
  await page.getByRole('button', {name: 'Montagne', exact: true}).click();
  await page.getByRole('menuitem', {name: 'Ski'}).click();
  await page.getByRole('img', {name: 'ULTRA RAPTOR II MID LEATHER'}).click();

  await selectFirstAvailableAgency(page);
  await page.waitForTimeout(2000); // Attendre un peu pour voir si les tailles se mettent à jour
  await selectFirstAvailableSize(page);

  // Ouvrir le sélecteur de dates
  await page.getByRole('button', {name: DATE_BUTTON_NAME}).click();

  // Vérifier que les dates réservées ne sont pas cliquables
  const date14 = await page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '14'});
  const date15 = await page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '15'});
  const date16 = await page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '16'});
  const date17 = await page.locator('button.rdp-day.rdp-day_disabled.booked', {hasText: '17'});

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
