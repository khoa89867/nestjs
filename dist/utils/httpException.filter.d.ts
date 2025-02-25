import { ArgumentsHost, ExceptionFilter, NotFoundException } from "@nestjs/common";
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): void;
}
