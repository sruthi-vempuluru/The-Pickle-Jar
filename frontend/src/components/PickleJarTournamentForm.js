import React, { useState, useEffect } from 'react';
import { Users, Trophy, Calendar, Shuffle, Sparkles } from 'lucide-react';

export default function PickleJarTournamentForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'SINGLE_ELIM',
    gameType: 'SINGLES',
    startDate: '',
    seeded: false,
    participants: []
  });

  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch players from API on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server did not return JSON. Check CORS configuration.');
        }
        
        const data = await response.json();
        setAvailablePlayers(data);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addPlayer = () => {
    if (selectedPlayerId) {
      const player = availablePlayers.find(p => p.id === parseInt(selectedPlayerId));
      if (player && !formData.participants.some(p => p.id === player.id)) {
        setFormData(prev => ({
          ...prev,
          participants: [...prev.participants, player]
        }));
        setSelectedPlayerId('');
      }
    }
  };

  const removePlayer = (index) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const generateTeamNames = () => {
    alert('AI Team Name Generator coming soon! 🤖🥒');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tournament Data:', formData);
    alert('Tournament created! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-12 px-4" style={{ fontFamily: 'PickleJar, Comic Sans MS, cursive, sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-green-800 mb-2" style={{ fontFamily: 'PickleJar, Comic Sans MS, cursive, sans-serif', textShadow: '3px 3px 0px rgba(34, 197, 94, 0.3)' }}>🥒 The Pickle Jar 🥒</h1>
          <p className="text-green-600 text-xl font-bold" style={{ fontFamily: 'PickleJar, Comic Sans MS, cursive, sans-serif' }}>Drop your tournament in the jar!</p>
        </div>

        <div className="relative">
          {/* Mason Jar Lid - Rounded and wider */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-80 z-10">
            {/* Flat lid top with rounded edges */}
            <div className="relative h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-3xl border-4 border-gray-500 shadow-xl">
              {/* Subtle center line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-500"></div>
            </div>
            {/* Lid band/ring */}
            <div className="h-6 bg-gradient-to-b from-gray-400 to-gray-500 border-l-4 border-r-4 border-b-4 border-gray-600 shadow-lg"></div>
          </div>

          {/* Mason Jar Body - Symmetrical squoval */}
          <div 
            className="bg-gradient-to-b from-blue-100/90 to-blue-200/80 backdrop-blur-sm border-8 border-blue-300 shadow-2xl p-8 pt-16 pb-12 relative overflow-hidden"
            style={{
              borderRadius: '25% 25% 20% 20% / 15% 15% 25% 25%'
            }}
          >
            {/* Glass shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none"
              style={{ borderRadius: '25% 25% 20% 20% / 15% 15% 25% 25%' }}
            ></div>
            
            {/* Brine bubbles */}
            <div className="absolute top-10 right-10 w-4 h-4 bg-blue-300/40 rounded-full"></div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-blue-300/40 rounded-full"></div>
            <div className="absolute bottom-20 left-12 w-5 h-5 bg-blue-300/40 rounded-full"></div>
            <div className="absolute bottom-32 left-20 w-2 h-2 bg-blue-300/40 rounded-full"></div>

            <div className="relative z-10 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <Trophy className="w-5 h-5" />
                  Tournament Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Summer Pickle Showdown"
                  className="w-full px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900 placeholder-green-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                    <Shuffle className="w-5 h-5" />
                    Tournament Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900"
                  >
                    <option value="SINGLE_ELIM">Single Elimination</option>
                    <option value="DOUBLE_ELIM">Double Elimination</option>
                    <option value="ROUND_ROBIN">Round Robin</option>
                    <option value="LADDER">Ladder</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                    <Users className="w-5 h-5" />
                    Game Type
                  </label>
                  <select
                    name="gameType"
                    value={formData.gameType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900"
                  >
                    <option value="SINGLES">Singles</option>
                    <option value="DOUBLES">Doubles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <Calendar className="w-5 h-5" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900"
                />
              </div>

              <div className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border-2 border-green-300">
                <input
                  type="checkbox"
                  name="seeded"
                  id="seeded"
                  checked={formData.seeded}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-green-600 border-green-400 rounded focus:ring-green-300"
                />
                <label htmlFor="seeded" className="text-green-800 font-semibold cursor-pointer">
                  Use Seeded Bracket
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <Users className="w-5 h-5" />
                  Add Players to the Jar
                </label>
                {loading ? (
                  <div className="text-green-600 text-center py-4">Loading players...</div>
                ) : error ? (
                  <div className="text-red-600 text-center py-4">Error: {error}</div>
                ) : (
                  <div className="flex gap-2">
                    <select
                      value={selectedPlayerId}
                      onChange={(e) => setSelectedPlayerId(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900"
                    >
                      <option value="">Select a player...</option>
                      {availablePlayers
                        .filter(player => !formData.participants.some(p => p.id === player.id))
                        .map(player => (
                          <option key={player.id} value={player.id}>
                            {player.displayName}
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      onClick={addPlayer}
                      disabled={!selectedPlayerId}
                      className="px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {formData.participants.length > 0 && (
                <div className="bg-white/70 rounded-2xl p-4 border-3 border-green-300 max-h-64 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-green-800 font-semibold">Pickles in the Jar: {formData.participants.length}</p>
                    {formData.gameType === 'DOUBLES' && (
                      <button
                        type="button"
                        onClick={generateTeamNames}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        AI Team Names
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.participants.map((player, index) => {
                      // Varying shades of pickle green
                      const pickleShades = [
                        { light: 'bg-lime-400', mid: 'bg-green-500', dark: 'bg-green-700' },
                        { light: 'bg-green-400', mid: 'bg-green-600', dark: 'bg-green-800' },
                        { light: 'bg-lime-500', mid: 'bg-green-600', dark: 'bg-green-700' },
                        { light: 'bg-emerald-400', mid: 'bg-emerald-600', dark: 'bg-green-700' },
                        { light: 'bg-green-500', mid: 'bg-green-700', dark: 'bg-green-900' }
                      ];
                      const shadeIndex = index % pickleShades.length;
                      const colors = pickleShades[shadeIndex];
                      
                      return (
                        <div key={index} className="relative group">
                          {/* Pickle shape - rounded rectangle, no curve */}
                          <div className={`relative ${colors.mid} rounded-full px-6 py-3 border-3 border-green-900 shadow-lg transform transition-all hover:scale-105`}>
                            
                            {/* Light stripe on top */}
                            <div className={`absolute top-2 left-4 right-4 h-4 ${colors.light} opacity-60 rounded-full`}></div>
                            
                            {/* Wavy dark stripes - lighter opacity */}
                            <div className="absolute inset-0 overflow-hidden rounded-full">
                              <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path d="M 5 12 Q 20 8, 35 12 T 65 12 T 95 12" stroke={colors.dark === 'bg-green-700' ? '#15803d' : colors.dark === 'bg-green-800' ? '#166534' : '#14532d'} strokeWidth="1.5" fill="none" />
                                <path d="M 5 20 Q 20 16, 35 20 T 65 20 T 95 20" stroke={colors.dark === 'bg-green-700' ? '#15803d' : colors.dark === 'bg-green-800' ? '#166534' : '#14532d'} strokeWidth="1.5" fill="none" />
                                <path d="M 5 28 Q 20 24, 35 28 T 65 28 T 95 28" stroke={colors.dark === 'bg-green-700' ? '#15803d' : colors.dark === 'bg-green-800' ? '#166534' : '#14532d'} strokeWidth="1.5" fill="none" />
                                <path d="M 5 36 Q 20 32, 35 36 T 65 36 T 95 36" stroke={colors.dark === 'bg-green-700' ? '#15803d' : colors.dark === 'bg-green-800' ? '#166534' : '#14532d'} strokeWidth="1.5" fill="none" />
                              </svg>
                            </div>
                            
                            {/* Bumpy texture - small irregular spots */}
                            <div className={`absolute top-2 left-5 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute top-1/3 left-8 w-2 h-2 ${colors.dark} opacity-40 rounded-full`}></div>
                            <div className={`absolute top-1/4 right-8 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute bottom-1/3 left-10 w-2 h-2 ${colors.dark} opacity-40 rounded-full`}></div>
                            <div className={`absolute bottom-1/4 right-6 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute top-1/2 right-10 w-1.5 h-1.5 ${colors.dark} opacity-35 rounded-full`}></div>
                            
                            {/* Player name */}
                            <div className="flex items-center justify-between gap-2 relative z-10">
                              <span className="text-white font-bold text-sm truncate flex-1 drop-shadow-lg">
                                {player.displayName}
                              </span>
                              <button
                                type="button"
                                onClick={() => removePlayer(index)}
                                className="text-white hover:text-red-300 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={formData.participants.length < 2}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-2xl shadow-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {formData.participants.length < 2 
                  ? 'Add at least 2 players' 
                  : 'Create Tournament'}
              </button>
            </div>
          </div>

          {/* Jar Base Shadow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-green-900/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}