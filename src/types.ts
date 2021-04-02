import { ReactNode, ErrorInfo } from "react";
import { ImageProps as NativeImageProps, ImageSourcePropType } from "react-native";

export interface ErrorBoundaryProps<Logger = any> {
	errorFallback: (error: Error, errorInfo: ErrorInfo) => ReactNode;
	logErrors?: (error: Error, errorInfo?: ErrorInfo) => Logger;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

export type ImageProps<Logger = any> = ErrorBoundaryProps<Logger> & NativeImageProps & {
	fallback: ImageSourcePropType;
};