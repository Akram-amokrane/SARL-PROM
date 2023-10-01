export default class RowData<T>{
    data!: T;
    checked: boolean = false;

    constructor(data: T) {
        this.data = data;
    }
}