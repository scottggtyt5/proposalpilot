'use client';

export function RaceTrackAnimation() {
  const competitors = [
    { name: 'QuickProp', time: '30s', color: 'from-primary to-accent' },
    { name: 'PandaDoc', time: '8m 30s', color: 'from-gray-600 to-gray-500' },
    { name: 'Proposify', time: '12m 15s', color: 'from-gray-600 to-gray-500' },
    { name: 'Manual Process', time: '45m', color: 'from-gray-600 to-gray-500' },
  ];

  return (
    <div className="space-y-6">
      {competitors.map((competitor, index) => (
        <div key={competitor.name} className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{competitor.name}</span>
            <span className={`font-bold ${index === 0 ? 'text-primary' : 'text-gray-400'}`}>
              {competitor.time}
            </span>
          </div>

          <div className="h-12 bg-dark-card border border-dark-border rounded-lg overflow-hidden relative">
            {/* Track background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-bg/50" />

            {/* Progress bar */}
            <div
              className={`h-full bg-gradient-to-r ${competitor.color} rounded-lg transition-all duration-1000 ease-out ${
                index === 0 ? 'w-full' : index === 1 ? 'w-1/6' : index === 2 ? 'w-1/10' : 'w-1/20'
              }`}
              style={{
                animation: index === 0 ? 'none' : undefined,
              }}
            />

            {/* Label inside bar */}
            <div className="absolute inset-0 flex items-center px-4">
              <div className="text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition">
                {competitor.time}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-primary/10 border border-primary/50 rounded-lg">
        <p className="text-sm text-primary font-semibold text-center">
          🚀 QuickProp is <span className="text-accent">18x faster</span> than the manual process
        </p>
      </div>
    </div>
  );
}
