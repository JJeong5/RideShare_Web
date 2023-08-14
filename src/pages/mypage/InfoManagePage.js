import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState } from "../../atoms";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../../assets/icon/UserProfile.png";
import { customAPI } from "../../customAPI";

const InfoManage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useState({ id: "", pw: "", nickname: "" });

  useEffect(() => {
    // Fetch user information using the access token when the component mounts
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Need page movement logic when logout button is clicked
  };

  const fetchUserInfo = async () => {
    try {
      const response = await customAPI.get(`http://localhost:8080/members/me`);
      const data = response.data;
      setUserInfo({ id: data.id, pw: data.pw, nickname: data.nickname });
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

  return (
    <StyledContainer>
      <LeftSection>
        <StyledHeading>마이페이지</StyledHeading>
        <div>
          <StyledText>
            <Link to="/Info">
              <strong>내 프로필</strong>
            </Link>
          </StyledText>
          <StyledText>
            <Link to="/Info/Manage">
              <strong>계정 관리</strong>
            </Link>
          </StyledText>
          <StyledText>
            <strong>작성 글</strong>
          </StyledText>
          <StyledText>
            <strong>Share 후기</strong>
          </StyledText>
        </div>
      </LeftSection>
      <RightSection>
        <StyledHeading>계정 관리</StyledHeading>
        <CenteredContent>
          <StyledTable>
            <StyledRow>
              <StyledTitleCell>
                <SellText>아이디</SellText>
              </StyledTitleCell>
              <StyledCell>
                <SellText>{userInfo.id}</SellText>
                <StyledButton>아이디 변경</StyledButton>
              </StyledCell>
            </StyledRow>
            <StyledRow>
              <StyledTitleCell>
                <SellText>비밀번호</SellText>
              </StyledTitleCell>
              <StyledCell>
                <StyledTextWithMargin>예시</StyledTextWithMargin>
                <StyledButton>비밀번호 변경</StyledButton>
              </StyledCell>
            </StyledRow>
          </StyledTable>
        </CenteredContent>
      </RightSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 20px;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  padding: 60px;
  background-color: #f9fbfc;
  border-left: 1px solid #ccc;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
  margin-right: 60%;
`;

const StyledHeading = styled.h1`
  text-align: left;
  padding-bottom: 50px;
`;

const StyledTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

const StyledRow = styled.div`
  display: table-row;
`;

const StyledCell = styled.div`
  display: table-cell;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f4f8fe;
  border-left: none; /* 셀에서 왼쪽 테두리 제거 */
  border-right: none; /* 셀에서 오른쪽 테두리 제거 */
`;

const StyledButton = styled.button`
  margin: 10px;
  margin-left: 20px;
  background-color: #0583f2;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const StyledImageContainer = styled.div`
  margin: 10px;
  margin-top: 30px;
  margin-left: 20px;
`;

const StyledTitleCell = styled.div`
  display: table-cell;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  vertical-align: top; /* 셀 상단의 텍스트 정렬 */
  line-height: 1; /* 셀 높이를 줄여 텍스트를 위쪽에 가깝게 만듭니다 */
  border-left: none; /* 셀에서 왼쪽 테두리 제거 */
`;

const StyledText = styled.p`
  text-decoration: none;
  font-weight: bold;
  padding: 5px;
`;

const SellText = styled.p`
  text-decoration: none;
  font-weight: bold;
  padding: 20px;
`;

const StyledTextWithMargin = styled.p`
  text-decoration: none;
  font-weight: bold;
  padding: 5px;
  margin-left: 20px;
`;

export default InfoManage;
