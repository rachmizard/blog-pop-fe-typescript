import { IPaginate } from "types/paginate.type";
import { IUser } from "types/user.type";

export interface IResponseUsers {
  paginate: IPaginate;
  data: IUser[];
}
