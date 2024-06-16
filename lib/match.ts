export function dividePlayers(arr, ranking) {
  const test = arr
    .map((x) => {
      return {
        player: x,
        rank: ranking[x] ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => a.rank - b.rank);

  const half = Math.ceil(test.length / 2);

  const firstHalf = test.splice(0, half);
  const secondHalf = test.splice(-half);

  return [firstHalf.map((x) => x.player), secondHalf.map((x) => x.player)];
}

export function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function generateMatchups(array1, array2) {
  let matchups = [];
  let playerMatches = {};

  // Initialize match counts
  array1.forEach((player) => (playerMatches[player] = 0));
  array2.forEach((player) => (playerMatches[player] = 0));
  const originArray1 = [...array1];
  const originArray2 = [...array2];

  while (true) {
    // Check if all players have played at least 2 matches
    let allPlayersCompleted =
      array1.every((player) => playerMatches[player] >= 2) &&
      array2.every((player) => playerMatches[player] >= 2);

    if (allPlayersCompleted) break;

    // Shuffle the arrays to ensure randomness
    const shuffledArray1 = shuffleArray(array1);
    const shuffledArray2 = shuffleArray(array2);

    let selectedFromArr1 = [];
    let selectedFromArr2 = [];

    // Select 2 players from each array who have played less than 2 matches
    for (
      let i = 0;
      i < shuffledArray1.length && selectedFromArr1.length < 2;
      i++
    ) {
      if (playerMatches[shuffledArray1[i]] < 2) {
        selectedFromArr1.push(shuffledArray1[i]);
      }
    }

    for (
      let i = 0;
      i < shuffledArray2.length && selectedFromArr2.length < 2;
      i++
    ) {
      if (playerMatches[shuffledArray2[i]] < 2) {
        selectedFromArr2.push(shuffledArray2[i]);
      }
    }

    // If there are not enough players, fill the rest with any available players
    if (selectedFromArr1.length < 2) {
      const randomPlayerArray = shuffleArray([...originArray1]);
      selectedFromArr1.push(
        ...randomPlayerArray.slice(selectedFromArr1.length, 2)
      );
    }

    if (selectedFromArr2.length < 2) {
      const randomPlayerArray = shuffleArray([...originArray2]);
      selectedFromArr2.push(
        ...randomPlayerArray.slice(selectedFromArr2.length, 2)
      );
    }

    // Create the matchup
    const team1 = [selectedFromArr1[0], selectedFromArr2[0]];
    const team2 = [selectedFromArr1[1], selectedFromArr2[1]];

    // Add the matchup to the list
    matchups.push(`${team1[0]}&${team1[1]} vs ${team2[0]}&${team2[1]}`);

    // Update match counts
    playerMatches[team1[0]]++;
    playerMatches[team1[1]]++;
    playerMatches[team2[0]]++;
    playerMatches[team2[1]]++;
    const minMatchCount = Math.min(...Object.values(playerMatches));

    array1 = originArray1.filter((x) => playerMatches[x] <= minMatchCount);
    array2 = originArray2.filter((x) => playerMatches[x] <= minMatchCount);
  }

  return matchups;
}
