import { keyframes, styled } from 'styled-components';
import theme from '@styles/theme';

type LoadingSpinnerProps = {
	DISABLED?: boolean;
	BUTTON?: boolean;
	color?: string;
}

const LoadingSpinner = ({ DISABLED, BUTTON, color }: LoadingSpinnerProps) => {
	if (DISABLED) {
		return (
			<DisabledWrapper>
                <Container>
                    <StyledSvg viewBox='25 25 50 50'>
                        <StyledCircle $color={color} r='20' cy='50' cx='50' />
                    </StyledSvg>
                </Container>
            </DisabledWrapper>
		);
	}

	return (
		<Container $button={BUTTON}>
            <StyledSvg viewBox='25 25 50 50'>
                <StyledCircle $color={color} r='20' cy='50' cx='50' />
            </StyledSvg>
        </Container>
	);
};

export default LoadingSpinner;

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
`;
const DisabledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  margin: 0;
  background: rgba(0, 0, 0, 0.25);
`;
const Container = styled.div<{ $button?: boolean; }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $button }) => $button ? '0' : '40px'};
`;
const StyledSvg = styled.svg`
  width: 3.25em;
  transform-origin: center;
  animation: ${rotateAnimation} 2s linear infinite;
`;
const StyledCircle = styled.circle<{ $color?: string }>`
  fill: none;
  stroke: ${({ $color }) => ($color ? $color : theme.colors.blackColor)};
  stroke-width: 3;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.5s ease-in-out infinite;
`;
