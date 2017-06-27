import { AngularGameClientDemoPage } from './app.po';

describe('angular-game-client-demo App', () => {
  let page: AngularGameClientDemoPage;

  beforeEach(() => {
    page = new AngularGameClientDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
