import { AppPage } from './app.po';

describe('Insync Online Portal Solution', () => {
  let page: AppPage;
  
  beforeEach(() => {
   //this.ignoreSynchronization = true;
   
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Insync Solution!');
  });
});
