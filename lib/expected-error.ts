import { Status } from "@/types/status";

export class ExpectedError extends Error {
public status: Status;

  public constructor({ message, status }: { message: string, status: Status }) {
    super(message)

    this.name = "ExpectedError";
    this.status = status;
  }

  public json() {
    return {
      message: this.message,
      status: this.status,
    }
  }

  public getStatus() {
    return this.status
  }
}
