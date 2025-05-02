/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};

  & > div:first-of-type {
    font-size: 2.8rem;
    font-weight: 700;
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Btn = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;
