// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; // Ensure correct import

const routes: Routes = [
  { path: 'chat', component: ChatComponent }, // Ensure this route is defined
  { path: '', redirectTo: '/chat', pathMatch: 'full' }, // Redirect to chat as default
  { path: '**', redirectTo: '/chat' } // Wildcard route for unmatched paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
