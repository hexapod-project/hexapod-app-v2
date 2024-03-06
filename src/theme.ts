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

const LIGHT_PALLETE = {
    primary: "#F44336",
    darkPrimary: "#D32F2F",
    lightPrimary: "#FFCDD2",
    secondary: "#b01105",
    background: "#EDEDED",
    tertiary: "#FF9800",
    text: "#212121",
    white: "#FFFFFF",
    black: "#000000",
    grey: "#555555",
    error: "#FA0202",
    outline: "#BDBDBD"
}

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
        primary: LIGHT_PALLETE.primary,
        onPrimary: LIGHT_PALLETE.white,
        primaryContainer: LIGHT_PALLETE.primary,
        onPrimaryContainer: LIGHT_PALLETE.white,
        secondary: LIGHT_PALLETE.secondary,
        onSecondary: LIGHT_PALLETE.white,
        secondaryContainer: LIGHT_PALLETE.secondary,
        onSecondaryContainer: LIGHT_PALLETE.white,
        tertiary: LIGHT_PALLETE.tertiary,
        onTertiary: LIGHT_PALLETE.white,
        tertiaryContainer: LIGHT_PALLETE.tertiary,
        onTertiaryContainer: LIGHT_PALLETE.white,
        error: LIGHT_PALLETE.error,
        onError: LIGHT_PALLETE.white,
        errorContainer: LIGHT_PALLETE.error,
        onErrorContainer: LIGHT_PALLETE.white,
        background: LIGHT_PALLETE.background,
        onBackground: LIGHT_PALLETE.text,
        surface: LIGHT_PALLETE.background,
        onSurface: LIGHT_PALLETE.text,
        surfaceVariant: LIGHT_PALLETE.background,
        onSurfaceVariant: LIGHT_PALLETE.text,
        outline: LIGHT_PALLETE.outline,
        outlineVariant: LIGHT_PALLETE.outline,
        shadow: LIGHT_PALLETE.black,
        scrim: LIGHT_PALLETE.black,
        inverseSurface: LIGHT_PALLETE.grey,
        inverseOnSurface: LIGHT_PALLETE.white,
        inversePrimary: LIGHT_PALLETE.lightPrimary,
        elevation: {
            level0: "transparent",
            level1: LIGHT_PALLETE.white,
            level2: LIGHT_PALLETE.white,
            level3: LIGHT_PALLETE.white,
            level4: LIGHT_PALLETE.white,
            level5: LIGHT_PALLETE.white
        },
        surfaceDisabled: LIGHT_PALLETE.lightPrimary,
        onSurfaceDisabled: LIGHT_PALLETE.text,
        backdrop: LIGHT_PALLETE.background,
        //Navigation theme                
        card: LIGHT_PALLETE.primary,
        text: LIGHT_PALLETE.white,
        border: LIGHT_PALLETE.outline,
        notification: LIGHT_PALLETE.darkPrimary
    }
}