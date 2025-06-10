import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule, // <-- Componentes Standalone importam suas dependências diretamente
    CommonModule         // <-- Essencial para diretivas como *ngIf, *ngFor
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {
  // 1. Declaração do FormGroup
  // Isso representa todo o nosso formulário
  cadastroForm!: FormGroup;

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      dataNascimento: new FormControl('', [
        Validators.required,
        this.idadeMinimaValidator(18) // <-- Nosso novo validador personalizado
      ])
    });
  }

  // --- Validador Personalizado para Idade Mínima ---
  // Este validador recebe a idade mínima como parâmetro
  idadeMinimaValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Não validar se o campo estiver vazio (deixamos o Validators.required cuidar disso)
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      // Ajusta a idade se o aniversário ainda não ocorreu este ano
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Retorna um erro 'idadeMinima' se a idade for menor que a mínima exigida
      return age >= minAge ? null : { 'idadeMinima': { requiredAge: minAge, actualAge: age } };
    };
  }

  // --- Método de Envio do Formulário ---
  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Formulário Válido! Dados:', this.cadastroForm.value);
      // Exemplo de como você pode pegar a data de nascimento e trabalhar com ela
      const dataNasc = new Date(this.cadastroForm.value.dataNascimento);
      console.log('Data de Nascimento formatada:', dataNasc.toLocaleDateString('pt-BR'));

      this.cadastroForm.reset(); // Limpa o formulário após o envio
    } else {
      console.log('Formulário Inválido!');
      this.cadastroForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir erros
    }
  }
}