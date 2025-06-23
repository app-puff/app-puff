
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Target, Star, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  target_value: number;
  points_reward: number;
  is_active: boolean;
  progress?: {
    current_progress: number;
    completed_at?: string;
  };
}

interface DesafiosProps {
  onBack: () => void;
}

const Desafios = ({ onBack }: DesafiosProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchChallenges();
  }, [user]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      
      // Fetch challenges with user progress if logged in
      const { data: challengesData, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      let challengesWithProgress = challengesData || [];

      if (user) {
        // Fetch user progress for each challenge
        const { data: progressData } = await supabase
          .from('user_challenge_progress')
          .select('*')
          .eq('user_id', user.id);

        challengesWithProgress = challengesData.map(challenge => {
          const userProgress = progressData?.find(p => p.challenge_id === challenge.id);
          return {
            ...challenge,
            progress: userProgress ? {
              current_progress: userProgress.current_progress || 0,
              completed_at: userProgress.completed_at
            } : { current_progress: 0 }
          };
        });
      }

      setChallenges(challengesWithProgress);
    } catch (error) {
      console.error('Erro ao buscar desafios:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os desafios",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'planting': return '🌱';
      case 'biodiversity': return '🐝';
      case 'composting': return '♻️';
      case 'maintenance': return '🌳';
      case 'education': return '📚';
      default: return '🎯';
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'planting': return 'bg-green-500';
      case 'biodiversity': return 'bg-yellow-500';
      case 'composting': return 'bg-blue-500';
      case 'maintenance': return 'bg-purple-500';
      case 'education': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressPercentage = (challenge: Challenge) => {
    if (!challenge.progress) return 0;
    return Math.min((challenge.progress.current_progress / challenge.target_value) * 100, 100);
  };

  const isCompleted = (challenge: Challenge) => {
    return challenge.progress?.completed_at || getProgressPercentage(challenge) >= 100;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
        <div className="max-w-4xl mx-auto text-center">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Card>
            <CardContent className="py-12">
              <Trophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Faça login para ver seus desafios
              </h3>
              <p className="text-gray-500">
                Entre na sua conta para participar dos desafios e ganhar pontos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-puff-green">🎯 Desafios e Ranking</h1>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold">Nível 7 - Guardião</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seus Desafios Ambientais</CardTitle>
            <CardDescription>
              Complete desafios para ganhar pontos XP e medalhas especiais
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`hover:shadow-lg transition-all duration-200 ${
                  isCompleted(challenge) ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${getChallengeColor(challenge.challenge_type)} text-white text-2xl`}>
                        {getChallengeIcon(challenge.challenge_type)}
                      </div>
                      {isCompleted(challenge) && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <Badge variant="secondary">
                      +{challenge.points_reward} XP
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>
                          {challenge.progress?.current_progress || 0} / {challenge.target_value}
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(challenge)} 
                        className="h-3"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(getProgressPercentage(challenge))}% concluído
                      </p>
                    </div>

                    {isCompleted(challenge) ? (
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-lg">
                        <Star className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Desafio Concluído!</span>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast({
                          title: "Desafio em andamento",
                          description: "Continue suas atividades para completar este desafio!"
                        })}
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Continuar Desafio
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Ranking Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🏆 Ranking da Comunidade</CardTitle>
            <CardDescription>Veja como você está comparado a outros membros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gold/10 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <p className="font-medium">Thais Lima</p>
                    <p className="text-sm text-gray-500">15 desafios completos</p>
                  </div>
                </div>
                <Badge className="bg-yellow-500 text-white">1,250 XP</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-sm text-gray-500">12 desafios completos</p>
                  </div>
                </div>
                <Badge variant="secondary">980 XP</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <p className="font-medium">Maria Santos</p>
                    <p className="text-sm text-gray-500">10 desafios completos</p>
                  </div>
                </div>
                <Badge variant="secondary">850 XP</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Desafios;
