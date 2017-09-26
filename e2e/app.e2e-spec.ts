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

            it('should disable the form elements when there is no group selected', () => {
                page.navigateTo()
                    .then(
                        () => expect(groups.getSelectedGroup().isPresent()).toBeFalse()
                    )
                    .then(
                        () => expect(formElements.disabled()).toBeTrue()
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

            xit('should add a numeric element', () => {
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

            xit('should add a gps element', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => formElements.addGPSElement()
                    )
                    .then(
                        () => expect(groups.elements.count()).toBeGreaterThan(0)
                    )
                    .then(
                        () => expect(groups.elements.gps.get(0, 0).isPresent()).toBeTrue()
                    );
            });

            xit('should add a combo box element', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => formElements.addComboBoxElement()
                    )
                    .then(
                        () => expect(groups.elements.count()).toBeGreaterThan(0)
                    )
                    .then(
                        () => expect(groups.elements.comboBox.get(0, 0).isPresent()).toBeTrue()
                    );
            });

            xit('should add a multi select element', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => formElements.addMultiSelectElement()
                    )
                    .then(
                        () => expect(groups.elements.count()).toBeGreaterThan(0)
                    )
                    .then(
                        () => expect(groups.elements.multiSelect.get(0, 0).isPresent()).toBeTrue()
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
                        () => groups.controls.delete(0)
                    )
                    .then(
                        () => expect(elementProperties.controls.element().isPresent()).toBeFalse()
                    );
            });

            it('should manage a group name', () => {

                // element properties should sync the name of the group

                const name = 'Test Name';

                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => groups.selectGroup(0)
                    )
                    .then(
                        () => expect(elementProperties.controls.name.get()).toBeNonEmptyString()
                    )
                    .then(
                        () => expect(elementProperties.controls.name.edit(name))
                    )
                    .then(
                        () => expect(groups.controls.name.get(0)).toEqual(name)
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

            it('should select a newly added group', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => expect(groups.getSelectedGroup().isPresent()).toBeTrue()
                    );
            });

            it('should persist selections between forms', () => {
                page.navigateTo()
                    .then(
                        () => groups.addGroup()
                    )
                    .then(
                        () => tabs.openCreateTab()
                    )
                    .then(
                        () => editor.create.createBlankForm()
                    )
                    .then(
                        () => tabs.count()
                    )
                    .then(
                        // open the next to last tab, last tab is create tab
                        count => tabs.openTab(count - 2)
                    )
                    .then(
                        // add a group to the new form, it will be selected
                        () => groups.addGroup()
                    )
                    .then(
                        () => tabs.openTab(0)
                    )
                    .then(
                        // upon navigating back to the original form,
                        // we should find the original group still selected
                        () => expect(groups.getSelectedGroup().isPresent()).toBeTrue()
                    );
            });

            xit('should manage the name of the group', () => {
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

            it('should rearrange groups', () => {
                let groupUnderTest;

                page.navigateTo()
                    .then(
                        () => groups.count()
                    )
                    .then(
                        count => {
                            if (count > 0) {
                                return groups.getGroupId(0);
                            }

                            return groups
                                .addGroup()
                                .then(
                                    () => groups.getGroupId(0)
                                );
                        }
                    )
                    .then(
                        groupId => {
                            // have one group on the board. let's lock in the first and
                            // add another group

                            groupUnderTest = groupId;

                            return groups.addGroup();
                        }
                    )
                    .then(
                        () => {
                            // great, have two groups. let's move the first one to the bottom
                            return groups.controls.shift.down(0);
                        }
                    )
                    .then(
                        () => {
                            // expect that the last group should have the same id as the
                            // groupUnderTest, if it was correctly shifted down

                            return expect(groups.getGroupId(1)).toEqual(groupUnderTest);
                        }
                    )
                    .then(
                        () => {
                            // now shift the group back up
                            return groups.controls.shift.up(1);
                        }
                    )
                    .then(
                        () => {
                            // and expect that the first group is the group under test!

                            return expect(groups.getGroupId(0)).toEqual(groupUnderTest);
                        }
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
                        () => groups.controls.delete(0)
                    )
                    .then(
                        () => expect(groups.count()).toEqual(initialCount - 1)
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
