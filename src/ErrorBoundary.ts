/* Types */
import React from "react";
import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

export default class ErrorBoundary<Logger = unknown> extends Component<ErrorBoundaryProps<Logger>, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false
		};
	}

	public static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		const { logErrors } = this.props;

		logErrors && logErrors(error, errorInfo);
		this.setState({ error, errorInfo });
	}

	public render(): ReactNode | null {
		const { children, errorFallback } = this.props;
		const { hasError, error, errorInfo } = this.state;

		if (!hasError)
			return children;
		else if (error && errorInfo)
			return errorFallback(error, errorInfo);
		else return null;
	}
}