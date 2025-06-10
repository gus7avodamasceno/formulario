import { Component } from '@angular/core';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CadastroUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form';
}