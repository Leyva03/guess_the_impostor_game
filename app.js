document.addEventListener('DOMContentLoaded', () => {
    let wordList = [];
    let assignedWords = [];
  
    // Cargar palabras desde el archivo words.txt
    fetch('./words.txt')
      .then((response) => response.text())
      .then((data) => {
        wordList = data.split('\n').map(word => word.trim());
      });
  
    // Iniciar juego
    document.getElementById('startGame').addEventListener('click', () => {
      const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
      if (numPlayers < 1 || numPlayers > 10) {
        alert('Número de jugadores no válido.');
        return;
      }
  
      createGameBoard(numPlayers);
      assignWords(numPlayers);
    });
  
    // Función para crear las casillas
    function createGameBoard(numPlayers) {
      const gameBoard = document.getElementById('gameBoard');
      gameBoard.innerHTML = '';  // Limpiar el tablero anterior
      for (let i = 0; i < numPlayers; i++) {
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');
        casilla.dataset.index = i;
        casilla.textContent = '?';
        casilla.addEventListener('click', () => showWord(i));
        gameBoard.appendChild(casilla);
      }
    }
  
    // Función para asignar palabras e impostor
    function assignWords(numPlayers) {
      assignedWords = [];
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const impostorIndex = Math.floor(Math.random() * numPlayers);
      for (let i = 0; i < numPlayers; i++) {
        assignedWords.push(i === impostorIndex ? 'Impostor' : randomWord);
      }
    }
  
    // Función para mostrar la palabra de la casilla
    function showWord(index) {
      const selectedWord = assignedWords[index];
      alert(`La palabra es: ${selectedWord}`);
      assignedWords[index] = null;  // Vaciar la casilla después de usarla
      document.querySelectorAll('.casilla')[index].textContent = '';  // Vaciar visualmente
    }
  });
  