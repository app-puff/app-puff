
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToAuth = () => {
    navigate('/auth');
  };

  return {
    navigateTo,
    goBack,
    goToDashboard,
    goToAuth,
  };
};
