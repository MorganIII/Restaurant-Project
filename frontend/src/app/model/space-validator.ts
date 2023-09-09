import { FormControl, ValidationErrors } from "@angular/forms";

export class SpaceValidator {


    static notOnlySpace(control: FormControl): ValidationErrors | null{
        if(control.value != null && control.value.trim().length === 0){
            return {'notOnlySpace': true};
        }
        return null;
    }

}
