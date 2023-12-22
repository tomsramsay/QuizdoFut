// Sample questions and answers
const questions = [
    {
        question: "Qual país sediou a Copa do Mundo de 1950, onde o Brasil sofreu a famosa derrota no Maracanã?",
        choices: ["Alemanha", "Brasil", "Uruguai", "Argentina"],
        correctAnswer: "Brasil"
    },
    {
        question: "Quem é o maior artilheiro da história da Liga dos Campeões da UEFA?",
        choices: ["Cristiano Ronaldo", "Lionel Messi", "Raúl González", "Robert Lewandowski"],
        correctAnswer: "Cristiano Ronaldo"
    },
    {
        question: "Em que ano a França sediou e venceu a Copa do Mundo pela primeira vez?",
        choices: ["1998", "1986", "1978", "1966"],
        correctAnswer: "1998"
    },
    {
        question: "Qual clube inglês possui o recorde de mais títulos na Primeira Divisão do futebol inglês?",
        choices: ["Arsenal", "Liverpool", "Manchester United", "Chelsea"],
        correctAnswer: "Liverpool"
    },
    {
        question: "Quem é o único jogador a ter conquistado a Bola de Ouro em oito ocasiões?",
        choices: ["Lionel Messi", "Cristiano Ronaldo", "Zinedine Zidane", "Pelé"],
        correctAnswer: "Lionel Messi"
    },
    {
        question: "Em que país surgiu o futebol moderno, com a fundação da Football Association (FA) em 1863?",
        choices: ["Inglaterra", "Brasil", "Uruguai", "Itália"],
        correctAnswer: "Inglaterra"
    },
    {
        question: "Quem é o único jogador a ter vencido a Liga dos Campeões da UEFA com três clubes diferentes?",
        choices: ["Cristiano Ronaldo", "Lionel Messi", "Andrés Iniesta", "Clarence Seedorf"],
        correctAnswer: "Clarence Seedorf"
    },
    {
        question: "Em que ano o Brasil conquistou sua primeira Copa do Mundo de futebol?",
        choices: ["1954", "1962", "1958", "1970"],
        correctAnswer: "1958"
    },
    {
        question: "Qual é o único clube a ter vencido a tríplice coroa (Liga Nacional, Copa Nacional e Liga dos Campeões da UEFA) na temporada 2018-2019?",
        choices: ["Manchester City", "Bayern de Munique", "Barcelona", "Liverpool"],
        correctAnswer: "Liverpool"
    },
    {
        question: "Quem foi o técnico da seleção brasileira na conquista da Copa do Mundo de 2002?",
        choices: ["Luiz Felipe Scolari", "Carlos Alberto Parreira", "Tite", "Dunga"],
        correctAnswer: "Luiz Felipe Scolari"
    },
    {
        question: "Qual é o jogador com mais participações em Copas do Mundo, com cinco edições disputadas?",
        choices: ["Pelé", "Diego Maradona", "Miroslav Klose", "Cafu"],
        correctAnswer: "Miroslav Klose"
    },
    {
        question: "Qual país europeu foi o campeão da Copa do Mundo de 1966?",
        choices: ["Itália", "Alemanha Ocidental", "Inglaterra", "França"],
        correctAnswer: "Inglaterra"
    },
    {
        question: "Quem é o único jogador a ter vencido a Bola de Ouro antes dos 20 anos de idade?",
        choices: ["Lionel Messi", "Pelé", "Cristiano Ronaldo", "Michael Owen"],
        correctAnswer: "Michael Owen"
    },
    {
        question: "Qual seleção sul-americana venceu a Copa América de 2015?",
        choices: ["Brasil", "Argentina", "Chile", "Uruguai"],
        correctAnswer: "Chile"
    },
    {
        question: "Quem é o único goleiro a ter vencido o prêmio de Melhor Jogador do Mundo da FIFA?",
        choices: ["Gianluigi Buffon", "Iker Casillas", "Manuel Neuer", "Lev Yashin"],
        correctAnswer: "Lev Yashin"
    },
    // Add more questions...
];

let currentQuestion = 0;
let score = 0;
let answerSelected = false; // Variable to track whether an answer has been selected

function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.textContent = questions[currentQuestion].question;
    choicesElement.innerHTML = "";

    const choicesContainer = document.createElement('div'); // Create a container for the buttons
    choicesElement.appendChild(choicesContainer);

    // Center the container
    choicesContainer.style.width = '100%';
    choicesContainer.style.textAlign = 'center';

    questions[currentQuestion].choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;

        // Set your desired width and center the buttons using margin
        button.style.width = '80%'; // Adjust the width as needed
        button.style.margin = '0 auto'; // Center the button horizontally
        button.style.marginBottom = '10px';
        button.style.padding = '15px';
        button.style.fontSize = '16px';

        button.dataset.correctAnswer = questions[currentQuestion].correctAnswer;

        button.addEventListener('click', handleButtonClick);
        choicesContainer.appendChild(button);
    });
}

function handleButtonClick(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = event.target.dataset.correctAnswer;

    if (!answerSelected) {
        answerSelected = true; // Mark that an answer has been selected

        const resultContainer = document.getElementById('result-container');
        resultContainer.style.display = 'block';

        const resultImg = document.getElementById('result-img');
        const resultAudio = document.getElementById('result-audio');

        const buttons = document.querySelectorAll('#choices button');
        buttons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = 'green';
            } else {
                button.style.backgroundColor = 'white'; // Reset other buttons
            }
        });

        if (selectedAnswer === correctAnswer) {
            resultImg.src = 'correct.jpg';
            resultAudio.src = 'correct.m4a';
            score++;
        } else {
            resultImg.src = 'incorrect.jpg';
            resultAudio.src = 'incorrect.m4a';
        }

        resultAudio.play()
            .then(() => {
                console.log('Audio played successfully');
                // Wait for a short duration before allowing the user to proceed
                setTimeout(() => {
                    resultContainer.style.display = 'none'; // Hide the result container
                    nextQuestion();
                }, 3000); // Delay for 2 seconds before moving to the next question
            })
            .catch(error => console.error('Error playing audio:', error));
    }
}

function nextQuestion() {
    answerSelected = false; // Reset the answer selection for the next question

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'none';

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showCongratulations();
    }
}

function showCongratulations() {
    const congratulationsContainer = document.getElementById('congratulations');
    congratulationsContainer.style.display = 'block';

    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Sua pontuação: ${score} de ${questions.length}`;
}

