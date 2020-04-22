export class HelpRequest {
    request_id?: number;
    individual_id: number;
    priority_id: number;
    request: string;
    title: string;
    date_created: Date;

    public getPriority() {
        if (this.priority_id == 1) {
            return "High";
        } else if (this.priority_id == 2) {
            return "Medium"
        }
        return "Low"
    }
}
