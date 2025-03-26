import {BaseRouter} from "./BaseRouter";
import {RoutingMaps} from "../../namespace/RoutingMaps";

export const NamedPrivateCommand = (name: string) => BaseRouter(name, RoutingMaps.PRIVATE_COMMAND_EXECUTORS);