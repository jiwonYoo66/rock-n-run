import React, { useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { IoSearchOutline } from 'react-icons/io5';
import { Address } from 'react-daum-postcode/lib/loadPostcode';
import theme from '@styles/theme';
import ModalBackground from '@components/share/commons/ModalBackground';

type StyledPostcodeProps = {
	width?: number;
	height?: number;
	margin?: string;
	title?: string;
	value: string;
	onComplete: (data: Address) => void;
}

const StyledPostcode = ({
							width,
							height = 48,
							margin,
							title = '주소 입력',
							value = '',
							onComplete = () => null
						}: StyledPostcodeProps
) => {
	const [postcodeModal, setPostcodeModal] = useState(false);

	const handleComplete = (address: Address) => {
		onComplete(address);
		setPostcodeModal(false);
	}

	return (
		<Wrapper
			$width={width}
			$margin={margin}>
			{title && (
		 	 	<Title>
					{title}
			 	</Title>
			)}
            <PostWrapper
				$width={width}
				$height={height}
				onClick={() => setPostcodeModal(true)}>
                <Input
					value={value}
					readOnly
					placeholder='주소를 검색해주세요.'
				/>
				<IoSearchOutline
					fontSize={20}
					color={theme.colors.lightGrayFontColor}
				/>
            </PostWrapper>
			<ModalBackground
				title='주소 검색'
				visible={postcodeModal}
				onClose={() => setPostcodeModal(false)}>
				{postcodeModal && (
					<PostcodeBox onClick={e => e.stopPropagation()}>
						<DaumPostcode onComplete={handleComplete} />
					</PostcodeBox>
				)}
        	</ModalBackground>
        </Wrapper>
	);
};

export default StyledPostcode;

const Wrapper = styled.div<{ $row?: boolean; $width?: number; $margin?: string; }>`
  width: ${({ $width }) => $width ? `${$width}px` : '100%'};
  margin: ${({ $margin }) => $margin ? $margin : 0};
  position: relative;
`;
const Title = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const PostWrapper = styled.div<{ $width?: number; $height?: number; }>`
  width: ${({ $width }) => $width ? `${$width}px` : '100%'};
  height: ${({ $height }) => $height}px;
  font-size: 15px;
  padding: 14px 12px;
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.lightGrayBorderColor};
  border-radius: 4px;
  cursor: pointer;
`;
const Input = styled.input`
  flex: 1;
  cursor: pointer;
`;
export const PostcodeBox = styled.div`
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  white-space: pre-line;
`;

