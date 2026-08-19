import React, { useState } from 'react';
import { 
  Server, 
  Smartphone, 
  Database, 
  Terminal, 
  Copy, 
  Check, 
  Layers 
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  label: string;
  language: string;
  icon: React.ReactNode;
  code: string;
  description: string;
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'compose',
    label: 'Jetpack Compose UI',
    language: 'kotlin',
    icon: <Smartphone className="w-3.5 h-3.5" />,
    description: 'Declarative Kotlin camera capture and live vector match result display.',
    code: `@Composable
fun LostItemMatchCard(item: LostItemReport, matchScore: Float) {
    Card(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            AsyncImage(model = item.photoUrl, contentDescription = "Item Photo")
            Column(modifier = Modifier.weight(1f).padding(12.dp)) {
                Text(text = item.title, style = MaterialTheme.typography.titleMedium)
                Badge(containerColor = if (matchScore > 0.85f) Green40 else Amber40) {
                    Text("\${(matchScore * 100).toInt()}% Cosine Match")
                }
            }
        }
    }
}`
  },
  {
    id: 'spring',
    label: 'Spring Boot REST Controller',
    language: 'java',
    icon: <Server className="w-3.5 h-3.5" />,
    description: 'Spring Boot 3 API endpoint invoking Gemini 1.5 Flash & MongoDB Atlas Vector Search.',
    code: `@RestController
@RequestMapping("/api/v1/items")
public class ItemVectorMatchingController {

    private final GeminiEmbeddingService geminiService;
    private final MongoVectorSearchRepository vectorRepository;

    @PostMapping("/match")
    public ResponseEntity<List<MatchResult>> findMatches(@RequestParam("file") MultipartFile photo) {
        float[] vector = geminiService.generateMultimodalEmbedding(photo.getBytes());
        List<ItemDocument> candidates = vectorRepository.searchKnnVector(vector, 5);
        return ResponseEntity.ok(MatchResult.fromDocuments(candidates));
    }
}`
  },
  {
    id: 'mongodb',
    label: 'MongoDB Atlas Vector Search',
    language: 'json',
    icon: <Database className="w-3.5 h-3.5" />,
    description: '$vectorSearch aggregation pipeline executing 768-dim k-NN index lookup.',
    code: `[
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "visualEmbedding",
      "queryVector": [0.042, -0.118, 0.891, ... 768 dims],
      "numCandidates": 100,
      "limit": 5
    }
  },
  {
    "$project": {
      "title": 1,
      "location": 1,
      "photoUrl": 1,
      "score": { "$meta": "vectorSearchScore" }
    }
  }
]`
  }
];

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('compose');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = CODE_SNIPPETS.find(s => s.id === activeTab) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-20 md:py-28 bg-[#050508]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0D0B14] text-purple-300 text-xs font-semibold border border-purple-800/50">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Technical Specifications</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Full-Stack Open Architecture
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Clean separation of concerns built with production-grade backend and mobile components.
          </p>
        </div>

        {/* 4 Spec Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-[#0D0B14] border border-purple-900/50 space-y-2">
            <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">Frontend</div>
            <h3 className="font-sans font-bold text-base text-white">Jetpack Compose</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kotlin UI components, Material 3, WorkManager, and CameraX image capture.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D0B14] border border-purple-900/50 space-y-2">
            <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">Backend API</div>
            <h3 className="font-sans font-bold text-base text-white">Spring Boot 3</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Java 21 reactive REST services, JWT security, and Gemini SDK integration.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D0B14] border border-purple-900/50 space-y-2">
            <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">Vector Database</div>
            <h3 className="font-sans font-bold text-base text-white">MongoDB Atlas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-throughput `$vectorSearch` index querying 768-dim vectors in under 120ms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D0B14] border border-purple-900/50 space-y-2">
            <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">Multimodal AI</div>
            <h3 className="font-sans font-bold text-base text-white">Gemini 1.5 Flash</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates joint visual & textual embeddings for fast vector cosine matching.
            </p>
          </div>

        </div>

        {/* Code Drawer */}
        <div className="bg-[#0D0B14] rounded-3xl border border-purple-900/50 overflow-hidden shadow-2xl">
          
          <div className="bg-[#080610] px-6 py-3.5 border-b border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-slate-200">Code Architecture Inspection</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#0D0B14] p-1 rounded-xl border border-purple-900/50">
              {CODE_SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    activeTab === snippet.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {snippet.icon}
                  <span>{snippet.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-2.5 bg-[#0D0B14] border-b border-purple-900/40 flex items-center justify-between text-xs text-slate-400">
            <span>{activeSnippet.description}</span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-purple-400 hover:text-white font-mono text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-6 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed bg-[#050508]">
            <pre><code>{activeSnippet.code}</code></pre>
          </div>

        </div>

      </div>
    </section>
  );
};
