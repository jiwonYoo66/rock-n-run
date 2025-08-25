import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import ModalBackground from '@components/share/commons/ModalBackground';
import StyledInput from '@components/styled/StyledInput';
import { isPhoneNumber, onlyNumber } from '@utils/commons';
import StyledButton from '@components/styled/StyledButton';

type SendAddressModalProps = {
    sendAddressModal: boolean;
    setSendAddressModal: Dispatch<SetStateAction<boolean>>;
}

const SendAddressModal = ({
                              sendAddressModal,
                              setSendAddressModal
                          }: SendAddressModalProps) => {
    const [cellphone, setCellphone] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCellphone(onlyNumber(value));
    }

    const handleClose = () => {
        setSendAddressModal(false);
        setCellphone('');
    };

    const handleSend = async () => {

        if (!isPhoneNumber(cellphone)) {
            alert('휴대폰 번호를 정확히 입력해주세요.');
            return;
        }

        try {
            alert('입력하신 번호로 주소를 전송했습니다.');
            handleClose();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ModalBackground
            width={320}
            title="입력받을 전화번호를 입력해주세요."
            visible={sendAddressModal}
            onClose={handleClose}>
            <StyledInput
                margin="30px 0 12px"
                value={cellphone}
                onChange={onChange}
                maxLength={11}
                placeholder="010을 포함한 휴대폰번호 전체 입력"
            />
            <StyledButton
                title="전송"
                onClick={handleSend}
            />
        </ModalBackground>
    );
};

export default SendAddressModal;
