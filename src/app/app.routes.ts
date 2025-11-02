import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , data: {title: 'Home page' }},
  { path: 'projects', component: ProjectsComponent, data: {title: 'Projects page' }},
  { path: 'experience', component: ExperienceComponent, data: {title: 'Experience page' }},
  { path: 'contact', component: ContactComponent, data: {title: 'Contact page' }},
  { path: 'notfound', component: NotfoundComponent, data: {title: 'Page Not Found' }},
  { path: '**', redirectTo: '/notfound' }
];