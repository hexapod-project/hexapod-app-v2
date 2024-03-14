import deepmerge from "deepmerge";
import { useEffect, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { G, Path, Svg, SvgProps } from "react-native-svg";

const STROKE_COLOR = "#FFF";
const FILL_COLOR_BODY = "#666";
const FILL_COLOR_LEG = "#888";
const STROKE_OPACITY = 0.65;
const BODY_SIZE = 80;
const LEG_WIDTH = 100;
const LEG_HEIGHT = 40;
const LEG_X = BODY_SIZE + LEG_WIDTH / 15;
const BUTTON_WIDTH = LEG_WIDTH / 3;

type LegProps = {
    isActive?: boolean;
    onSetActive?: () => void;
}

type JointProps = {
    isActive?: boolean;
}

type StyledPathProps = {
    d: string;
    fillColor?: string;
}

function Body(props: SvgProps) {
    return (
        <Svg width={BODY_SIZE} height={BODY_SIZE} {...props} viewBox="0 0 59.96093 57.795317">
            <Path d={"m 21.165139,0.52167772 c -0.722412,0.0134 -2.295725,0.77399998 -5.914578,2.86336008 -12.8670346,7.4287992 1.748374,0.86186 -5.6804028,13.7289302 -7.428786,12.86707 -9.04923497,-3.07419 -9.04923497,11.78342 0,14.85761 1.62043797,-1.08313 9.04923497,11.78396 7.4287868,12.867061 -7.1866418,6.300121 5.6803918,13.728931 12.867035,7.42881 -0.127925,-1.94497 14.72965,-1.94496 14.857563,-1e-5 1.863134,9.37377 14.730164,1.94496 12.86703,-7.4288 -1.748385,-0.86187 5.680402,-13.728931 7.428787,-12.86708 9.049232,3.07366 9.049242,-11.78396 0,-14.85761 -1.620455,1.08364 -9.049242,-11.78342 -7.428787,-12.8670702 7.186628,-6.300131 -5.680402,-13.7289302 -12.86702,-7.4288102 0.127399,1.94497 -14.730164,1.94497 -10.678881,0 -6.968897,-4.84276008 -8.815061,-4.80833008 z m 9.174109,9.45354938 6.083072,6.0814609 h -2.586102 v 3.86142 c -2e-5,0.15146 0.0569,0.27345 -0.20026,0.27344 l -6.593399,2e-5 c -0.11097,0 -0.20027,-0.12201 -0.20028,-0.27345 v -3.86141 h -2.586121 z"}
                fill={FILL_COLOR_BODY}
                stroke={STROKE_COLOR}
                strokeOpacity={STROKE_OPACITY}
                strokeLinejoin="round"
            />
        </Svg>
    )
}

function StyledPath({ d, fillColor }: StyledPathProps) {
    return (
        <Path d={d}
            fill={fillColor ?? FILL_COLOR_LEG}
            stroke={STROKE_COLOR}
            strokeOpacity={STROKE_OPACITY}
            strokeLinejoin="round"
        />
    )
}

function Coxa({ isActive }: JointProps) {
    const theme = useTheme();

    return (
        <G>
            <StyledPath d={"m 1.3631703,4.9383665 c 6.8004214,0 13.6008427,0 20.4012637,0 1.140547,0.5383676 1.159224,3.2166065 0,3.7597195 -6.800421,0 -13.6008423,0 -20.4012637,0 -1.12356751,-0.322579 -1.14741931,-3.4210491 0,-3.7597195 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />

            <StyledPath d={"m 2.2175485,9.433569 c 5.9755218,0.02268 11.9555805,-0.04538 17.9282655,0.03404 1.910644,0.5027993 1.210401,2.745295 1.341858,4.196404 -0.07669,2.211941 0.160376,4.463598 -0.131742,6.648567 -0.859442,1.629724 -2.935233,0.836824 -4.417315,1.025819 -5.019698,-0.02267 -10.0439305,0.04537 -15.0607925,-0.03404 -1.91064407,-0.502799 -1.21040147,-2.745295 -1.34185837,-4.196404 0.076686,-2.21194 -0.1603763,-4.463598 0.1317416,-6.648567 C 0.91819233,9.8465673 1.5551973,9.424366 2.2175485,9.433569 Z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />

            <StyledPath d={"m 19.106356,8.026287 c -7.615645,-0.4446205 -9.9670338,11.376035 -2.760794,13.87956 3.237483,1.782143 6.356633,-0.637663 8.807232,-2.09359 4.164767,-0.03122 8.335797,0.06286 12.496594,-0.04778 2.189714,-0.428485 1.897853,-2.858511 1.883138,-4.542364 -0.06838,-1.604229 0.443686,-3.793814 -1.439623,-4.572461 -2.495423,-0.391945 -5.078429,-0.08986 -7.611035,-0.184888 -1.989551,0 -3.979102,0 -5.968653,0 C 23.169914,8.927737 21.147629,8.015693 19.106356,8.026287 Z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />
        </G>
    )
}

function Femur({ isActive }: JointProps) {
    const theme = useTheme();

    return (
        <G>
            <StyledPath d={"m 27.616617,0.55539453 c 8.620672,0 17.241343,0 25.862015,0 1.140547,0.53836747 1.159224,3.21660607 0,3.75971907 -8.620672,0 -17.241343,0 -25.862015,0 -1.123567,-0.3225789 -1.147419,-3.42104877 0,-3.75971907 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />

            <StyledPath d={"m 36.910708,6.5917235 c -0.02268,5.9755215 0.04538,11.9555795 -0.03405,17.9282655 -0.502799,1.910643 -2.745295,1.210401 -4.196404,1.341858 -2.21194,-0.07669 -4.463597,0.160376 -6.648567,-0.131742 -1.629724,-0.859443 -0.836825,-2.935233 -1.025819,-4.417315 0.02267,-5.019698 -0.04537,-10.04393 0.03405,-15.0607925 0.502799,-1.9106437 2.745294,-1.2104015 4.196403,-1.3418583 2.211941,0.076686 4.463598,-0.1603763 6.648568,0.1317416 0.61282,0.2504865 1.035022,0.8874913 1.025819,1.5498427 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />
            <StyledPath d={"m 27.616617,26.499728 c 8.620672,0 17.241343,0 25.862015,0 1.140547,0.538367 1.159224,3.216606 0,3.759719 -8.620672,0 -17.241343,0 -25.862015,0 -1.123567,-0.322579 -1.147419,-3.421049 0,-3.759719 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />
        </G>
    )
}

function Tibia({ isActive }: JointProps) {
    const theme = useTheme();

    return (
        <G>
            <StyledPath d={"m 56.21739,6.5917235 c -0.02268,5.9755215 0.04538,11.9555795 -0.03404,17.9282655 -0.502799,1.910644 -2.745295,1.210401 -4.196404,1.341858 -2.21194,-0.07669 -4.463598,0.160376 -6.648567,-0.131742 -1.629724,-0.859443 -0.836824,-2.935233 -1.025819,-4.417315 0.02267,-5.019698 -0.04537,-10.04393 0.03404,-15.0607925 0.502799,-1.9106439 2.745295,-1.2104014 4.196404,-1.3418583 2.21194,0.076686 4.463598,-0.1603763 6.648567,0.1317416 0.612821,0.2504866 1.035022,0.8874915 1.025819,1.5498427 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />

            <StyledPath d={"m 43.997133,8.980206 c 6.567283,0.02963 13.140502,-0.05951 19.704043,0.04499 2.182652,0.4573153 1.74467,2.906823 1.77325,4.566765 -0.09473,2.369074 0.202662,4.787907 -0.174095,7.121661 -0.933033,1.9838 -3.338489,1.193441 -5.074876,1.355608 -5.558364,-0.0295 -11.122642,0.05933 -16.677266,-0.04499 -2.182652,-0.457315 -1.74467,-2.906823 -1.77325,-4.566765 0.09473,-2.369074 -0.202662,-4.787907 0.174095,-7.121661 0.331015,-0.8098347 1.172809,-1.36777 2.048099,-1.355608 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />

            <StyledPath d={"m 67.207053,13.139231 c 1.871735,0.05133 3.766177,-0.105727 5.622817,0.08414 1.054022,0.887256 0.425411,2.471809 0.596772,3.697984 0.05484,1.725498 -1.94179,1.173282 -3.049217,1.259483 -1.277589,-0.132005 -2.718648,0.307834 -3.862739,-0.313863 -0.549099,-1.109583 -0.176647,-2.441538 -0.285897,-3.653789 -0.01666,-0.536685 0.415303,-1.083317 0.978264,-1.073952 z"}
                fillColor={isActive ? theme.colors.tertiary : undefined}
            />
        </G>
    )
}

function Leg({
    isActive,
    onSetActive,
    ...props
}: ViewProps & LegProps) {
    const [activeJoint, setActiveJoint] = useState(0);

    const toggleJoint = (index: number) => {
        if (activeJoint == index) {
            setActiveJoint(-1);
        } else {
            setActiveJoint(index);
        }

        if (onSetActive) {
            onSetActive();
        }
    }

    useEffect(() => {
        if (!isActive) {
            setActiveJoint(-1);
        }
    }, [isActive]);

    return (
        <View {...props}>
            <Svg viewBox="0 0 74 31">
                <Tibia isActive={isActive && activeJoint == 2} />

                <Femur isActive={isActive && activeJoint == 1} />

                <Coxa isActive={isActive && activeJoint == 0} />
            </Svg>

            <TouchableWithoutFeedback style={deepmerge(style.jointBtn, style.coxaBtn)}
                onPress={() => toggleJoint(0)} />

            <TouchableWithoutFeedback style={deepmerge(style.jointBtn, style.femurBtn)}
                onPress={() => toggleJoint(1)} />

            <TouchableWithoutFeedback style={deepmerge(style.jointBtn, style.tibiaBtn)}
                onPress={() => toggleJoint(2)} />
        </View>
    )
}

export function JointSelector() {
    const [activeLeg, setActiveLeg] = useState(4);

    return (
        <View style={style.container}>
            <Leg style={deepmerge(style.leg, style.legLeftFront)}
                onSetActive={() => setActiveLeg(0)}
                isActive={activeLeg == 0} />
            <Leg style={deepmerge(style.leg, style.legLeftMid)}
                onSetActive={() => setActiveLeg(1)}
                isActive={activeLeg == 1} />
            <Leg style={deepmerge(style.leg, style.legLeftBack)}
                onSetActive={() => setActiveLeg(2)}
                isActive={activeLeg == 2} />

            <Body style={style.body} />

            <Leg style={deepmerge(style.leg, style.legRightFront)}
                onSetActive={() => setActiveLeg(3)}
                isActive={activeLeg == 3} />
            <Leg style={deepmerge(style.leg, style.legRightMid)}
                onSetActive={() => setActiveLeg(4)}
                isActive={activeLeg == 4} />
            <Leg style={deepmerge(style.leg, style.legRightBack)}
                onSetActive={() => setActiveLeg(5)}
                isActive={activeLeg == 5} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: BODY_SIZE + LEG_WIDTH * 2,
        aspectRatio: 1,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    body: {},
    leg: {
        width: LEG_WIDTH,
        height: LEG_HEIGHT,
        position: "absolute",
    },
    legRightFront: {
        transform: [{ rotate: "-60deg" }, { translateX: LEG_X }]
    },
    legRightMid: {
        transform: [{ rotate: "0deg" }, { translateX: LEG_X }]
    },
    legRightBack: {
        transform: [{ rotate: "60deg" }, { translateX: LEG_X }]
    },
    legLeftFront: {
        transform: [{ rotate: "60deg" }, { scaleX: -1 }, { translateX: LEG_X }]
    },
    legLeftMid: {
        transform: [{ rotate: "0deg" }, { scaleX: -1 }, { translateX: LEG_X }]
    },
    legLeftBack: {
        transform: [{ rotate: "-60deg" }, { scaleX: -1 }, { translateX: LEG_X }]
    },
    jointBtn: {
        position: "absolute",
        height: LEG_HEIGHT,
        bottom: 0
    },
    coxaBtn: {
        width: BUTTON_WIDTH,
        left: 0,
    },
    femurBtn: {
        width: BUTTON_WIDTH,
        left: BUTTON_WIDTH
    },
    tibiaBtn: {
        width: BUTTON_WIDTH,
        left: BUTTON_WIDTH * 2
    }
})