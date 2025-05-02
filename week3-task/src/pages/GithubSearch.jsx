import { useEffect, useState } from "react";
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
  RecentBox,
  RecentList,
  RecentItem,
  RecentRemoveBtn,
  Title,
} from "./GithubSearch.style";

const STORAGE_KEY = "userList";

const GithubSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) setRecentList(stored);
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearProfile = () => {
    setProfile(null);
    setSearchInput("");
  };

  const fetchProfile = async (username) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("사용자를 찾을 수 없습니다.");
      const data = await res.json();
      setProfile(data);

      let updated = [...recentList.filter((id) => id !== username), username];
      if (updated.length > 3) updated = updated.slice(-3);
      setRecentList(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      fetchProfile(searchInput.trim());
    }
  };

  const handleRecentClick = (id) => {
    setSearchInput(id);
    fetchProfile(id);
  };

  const handleDeleteRecent = (id) => {
    const updated = recentList.filter((item) => item !== id);
    setRecentList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Github 프로필을 검색해보세요."
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {recentList.length > 0 && (
        <RecentBox>
          <Title>최근검색어</Title>
          <RecentList>
            {recentList.map((id) => (
              <RecentItem key={id} onClick={() => handleRecentClick(id)}>
                <span>{id}</span>
                <RecentRemoveBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRecent(id);
                  }}
                >
                  ×
                </RecentRemoveBtn>
              </RecentItem>
            ))}
          </RecentList>
        </RecentBox>
      )}

      {profile && (
        <UserCard>
          <CloseBtn onClick={clearProfile}>×</CloseBtn>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            <ProfileImage src={profile.avatar_url} alt="avatar" />
          </a>
          <h1>
            <NameLink
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.name || "(이름 없음)"}
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
