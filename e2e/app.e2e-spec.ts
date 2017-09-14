import {
    AppPage,
    Header,
    Editor,
    EditorTabs,
    EditorElementProperties,
    EditorFormElements,
    EditorGroups
} from './app.po';

describe('site App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });
});

describe('header', () => {

    let page: AppPage;
    let header: Header;

    beforeEach(() => {
        page = new AppPage();
        header = new Header();
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

    let page: AppPage;
    let editor: Editor;
    let tabs: EditorTabs;
    let elementProperties: EditorElementProperties;
    let formElements: EditorFormElements;
    let groups: EditorGroups;

    beforeEach(() => {
        editor = new Editor();
        page = new AppPage();
        tabs = new EditorTabs();
        elementProperties = new EditorElementProperties();
        formElements = new EditorFormElements();
        groups = new EditorGroups();
    });

    it('should display a list of forms as tabs', () => {
        page.navigateTo()
            .then(
                () => expect(tabs.getNames()).toBeArrayOfStrings()
            )
            .then(
                () => expect(tabs.getNames()).toBeNonEmptyArray()
            );
    });

    describe('add a new form', () => {
        it('should display a tab to add a new form', () => {
            page.navigateTo()
                .then(
                    () => tabs.openCreateTab()
                );
        });

        it('should create a new, blank form', () => {
            let initialTabsCount;

            page.navigateTo()
                .then(
                    () => tabs.count()
                )
                .then(
                    count => {
                        initialTabsCount = count;
                        return tabs.openCreateTab();
                    }
                )
                .then(
                    () => editor.create.createBlankForm()
                )
                .then(
                    () => expect(tabs.count()).toEqual(initialTabsCount + 1)
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
                    () => expect(tabs.currentTab.getName()).toEqual(name)
                );
        });

        describe('form elements', () => {
            it('should display the title', () => {
                page.navigateTo()
                    .then(
                        () => expect(formElements.getTitleText()).toBeNonEmptyString()
                    );
            });

            it('should display a list of form elements', () => {
                page.navigateTo()
                    .then(
                        () => expect(formElements.getAllText()).toBeArrayOfStrings()
                    )
                    .then(
                        () => expect(formElements.getAllText()).toBeNonEmptyArray()
                    );
            });

            it('should add a text element', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => formElements.addTextElement()
                    )
                    .then(
                        () => expect(groups.elements.count()).toBeGreaterThan(0)
                    )
                    .then(
                        () => expect(groups.elements.text.get(0, 0).isPresent()).toBeTrue()
                    );
            });

            it('should add a numeric element', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => formElements.addNumericElement()
                    )
                    .then(
                        () => expect(groups.elements.count()).toBeGreaterThan(0)
                    )
                    .then(
                        () => expect(groups.elements.numeric.get(0, 0).isPresent()).toBeTrue()
                    );
            });
        });

        describe('element properties', () => {
            it('should display the title', () => {
                page.navigateTo()
                    .then(
                        () => expect(elementProperties.getTitleText()).toBeNonEmptyString()
                    );
            });

            it('should delete a group', () => {
                let initialCount;

                page.navigateTo()
                    .then(
                        () => groups.count()
                    )
                    .then(
                        count => {

                            initialCount = count;

                            if (count > 0) {
                                return groups.selectGroup(0);
                            } else {
                                initialCount += 1;

                                return groups.addGroup()
                                    .then(
                                        () => groups.selectGroup(0)
                                    );
                            }
                        }
                    )
                    .then(
                        () => elementProperties.controls.delete()
                    )
                    .then(
                        () => expect(groups.count()).toEqual(initialCount - 1)
                    );
            });

            it('should not display controls when there is no item selected', () => {
                page.navigateTo()
                    .then(
                        () => expect(elementProperties.controls.element().isPresent()).toBeFalse()
                    );
            });

            it('should not display controls when the selected item is removed', () => {
                page.navigateTo()
                    .then(
                        () => groups.count()
                    )
                    .then(
                        count => {
                            if (count > 0) {
                                return groups.selectGroup(0);
                            } else {
                                return groups.addGroup()
                                    .then(
                                        () => groups.selectGroup(0)
                                    );
                            }
                        }
                    )
                    .then(
                        () => elementProperties.controls.delete()
                    )
                    .then(
                        () => expect(elementProperties.controls.element().isPresent()).toBeFalse()
                    );
            });
        });

        describe('groups', () => {
            it('should display the title', () => {
                page.navigateTo()
                    .then(
                        () => expect(groups.getTitleText()).toBeNonEmptyString()
                    );
            });

            it('should add a group', () => {
                let initialCount;

                page.navigateTo()
                    .then(
                        () => groups.count()
                    )
                    .then(
                        count => {
                            initialCount = count;
                            return groups.addGroup();
                        }
                    )
                    .then(
                        () => expect(groups.count()).toEqual(initialCount + 1)
                    );
            });

            it('should manage the name of the group', () => {
                const name = 'Example Group Name';

                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.controls.name.edit(0, name)
                    )
                    .then(
                        () => tabs.openCreateTab()
                    )
                    .then(
                        () => tabs.openTab(0)
                    )
                    .then(
                        () => expect(groups.controls.name.get(0)).toEqual(name)
                    );
            });

            it('should add questions (generic)', () => {
                let initialCount;

                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => groups.elements.count()
                    )
                    .then(
                        count => {
                            initialCount = count;
                            return formElements.addTextElement();
                        }
                    )
                    .then(
                        () => expect(groups.elements.count()).toEqual(initialCount + 1)
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
