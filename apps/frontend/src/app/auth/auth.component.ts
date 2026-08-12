import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';
import { UserAuthData } from '@mars-colony/my-types';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormRoot, NzInputModule, NzButtonModule, NzFormModule, NzIconModule, RouterModule],
})
export class AuthComponent {
  loginModel = signal<UserAuthData>({
    userName: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.userName, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });

  },
  {
    submission: {
      action: async (field) => {
        if (this.loginForm().valid()) {
          console.log('Login data:', field().value());
        } else {
          console.log('Form is invalid');
        }
      }
    }
  }
);

  onSubmit($event: Event) {
    $event.preventDefault();
    if (this.loginForm().valid()) {
      console.log('Login data:', this.loginModel());
    } else {
      console.log('Form is invalid');
    }
  }
}
