import {
  AppPage,
  Header,
  Editor,
  EditorTabs,
  EditorElementProperties,
  EditorFormElements,
  EditorGroups, AboutPage
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

  it('should display the brand', async () => {
    await page.navigateTo();

    await expect(header.getBrandText()).toBeNonEmptyString();
  });

  it('should display a list of links', async () => {
    await page.navigateTo();

    await expect(header.getLinksText()).toBeArrayOfStrings();
    await expect(header.getLinksText()).toBeNonEmptyArray();
  });
});

describe('about page', () => {
  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
  });

  it('should display the app motivation, tutorial and primary authors / contacts', async () => {
    await page.navigateTo();

    await expect(page.motivation.content()).toBeNonEmptyString();
    await expect(page.tutorial.content()).toBeNonEmptyString();
    await expect(page.contact.content()).toBeNonEmptyString();
  });
});

describe('editor page', () => {
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

  it('should display a list of forms as tabs', async () => {
    await page.navigateTo();

    await expect(tabs.getNames()).toBeArrayOfStrings();
    await expect(tabs.getNames()).toBeNonEmptyArray();
  });

  describe('add a new form', () => {

    it('should create a new, blank form', async () => {
      await page.navigateTo();

      const initialTabsCount = await tabs.count();

      await tabs.openCreateTab();
      await editor.create.createBlankForm();

      await expect(tabs.count()).toEqual(initialTabsCount + 1);
    });

    it('should upload an existing form', async () => {
      await page.navigateTo();

      const initialTabsCount = await tabs.count();

      // from ./test_files/exampleForm.xlsx
      const numGroups = 2;
      const numQuestions = 6;

      await tabs.openCreateTab();
      await editor.create.uploadExistingForm();

      await expect(tabs.count()).toEqual(initialTabsCount + 1);

      // navigate to the last tab
      await tabs.openTab(initialTabsCount - 1);

      await expect(groups.count()).toEqual(numGroups);
      await expect(groups.elements.count()).toEqual(numQuestions);
    });
  });

  describe('controls', () => {
    it('should manage the form name', async () => {
      await page.navigateTo();

      const name = 'Example Name';

      await editor.formName.edit(name);

      await expect(editor.formName.get()).toEqual(name);
      await expect(tabs.currentTab.getName()).toEqual(name);
    });

    describe('form elements', () => {
      it('should display the title', async () => {
        await page.navigateTo();

        await expect(formElements.getTitleText()).toBeNonEmptyString();
      });

      it('should display a list of form elements', async () => {
        await page.navigateTo();

        await expect(formElements.getAllText()).toBeArrayOfStrings();
        await expect(formElements.getAllText()).toBeNonEmptyArray();
      });

      it('should disable the form elements when there is no group selected', async () => {
        await page.navigateTo();

        await expect(groups.getSelectedGroup().isPresent()).toBeFalse();
        await expect(formElements.disabled()).toBeTrue();
      });

      it('should add a text element', async () => {
        await page.navigateTo();

        await groups.addGroup();
        await groups.selectGroup(0);
        await formElements.addTextElement();
        await expect(groups.elements.count()).toBeGreaterThan(0);
        await expect(groups.elements.text.get(0, 0).isPresent()).toBeTrue();
      });
    });

    describe('element properties', () => {
      it('should display the title', async () => {
        await page.navigateTo();

        await expect(elementProperties.getTitleText()).toBeNonEmptyString();
      });

      it('should not display controls when the selected item is removed', async () => {
        await page.navigateTo();

        const count = await groups.count();

        if (count === 0) {
          await groups.addGroup();
        }

        await groups.selectGroup(0);
        await groups.controls.delete(0);

        await expect(elementProperties.controls.element().isPresent()).toBeFalse();
      });

      it('should manage a group\'s properties: name', async () => {
        await page.navigateTo();

        const name = 'Test Name';

        await groups.addGroup();
        await groups.selectGroup(0);

        await elementProperties.controls.name.edit(name);
        await expect(groups.controls.name.get(0)).toEqual(name);
      });

      it('should manage a question\'s properties: name', async () => {
        await page.navigateTo();

        const name = 'Test Name';

        await groups.addGroup();
        await groups.selectGroup(0);

        await formElements.addTextElement();

        await elementProperties.controls.name.edit(name);
        await expect(groups.elements.text.name.get(0, 0)).toEqual(name);
      });

      it('should manage a question\'s properties: required', async () => {
        await page.navigateTo();

        await groups.addGroup();
        await groups.selectGroup(0);

        await formElements.addTextElement();

        await expect(groups.elements.controls.required.get(0, 0)).toBeTruthy();

        await elementProperties.controls.required.edit();

        await expect(groups.elements.controls.required.get(0, 0)).toBeFalsy();
      });

      it('should manage a group\'s properties: display', async () => {
        await page.navigateTo();

        const baseDisplay = 'Base Display';

        await groups.addGroup();
        await groups.selectGroup(0);
        await elementProperties.controls.display.base.edit(baseDisplay);
        await groups.addGroup();
        await groups.selectGroup(0);

        await expect(elementProperties.controls.display.base.get()).toEqual(baseDisplay);
      });

      it('should manage a group\'s properties: display (es)', async () => {
        await page.navigateTo();

        const display = 'español';

        await groups.addGroup();
        await groups.selectGroup(0);
        await elementProperties.controls.display.edit('es', display);
        await groups.addGroup();
        await groups.selectGroup(0);

        await expect(elementProperties.controls.display.get('es')).toEqual(display);
      });
    });

    describe('groups', () => {
      it('should display the title', async () => {
        await page.navigateTo();

        await expect(groups.getTitleText()).toBeNonEmptyString();
      });

      it('should add a group', async () => {
        await page.navigateTo();

        const initialCount = await groups.count();
        await groups.addGroup();

        await expect(groups.count()).toEqual(initialCount + 1);
      });

      it('should select a newly added group', async () => {
        await page.navigateTo();

        await groups.addGroup();

        await expect(groups.getSelectedGroup().isPresent()).toBeTrue();
      });

      it('should select a newly added question', async () => {
        await page.navigateTo();

        await groups.addGroup();
        await groups.selectGroup(0);
        await formElements.addTextElement();

        await expect(groups.elements.getSelected().isPresent()).toBeTrue();
      });

      it('should persist group selections between forms', async () => {
        await page.navigateTo();

        await groups.addGroup();
        await tabs.openCreateTab();
        await editor.create.createBlankForm();

        // open the next to last tab, last tab is create tab
        await tabs.openTab(-2);

        // add a group to the new form, it will be selected
        await groups.addGroup();
        await tabs.openTab(0);

        // upon navigating back to the original form,
        // we should find the original group still selected
        await expect(groups.getSelectedGroup().isPresent()).toBeTrue();
      });

      it('should add questions (generic)', async () => {
        await page.navigateTo();

        await groups.addGroup();
        await groups.selectGroup(0);
        const initialCount = await groups.elements.count();
        await formElements.addTextElement();

        await expect(groups.elements.count()).toEqual(initialCount + 1);
      });

      it('should rearrange groups', async () => {
        await page.navigateTo();

        const count = await groups.count();

        if (count === 0) {
          await groups.addGroup();
          await groups.getGroupId(0);
        }

        // have one group on the board. let's lock in the first and
        // add another group
        const groupUnderTest = await groups.getGroupId(0);
        await groups.addGroup();

        // great, have two groups. let's move the first one to the bottom
        await groups.controls.shift.down(0);

        // expect that the last group should have the same id as the
        // groupUnderTest, if it was correctly shifted down
        await expect(groups.getGroupId(1)).toEqual(groupUnderTest);

        // now shift the group back up
        await groups.controls.shift.up(1);

        // and expect that the first group is the group under test!
        await expect(groups.getGroupId(0)).toEqual(groupUnderTest);
      });

      it('should delete a group', async () => {
        await page.navigateTo();

        let initialCount = await groups.count();

        if (initialCount > 0) {
          await groups.selectGroup(0);
        } else {
          initialCount += 1;

          await groups.addGroup();
          await groups.selectGroup(0);
        }

        await groups.controls.delete(0);

        await expect(groups.count()).toEqual(initialCount - 1);
      });
    });
  });

  describe('questions', () => {

    it('should rearrange questions', async () => {
      await page.navigateTo();

      await groups.addGroup();
      await groups.selectGroup(0);
      await formElements.addTextElement();
      await formElements.addTextElement();

      // have two text elements in the first group. let's lock in the first
      // and then shift it down
      const questionUnderTest = await groups.elements.getId(0, 0);
      await groups.elements.controls.shift.down(0, 0);

      // expect that the last question should have the same id as the
      // questionUnderTest, if it was correctly shifted down
      await expect(groups.elements.getId(0, 1)).toEqual(questionUnderTest);

      // now shift the group back up
      await groups.elements.controls.shift.up(0, 1);

      // and expect that the first question is the group under test!
      await expect(groups.elements.getId(0, 0)).toEqual(questionUnderTest);
    });

    it('should delete a question', async () => {
      await page.navigateTo();

      await groups.addGroup();
      await groups.selectGroup(0);
      await formElements.addTextElement();

      await expect(groups.elements.count()).toEqual(1);

      await groups.elements.delete(0, 0);

      await expect(groups.elements.count()).toEqual(0);
    });
  });

  describe('export the survey', () => {
    it('should display a button to export the form', async () => {
      await page.navigateTo();

      await editor.openExportDialog();
    });
  });
});
