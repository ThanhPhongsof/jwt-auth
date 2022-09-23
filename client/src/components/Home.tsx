import { useUsersQuery } from "../generated/graphql";


const Home = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "no-cache" });

  if (loading) return <h1>Loading users...</h1>;

  return (
    <ul>
      {data?.users?.map((item) => (
        <li key={item.id}>{item.username}</li>
      ))}
    </ul>
  );
};

export default Home;
