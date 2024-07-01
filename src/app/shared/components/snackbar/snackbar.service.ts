import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import { delay, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type SnackbarType = 'success' | 'warning' | 'error' | 'info';

interface SnackbarConfig {
  title?: string;
  type?: SnackbarType;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbars: ComponentRef<SnackbarComponent>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
  }

  show(message: string, config?: SnackbarConfig): void {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(SnackbarComponent).create(this.injector);
    componentRef.instance.message = message;
    componentRef.instance.title = config?.title;
    componentRef.instance.type = config.type;
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbars.push(componentRef);
    this.updateSnackbarPositions();

    componentRef.instance.shouldClose$.pipe(
      filter((data) => data),
      tap(_ => {
        componentRef.instance.willBeDestroyed = true;
        componentRef.instance.cdr.detectChanges();
      }),
      delay(250),
      takeUntilDestroyed(componentRef.instance.destroyRef)
    ).subscribe(_ => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.snackbars = this.snackbars.filter(x => x !== componentRef);
      this.updateSnackbarPositions();
    })

    if (config?.duration > 0) {
      setTimeout(() => {
        componentRef?.instance?.shouldClose$.next(true);
      }, config?.duration)
    }
  }

  private updateSnackbarPositions() {
    let offset = 20; // Starting offset from the bottom
    this.snackbars.forEach((snackbarRef) => {
      snackbarRef.instance.bottom = `${offset}px`;
      snackbarRef.instance.cdr.detectChanges();
      offset += 8 + (snackbarRef.instance.componentHeight ?? 0); // Increment offset for the next snackbar
    });
  }
}
