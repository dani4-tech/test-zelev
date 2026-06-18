export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  program: string;
  password: string;
  terms: boolean;
}

export interface PreinscriptionPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  program: string;
  password: string; // ceci doit être haché par le backend en principe !
  terms_accepted: boolean;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';