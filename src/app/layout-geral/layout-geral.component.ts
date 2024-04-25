import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-layout-geral',
  standalone: true,
  imports: [],
  templateUrl: './layout-geral.component.html',
  styleUrl: './layout-geral.component.scss'
})
export class LayoutGeralComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  submit(){
    this.onSubmit.emit();
  }
  @Output("navigate") onNavigate = new EventEmitter();
  navigate(){
    this.onNavigate.emit();
  }
}
