import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import characters from './CharacterData';

const NameGuesser = () => {
  const [hint, setHint] = useState('');
  const [guess, setGuess] = useState('');
  const [character, setCharacter] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateHint();
  }, []); 

  const generateHint = () => {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    setCharacter(randomCharacter);
    let hintOptions = [];
    hintOptions.push(`Hint: ${randomCharacter.hint}`);
    hintOptions = hintOptions.filter((hint, index) => hintOptions.indexOf(hint) === index); // Remove duplicate hints
    setHint(hintOptions.join('\n'));
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
  
  
  const refreshHint = () => {
    generateHint();
    setMessage('');
  };

  return (
    <ImageBackground source={require('./onePiece.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('./onePieceLogo.png')} style={styles.logo} />
        <Text style={styles.title}>Guess that Strawhat</Text>
        <Text style={styles.hint}>{hint}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setGuess}
          value={guess}
          placeholder="Enter part of the name"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={checkGuess}>
          <Text style={styles.buttonText}>Guess</Text>
        </TouchableOpacity>
        
        {message !== '' && <Text style={styles.message}>{message}</Text>}
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
    position:'absolute',
    top: 675,
    backgroundColor:'#000',
    padding:10,
  },
  character: {
    marginTop: 10,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFF', 
  },
});

export default NameGuesser;