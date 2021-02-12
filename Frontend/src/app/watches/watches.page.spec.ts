import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchesPage } from './watches.page';

describe('WatchesPage', () => {
  let component: WatchesPage;
  let fixture: ComponentFixture<WatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
