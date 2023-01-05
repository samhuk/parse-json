type Reviver = (key: string, value: any) => any

export type ParseJsonOptions = {
  fileName?: string
  reviver?: Reviver
}
