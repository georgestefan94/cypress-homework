class SelectPage {
    private url = 'https://uitestingplayground.com/select';

    private selectors = {
      language: '#selectLanguage',
      city: '#selectCity',
      product: '#selectProduct',
      colors: '#selectColors',
      fruits: '#selectFruits',
      finalStatus: '#opstatus',
    };

    visit() {
      cy.visit(this.url);
    }

    selectLanguage(selection: string)
    {
      cy.get(this.selectors.language).select(selection)
    }

    selectCity(selection: string, nonBreakingSpace: boolean)
    {
      let finalCity = selection

      if (nonBreakingSpace)
      {
        finalCity = selection.replaceAll(' ', '&nbsp;');
      }
      cy.log(finalCity)
      cy.get(this.selectors.city).select(finalCity)
    }

    selectProduct(selection: string)
    {
      cy.get(this.selectors.product).select(selection)
    }

    selectColors(selection: string)
    {
      cy.get(this.selectors.colors).select(selection)
    }

    selectFruits(selection: string)
    {
      cy.get(this.selectors.fruits).select(selection)
    }

    statusText() {
      return cy.get(this.selectors.finalStatus).invoke('text')
      .then((text) => text.replace(/\u00A0/g, ' ').trim());
}
}

export const selectPage = new SelectPage();