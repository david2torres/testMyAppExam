import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { MatTableDataSource } from '@angular/material/table';
import { TClient } from 'src/app/models/registration.type';
import { clientCollection, FIELD_FORM } from 'src/app/models/registration.const';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { EMAIL_PATTERN, PHONE_PATTERN } from 'src/app/shared/validation_pattern';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formDirective!: FormGroupDirective;

  private readonly fieldsLabels: Record<TClient, string> = FIELD_FORM;
  public form!: FormGroup;
  public errorMessage: string[] = [];
  public saving: boolean = false;
  public deletingID: number | null = null;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'actions'];
  public dataSource = new MatTableDataSource(clientCollection);

  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._initForm();
    this.getClients();
  }

  private _initForm(): void {
    this.form = this.fb.group({
      firstName: ['', this._notBlank],
      lastName: ['', this._notBlank],
      phone: ['', [this._notBlank, Validators.pattern(PHONE_PATTERN)]],
      email: ['', [this._notBlank, Validators.pattern(EMAIL_PATTERN)]],
    })
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = this._collectError();
      return;
    }

    this.errorMessage = [];

    const value = this.form.getRawValue();
    const client: Client = {
      id: 0,
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      email: value.email.trim(),
      phone: value.phone
    }
    this.saving = true;
    this.clientService.saveClient(client)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe((data: Client) => {
        alert("Cliente guardado correctamente.");
        this._clearForm();
        this.getClients();
      })
  }

  private getClients(): void {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          this.dataSource.data = data;
        }
      );
  }

  public onDelete(client: Client): void {
    if (!confirm(`Quieres elminar al cliente ${client.firstName} ${client.lastName}`)) {
      return
    }

    this.deletingID = client.id;
    this.clientService.onDelete(client.id).pipe(
      finalize(() => { this.deletingID = null })
    ).subscribe(() => {
      // Simulate delete Value, that ida is  the service return new object with data or consume again getClient
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== client.id);
    })
  }

  private _clearForm(): void {
    this.formDirective.resetForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    })

    this.errorMessage = [];
  }

  private _collectError(): string[] {
    const fields = Object.keys(this.fieldsLabels) as TClient[];
    const message: string[] = [];

    const missing = fields.filter(
      field => this.hasError(field, 'required')
    ).map(
      field => this.fieldsLabels[field]
    )

    if (missing.length) {
      message.push(`Faltan Campos obligatorios: ${missing.join(', ')}.`)
    }

    if (this.hasError('phone', 'pattern')) {
      message.push(`Phone debe ser de solo digitos (Sin letras, espacion o simbolos)`)
    }

    if (this.hasError('email', 'pattern')) {
      message.push(`Formato de email invalido.`)
    }

    return message;
  }

  public hasError(field: TClient, error: string): boolean {
    return !!this.form.get(field)?.hasError(error);
  }

  private _notBlank(control: AbstractControl): ValidationErrors | null {
    return (control.value ?? '').toString().trim() ? null : { required: true }
  }
}
