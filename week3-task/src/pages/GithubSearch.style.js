/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const SearchInput = styled.input`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border: 2px solid #ccc;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.lightNavy};
  }
`;

export const UserCard = styled.section`
  margin: 3rem auto 0;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 1.5rem;
  position: relative;
  box-shadow: 0 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: transparent;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 1rem 0;
  cursor: pointer;
`;

export const NameLink = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    text-decoration: underline;
  }
`;

export const SubText = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 0.3rem;
`;

export const BioText = styled.p`
  font-size: 1.4rem;
  margin: 1rem 0;
`;

export const FollowSection = styled.dl`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const FollowItem = styled.div`
  text-align: center;
  dt {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }
  dd {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;
