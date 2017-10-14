import { BonusFirebasePage } from './app.po';

describe('bonus-firebase App', () => {
  let page: BonusFirebasePage;

  beforeEach(() => {
    page = new BonusFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
