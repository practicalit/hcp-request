import { IndividualService } from "../services/individual.service";

/**
 * Base class to be shared between components related to professionals and volunteers
 * 
 */
export abstract class BaseIndividualComponent {

    protected individualService: IndividualService;
    /**
     * Event handler for the status of the active toggler
     * @param event
     * 
     */
    public switchStatus(event) {
        //get the status of the current professional selected.
        let individual_id = event.target.getAttribute('individual_id');
        let status = event.target.getAttribute('status');
        status = 1 - status; //this will flip between 1 and 0s
        this.individualService.updateActiveStatus(individual_id, status).subscribe(
            response => {
                if (response.success) {
                    //update the attribute of the input with the new status.
                    event.target.setAttribute('status', status);
                    //then update the label.
                    event.target.innerHTML = status == 1 ? 'Deactivate' : 'Activate';
                    //also switch the css.
                    event.target.classList.remove(status == 1 ? 'btn-success' : 'btn-danger');
                    event.target.classList.add(status == 1 ? 'btn-danger' : 'btn-success');
                }
            }
        );
    }

} 