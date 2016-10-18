const findWord = function(msg, word) {
	for(let i = 0; i < msg.length; ++i){
		for(let j = i; j < word.length + i; ++j){
			if(msg[j] === word[j - i]){
				if(j-i === word.length - 1){
				return true;
				}
			}
			else {
				break;
			}
		}
	}
	return false;
}
const firstAnswerToClient = function(msg) {
  let answer = '';
  if(findWord(msg, 'restaurant') || findWord(msg, 'cafe')){
    answer = 'What cuisine do you like?';
  }else if(findWord(msg, 'what\'s up') || findWord(msg, 'hey') || findWord(msg, 'hello') || findWord(msg, 'hi')){
		answer = 'Hello! My name is Siranush, and I\'m your assistant!';
  }else if(findWord(msg, 'how are you?')){
		answer = 'I feel good, thank you!';
	}else if(findWord(msg, 'kill')){
		answer = 'Do not kill anybody pls!';
	}else{
		answer = 'I can\'t understand you :(((';
	}
  return answer;
}
const restaurantAnswerToClient = function(msg) {
	console.log('second');
	let answer = '';
	if(findWord(msg, 'armenian')){
		answer = 'Barev! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=armenian+restaurants+in+yerevan';
	}else if(findWord(msg, 'georgian')){
		answer = 'Gamarjoba! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=georgian+restaurants+in+yerevan';
	}else if(findWord(msg, 'russian')){
		answer = 'Zdorova! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=russian+restaurants+in+yerevan';
	}else if(findWord(msg, 'fast') && findWord(msg, 'food')){
		answer = 'It\'s bad for your health! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=fastfood+restaurants+in+yerevan';
	}else if(findWord(msg, 'chinese')){
		answer = 'Nǐ hǎo! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=chinese+restaurants+in+yerevan';
	}else if(findWord(msg, 'japanese')){
		answer = 'Kon\'nichiwa! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=japanese+restaurants+in+yerevan';
	}else if(findWord(msg, 'indian')){
		answer = 'Namaste! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=indian+restaurants+in+yerevan';
	}else if(findWord(msg, 'mexican')){
		answer = 'Hola! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=mexican+restaurants+in+yerevan';
	}else if(findWord(msg, 'italian')){
		answer = 'Ciao! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=italian+restaurants+in+yerevan';
	}else if(findWord(msg, 'brazilian')){
		answer = 'RIO2016! Okay, this what I found in Google! https://www.google.com/#newwindow=1&q=brazilian+restaurants+in+yerevan';
	}else{
		answer = 'ahhhhh, I don\'t understand you :((';
	}
	return answer;
}
export {findWord, firstAnswerToClient, restaurantAnswerToClient}
