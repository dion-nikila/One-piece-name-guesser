import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import characters from './CharacterData';

const NameGuesser = () => {
  const [hint, setHint] = useState('');
  const [guess, setGuess] = useState('');
  const [character, setCharacter] = useState(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [gameOver, setGameOver] = useState(false);
  const [hintDisplayed, setHintDisplayed] = useState(false);
  const [hintsDisplayed, setHintsDisplayed] = useState([]);

  useEffect(() => {
    generateHint();
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); 

  const generateHint = () => {
    if (!gameOver && !hintDisplayed) {
      let randomCharacter;
      do {
        randomCharacter = characters[Math.floor(Math.random() * characters.length)];
      } while (hintsDisplayed.includes(randomCharacter.hint));
      
      setCharacter(randomCharacter);
      setHint(`Hint: ${randomCharacter.hint}`);
      setHintDisplayed(true);
      setHintsDisplayed([...hintsDisplayed, randomCharacter.hint]);

      if (hintsDisplayed.length === characters.length) {
        setGameOver(true);
      }
    }
  };

  const checkGuess = () => {
    if (!character) {
      setMessage('Please generate a hint first.');
      return;
    }
  
    if (!guess.trim()) {
      setMessage('Please enter a guess.');
      return;
    }
  
    const guessedWord = guess.trim().toLowerCase();
    const characterWords = character.name.toLowerCase().split(' ');
    const correctGuess = characterWords.some(word => word.includes(guessedWord));
  
    if (correctGuess) {
      setMessage('Congratulations! You guessed the character!');
      setScore(score + 1);
      setHintDisplayed(false);
      generateHint();
    } else {
      setMessage('Sorry! Wrong guess. Try again.');
    }
    setGuess('');
  };  

  const restartGame = () => {
    setTimeLeft(60);
    setScore(0);
    setGameOver(false);
    setHintsDisplayed([]);
    generateHint();
  };

  return (
    <ImageBackground source={require('./onePiece.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('./onePieceLogo.png')} style={styles.logo} />
        <Text style={styles.title}>Guess that Strawhat</Text>
        <Text style={styles.score}>Score: {score}</Text>
        {!gameOver && <Text style={styles.timer}>Time Left: {timeLeft} seconds</Text>}
        <Text style={styles.hint}>{hint}</Text>
        {!gameOver && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setGuess}
              value={guess}
              placeholder="Enter part of the name"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              editable={!gameOver}
            />
            <TouchableOpacity style={styles.button} onPress={checkGuess} disabled={gameOver}>
              <Text style={styles.buttonText}>Guess</Text>
            </TouchableOpacity>
            {message !== '' && <Text style={styles.message}>{message}</Text>}
          </>
        )}
        {gameOver && (
          <>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.finalScore}>Final Score: {score}</Text>
            <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
              <Text style={styles.buttonText}>Restart Game</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 20,
    paddingBottom:120,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF', 
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  timer: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FFC300', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', 
  },
  hint: {
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#FFF', 
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF', 
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFC300',
    backgroundColor:'#000',
    padding:10,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  finalScore: {
    fontSize: 20,
    marginBottom: 20,
    color: '#FFF',
  },
  restartButton: {
    backgroundColor: '#FFC300', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default NameGuesser;
