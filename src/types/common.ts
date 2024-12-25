export interface ResponseInfoType<T> {
  response_status: ResponseStatus;
  data: T;
}

export interface ResponseStatus {
  code: number;
  extension: {
    key: string;
    value: string;
  };
  msg: number;
}

export interface ModalStates {
  create: boolean;
  update: boolean;
  delete: boolean;
  modify: boolean;
}
