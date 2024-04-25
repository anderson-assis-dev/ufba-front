import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Input() showSpinner: boolean = false;
  submit(){
    this.showSpinner = true;
    this.onSubmit.emit();
  }
  @Output("navigate") onNavigate = new EventEmitter();
  navigate(){
    this.onNavigate.emit();
  }
}
