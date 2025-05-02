/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  min-height: 100vh;
  background-color: #e7f0fa;
`;

export const searchBox = (theme) => css`
  width: 100%;
  max-width: 400px;
  padding: 14px 20px;
  font-size: 18px;
  border: 2px solid ${theme.colors.primary};
  border-radius: 16px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.7);
  color: ${theme.colors.text};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: border 0.2s ease;

  &:focus {
    border-color: ${theme.colors.accent};
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const errorText = (theme) => css`
  margin: 20px 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.accent};
  text-align: center;
  white-space: pre-wrap;
`;

export const historyList = css`
  width: 100%;
  max-width: 400px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const historyCard = (theme) => css`
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border: 2px solid ${theme.colors.primary};
  border-radius: 12px;
  background-color: #ffffffbb;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};

  .dash {
    margin: 0 8px;
  }
`;
