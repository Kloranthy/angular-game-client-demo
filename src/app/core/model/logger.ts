import { LoggingService } from '../service/logging.service';

export class Logger {
  source: string;

  constructor(
    source: string,
    private loggingService: LoggingService
  ) {
    this.source = source;
  }

  logDebug(
    message: string
  ): void {
    this.loggingService.logDebug(
      this.source,
      message
    );
  }

  logVerbose(
    message: string
  ): void {
    this.loggingService.logVerbose(
      this.source,
      message
    );
  }

  logInfo(
    message: string
  ): void {
    this.loggingService.logInfo(
      this.source,
      message
    );
  }

  logWarning(
    message: string
  ): void {
    this.loggingService.logWarning(
      this.source,
      message
    );
  }

  logError(
    message: string
  ): void {
    this.loggingService.logError(
      this.source,
      message
    );
  }
}
