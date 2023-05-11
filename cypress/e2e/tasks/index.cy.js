describe('tasks', () => {
  it('Visit the app', () => {
    cy.visit('/');
    cy.get('h1').contains('Task List App');
  });

  it('Test ok button', () => {
    cy.visit('/');
    cy.get('div[role="add-task"] div[role="open-disclosure"]').click();
    cy.get('button[id="ok"]').click();
    cy.get('li[role="list-item"] div[role="open-disclosure"]').should(
      'have.length',
      4
    );
  });

  it('Test add button', () => {
    cy.visit('/');
    cy.get('div[role="add-task"] div[role="open-disclosure"]').click();
    cy.get('div[role="input"]').focus();
    cy.get('div[role="input"]').type(
      '@natasha should do the landing page #important'
    );
    cy.get('button[id="add"]').click();
    cy.get('li[role="list-item"] div[role="open-disclosure"]').should(
      'have.length',
      4
    );
  });
});
