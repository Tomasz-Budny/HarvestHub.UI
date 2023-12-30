import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AuthValidators {
  static matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const sourceCtrl = control.get(source);
        const targetCtrl = control.get(target);

        const mismatch = sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value;

        if (mismatch) {
            targetCtrl.setErrors({ mismatch: true })
        }

        return null;
    }
}
}