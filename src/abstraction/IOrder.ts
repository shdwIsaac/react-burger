export interface IOrder {
  name: string
  order: IOrderNumber
  success: boolean
}

interface IOrderNumber {
  number: number
}
