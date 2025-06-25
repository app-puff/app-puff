
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Leaf, Users, TreePineIcon } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
  onGuestAccess: () => void;
}

const AuthScreen = ({ onLogin, onGuestAccess }: AuthScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('community');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        onLogin();
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signUp(email, password, fullName, userType);
      if (error) {
        setError(error.message);
      } else {
        setError('');
        alert('Conta criada com sucesso! Verifique seu e-mail para confirmar a conta.');
      }
    } catch (err) {
      setError('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const fillTestUser = () => {
    setEmail('xthaislima@gmail.com');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-puff-green text-white p-2 rounded-full">
              <TreePineIcon className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-puff-green">PUFF</h1>
          <p className="text-gray-600 mt-2">Plante Um Futuro Feliz</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao PUFF</CardTitle>
            <CardDescription>
              Entre ou crie sua conta para começar a plantar o futuro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Test User Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fillTestUser}
                    className="w-full"
                  >
                    Usar Usuário de Teste
                  </Button>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-puff-green hover:bg-puff-green/90"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input
                      id="signup-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-type">Tipo de Usuário</Label>
                    <select
                      id="user-type"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puff-green"
                    >
                      <option value="student">Estudante</option>
                      <option value="teacher">Professor</option>
                      <option value="school">Escola/Instituição</option>
                      <option value="community">Comunidade</option>
                    </select>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-puff-green hover:bg-puff-green/90"
                    disabled={loading}
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Guest Access */}
            <div className="mt-6 pt-4 border-t">
              <Button
                variant="ghost"
                onClick={onGuestAccess}
                className="w-full flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Entrar como Visitante
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
