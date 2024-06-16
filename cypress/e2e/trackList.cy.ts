describe('Добавление ингредиента из списка ингредиентов в конструктор и работа модального окна с описанием ингредиента', function () {
  beforeEach(function () {
    cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавить булку', function () {
    cy.get(`[data-cy=bun]`).contains('Добавить').click();
    cy.get(`[data-cy=bun-1]`)
      .contains('Флюоресцентная булка R2-D3 (верх)')
      .should('exist');
    cy.get(`[data-cy=bun-2]`)
      .contains('Флюоресцентная булка R2-D3 (низ)')
      .should('exist');
  });

  it('Добавить начинку', function () {
    cy.get(`[data-cy=main]`).contains('Добавить').click();
    cy.get(`[data-cy=main-constructor]`)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('Открытие модального окна с описанием ингредиента', function () {
    cy.contains(`Ingredient Details`).should('not.exist');
    cy.contains('Филе Люминесцентного тетраодонтимформа').click();
    cy.contains(`Ingredient Details`).should('exist');
    cy.get('#modals')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('Закрытие модального окна с описанием ингредиента', function () {
    cy.contains('Филе Люминесцентного тетраодонтимформа').click();
    cy.contains(`Ingredient Details`).should('exist');
    cy.get(`[data-cy=modal-overlay]`).click('left', { force: true });
    cy.contains(`Ingredient Details`).should('not.exist');
  });
});

describe('Создание заказа', function () {
  beforeEach(function () {
    cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('api/auth/user', { fixture: 'user.json' });
    cy.intercept('api/orders', { fixture: 'order.json' }).as('postOrder');

    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'))
    cy.setCookie('accessToken', 'teest-accessToken')

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Отправка заказа', function () {
    cy.get(`[data-cy=bun]`).contains('Добавить').click();
    cy.get(`[data-cy=main]`).contains('Добавить').click();
    cy.get(`[data-cy=sauce]`).contains('Добавить').click();
    cy.contains('Оформить заказ').click();

    cy.get(`[data-cy=orderNumber]`).contains('12345').should('exist');
    cy.get(`[data-cy=modal-overlay]`).click('left', { force: true });
    cy.get(`[data-cy=modal-overlay]`).should('not.exist');

  });
});
