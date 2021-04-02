import * as React from "react";

/* Components */
import { Suspense } from "react";
import { Image as NativeImage } from "react-native";
import ErrorBoundary from "./ErrorBoundary";

/* Types */
import { FC, ReactElement } from "react";
import { ImageProps } from "./types";

export {
	ImageProps
};

const Image: FC<ImageProps> = ({
	errorFallback,
	logErrors,
	fallback,
	...props
}): ReactElement<
	ImageProps,
	FC<ImageProps>
> =>
	<ErrorBoundary errorFallback={errorFallback} logErrors={logErrors}>
		<Suspense fallback={<NativeImage source={fallback} />}>
			<NativeImage {...props} />
		</Suspense>
	</ErrorBoundary>;

export default Image;

