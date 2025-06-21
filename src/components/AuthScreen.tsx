
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onLogin: () => void;
  onGuestAccess: () => void;
}

const AuthScreen = ({ onLogin, onGuestAccess }: AuthScreenProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'community'
  });

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.userType);
        if (error) throw error;
        
        toast({
          title: "Conta criada!",
          description: "Verifique seu e-mail para confirmar sua conta.",
        });
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        onLogin();
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro durante a autenticação",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-puff-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PUFF</h1>
          <p className="text-white/90">Plante Um Futuro Feliz</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-puff-green">
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Junte-se à comunidade PUFF e comece a plantar' 
                : 'Acesse sua conta para continuar plantando'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userType">Perfil</Label>
                    <Select 
                      value={formData.userType} 
                      onValueChange={(value) => setFormData({ ...formData, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🧑‍🎓 Aluno</SelectItem>
                        <SelectItem value="teacher">🧑‍🏫 Professor</SelectItem>
                        <SelectItem value="school">🏫 Escola/Instituição</SelectItem>
                        <SelectItem value="community">🌱 Comunidade / Público geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Sua senha"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-puff-green hover:bg-puff-green/90"
                disabled={loading}
              >
                {loading ? 'Carregando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar-se'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-600"
                onClick={onGuestAccess}
              >
                Explorar como Visitante
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
