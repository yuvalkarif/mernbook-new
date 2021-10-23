import { Wrapper } from "../styled/styledTheme";
import { Header } from "../header/Header";
import { SearchBar, SearchButton, SearchContainer } from "./Search.styles";
import { useState } from "react";
import { recommendUsers, searchUser } from "../../helpers/api";
import { User } from "../../constants/interfaces";
import { SearchProfile } from "./SearchProfile";
import { SearchProfileSkeleton } from "./SearchProfileSkeleton";
import { useEffect } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState<User[] | []>([]);
  const [recProfiles, setRecProfiles] = useState<User[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!recProfiles) {
      fetchRecommended();
    } else if (!profiles.length) {
      setProfiles(recProfiles);
    }
  }, [recProfiles, profiles]);

  const fetchRecommended = async () => {
    try {
      const recommended: any = await recommendUsers();
      if (recommended) setRecProfiles(recommended);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    if (query !== "") {
      setIsLoading(true);
      try {
        const results = await searchUser(query);
        setProfiles(results);
      } catch (error) {}
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header />
      <Wrapper>
        <SearchContainer>
          <h1>Search</h1>
          <div>
            <SearchBar
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKey}
              placeholder="Search on Mernbook"
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </div>
          {isLoading && <SearchProfileSkeleton />}
          {!isLoading && profiles.length === 0 && (
            <p>Try searching for other users by their name</p>
          )}
          {profiles.length >= 1 &&
            profiles.map((profile, i) => {
              return <SearchProfile user={profile} key={profile._id} />;
            })}
        </SearchContainer>
      </Wrapper>
    </>
  );
};
