import { LoggingService } from '../service/logging.service';

export class Logger {
  loggingService: LoggingService;
  source: string;

  constructor(source: string) {
    this.source = source;
    this.loggingService = LoggingService.getInstance();
  }

  logDebug(
    message: string
  ): void {
    if(!this.loggingService) {
      this.loggingService = LoggingService.getInstance();
    }
    if(this.loggingService) {
      this.loggingService.logDebug(
        this.source,
        message
      );
    }
  }

  logVerbose(
    message: string
  ): void {
    if(!this.loggingService) {
      this.loggingService = LoggingService.getInstance();
    }
    if(this.loggingService) {
      this.loggingService.logVerbose(
        this.source,
        message
      );
    }
  }

  logInfo(
    message: string
  ): void {
    if(!this.loggingService) {
      this.loggingService = LoggingService.getInstance();
    }
    if(this.loggingService) {
      this.loggingService.logInfo(
        this.source,
        message
      );
    }
  }

  logWarning(
    message: string
  ): void {
    if(!this.loggingService) {
      this.loggingService = LoggingService.getInstance();
    }
    if(this.loggingService) {
      this.loggingService.logWarning(
        this.source,
        message
      );
    }
  }

  logError(
    message: string
  ): void {
    if(!this.loggingService) {
      this.loggingService = LoggingService.getInstance();
    }
    if(this.loggingService) {
      this.loggingService.logError(
        this.source,
        message
      );
    }
  }
}
