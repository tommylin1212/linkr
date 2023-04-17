"use client";

import { type User } from "@prisma/client";
import {
  type FormEvent,
  useState,
  type SetStateAction,
  useCallback,
} from "react";
import { trpc } from "~/trpc";

export default function Page() {
  const [username, setUsername] = useState("");
  const createUser = trpc.user.create.useMutation({
    onSuccess: async () => {
      await getAll.refetch().then((res) => {
        setUsers(res.data || []);
      });
    },
  });
  const getAll = trpc.user.getAll.useQuery();
  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: async () => {
      await getAll.refetch().then((res) => {
        setUsers(res.data || []);
      });
    },
  });
  const [users, setUsers] = useState<User[]>(getAll.data || []);
  const handleGetAll = useCallback(() => {
    void getAll.refetch().then((res) => {
      setUsers(res.data || []);
    });
  }, [getAll]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      createUser.mutate({ name: username });
    },
    [username, createUser]
  );

  const handleChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setUsername(e.target.value);
    },
    []
  );

  const deleteOnClick = useCallback(
    (id: string) => () => {
      deleteUser.mutate({ id: id });
    },
    [deleteUser]
  );

  return (
    <div>
      <h1>Username Input</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleGetAll}>Refresh Users</button>
      <div>
        <h2>Users:</h2>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                {user.UserName}
                <button onClick={deleteOnClick(user.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
