export interface Condition {
    type: Type,
    value: Operater,
    filter: Filter,
    cachefilter?: Filter,
    group: Condition[]
}

export interface Filter {
    name: string,
    code: string,
    compare: Compare,
    type: string,
    condition: string | Date,
}

export enum Type {
    Operater,
    Condition,
    Group,
}

export enum Compare {
    Greater = 'greater',
    GreaterEqual = 'greaterequal',
    Equal = 'equal',
    Less = 'less',
    LessEqual = 'lessequal',
}

export enum Operater {
    And = 'and',
    Or = 'or',
}