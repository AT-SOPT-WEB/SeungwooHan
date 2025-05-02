/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
`;

export const searchBox = (theme) => css`
  width: 100%;
  max-width: 400px;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid ${theme.color.border};
  border-radius: 20px;
  outline: none;
  background-color: ${theme.color.inputBg || "rgba(255,255,255,0.1)"};
  color: ${theme.color.text};
  text-align: center;

  &::placeholder {
    color: ${theme.color.text};
    opacity: 0.6;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.05);
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const errorText = (theme) => css`
  margin-top: 16px;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.color.main};
  text-align: center;
`;

export const historyList = css`
  margin-top: 24px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const historyCard = (theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 2px solid ${theme.color.border};
  border-radius: 12px;
  background-color: ${theme.color.inputBg || "rgba(255,255,255,0.05)"};
  font-weight: 500;
  font-size: 15px;
  color: ${theme.color.text};

  .dash {
    margin: 0 6px;
    opacity: 0.6;
  }
`;
