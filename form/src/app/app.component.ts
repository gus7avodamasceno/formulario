import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form';

  nome: string = '';
  email: string = '';
  dataNascimento: Date | null = null;
  telefone: string = '';

}