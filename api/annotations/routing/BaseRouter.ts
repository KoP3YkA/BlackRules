export const BaseRouter = <T>(name: T, map: Map<T, any>) => {
    return function (target: any) {
        map.set(name, target)
    }
}

export const ReversRouter = <T>(name: T, map: Map<any, T>) => {
    return function (target: any) {
        map.set(target, name);
    }
}