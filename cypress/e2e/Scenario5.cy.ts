import { selectPage } from '../support/pages/selectPage';

type SelectTestValues = {
  language: string;
  city: string;
  cityNonBreakingSpace: boolean;
  product: string;
  colors: string;
  fruits: string;
};

const testCases: SelectTestValues[] = [
  {
    language: 'JavaScript',
    city: 'New York',
    cityNonBreakingSpace: true,
    product: 'Release 3.0 Beta',
    colors: 'Purple',
    fruits: 'Date',
  },
];

const expectedStatus = (values: SelectTestValues) =>
  [
    `selectLanguage: ${values.language}`,
    `selectCity: ${values.city}`,
    `selectProduct: ${values.product}`,
    `selectColors: ${values.colors}`,
    `selectFruits: ${values.fruits}`,
  ].join(' | ');

describe('Scenario 5 - Select', () => {
  beforeEach(() => {
    selectPage.visit();
  });

  testCases.forEach((values) => {
    it(`selects ${values.language}, ${values.city}, ${values.product}, ${values.colors}, ${values.fruits}`, () => {
      selectPage.selectLanguage(values.language);
      selectPage.selectCity(values.city, values.cityNonBreakingSpace);
      selectPage.selectProduct(values.product);
      selectPage.selectColors(values.colors);
      selectPage.selectFruits(values.fruits);

      selectPage.statusText().should('eq', expectedStatus(values));
    });
  });
});