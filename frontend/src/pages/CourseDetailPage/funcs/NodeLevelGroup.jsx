export function NodeLevelGroup(missions) {
  // Сортируем элементы по абсолютному значению node_level
  const sortedMissions = missions.sort((a, b) => {
    const absA = Math.abs(a.node_level);
    const absB = Math.abs(b.node_level);
    return absA - absB;
  });

  // Группируем по node_level (только положительные значения)
  const result = [];
  const levelMap = new Map();

  sortedMissions.forEach(mission => {
    const absLevel = Math.abs(mission.node_level);
    
    if (!levelMap.has(absLevel)) {
      levelMap.set(absLevel, {
        node_level: absLevel,
        missions: []
      });
      result.push(levelMap.get(absLevel));
    }
    
    levelMap.get(absLevel).missions.push(mission);
  });

  return result;
}