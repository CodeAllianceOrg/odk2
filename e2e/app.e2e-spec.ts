import { AppPage } from './app.po';

describe('site App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    describe('header', () => {

        let header;

        beforeEach(() => {
            header = page.getHeader();
        });

        it('should display the brand', () => {
            page.navigateTo()
                .then(
                    () => expect(header.getBrandText()).toBeNonEmptyString()
                );
        });

        it('should display a list of links', () => {

        });
    });
});
