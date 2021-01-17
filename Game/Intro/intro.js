(function(){
    // Default game state
    const DEFAULT_STATE = {
      bubblePoolSize: 50,
      entrySpeed: 0.5,
      increaseScoreBy: 10,
      score: 0,
      lives: 3,
      bubbles: null,
      bubbleTimer: null,
      gameTimer: null,
    };
    
    // The actual game state is populated when the game starts
    let state = {};
    
    // Game elements
    const scoreboard = document.querySelector('#scoreboard');
    const startScreen = document.querySelector('#start-screen');
    const gameOverScreen = document.querySelector('#gameover-screen');
    const scoreEl = document.querySelectorAll('#scoreboard > span')[0];
    const livesEl = document.querySelectorAll('#scoreboard > span')[1];
    
    // Bubble counter
    let bubbleNum = 0;
    
    // Returns the calculated viewport width
    const getViewportWidth = function() {
      return parseInt(getComputedStyle(document.body, null).width, 10);
    };
    
    // Returns a random number between min and max
    const randomNumber = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    
    // Updates the scoreboard
    const updateScoreboard = function(newScore) {
      const { score, lives } = state;
  
      // If we aren't dead, update the score
      if(lives > 0) {
        if(scoreboard.classList.contains('hide')) {
          scoreboard.classList.toggle('hide');
        }
        
        // Update the scoreboard
        state.score += (typeof newScore === 'number') ? newScore : state.increaseScoreBy;
        scoreEl.textContent = state.score;
        
        // Update lives
        livesEl.innerHTML = "&hearts;".repeat(state.lives);
      } else {
        scoreboard.classList.toggle('hide');
      }
      
      if(!livesEl.classList.contains('blink') && state.lives <= 2 && state.lives >= 1) {
        livesEl.classList.add('blink');
      } else {
        livesEl.classList.remove('blink');
      }
    };
    
    const popBubble = function() {
      const bubbleIndex = state.bubbles.indexOf(event.target);
      const bubble = state.bubbles[bubbleIndex];
      
      replaceBubble(bubble, bubbleIndex);
      updateScoreboard();
    };
    
    // const createBubble = function() {
    //   const bubbleImage    = 'https://openclipart.org/download/209693/food-tiny-bubble.svg';
    //   const bubbleSpeed    = randomNumber(8, 16);
    //   const bubbleSize     = randomNumber(45, getViewportWidth() / 5);
    //   const bubblePosition = randomNumber(0 - (bubbleSize / 2), getViewportWidth() - bubbleSize/2 - 120);
      
    //   const bubble = document.createElement('img');
    //   bubble.src = bubbleImage;
    //   bubble.setAttribute('draggable', false);
    //   bubble.setAttribute('id', `bubble-${bubbleNum}`);
    //   bubble.style.width = `${bubbleSize}px`;
    //   bubble.style.left = `${bubblePosition}px`;
    //   bubble.style.animation = `floatUp ${bubbleSpeed}s linear 1, wobble ${randomNumber(4, 12)}s ease-in-out alternate`;
      
    //   // Add a click event
    //   bubble.addEventListener('click', popBubble, true);
      
    //   bubbleNum++;
      
    //   return bubble;
    // };
    
    // const replaceBubble = function(bubble, index) {
    //   // Remove from the DOM
    //   bubble.parentNode.removeChild(bubble);
      
    //   // Remove event listener
    //   bubble.removeEventListener('click', popBubble, true);
      
    //   // Remove from the bubbles array and replace with a new bubble
    //   state.bubbles.splice(index, 1, createBubble());
    // };
    
    // const updateBubblePositions = function() {
    //   if(state.bubbles) {
    //     state.bubbles = state.bubbles.map(bubble => {
    //       const bubbleSize = bubble.style.width;
    //       const bubblePosition = randomNumber(0 - (bubbleSize / 2), getViewportWidth() - bubbleSize/2 - 120);
    //       bubble.style.left = `${bubblePosition}px`;
  
    //       return bubble;
    //     });
    //   }
    // };
    
    const initGame = function() {
      state = Object.assign({}, DEFAULT_STATE);
      updateScoreboard(0);
      
      if(!startScreen.classList.contains('hide')){
        startScreen.classList.add('hide');
      }
      
      if(!gameOverScreen.classList.contains('hidden')) {
        gameOverScreen.classList.remove('dialogue');
        gameOverScreen.classList.add('hidden');
      }
      
      // Bubble pool to store/recycle bubble elements
      state.bubbles = new Array(DEFAULT_STATE.bubblePoolSize);
      
      // Populate the array of bubbles
      for(let i=0; i < state.bubbles.length; i++){
        state.bubbles[i] = createBubble();
      }
    };
    
    const startGame = function() {
      // Set the initial game state
      initGame();
      
      // Display bubbles on the screen
      let i = 0;
      state.bubbleTimer = setInterval(() => {
        i = i >= state.bubbles.length ? 0 : i;
        document.body.appendChild(state.bubbles[i]);
        i++;
      }, state.entrySpeed * 1000);
      
      // Check if bubbles have left the screen and recycle them into the bubbles array
      state.gameTimer = setInterval(() => {
        state.bubbles.forEach((bubble, index) => {
          if(bubble && parseInt(bubble.style.width, 10) + parseInt(getComputedStyle(bubble, null).top, 10) <= 0) {
            replaceBubble(bubble, index);
            
            // Remove a life
            state.lives--;
            updateScoreboard(state.score);
            
            if(state.lives <= 0) {
              endGame();
            }
          }
        });
      }, 60);
    };
    
    const endGame = function() {
      clearInterval(state.bubbleTimer);
      clearInterval(state.gameTimer);
      
      state.bubbleTimer = null;
      state.gameTimer = null;
      
      state.bubbles.forEach(function(bubble) {
        // Remove from the DOM
        if(bubble.parentNode) {
          bubble.parentNode.removeChild(bubble);
        }
        
        // Remove event listener
        bubble.removeEventListener('click', popBubble, true);
      });
      
      state.bubbles = null;
      
      gameOverScreen.classList.toggle('hidden');
      gameOverScreen.classList.toggle('dialogue');
    };
    
    document.querySelector('#startGame').addEventListener('click', startGame);
    document.querySelector('#tryAgain').addEventListener('click', startGame);
    window.addEventListener('resize', updateBubblePositions);
    
    // This hides the address bar for mobile devices
    window.addEventListener('load', () => {
      setTimeout(function(){
        window.scrollTo(0, 1);
      }, 1);
    }, false);
  }());