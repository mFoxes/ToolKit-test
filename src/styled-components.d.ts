import { Theme } from './shared/constants/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
