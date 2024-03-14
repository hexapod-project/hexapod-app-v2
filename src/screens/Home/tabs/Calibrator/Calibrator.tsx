import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { JointSelector } from "./components/JointSelector";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import PWMPeriodCalibrator from "./components/PWMCalibrator";
import ServoTester from "./components/ServoTester";

export default function Calibrator() {
    const theme = useTheme();

    return (
        <View style={style.container}>
            <View style={style.jointSelectorContainer}>
                <JointSelector />
            </View>

            <TabsProvider defaultIndex={0}>
                <Tabs
                    theme={{
                        ...theme,
                        colors: {
                            ...theme.colors,
                            onSurface: theme.colors.primary
                        }
                    }}
                    disableSwipe>
                    <TabScreen label="Calibrate" icon={"av-timer"}>
                        <PWMPeriodCalibrator />
                    </TabScreen>

                    <TabScreen label="Test" icon={"angle-acute"}>
                        <ServoTester />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    jointSelectorContainer: {
        alignItems: "center"
    }
})