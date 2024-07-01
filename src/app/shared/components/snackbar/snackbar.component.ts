import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarType } from './snackbar.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tubapay-appwise-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
  exportAs: 'tubapaySnackbar',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent {
  @Input() title: string | null = null;
  @Input() message: string = '';
  @Input() type: SnackbarType = 'info';
  @Input() bottom: string = '20px';
  @ViewChild('snackbar') snackbar: ElementRef;

  private static nextId = 0;
  id = `tubapay-snackbar-${SnackbarComponent.nextId++}`

  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  shouldClose$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  willBeDestroyed = false;

  public get componentHeight(): number {
    return this.snackbar?.nativeElement?.offsetHeight;
  }

  closeSnackbar(): void {
    this.shouldClose$.next(true);
  }
}
