import { Theme } from './shared';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
