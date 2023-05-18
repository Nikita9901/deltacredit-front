export interface ICredit {
  user_id: string | undefined;
  amount: number;
  percent: number;
  period_date: number;
  description: string;
  id: string | number;
}
