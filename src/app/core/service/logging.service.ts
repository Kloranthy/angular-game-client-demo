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

  showTimeStamp: boolean;

  blackListedSources: string[];

  static instance: LoggingService;

  constructor() {
    if(LoggingService.instance) {
      console.log('instance already exists');
      return null;
    }
    this.currentLogLevel = 1;
    this.showTimeStamp = false;
    this.blackListedSources = [];
    this.blackListSource('Tile');
    this.blackListSource('Vector3');
    this.blackListSource('Entity');
    this.blackListSource('Wall');
  }

  static getLogger(source: string): Logger {
    return new Logger(source);
  }

  static getInstance() {
    // todo learn how to do proper singletons in typescript
    //console.log('getInstance called');
    if(!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
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

  blackListSource(source: string): void {
    if(this.blackListedSources.includes(source)) {
      return;
    }
    this.blackListedSources.push(source);
  }

  private log(
    level: number,
    source: string,
    message: string
  ): void {
    if(level < this.currentLogLevel) {
      return;
    }
    if(this.blackListedSources.includes(source)) {
      return;
    }
    let out: string;
    out = '';
    if(this.showTimeStamp) {
      out = out + Date.now().toString() + ' ';
    }
    out = out + source + ' ' + message;
    console.log(out);
  }
}
