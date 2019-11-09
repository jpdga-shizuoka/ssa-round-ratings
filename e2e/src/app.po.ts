import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getMenuTitleText() {
    return element(by.css('.menu-title')).getText() as Promise<string>;
  }

  getToolbarTitleText() {
    return element(by.css('#toolbar-title')).getText() as Promise<string>;
  }

  getFooterText() {
    return element(by.css('.footer-title')).getText() as Promise<string>;
  }
}
