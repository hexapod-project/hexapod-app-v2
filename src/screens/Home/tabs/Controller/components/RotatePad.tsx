import deepmerge from "deepmerge";
import { StyleSheet, View } from "react-native";
import { IconButton, IconButtonProps, Text, useTheme } from "react-native-paper";

const ICON_SIZE = 40;
const ICON_PADDING = 8 * 2;
const ICON_TOTALSIZE = ICON_SIZE + ICON_PADDING;
const DPAD_CONTAINER_SIZE = ICON_TOTALSIZE * 2.25;

function RotatePadButton(props: IconButtonProps) {
    const theme = useTheme();

    return (
        <IconButton {...props}
            style={deepmerge(style.iconButton, (props.style as any) ?? {})}
            size={ICON_SIZE}
            iconColor={theme.colors.onBackground}
        />
    )
}

export default function RotatePad() {
    return (
        <View>
            <View style={style.container}>
                <RotatePadButton
                    onPressIn={() => console.log("Left")}
                    icon={"rotate-left"}
                />

                <RotatePadButton
                    onPressIn={() => console.log("Right")}
                    icon={"rotate-right"}
                />
            </View>

            <Text style={style.label}>
                Rotate
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
        gap: 10
    },
    label: {
        textAlign: "center"
    },
    iconButton: {
        margin: 0,
    }
})