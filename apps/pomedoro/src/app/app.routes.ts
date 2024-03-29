import { Route } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { TimerPageComponent } from './pages/timer/timer.component';
import { SettingsPageComponent } from './pages/settings/settings.component';


export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: 'timer', component: TimerPageComponent },
    { path: 'settings', component: SettingsPageComponent },
];