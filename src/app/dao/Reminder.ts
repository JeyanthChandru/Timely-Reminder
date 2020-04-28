export class Reminder {
    reminderTitle: string;
    reminderFrom: string;
    reminderOn: string;
    // repeat: boolean;
    // selectedTimeFrequency?: string[];
    reminderRepeat?: string;
    // repetition?:string;
    id: number;
    

    constructor(reminderTitle: string, reminderFrom: string, reminderOn: string/*, repeat: boolean*/) {
        this.reminderTitle = reminderTitle;
        this.reminderFrom = reminderFrom;
        this.reminderOn = reminderOn;
        // this.repeat = repeat;
    }

    // getReminderTitle() : string {
    //     return this.reminderTitle;
    // }

    // getReminderFrom() : string {
    //     return this.reminderFrom;
    // }

    // getReminderOn() : string {
    //     return this.reminderOn;
    // }

    // isRepeat() : boolean {
    //     return this.repeat;
    // }

    // getSelectedTimeFrequency() : string[] {
    //     return this.selectedTimeFrequency;
    // }

    // getReminderRepeat() : string {
    //     return this.reminderRepeat;
    // }

    // setSelectedTimeFrequency(selectedTimeFrequency: string[]) : void{
    //     this.selectedTimeFrequency = selectedTimeFrequency;
    // }

    setReminderRepeat(reminderRepeat: string) : void{
        this.reminderRepeat = reminderRepeat;
    }

    // setRepetition(repetition: string) : void {
    //     this.repetition = repetition;
    // }
}