import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';
import { UserData } from '@mars-colony/my-types';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, NzInputModule, NzButtonModule, NzFormModule, NzIconModule, RouterModule],
})
export class RegistrationComponent {
  registrationModel = signal<UserData>({
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
  });

  httpClient = inject(HttpClient);

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.FirstName, { message: 'First name is required' });
    required(schemaPath.LastName, { message: 'Last name is required' });
    required(schemaPath.Email, { message: 'Email is required' });
    required(schemaPath.PhoneNumber, { message: 'Phone number is required' });
    required(schemaPath.Password, { message: 'Password is required' });
  },
  {
    submission: {
      action: async (field) => {
        if (this.registrationForm().valid()) {
          console.log('Registration data:', field().value());
          this.httpClient.post('/api/user', field().value()).subscribe({
            next: (response) => {
              console.log('Registration successful:', response);
            },
            error: (error) => {
              console.error('Registration failed:', error);
            }
          });
        } else {
          console.log('Form is invalid');
        }
      }
    }
  }
);
}
