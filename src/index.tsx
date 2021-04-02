import React, { useRef, FC, ReactElement } from "react";
import { View, StyleSheet, Animated } from "react-native";

import ErrorBoundary from "./ErrorBoundary";

import { ProgressiveImageProps } from "./types";

export {
	ProgressiveImage
};

const ProgressiveImage: FC<ProgressiveImageProps> = ({
	placeholder,
	source,
	style,
	errorFallback,
	logErrors,
	blurRadius = 1,
	...props
}): ReactElement<
	ProgressiveImageProps,
	FC<ProgressiveImageProps>
> => {
	const placeholderAnimated = useRef(new Animated.Value(0));
	const imageAnimated = useRef(new Animated.Value(0));

	const handleThumbnailLoad = () => {
		Animated.timing(placeholderAnimated.current, {
			toValue: 1,
			useNativeDriver: false
		}).start();
	}

	const onImageLoad = () => {
		Animated.timing(imageAnimated.current, {
			toValue: 1,
			useNativeDriver: false
		}).start();
	}

	return (
		<ErrorBoundary {...{ errorFallback, logErrors }}>
			<View style={styles.container}>
				<Animated.Image
					{...props}
					source={placeholder}
					style={[style, { opacity: placeholderAnimated.current }]}
					onLoad={handleThumbnailLoad}
					blurRadius={blurRadius}
				/>
				<Animated.Image
					{...props}
					source={source}
					style={[styles.imageOverlay, { opacity: imageAnimated.current }, style]}
					onLoad={onImageLoad}
				/>
			</View>
		</ErrorBoundary>
	);
};

const styles = StyleSheet.create({
	imageOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	container: {
		backgroundColor: "#e1e4e8",
	},
});

export default ProgressiveImage;