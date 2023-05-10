describe('tasks', () => {
  it('Visit the app', () => {
    cy.visit('/');
    cy.get('h1').contains('Task List App');
  });

  it('Test ok button', () => {
    cy.visit('/');
    cy.get('div[role="open-disclosure"]').click();
    cy.get('button[id="ok"]').click();
  });

  it('Test add button', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    //cy.get('.todo-list li').should('have.length', 2);
    cy.visit('/');
    cy.get('div[role="open-disclosure"]').click();
    cy.get('div[role="input"]').focus();
    cy.get('div[role="input"]').type(
      '@natasha should do the landing page #important'
    );
    cy.get('button[id="add"]').click();
  });
});
