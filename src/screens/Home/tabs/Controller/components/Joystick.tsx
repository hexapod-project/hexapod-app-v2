import { PanResponder, StyleSheet, View } from "react-native";
import { Icon, MD3Theme, Text, useTheme } from "react-native-paper";
import { Circle, Svg } from "react-native-svg";
import { Animated } from "react-native"
import { useEffect, useRef } from "react";

const JOYSTICK_SIZE = 100;
const JOYSTICK_RADIUS = JOYSTICK_SIZE / 2;
const CONTAINER_SIZE = 250;
const CONTAINER_RADIUS = CONTAINER_SIZE / 2;
const VIEW_SIZE = CONTAINER_SIZE + JOYSTICK_SIZE;
const ICON_SIZE = 40;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Joystck() {
    const theme = useTheme();
    const style = createStyle(theme);

    const center = {
        x: VIEW_SIZE / 2,
        y: VIEW_SIZE / 2
    }

    const pan = useRef(new Animated.ValueXY(center)).current;
    const position = useRef(new Animated.ValueXY(center)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
                useNativeDriver: false
            }),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    useNativeDriver: false,
                    toValue: { x: 0, y: 0 }
                }).start();
            }
        })
    ).current;

    useEffect(() => {
        position.setOffset(center);

        pan.addListener(({ x, y }) => {
            if (x * x + y * y > CONTAINER_RADIUS * CONTAINER_RADIUS) {
                const angle = Math.atan2(y, x);
                x = Math.cos(angle) * CONTAINER_RADIUS;
                y = Math.sin(angle) * CONTAINER_RADIUS;
            }

            position.setValue({ x, y });
        });
    }, []);

    return (
        <View style={style.joystickContainer}>
            <Text style={style.joystickLabel}>Move</Text>

            <Svg>
                {/* Outline */}
                <Circle cx={VIEW_SIZE / 2}
                    cy={VIEW_SIZE / 2}
                    r={CONTAINER_SIZE / 2}
                    fill={theme.colors.elevation.level0}
                    strokeWidth={1}
                    stroke={theme.colors.outline} />

                {/* Center point */}
                <Circle cx={VIEW_SIZE / 2}
                    cy={VIEW_SIZE / 2}
                    r={3}
                    fill={theme.colors.onBackground}
                    fillOpacity={0.3} />

                {/* Joystick */}
                <AnimatedCircle cx={position.x}
                    cy={position.y}
                    r={JOYSTICK_RADIUS - 2}
                    fill={theme.colors.tertiary}
                    {...panResponder.panHandlers}
                />
            </Svg>

            <Animated.View style={{
                ...style.joystickIcon,
                transform: [
                    { translateX: position.x },
                    { translateY: position.y }
                ]
            }}>
                <Icon size={ICON_SIZE}
                    source={"arrow-all"}
                    color={theme.colors.onPrimary} />
            </Animated.View>
        </View >
    )
}

const createStyle = (theme: MD3Theme) => StyleSheet.create({
    joystickContainer: {
        width: CONTAINER_SIZE + JOYSTICK_SIZE,
        height: CONTAINER_SIZE + JOYSTICK_SIZE,
        borderRadius: CONTAINER_SIZE,
        position: "relative"
    },
    joystickIcon: {
        position: "absolute",
        top: -ICON_SIZE / 2,
        left: -ICON_SIZE / 2,
        opacity: 0.5,
        pointerEvents: "none"
    },
    joystickLabel: {
        width: "100%",
        position: "absolute",
        textAlign: "center",
        bottom: 15
    }
})