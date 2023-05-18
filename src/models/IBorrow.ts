export interface IBorrow {
  id: string | number;
  user_id: string | undefined;
  money_offer_id: string | undefined;
  percent: number;
  amount: number;
  approval_date: Date;
}
