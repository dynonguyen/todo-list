import AppLogo from './components/AppLogo';
import Todo from './components/Todo';
import ToggleTheme from './components/ToggleTheme';

function App() {
  return (
    <div className="max-w-lg p-4 mx-auto my-8 shadow-lg rounded-2xl bg-base-300">
      <div className="flex justify-between mb-6">
        <AppLogo />
        <ToggleTheme />
      </div>

      <ul className="flex flex-col gap-4 max-h-[550px] overflow-auto">
        <Todo />
        <Todo />
        <Todo />
      </ul>
    </div>
  );
}

export default App;
