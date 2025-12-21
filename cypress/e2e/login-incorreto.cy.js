describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/comunidadealunos/');
  });
  it('Não realiza login com email incorreto', () => {
    cy.login('teste@hotmail.com','123456');
    cy.contains('Ocorreu um erro: E-mail não existe.').should('be.visible');
  })
  it('Não realiza login com senha incorreta', () => {
    cy.login('ruigx@hotmail.com','123456');
    cy.contains('Ocorreu um erro: Senha incorreta.').should('be.visible');
  })
  it('Não realiza login sem backend', () => {
    cy.intercept('POST', 'http://localhost/api/auth/login', {statusCode: 500}).as('erroBackend');
    cy.login('ruigx@hotmail.com','200394');
    cy.wait('@erroBackend');
    cy.contains('Ocorreu um erro: Falha no login.').should('be.visible');
  })
})