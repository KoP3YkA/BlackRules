import {Human} from "../entity/Human";

export abstract class BaseEvent {

    public abstract apiEvent: any;
    public abstract sender: Human;

}