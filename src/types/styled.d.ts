import 'styled-components';
import { ColorsTypes, DeviceTypes, TypographyTypes } from '@styles/theme';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: ColorsTypes;
		devices: DeviceTypes;
		typography: TypographyTypes;
	}
}
