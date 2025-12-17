import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Link, Lock, Eye, TrendingUp, Zap, Info } from 'lucide-react';

export default function PhishingDetector() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ checked: 0, blocked: 0 });

  useEffect(() => {
    const savedStats = localStorage.getItem('phishing-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const analyzeURL = (inputUrl) => {
    const factors = [];
    let riskScore = 0;

    // Length analysis
    if (inputUrl.length > 75) {
      factors.push({ name: 'Unusually long URL', risk: 'high', points: 25 });
      riskScore += 25;
    } else if (inputUrl.length > 54) {
      factors.push({ name: 'Moderately long URL', risk: 'medium', points: 15 });
      riskScore += 15;
    }

    // HTTPS check
    if (!inputUrl.startsWith('https://')) {
      factors.push({ name: 'No HTTPS encryption', risk: 'high', points: 30 });
      riskScore += 30;
    }

    // IP address in URL
    const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipPattern.test(inputUrl)) {
      factors.push({ name: 'Contains IP address', risk: 'high', points: 35 });
      riskScore += 35;
    }

    // Special characters count
    const specialChars = (inputUrl.match(/[@\-_]/g) || []).length;
    if (specialChars > 5) {
      factors.push({ name: 'Excessive special characters', risk: 'medium', points: 20 });
      riskScore += 20;
    }

    // Subdomain count
    const subdomains = (inputUrl.match(/\./g) || []).length;
    if (subdomains > 3) {
      factors.push({ name: 'Multiple subdomains', risk: 'medium', points: 15 });
      riskScore += 15;
    }

    // Suspicious keywords
    const suspiciousKeywords = ['login', 'verify', 'account', 'update', 'secure', 'banking', 'confirm'];
    const foundKeywords = suspiciousKeywords.filter(kw => inputUrl.toLowerCase().includes(kw));
    if (foundKeywords.length > 0) {
      factors.push({ name: `Suspicious keywords: ${foundKeywords.join(', ')}`, risk: 'medium', points: 20 });
      riskScore += 20;
    }

    // URL shorteners
    const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly'];
    if (shorteners.some(s => inputUrl.includes(s))) {
      factors.push({ name: 'URL shortener detected', risk: 'medium', points: 15 });
      riskScore += 15;
    }

    // Homograph attack detection
    const suspiciousChars = /[а-яА-Я]/; // Cyrillic characters
    if (suspiciousChars.test(inputUrl)) {
      factors.push({ name: 'Potential homograph attack', risk: 'high', points: 30 });
      riskScore += 30;
    }

    let status, message, color;
    if (riskScore >= 60) {
      status = 'High Risk';
      message = 'This URL shows strong indicators of phishing. Avoid clicking!';
      color = 'red';
    } else if (riskScore >= 30) {
      status = 'Medium Risk';
      message = 'This URL has some suspicious characteristics. Proceed with caution.';
      color = 'yellow';
    } else {
      status = 'Low Risk';
      message = 'This URL appears relatively safe, but always stay vigilant.';
      color = 'green';
    }

    return { status, message, color, riskScore, factors };
  };

  const handleCheck = () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      const analysis = analyzeURL(url);
      setResult(analysis);
      setLoading(false);
      
      const newStats = {
        checked: stats.checked + 1,
        blocked: stats.blocked + (analysis.riskScore >= 60 ? 1 : 0)
      };
      setStats(newStats);
      localStorage.setItem('phishing-stats', JSON.stringify(newStats));
    }, 1200);
  };

  const exampleUrls = [
    'https://www.google.com',
    'http://accounts-verification-security-update.com/login',
    'https://192.168.1.1/admin/login.php',
    'https://paypal.security.verify-account-now.tk/signin'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Shield className="w-20 h-20 text-purple-400" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-50"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            PhishShield AI
          </h1>
          <p className="text-xl text-gray-300">Advanced URL Security Scanner</p>
          <p className="text-sm text-gray-400 mt-2">Protect yourself from phishing attacks with AI-powered analysis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">URLs Checked</p>
                <p className="text-3xl font-bold text-purple-400">{stats.checked}</p>
              </div>
              <Eye className="w-10 h-10 text-purple-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Threats Blocked</p>
                <p className="text-3xl font-bold text-red-400">{stats.blocked}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Protection Rate</p>
                <p className="text-3xl font-bold text-green-400">
                  {stats.checked > 0 ? Math.round((stats.blocked / stats.checked) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Scanner */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Link className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold">Scan URL for Threats</h2>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                placeholder="Enter URL to scan (e.g., https://example.com)"
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 text-lg"
              />
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleCheck}
              disabled={loading || !url.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Scan Now
                </>
              )}
            </button>
          </div>

          {/* Example URLs */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm">Try examples:</span>
            {exampleUrls.map((exUrl, idx) => (
              <button
                key={idx}
                onClick={() => setUrl(exUrl)}
                className="text-sm px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                {exUrl.length > 40 ? exUrl.substring(0, 40) + '...' : exUrl}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl animate-in fade-in duration-500">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${
                result.color === 'red' ? 'bg-red-500/20' :
                result.color === 'yellow' ? 'bg-yellow-500/20' : 'bg-green-500/20'
              }`}>
                {result.color === 'red' ? <AlertTriangle className="w-8 h-8 text-red-400" /> :
                 result.color === 'yellow' ? <Info className="w-8 h-8 text-yellow-400" /> :
                 <CheckCircle className="w-8 h-8 text-green-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-2xl font-bold ${
                    result.color === 'red' ? 'text-red-400' :
                    result.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {result.status}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    result.color === 'red' ? 'bg-red-500/20 text-red-300' :
                    result.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    Risk Score: {result.riskScore}/100
                  </span>
                </div>
                <p className="text-gray-300">{result.message}</p>
              </div>
            </div>

            {/* Risk Score Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Risk Level</span>
                <span>{result.riskScore}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    result.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    result.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                  style={{ width: `${result.riskScore}%` }}
                ></div>
              </div>
            </div>

            {/* Risk Factors */}
            {result.factors.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Detected Risk Factors
                </h4>
                <div className="space-y-3">
                  {result.factors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          factor.risk === 'high' ? 'bg-red-400' :
                          factor.risk === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <span className="text-gray-200">{factor.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        factor.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                        factor.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        +{factor.points} risk
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.factors.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No significant risk factors detected!</p>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">🛡️ How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-purple-400 mb-1">URL Length Analysis</p>
              <p>Phishing URLs are often abnormally long to hide malicious intent</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-1">HTTPS Verification</p>
              <p>Checks for secure connection encryption</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-1">Suspicious Patterns</p>
              <p>Detects IP addresses, excessive subdomains, and special characters</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-1">Keyword Detection</p>
              <p>Identifies common phishing keywords like 'verify', 'login', 'update'</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}