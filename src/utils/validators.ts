export interface IValidator {
    valid: boolean,
    error: string | null
}



export function minLength(min: number) {
    function isValid(v: string): IValidator {
        return v.length >= min ? { valid: true, error: null } : { valid: false, error: `Must Have at least ${min} character` }
    }
    return isValid
}

export function pattern(regex: RegExp) {
    function isValid(v: string): IValidator {
        return v.match(regex) ? { valid: true, error: null } : { valid: false, error: "Invalid Syntax" }
    }
    return isValid
}
