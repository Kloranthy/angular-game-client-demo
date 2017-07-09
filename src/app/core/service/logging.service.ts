import { Injectable } from '@angular/core';

import { Logger } from '../model/logger';

@Injectable()
export class LoggingService {
  // log levels
  DEBUG: number = 1;
  VERBOSE: number = 2;
  INFO: number = 3;
  WARNING: number = 4;
  ERROR: number = 5;

  currentLogLevel: number;

  static instance: LoggingService;

  constructor() {
    this.currentLogLevel = 3;
    LoggingService.instance = this;
  }

  logDebug(
    source: string,
    message: string
  ): void {
    this.log(
      this.DEBUG,
      source,
      message
    );
  }

  logVerbose(
    source: string,
    message: string
  ): void {
    this.log(
      this.VERBOSE,
      source,
      message
    );
  }

  logInfo(
    source: string,
    message: string
  ): void {
    this.log(
      this.INFO,
      source,
      message
    );
  }

  logWarning(
    source: string,
    message: string
  ): void {
    this.log(
      this.WARNING,
      source,
      message
    );
  }

  logError(
    source: string,
    message: string
  ): void {
    this.log(
      this.ERROR,
      source,
      message
    );
  }

  private log(
    level: number,
    source: string,
    message: string
  ): void {
    if(level >= this.currentLogLevel) {
      console.log(
        Date.now() + ' '
        + source + ' '
        + message
      );
    }
  }

  static getLogger(source: string): Logger {
    return new Logger(
      source,
      LoggingService.instance
    );
  }
}
