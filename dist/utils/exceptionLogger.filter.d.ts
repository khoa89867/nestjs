import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
export declare class ExceptionLoggerFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
