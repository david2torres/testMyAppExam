import { Client } from "../interfaces/client";
import { TClient } from "./registration.type"

export const USER_DATA = {
  name: "name",
  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",
  email: "email"
}


export const FIELD_FORM: Record<TClient, string> = {
  firstName: 'firs tName',
  lastName: 'last Name',
  phone: 'phone',
  email: 'email',
}

export const clientCollection: Client[] = [];
