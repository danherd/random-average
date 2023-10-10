/* c8 ignore start */
export type NumberStore = number[];

export type CsrngResponse = {
  status: string;
  min?: number;
  max?: number;
  random?: number;
  code?: string;
  reason?: string;
};

export type CsrngResponseArray = CsrngResponse[];
/* c8 ignore end */
