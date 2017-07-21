export class CalendarEvent {
    id?: string;
    start: Date;
    end: Date;
    title: string;
    color?: {
        primary: string;
        secondary: string;
    };
    actions?: [
        {
            label: string;
            cssClass?: string;
            onClick: any;
        }
    ];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    ownerId?: string;
    doctorId: string;
};
