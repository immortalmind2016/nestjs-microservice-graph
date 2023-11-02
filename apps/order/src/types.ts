import { registerEnumType } from "@nestjs/graphql";

export enum OrderStatus{
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED_QUANTITY = 'FAILED_QUANTITY',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
