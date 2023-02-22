import InitialState from "./InitialState";
import Action from "./ActionInterfaces";

export default interface ChatValue {
    data : InitialState,
    dispatch : React.Dispatch<Action>
}