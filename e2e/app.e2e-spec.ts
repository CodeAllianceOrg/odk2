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
                )
                .then(
                    () => expect(header.getLinksText()).toBeNonEmptyArray()
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
                    () => expect(editor.tabs.getNames()).toBeArrayOfStrings()
                )
                .then(
                    () => expect(editor.tabs.getNames()).toBeNonEmptyArray()
                );
        });

        describe('add a new form', () => {
            it('should display a tab to add a new form', () => {
                page.navigateTo()
                    .then(
                        () => editor.tabs.openCreateTab()
                    );
            });

            it('should create a new, blank form', () => {
                let initialTabsCount;

                page.navigateTo()
                    .then(
                        () => editor.tabs.count()
                    )
                    .then(
                        count => {
                            initialTabsCount = count;
                            return editor.tabs.openCreateTab();
                        }
                    )
                    .then(
                        () => editor.create.createBlankForm()
                    )
                    .then(
                        () => expect(editor.tabs.count()).toEqual(initialTabsCount + 1)
                    );
            });

            xit('should upload an existing form', () => {

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
                    )
                    .then(
                        () => expect(editor.tabs.currentTab.getName()).toEqual(name)
                    );
            });

            describe('form elements', () => {
                it('should display the title', () => {
                    page.navigateTo()
                        .then(
                            () => expect(editor.formElements.getTitleText()).toBeNonEmptyString()
                        );
                });

                it('should display a list of form elements', () => {
                    page.navigateTo()
                        .then(
                            () => expect(editor.formElements.getAllText()).toBeArrayOfStrings()
                        )
                        .then(
                            () => expect(editor.formElements.getAllText()).toBeNonEmptyArray()
                        );
                });
            });

            describe('element properties', () => {
                it('should display the title', () => {
                    page.navigateTo()
                        .then(
                            () => expect(editor.elementProperties.getTitleText()).toBeNonEmptyString()
                        );
                });
            });

            describe('groups', () => {
                it('should display the title', () => {
                    page.navigateTo()
                        .then(
                            () => expect(editor.groups.getTitleText()).toBeNonEmptyString()
                        );
                });

                it('should add a group', () => {
                    let initialCount;

                    page.navigateTo()
                        .then(
                            () => editor.groups.count()
                        )
                        .then(
                            count => {
                                initialCount = count;
                                return editor.groups.addGroup();
                            }
                        )
                        .then(
                            () => expect(editor.groups.count()).toEqual(initialCount + 1)
                        );
                });

                it('should manage the name of the group', () => {
                    const name = 'Example Group Name';

                    page.navigateTo()
                        .then(
                            () => editor.groups.addGroup()
                        )
                        .then(
                            () => editor.groups.controls.name.edit(0, name)
                        )
                        .then(
                            () => editor.tabs.openCreateTab()
                        )
                        .then(
                            () => editor.tabs.openTab(0)
                        )
                        .then(
                            () => expect(editor.groups.controls.name.get(0)).toEqual(name)
                        );
                });

                it('should add questions (generic)', () => {
                    let initialCount;

                    page.navigateTo()
                        .then(
                            () => editor.groups.addGroup()
                        )
                        .then(
                            () => editor.groups.selectGroup(0)
                        )
                        .then(
                            () => editor.groups.elements.count()
                        )
                        .then(
                            count => {
                                initialCount = count;
                                return editor.formElements.addText();
                            }
                        )
                        .then(
                            () => expect(editor.groups.elements.count()).toEqual(initialCount + 1)
                        );
                });
            });
        });

        describe('export the form', () => {
            it('should display a button to export the form', () => {
                page.navigateTo()
                    .then(
                        () => editor.openExportDialog()
                    );
            });
        });
    });
});
