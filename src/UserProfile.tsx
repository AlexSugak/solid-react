import * as React from "react";

type UserDetailsResponse = {
  name: string;
  email: string;
  avatarUrl: string;
};
const fetchUserDetails = (userId: string): Promise<UserDetailsResponse> =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: "Cat",
          email: "cat@mittens.meow",
          avatarUrl: "https://placekitten.com/100/100",
        }),
      100
    );
  });

const UserProfile = ({ userId }: { userId: string }) => {
  const [userDetails, setUserDetails] =
    React.useState<UserDetailsResponse | null>(null);
  React.useEffect(() => {
    fetchUserDetails(userId).then(setUserDetails);
  }, [userId]);
  return (
    <div>
      {userDetails ? (
        <>
          <h2>{userDetails.name}</h2>
          <p>{userDetails.email}</p>
          <img src={userDetails.avatarUrl} alt="User Avatar" />
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <UserProfile userId="123" />
    </div>
  );
}
