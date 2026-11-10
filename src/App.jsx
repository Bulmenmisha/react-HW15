import { useState, useCallback, useMemo } from 'react';
import UserList from './UserList.jsx';

const userList = [
  { id: 1, name: 'Иван Петров' },
  { id: 2, name: 'Мария Смирнова' },
  { id: 3, name: 'Алексей Иванов' },
  { id: 4, name: 'Марина Кузнецова' },
  { id: 5, name: 'Дарья Соколова' },
  { id: 6, name: 'Глеб Попов' },
  { id: 7, name: 'Дмитрий Лебедев' },
  { id: 8, name: 'Григорий Козлов' },
  { id: 9, name: 'Серафим Новиков' },
  { id: 10, name: 'Анна Морозова' },
];

function App() {
  const [filter, setFilter] = useState('');
  // счётчик не связан со списком — нужен, чтобы проверить мемоизацию
  const [count, setCount] = useState(0);

  // useCallback: функция не пересоздаётся при каждом рендере
  const filterUsers = useCallback((text) => {
    const query = text.trim().toLowerCase();
    return userList.filter((user) => user.name.toLowerCase().includes(query));
  }, []);

  // useMemo: список пересчитывается только при изменении filter
  const filteredUsers = useMemo(() => filterUsers(filter), [filter, filterUsers]);

  return (
    <div className="app">
      <div className="card">
        <h1>Пользователи</h1>

        <input
          className="search"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Фильтр по имени..."
        />

        <p className="count">
          Найдено: {filteredUsers.length} из {userList.length}
        </p>

        <UserList users={filteredUsers} />

        <div className="counter">
          <button onClick={() => setCount(count + 1)}>Счётчик: {count}</button>
          <span>
            Нажми и открой консоль: «UserList render» не появится — список не перерисовывается
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
