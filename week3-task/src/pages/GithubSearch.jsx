import { useState } from "react";
import {
  Wrapper,
  SearchInput,
  UserCard,
  ProfileImage,
  NameLink,
  SubText,
  BioText,
  FollowSection,
  FollowItem,
  CloseBtn,
} from "./GithubSearch.style";

const GithubSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [profile, setProfile] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${inputValue.trim()}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProfile(data);
      } catch {
        alert("유저 정보를 불러올 수 없습니다.");
      }
    }
  };

  const clearProfile = () => {
    setProfile(null);
    setInputValue("");
  };

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Github 프로필을 검색해보세요."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {profile && (
        <UserCard>
          <CloseBtn onClick={clearProfile}>✖</CloseBtn>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            <ProfileImage src={profile.avatar_url} alt="github avatar" />
          </a>
          <h1>
            <NameLink
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.name}
            </NameLink>
          </h1>
          <SubText>{profile.login}</SubText>
          <BioText>{profile.bio}</BioText>
          <FollowSection>
            <FollowItem>
              <dt>Followers</dt>
              <dd>{profile.followers}</dd>
            </FollowItem>
            <FollowItem>
              <dt>Following</dt>
              <dd>{profile.following}</dd>
            </FollowItem>
          </FollowSection>
        </UserCard>
      )}
    </Wrapper>
  );
};

export default GithubSearch;
