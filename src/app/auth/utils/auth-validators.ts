import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../data-access/auth.service";
import { Observable, catchError, debounceTime, first, map, of, switchMap } from "rxjs";

export class AuthValidators {
    static match(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);
    
            const mismatch = sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value;
    
            if (mismatch) {
                targetCtrl.setErrors({ mismatch: true })
                console.log(targetCtrl.errors);
            } 
            else if(targetCtrl.hasError('mismatch')) {
                delete targetCtrl.errors['mismatch'];
                targetCtrl.updateValueAndValidity();
            }
    
            return null;
        }   
    }

    static emailIsUnique(authService: AuthService): AsyncValidatorFn {
        return (control: AbstractControl):  Observable<ValidationErrors | null> => {
            return control.valueChanges
              .pipe(
                debounceTime(350),
                switchMap(value => authService.isEmailUnique(value)),
                catchError(_ => of(false)),
                map((unique: boolean) => (unique ? null : {emailNotUnique: control.value})),
                first()
              )
        }
    }
}


