import {
    DefaultTheme as NavigationLightTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
    MD3LightTheme as PaperLightTheme,
    MD3DarkTheme as PaperDarkTheme,
    MD3Theme,
    adaptNavigationTheme
} from 'react-native-paper';
import { NavigationTheme } from 'react-native-paper/lib/typescript/types';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationLightTheme,
    reactNavigationDark: NavigationDarkTheme
});

export const AppLightTheme: MD3Theme & NavigationTheme = {
    ...PaperLightTheme,
    ...LightTheme,
    colors: {
        ...PaperLightTheme.colors,
        ...LightTheme.colors,
        primary: "#F44336",
        onPrimary: "#FFFFFF",
        primaryContainer: "#F44336",
        onPrimaryContainer: "#FFFFFF",
        secondary: "#D32F2F",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#D32F2F",
        onSecondaryContainer: "#FFFFFF",
        tertiary: "#D32F2F",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#D32F2F",
        onTertiaryContainer: "#FFFFFF",
        error: "red",
        onError: "#FFFFFF",
        errorContainer: "red",
        onErrorContainer: "#FFFFFF",
        background: "#FFFFFF",
        onBackground: "#212121",
        surface: "#FFFFFF",
        onSurface: "#212121",
        surfaceVariant: "#FFFFFF",
        onSurfaceVariant: "#212121",
        outline: "#BDBDBD",
        outlineVariant: "#BDBDBD",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "#000000",
        inverseOnSurface: "#FFFFFF",
        inversePrimary: "#D32F2F",
        elevation: {
            level0: "transparent",
            level1: "#FFFFFF",
            level2: "#FFFFFF",
            level3: "#FFFFFF",
            level4: "#FFFFFF",
            level5: "#FFFFFF"
        },
        surfaceDisabled: "#FFCDD2",
        onSurfaceDisabled: "#212121",
        backdrop: "#FFFFFF",
        //Navigation theme                
        card: "#F44336",
        text: "#FFFFFF",
        border: "#BDBDBD",
        notification: "#D32F2F"
    }
}