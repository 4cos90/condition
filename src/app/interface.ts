export interface Condition {
    type: Type,
    operater: Operater,
    filter: Filter,
    cachefilter?: Filter,
    checked: boolean,
    group: Condition[]
}

export interface Filter {
    name: string,
    code: string,
    compare: Compare,
    type: string,
    condition: string | Date | string[],
}

export enum Type {
    Condition,
    Group,
}

export enum Compare {
    Greater = 'greater',
    GreaterEqual = 'greaterequal',
    Equal = 'equal',
    Less = 'less',
    LessEqual = 'lessequal',
    In = 'in'
}

export enum Operater {
    And = 'and',
    Or = 'or',
}