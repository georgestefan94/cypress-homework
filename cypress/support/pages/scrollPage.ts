//type FrameGetter = () => Cypress.Chainable<JQuery<HTMLElement>>;

class ScrollPage {
  private url = 'https://uitestingplayground.com/scrolltoclick';

  private selectors = {
    target1: '#scrollTarget1',
    container2: '#scrollContainer2',
    target2: '#scrollTarget2',
    outerScroll3: '#outerScroll3',
    innerScroll3: '#innerScroll3',
    target3: '#scrollTarget3',
    hoverList: '#hoverList',
    hoverRow4: '#targetRow4',
    target4: '#scrollTarget4',
    progress: '#progress',
    progressText: '#progressText',
  };

  visit() {
    cy.visit(this.url);
  }

  target1() { return cy.get(this.selectors.target1); }
  container2() { return cy.get(this.selectors.container2); }
  target2() { return cy.get(this.selectors.target2); }
  outerScroll3() { return cy.get(this.selectors.outerScroll3); }
  innerScroll3() { return cy.get(this.selectors.innerScroll3); }
  target3() { return cy.get(this.selectors.target3); }
  target4() { return cy.get(this.selectors.target4); }
  progressText() { return cy.get(this.selectors.progress).find(this.selectors.progressText); }

  scrollContainer2(position: string) { this.container2().scrollTo(position); }
  scrollOuter3(position: string) { this.outerScroll3().scrollTo(position); }
  scrollInner3(position: string) { this.innerScroll3().scrollTo(position); }
  hoverRow4() { cy.get(this.selectors.hoverList).find(this.selectors.hoverRow4).realHover(); }
}

export const scrollPage = new ScrollPage();