import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WomenPage } from './women.page';

describe('WomenPage', () => {
  let component: WomenPage;
  let fixture: ComponentFixture<WomenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WomenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
