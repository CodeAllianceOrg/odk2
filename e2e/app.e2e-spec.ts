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
            page.navigateTo()
                .then(
                    () => expect(header.getLinksText()).toBeArrayOfStrings()
                );
        });
    });

    describe('editor', () => {

        let editor;

        beforeEach(() => {
            editor = page.getEditor();
        });

        it('should display a list of forms as tabs', () => {
            page.navigateTo()
                .then(
                    () => expect(editor.getTabsText()).toBeArrayOfStrings()
                );
        });

        describe('should add a new tab', () => {

        });
    });
});
