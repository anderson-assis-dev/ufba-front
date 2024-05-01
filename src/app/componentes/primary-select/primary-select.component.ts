import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-primary-select',
  templateUrl: './primary-select.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./primary-select.component.scss']
})
export class PrimarySelectComponent {
  @Input() label: string = '';
  @Input() inputName: string = '';
  @Input() selectedValue: any;
  @Input() options: { value: any, label: string }[] = [];
  @Output() valueChange = new EventEmitter<any>();

  onChange(event: any) {
    const selectedValue = event.target.value;
    this.valueChange.emit(selectedValue);
  }
}
