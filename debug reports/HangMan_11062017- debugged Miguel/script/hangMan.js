
var can_play = true;
		var words = new Array("SOURCECODE", "SNAP", "ARTICLE", "PRINCE", "UNDO", 
			"BLOG", "TUTORIALS", "PROGRAMMING", "CODES", "ACHIVE", "REFRESH", "PRETTY");
		
		var to_guess = "";
		var display_word = "";
		var used_letters = "";
		var wrong_guesses = 0;

		function selectLetter(l)
		{

			//check if the user can play or not;
		  if (can_play == false) {
		    return;
		   }
		
		   if (used_letters.indexOf(l) != -1) {
		    return;
		   }
		
		   //adding used letter to the related txtbox
		   used_letters += l;
		   document.game.usedLetters.value = used_letters;
		   document.game[l].value=" ";
		
		  if (to_guess.indexOf(l) != -1) {
		     // correct letter guess
		     var pos = 0;//chack index of word from first letter
		     temp_mask = display_word;
		
		     while (to_guess.indexOf(l, pos) != -1) {
		         pos = to_guess.indexOf(l, pos);
		         end = pos + 1;
		
		         start_text = temp_mask.substring(0, pos);
		         end_text = temp_mask.substring(end, temp_mask.length);
		
		         temp_mask = start_text + l + end_text;
		         pos = end;
		     }//end while
		
		     display_word = temp_mask;
		     document.game.displayWord.value = display_word;
		
		     if (display_word.indexOf("-") == -1) {
		     // won
		     alert("Well done, you have won! The word is: " + to_guess); // DEBUG: Wen you win, alert should show the word. Instead it shows that variable name. Fixed the quotes.
		     can_play = false;
		     }
		   }
		  else {
		     // incortect letter guess
		     wrong_guesses += 1;
		     eval("document.hm.src=\"images/hangman\" + wrong_guesses + \".gif\""); // DEBUG: Quotes not escaped here or otherwise not properly closed

		     if (wrong_guesses == 7) {
		         // lost
		         alert("Sorry, you have lost! Your word was: " + to_guess);
		         can_play = false;
		     } // DEBUG: This if statement wasn't closed
		     
		   }//end else
		   
		  }//end function selectLetter() 

		
		function reset() {
		    for (i = 0; i < 26; i++) {
		  	document.game[i+2].value = document.game[i+2].name; // DEBUG: game[0] and game[1] refer to displayWord and usedLetter elements not to the letters button! Add 2 to index
		  }
		  selectWord();
		  document.game.usedLetters.value = "";
		  used_letters = "";
		  wrong_guesses = 0;
		  document.hm.src="images/hangman0.gif";


		}//end function reset()

		//selecting word from words[](words is an array that's declared at the top)
		function selectWord() {
		  can_play = true;
		  //creating a random number
		  random_number = Math.floor(Math.random() * words.length); /* DEBUG: random number sometimes exceeeds array bounds removed the -1 and changed function from round to floor. 
          Checked that both the first word, sourcecode, and last word, pretty, occur.*/
		  to_guess = words[random_number];
		  // display masked word
		  //call function createMask and sending the length of the selected word to show the number of letters to user
		  masked_word = createMask(to_guess);
		  //put the character "-" for each letter of the words to show the number of the words charachter
		  document.game.displayWord.value = masked_word;
		  display_word = masked_word;
		}//end function selectWord()
		
		//creating "-" 
		function createMask(m) {
		  var mask = "";
		  word_lenght = m.length;
		
		  for (i = 0; i < word_lenght; i ++) {
		    mask += "-"; // DEBUG: was missing the + to concatenate existing string
		  }
		  return mask;
		}//end function createMask()
        