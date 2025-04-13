import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BarChartComponent } from './Components/controls/bar-chart/bar-chart.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../mytheme (2)';


import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    AppRoutingModule,
    MenuModule, 
    BadgeModule,
    RippleModule,
    AvatarModule,
    ButtonModule,
    ChartModule,
    SelectButtonModule,
    ReactiveFormsModule
  ],
  providers: [   
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false || 'none',
            colorScheme: 'light',
            themeColors: {
              baseColor: '#007ad9',
            }
        }
    },
    }),
    provideHttpClient()
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
