describe('Тестируем проект', function () {
  const url = 'http://localhost:4000'
  const fileLT = 'Филе Люминесцентного тетраодонтимформа'
  describe('Добавление ингредиента из списка ингредиентов в конструктор и работа модального окна с описанием ингредиента', function () {
    beforeEach(function () {
      cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300, 800);
      cy.visit(url);
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
        .contains(fileLT)
        .should('exist');
    });

    it('Открытие модального окна с описанием ингредиента', function () {
      cy.contains(`Ingredient Details`).should('not.exist');
      cy.contains(fileLT).click();
      cy.contains(`Ingredient Details`).should('exist');
      cy.get('#modals')
        .contains(fileLT)
        .should('exist');
    });

    it('Закрытие модального окна с описанием ингредиента', function () {
      cy.contains(fileLT).click();
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
      cy.visit(url);
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
});
