import { memo } from 'react';

// memo: компонент перерисовывается только если изменились пропсы (users)
function UserList({ users }) {
  console.log('UserList render');

  if (users.length === 0) {
    return <p className="empty">Никого не нашли</p>;
  }

  return (
    <ul className="list">
      {users.map((user) => (
        <li key={user.id} className="list__item">
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default memo(UserList);
