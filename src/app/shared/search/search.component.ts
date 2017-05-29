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
    templateUrl: 'search.component.html'
})

export class SearchComponent implements OnInit {
    @Input() allItems: any[];
    @Output() itemsFoundEvent = new EventEmitter();

    query: string;

    constructor() { }

    ngOnInit() { }

    clear() {
        this.query = '';
        this.onKeyUp();
    }

    onKeyUp() {
        this.itemsFoundEvent.emit(this.allItems.filter(f => f.name.toLowerCase().includes(this.query.toLowerCase())));
    }
}
