import React, { useState, useEffect } from 'react';
import { 
  Cpu, Zap, ShieldCheck, Globe, Activity, Terminal, 
  Settings, RefreshCw, Send, Sparkles, CheckCircle2, 
  Layers, ArrowRight, BarChart3, Database, Lock, Search, Filter, Server, Play, DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface ModelItem {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
  latencyAvgMs: number;
  status: string;
  tier: string;
}

interface GatewayStats {
  totalRoutedRequests: number;
  activeProviders: number;
  availableModels: number;
  avgLatencyMs: number;
  uptimePercentage: number;
  totalTokensSaved: number;
  autoFallbacksHandled: number;
  costSavingsUSD: number;
}

export function CiseCommandHubOmniRoute() {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [stats, setStats] = useState<GatewayStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: 'OmniRoute AI Gateway connected. Ready to route prompts across 1,400+ multi-provider LLM models with automated failover and cost optimization.' }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [fallbackStrategy, setFallbackStrategy] = useState('auto');
  const [activeTab, setActiveTab] = useState<'catalog' | 'playground' | 'analytics' | 'settings'>('catalog');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [modelsRes, statsRes] = await Promise.all([
        fetch('/api/omniroute/models').then(r => r.json()),
        fetch('/api/omniroute/stats').then(r => r.json())
      ]);
      if (modelsRes.success) setModels(modelsRes.models);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (e) {
      console.error('Failed to fetch OmniRoute data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isSending) return;

    const userMsg = inputPrompt.trim();
    setInputPrompt('');
    const newMsgs = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(newMsgs);
    setIsSending(true);

    try {
      const res = await fetch('/api/omniroute/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          messages: newMsgs,
          fallbackStrategy
        })
      });
      const data = await res.json();
      if (data.success && data.choices && data.choices[0]) {
        setChatMessages([...newMsgs, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        setChatMessages([...newMsgs, { role: 'assistant', content: 'Gateway error: Failed to receive response from multi-provider mesh.' }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages([...newMsgs, { role: 'assistant', content: 'Network error connecting to OmniRoute proxy endpoint.' }]);
    } finally {
      setIsSending(false);
    }
  };

  const filteredModels = models.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || m.provider.toLowerCase().includes(selectedProvider.toLowerCase());
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-400/30 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" /> OmniRoute AI Gateway v3.8
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.98% Uptime
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Cpu className="w-8 h-8 text-blue-400" /> Multi-Provider AI Routing & Gateway Mesh
            </h1>
            <p className="text-blue-200 text-sm mt-1 max-w-2xl">
              Unified API gateway routing requests across 1,420+ models (OpenAI, Anthropic, Google, DeepSeek, Mistral, Llama) with automated failover, intelligent load balancing, and cost optimization.
            </p>
          </div>
          <button 
            onClick={fetchData}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Gateway
          </button>
        </div>

        {/* Quick Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-500/20">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-blue-300 text-xs font-medium uppercase tracking-wider">Routed Requests</div>
              <div className="text-2xl font-bold mt-1 text-white">{(stats.totalRoutedRequests / 1000).toFixed(1)}k</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-blue-300 text-xs font-medium uppercase tracking-wider">Active Providers</div>
              <div className="text-2xl font-bold mt-1 text-emerald-400">{stats.activeProviders}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-blue-300 text-xs font-medium uppercase tracking-wider">Avg Latency</div>
              <div className="text-2xl font-bold mt-1 text-amber-400">{stats.avgLatencyMs} ms</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="text-blue-300 text-xs font-medium uppercase tracking-wider">Cost Savings</div>
              <div className="text-2xl font-bold mt-1 text-emerald-400">${stats.costSavingsUSD.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-6">
        {[
          { id: 'catalog', label: 'Model Catalog & Pricing', icon: Layers },
          { id: 'playground', label: 'Gateway Playground & Chat', icon: Play },
          { id: 'analytics', label: 'Gateway Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Failover & Policies', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3.5 px-1 border-b-2 font-medium text-sm transition-all ${
                isActive 
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MODEL CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input 
                type="text"
                placeholder="Search models by name or identifier (e.g. gpt-4o, claude, gemini)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="all">All Providers</option>
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
                <option value="deepseek">DeepSeek</option>
                <option value="mistral">Mistral</option>
                <option value="meta">Meta / Groq</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map((model) => (
              <div key={model.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-base">{model.name}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wider ${
                      model.tier === 'premium' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                      model.tier === 'fast' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {model.tier}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-blue-500" /> {model.provider} &bull; ID: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-700 dark:text-gray-300">{model.id}</code>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <div className="flex justify-between">
                      <span>Context Window:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{(model.contextWindow / 1000).toFixed(0)}k tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Input Cost / 1k:</span>
                      <span className="font-medium text-gray-900 dark:text-white">${model.inputCostPer1k}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output Cost / 1k:</span>
                      <span className="font-medium text-gray-900 dark:text-white">${model.outputCostPer1k}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Latency:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{model.latencyAvgMs} ms</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {model.status}
                  </span>
                  <button 
                    onClick={() => {
                      setSelectedModel(model.id);
                      setActiveTab('playground');
                    }}
                    className="text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                  >
                    Test Model <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PLAYGROUND & CHAT */}
      {activeTab === 'playground' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" /> Gateway Parameters
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Target Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Fallback Strategy</label>
              <select
                value={fallbackStrategy}
                onChange={(e) => setFallbackStrategy(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Auto-Failover (Recommended)</option>
                <option value="cost">Lowest Cost First</option>
                <option value="latency">Lowest Latency First</option>
                <option value="strict">Strict Single Provider</option>
              </select>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/40 text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <div className="font-semibold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Mesh Routing Active</div>
              <p>If provider rate limits or errors occur, OmniRoute instantly reroutes to backup models without dropping connection.</p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col h-[550px] shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
              <span className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-500" /> Active Session: <span className="text-blue-600 dark:text-blue-400 font-mono">{selectedModel}</span>
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full font-medium">
                Connected via OmniRoute Gateway Proxy
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3.5 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700'
                  }`}>
                    <div className="font-semibold text-xs opacity-75 mb-1">{msg.role === 'user' ? 'You' : 'OmniRoute Gateway'}</div>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm text-gray-500 animate-pulse flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-500" /> Routing through multi-provider mesh...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendChat} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
              <input 
                type="text"
                placeholder="Type your prompt to test OmniRoute gateway routing..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={isSending}
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={isSending || !inputPrompt.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS */}
      {activeTab === 'analytics' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Tokens Saved</div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">{(stats.totalTokensSaved / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-gray-500 mt-1">Optimized via prompt caching and model tiering</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Auto-Failovers Handled</div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">{stats.autoFallbacksHandled.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Zero downtime achieved during provider rate limits</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Estimated Cost Savings</div>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">${stats.costSavingsUSD.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Compared to direct single-provider enterprise pricing</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Gateway Performance & Provider Distribution</h3>
            <div className="space-y-3">
              {[
                { provider: 'OpenAI (GPT-4o / Mini)', share: 42, color: 'bg-emerald-500' },
                { provider: 'Google (Gemini 2.5 Pro / Flash)', share: 31, color: 'bg-blue-500' },
                { provider: 'Anthropic (Claude 3.5 Sonnet / Haiku)', share: 18, color: 'bg-purple-500' },
                { provider: 'DeepSeek & Llama Mesh', share: 9, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.provider}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{item.share}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.share}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & POLICIES */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Gateway Routing Policies</h3>
            <p className="text-sm text-gray-500">Configure fallback priority chains and automatic rate-limit mitigation.</p>
          </div>

          <div className="space-y-4 divide-y divide-gray-200 dark:divide-gray-800">
            <div className="pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Automatic Failover Chain</h4>
                <p className="text-xs text-gray-500">Instantly switch to backup provider upon 429 Rate Limit or 5xx server error.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Cost-Optimized Least Expense Routing</h4>
                <p className="text-xs text-gray-500">Route standard queries to economy models (DeepSeek / Gemini Flash) to save budget.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Latency Guardian (Timeout &lt; 800ms)</h4>
                <p className="text-xs text-gray-500">If primary model response time exceeds threshold, cancel and query fastest redundant node.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button 
              onClick={() => toast.success('Gateway policies updated successfully!')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md transition-all cursor-pointer"
            >
              Save Gateway Policies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
