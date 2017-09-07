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

        describe('add a new form', () => {
            it('should display a button to add a form', () => {
                page.navigateTo()
                    .then(
                        () => editor.openCreateDialog()
                    );
            });

            xit('should open a dialog', () => {

            });
        });

        describe('controls', () => {
            it('should manage the form name', () => {
                const name = 'Example Name';
                page.navigateTo()
                    .then(
                        () => editor.formName.edit(name)
                    )
                    .then(
                        () => expect(editor.formName.get()).toEqual(name)
                    );
            });
        });

        describe('export the form', () => {
            it('should display a button to export the form', () => {
                page.navigateTo()
                    .then(
                        () => editor.openExportDialog()
                    );
            });
        })
    });
});
