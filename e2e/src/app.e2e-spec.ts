import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  xit('should display the menu title', () => {
    page.navigateTo();
    expect(page.getMenuTitleText()).toEqual('DG Japan');
  });

  it('should display the toolbar title', () => {
    page.navigateTo();
    expect(page.getToolbarTitleText()).toEqual('');
  });

  it('should display the footer title', () => {
    page.navigateTo();
    expect(page.getFooterText()).toEqual('© SHIZUOKA DISC GOLF ASSOCIATION');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
