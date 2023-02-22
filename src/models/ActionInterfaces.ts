import { User } from "./InitialState"

export default interface Action {
    type : 'CHANGE_USER',
    payload : User
}