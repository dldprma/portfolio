import React, { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../service/config";
import Alert from "../Alert";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const Button = styled.button`
  width: ${(props) => props.w || "300px"};
  height: ${(props) => props.h || "60px"};
  background-color: ${(props) => props.bg || "var(--main-color)"};
  color: ${(props) => props.c || "#FAFAFA"};
  border: ${(props) => props.b || "1px solid #049DD9"};
  font-size: ${(props) => props.size || "1.5rem"};
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const TossPaymentButton = ({ reservationData, checkInfo }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);
  const [isAlertOpen4, setIsAlertOpen4] = useState(false);
  const [isAlertOpen5, setIsAlertOpen5] = useState(false);

  const handlePayment = async () => {
    const rd = localStorage.getItem("roomdata");
    const rdData = JSON.parse(rd);

    // 필수 값 검증 (비어 있으면 경고창 띄우기)
    if (!rdData.roomNo) {
      setIsAlertOpen(true);
      return;
    }
    if (!rdData.amount) {
      setIsAlertOpen2(true);
      return;
    }
    if (!rdData.checkIn || !rdData.checkOut) {
      setIsAlertOpen3(true);
      return;
    }
    if (rdData.adult <= 0) {
      setIsAlertOpen4(true);
      return;
    }
    if (!checkInfo) {
      setIsAlertOpen5(true);
      return;
    }
  };

  const handleAlertClose = () => setIsAlertOpen(false);
  const handleAlertClose2 = () => setIsAlertOpen2(false);
  const handleAlertClose3 = () => setIsAlertOpen3(false);
  const handleAlertClose4 = () => setIsAlertOpen4(false);
  const handleAlertClose5 = () => setIsAlertOpen5(false);

  return (
    <>
      <Button onClick={handlePayment}>결제하기</Button>

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="ROOM"
            titleColor="#049dd9"
            message="방 정보를 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="PRICE"
            titleColor="#049dd9"
            message="총 금액을 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
      {isAlertOpen3 && (
        <Backdrop>
          <Alert
            title="RESERVATION DATE"
            titleColor="#049dd9"
            message="예약 날짜를 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
      {isAlertOpen4 && (
        <Backdrop>
          <Alert
            title="인원"
            titleColor="#049dd9"
            message="성인은 최소 1명 이상 투숙하여야 합니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose4}
          />
        </Backdrop>
      )}
      {isAlertOpen5 && (
        <Backdrop>
          <Alert
            title="사용자 약관"
            titleColor="#049dd9"
            message="필수 약관에 모두 동의해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose5}
          />
        </Backdrop>
      )}
    </>
  );
};

export default TossPaymentButton;
