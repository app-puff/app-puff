
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const GuiaArtigo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();

  const artigos = {
    '1': {
      titulo: 'Como Preparar o Solo para Microflorestas',
      autor: 'Equipe PUFF',
      tempo: '8 min leitura',
      categoria: 'Preparação do Solo',
      conteudo: `
        <h2>Introdução</h2>
        <p>A preparação adequada do solo é fundamental para o sucesso de qualquer projeto de microfloresta. Um solo bem preparado garante que as mudas tenham as condições ideais para crescer e se desenvolver.</p>
        
        <h2>Análise do Solo</h2>
        <p>Antes de iniciar o plantio, é essencial realizar uma análise completa do solo. Esta análise deve incluir:</p>
        <ul>
          <li>pH do solo (ideal entre 6.0 e 7.0)</li>
          <li>Níveis de nutrientes (N, P, K)</li>
          <li>Matéria orgânica presente</li>
          <li>Estrutura e drenagem do solo</li>
        </ul>

        <h2>Preparação Física</h2>
        <p>A preparação física envolve:</p>
        <ol>
          <li>Limpeza da área, removendo entulhos e plantas invasoras</li>
          <li>Aração do solo até 30cm de profundidade</li>
          <li>Correção da drenagem se necessário</li>
          <li>Criação de canteiros elevados em áreas com encharcamento</li>
        </ol>

        <h2>Enriquecimento do Solo</h2>
        <p>Para enriquecer o solo, adicione:</p>
        <ul>
          <li>Compostagem orgânica (2-3 kg por m²)</li>
          <li>Esterco curtido (1-2 kg por m²)</li>
          <li>Calcário se o pH estiver muito ácido</li>
          <li>Húmus de minhoca para melhorar a estrutura</li>
        </ul>

        <h2>Dicas Importantes</h2>
        <p>Lembre-se sempre de:</p>
        <ul>
          <li>Fazer a preparação no início do período chuvoso</li>
          <li>Aguardar 15 dias após a adubação para plantar</li>
          <li>Manter o solo sempre úmido, mas não encharcado</li>
          <li>Proteger o solo preparado da erosão</li>
        </ul>
      `
    },
    '2': {
      titulo: 'Espécies Nativas do Cerrado',
      autor: 'Botânico João Silva',
      tempo: '12 min leitura',
      categoria: 'Espécies Nativas',
      conteudo: `
        <h2>O Bioma Cerrado</h2>
        <p>O Cerrado é o segundo maior bioma do Brasil, caracterizado por sua rica biodiversidade e espécies adaptadas ao clima tropical seco.</p>
        
        <h2>Árvores Nativas Recomendadas</h2>
        <h3>Ipê Amarelo (Tabebuia alba)</h3>
        <p>Árvore de médio porte, conhecida por suas flores amarelas vibrantes. Ideal para sombreamento e atração de polinizadores.</p>
        
        <h3>Pequi (Caryocar brasiliense)</h3>
        <p>Árvore frutífera nativa, importante fonte de alimento para a fauna local e comunidades tradicionais.</p>
        
        <h3>Buriti (Mauritia flexuosa)</h3>
        <p>Palmeira de grande porte que indica presença de água no subsolo. Excelente para recuperação de áreas úmidas.</p>
        
        <h2>Arbustos e Plantas Baixas</h2>
        <ul>
          <li>Candeia (Eremanthus erythropappus)</li>
          <li>Barbatimão (Stryphnodendron adstringens)</li>
          <li>Sempre-viva (Comanthera spp.)</li>
        </ul>

        <h2>Época de Plantio</h2>
        <p>O melhor período para plantio no Cerrado é no início da estação chuvosa (outubro-novembro), garantindo água suficiente para o estabelecimento das mudas.</p>
      `
    },
    '3': {
      titulo: 'Sistema de Irrigação por Gotejamento',
      autor: 'Eng. Maria Santos',
      tempo: '6 min leitura',
      categoria: 'Irrigação',
      conteudo: `
        <h2>Vantagens do Gotejamento</h2>
        <p>O sistema de irrigação por gotejamento é uma das formas mais eficientes de irrigar microflorestas, oferecendo:</p>
        <ul>
          <li>Economia de até 50% de água</li>
          <li>Aplicação direta na zona radicular</li>
          <li>Redução de doenças foliares</li>
          <li>Menor crescimento de ervas daninhas</li>
        </ul>

        <h2>Componentes do Sistema</h2>
        <ol>
          <li>Reservatório de água</li>
          <li>Bomba (se necessário)</li>
          <li>Filtros</li>
          <li>Tubulação principal</li>
          <li>Gotejadores</li>
          <li>Timer automático</li>
        </ol>

        <h2>Instalação Passo a Passo</h2>
        <h3>1. Planejamento</h3>
        <p>Desenhe um croqui da área indicando a localização de cada planta e a distribuição das tubulações.</p>
        
        <h3>2. Instalação da Linha Principal</h3>
        <p>Instale a tubulação principal seguindo o perímetro da área, evitando locais de passagem.</p>
        
        <h3>3. Distribuição dos Gotejadores</h3>
        <p>Coloque um gotejador próximo a cada muda, mantendo distância de 20-30cm do caule.</p>

        <h2>Manutenção</h2>
        <ul>
          <li>Limpeza quinzenal dos filtros</li>
          <li>Verificação semanal dos gotejadores</li>
          <li>Ajuste da programação conforme a estação</li>
        </ul>
      `
    }
  };

  const artigo = artigos[id as keyof typeof artigos];

  if (!artigo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => navigate('/guia')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Guia
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <h1>Artigo não encontrado</h1>
              <p>O artigo que você procura não existe.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-puff-sky/20 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/guia')} className="mb-6" variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Guia
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {artigo.tempo}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {artigo.autor}
              </span>
              <span className="bg-puff-green/10 text-puff-green px-2 py-1 rounded">
                {artigo.categoria}
              </span>
            </div>
            <CardTitle className="text-3xl text-puff-green">{artigo.titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
              style={{
                lineHeight: '1.8',
                color: '#374151'
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuiaArtigo;
