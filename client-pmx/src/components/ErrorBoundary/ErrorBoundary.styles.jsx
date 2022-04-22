import styled from '@emotion/styled/macro';

export const ErrorOverlayStyles = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorImageStyles = styled.img`
  display: inline-block;
  object-fit: cover;
  width: 40vh;
  height: 40vh;
`;

export const ErrorTextStyles = styled.h2`
  font-size: 28px;
  color: #2f8e89;
`;
