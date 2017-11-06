import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TabsComponent} from './tabs/tabs.component';
import {HeaderComponent} from './header/header.component';

import {NgReduxTestingModule} from '@angular-redux/store/testing';

import {SharedModule} from './shared/shared.module';
import {FormBuilderModule} from './form-builder/form-builder.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        TabsComponent
      ],
      imports: [
        SharedModule,
        FormBuilderModule,

        NgReduxTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
