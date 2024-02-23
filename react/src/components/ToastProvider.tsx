import { ToastContainer } from 'react-toastify';
import { useThemeMode } from '~/stores/theme';

export const ToastProvider = () => {
  const theme = useThemeMode((state) => state.mode);

  return <ToastContainer position="top-center" style={{ top: 64 }} limit={3} theme={theme} />;
};

export default ToastProvider;
