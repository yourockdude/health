import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'health-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent implements OnInit {
    @Input() allItems: any[];
    @Output() itemsFoundEvent = new EventEmitter();

    query = '';

    constructor() { }

    ngOnInit() { }

    clear() {
        this.query = '';
        this.onKeyUp();
    }

    onKeyUp() {
        this.itemsFoundEvent.emit(this.allItems.filter(f => {
            return f.firstName.toLowerCase().includes(this.query.toLowerCase()) ||
                f.lastName.toLowerCase().includes(this.query.toLowerCase()) ||
                f.middleName.toLowerCase().includes(this.query.toLowerCase());
        }));
    }
}
