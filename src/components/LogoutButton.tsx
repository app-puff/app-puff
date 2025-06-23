
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
}

const LogoutButton = ({ 
  variant = 'ghost', 
  size = 'sm', 
  showText = true 
}: LogoutButtonProps) => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (!user) return null;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="w-4 h-4" />
      {showText && <span>Sair</span>}
    </Button>
  );
};

export default LogoutButton;
