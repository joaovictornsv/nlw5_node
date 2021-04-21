class HttpException {
  statusCode: number;

  message: string;

  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { HttpException };
