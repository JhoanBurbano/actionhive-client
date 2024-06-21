export interface Field {
  type: string;
  placeholder: string;
  label: string;
  rules?: Record<string, any>
}

export interface Option {
  value: string;
  label: string;
}
