import deepmerge from "deepmerge";
import { StyleSheet, View } from "react-native";
import { IconButton, IconButtonProps, Text, useTheme } from "react-native-paper";

const ICON_SIZE = 40;
const ICON_PADDING = 8 * 2;
const ICON_TOTALSIZE = ICON_SIZE + ICON_PADDING;
const DPAD_CONTAINER_SIZE = ICON_TOTALSIZE * 2.25;

function DPadButton(props: IconButtonProps) {
    const theme = useTheme();

    return (
        <IconButton {...props}
            style={deepmerge(style.iconButton, (props.style as any) ?? {})}
            size={ICON_SIZE}
            iconColor={theme.colors.onBackground}
        />
    )
}

export default function DPad() {
    return (
        <View>
            <View style={style.container}>
                <DPadButton style={style.up}
                    onPressIn={() => console.log("Up")}
                    icon={"arrow-up-bold-circle"}
                />

                <DPadButton style={style.down}
                    onPressIn={() => console.log("Down")}
                    icon={"arrow-down-bold-circle"}
                />

                <DPadButton style={style.left}
                    onPressIn={() => console.log("Left")}
                    icon={"arrow-left-bold-circle"}
                />

                <DPadButton style={style.right}
                    onPressIn={() => console.log("Right")}
                    icon={"arrow-right-bold-circle"}
                />
            </View>

            <Text style={style.label}>
                Roll & Pitch
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: "relative",
        height: DPAD_CONTAINER_SIZE,
        width: DPAD_CONTAINER_SIZE,
    },
    label: {
        textAlign: "center"
    },
    iconButton: {
        position: "absolute",
        margin: 0,
    },
    up: {
        top: 0,
        left: DPAD_CONTAINER_SIZE / 2 - ICON_TOTALSIZE / 2
    },
    down: {
        bottom: 0,
        left: DPAD_CONTAINER_SIZE / 2 - ICON_TOTALSIZE / 2
    },
    left: {
        top: DPAD_CONTAINER_SIZE / 2 - ICON_TOTALSIZE / 2,
        left: 0
    },
    right: {
        top: DPAD_CONTAINER_SIZE / 2 - ICON_TOTALSIZE / 2,
        right: 0
    },
})