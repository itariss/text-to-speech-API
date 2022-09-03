const textArea = document.querySelector("#enterText");

let voiceList = document.querySelector("#enterVoice");

let speechBtn = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = true;

const getVoicesList = () => {
	for (let voice of synth.getVoices()) {
		console.log(voice.name);
		let option = document.createElement("option");
		option.text = voice.name;
		voiceList.appendChild(option);
		console.log(option);
	}
};

synth.addEventListener("voiceschanged", getVoicesList);

const textToSpeech = text => {
	let utterance = new SpeechSynthesisUtterance(text);

	for (let voice of synth.getVoices()) {
		if ((voice.name = voiceList.value)) {
			utterance.voice = voice;
		}
	}

	speechSynthesis.speak(utterance);
};

speechBtn.addEventListener("click", event => {
	event.preventDefault();
	if (textArea.value != "") {
		if (!synth.speaking) {
			textToSpeech(textArea.value);
		}
	}
	if (textArea.value.length > 80) {
		if (isSpeaking) {
			synth.resume();
			isSpeaking = false;
			speechBtn.textContent = "Pause Speech";
		} else {
			synth.pause();
			isSpeaking = true;
			speechBtn.textContent = "Resume Speech";
		}

		setInterval(() => {
			if (!synth.speaking && !isSpeaking) {
				isSpeaking = true;
				speechBtn.textContent = "Convert to Speech";
			}
		});
	} else {
		speechBtn.textContent = "Play Speech";
	}
});
