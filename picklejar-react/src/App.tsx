import React, { useState } from 'react';
import { Users, Trophy, Calendar, Shuffle, Sparkles } from 'lucide-react';

interface TournamentForm {
  name: string;
  type: string;
  gameType: string;
  startDate: string;
  seeded: boolean;
  participants: string[];
}

export default function App() {
  const [formData, setFormData] = useState<TournamentForm>({
    name: '',
    type: 'SINGLE_ELIM',
    gameType: 'SINGLES',
    startDate: '',
    seeded: false,
    participants: []
  });

  const [playerName, setPlayerName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addPlayer = () => {
    if (playerName.trim()) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, playerName.trim()]
      }));
      setPlayerName('');
    }
  };

  const removePlayer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const generateTeamNames = () => {
    alert('AI Team Name Generator coming soon! 🤖🥒');
  };

  const handleSubmit = async () => {
    console.log('Tournament Data:', formData);
    
    try {
      const response = await fetch('http://localhost:8080/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Tournament created successfully!');
        console.log('Response:', data);
      } else {
        alert('Error creating tournament');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Tournament created! (Check console - API not connected yet)');
    }
  };

  const pickleShades = [
    { light: 'bg-lime-400', mid: 'bg-green-500', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-green-400', mid: 'bg-green-600', dark: 'bg-green-800', stroke: '#166534' },
    { light: 'bg-lime-500', mid: 'bg-green-600', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-emerald-400', mid: 'bg-emerald-600', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-green-500', mid: 'bg-green-700', dark: 'bg-green-900', stroke: '#14532d' }
  ];

  const getPickleShade = (index: number) => {
    return pickleShades[index % pickleShades.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-green-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif', textShadow: '3px 3px 0px rgba(34, 197, 94, 0.3)' }}>
            🥒 The Pickle Jar 🥒
          </h1>
          <p className="text-green-600 text-xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            Drop your tournament in the jar!
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-80 z-10">
            <div className="relative h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-3xl border-4 border-gray-500 shadow-xl">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-500"></div>
            </div>
            <div className="h-6 bg-gradient-to-b from-gray-400 to-gray-500 border-l-4 border-r-4 border-b-4 border-gray-600 shadow-lg"></div>
          </div>

          <div className="bg-gradient-to-b from-blue-100/90 to-blue-200/80 backdrop-blur-sm rounded-3xl border-8 border-blue-300 shadow-2xl p-8 pt-16 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
            
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Player name"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPlayer())}
                    className="flex-1 px-4 py-3 bg-white/90 border-3 border-green-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 text-green-900 placeholder-green-400"
                  />
                  <button
                    type="button"
                    onClick={addPlayer}
                    className="px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    Add
                  </button>
                </div>
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
                      const colors = getPickleShade(index);
                      
                      return (
                        <div key={index} className="relative group">
                          <div className={`relative ${colors.mid} rounded-full px-6 py-3 border-3 border-green-900 shadow-lg transform transition-all hover:scale-105`}>
                            
                            <div className={`absolute top-2 left-4 right-4 h-4 ${colors.light} opacity-60 rounded-full`}></div>
                            
                            <div className="absolute inset-0 overflow-hidden rounded-full">
                              <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path d="M 5 12 Q 20 8, 35 12 T 65 12 T 95 12" stroke={colors.stroke} strokeWidth="1.5" fill="none" />
                                <path d="M 5 20 Q 20 16, 35 20 T 65 20 T 95 20" stroke={colors.stroke} strokeWidth="1.5" fill="none" />
                                <path d="M 5 28 Q 20 24, 35 28 T 65 28 T 95 28" stroke={colors.stroke} strokeWidth="1.5" fill="none" />
                                <path d="M 5 36 Q 20 32, 35 36 T 65 36 T 95 36" stroke={colors.stroke} strokeWidth="1.5" fill="none" />
                              </svg>
                            </div>
                            
                            <div className={`absolute top-2 left-5 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute top-1/3 left-8 w-2 h-2 ${colors.dark} opacity-40 rounded-full`}></div>
                            <div className={`absolute top-1/4 right-8 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute bottom-1/3 left-10 w-2 h-2 ${colors.dark} opacity-40 rounded-full`}></div>
                            <div className={`absolute bottom-1/4 right-6 w-2 h-2 ${colors.dark} opacity-50 rounded-full`}></div>
                            <div className={`absolute top-1/2 right-10 w-1.5 h-1.5 ${colors.dark} opacity-35 rounded-full`}></div>
                            
                            <div className="flex items-center justify-between gap-2 relative z-10">
                              <span className="text-white font-bold text-sm truncate flex-1 drop-shadow-lg">
                                {player}
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
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-xl rounded-2xl shadow-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {formData.participants.length < 2 
                  ? 'Add at least 2 players' 
                  : '🥒 Create Tournament 🥒'}
              </button>
            </div>
          </div>

          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-green-900/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}