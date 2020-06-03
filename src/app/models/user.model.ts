/**
 * This is in relation to oAuth responses.
 * Eventually make the local email/password to be consistent with this one as well.
 * 
 * @author Kaleb W. <kaleb@thePracticalIT.com>
 */
export class User {
    public email?: string;
    public first_name?: string;
    public last_name?: string;
    public login_method?: number;
}