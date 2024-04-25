import { createContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

/*CONTEXT API - Step 1/3: Create a NEW CONTEXT API*/
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    /*CONTEXT API - Step 2/3: PROVIDE VALUE TO CHILD COMPONENTS*/
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        /*This context api we created, we named it PostContext. However, to make our code cleaner we could create a second context such as SearchContext for
    the two below - but for now to keep it simple we will put em all together. */
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostProvider, PostContext };
