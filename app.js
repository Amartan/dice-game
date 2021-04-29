var activePlayer = 0;
var scores = [0, 0];
var roundScore = 0;
var diceDom = document.querySelector(".dice");
var isNewGame;

function newGame() {
    isNewGame = true;
    // Тоглогчийн ээлжийг харуулсан хувьсагч /1-р тоглогч 0; 2-р тоглогчийг 1 гэж тэмдэглэнэ.
    activePlayer = 0;

    // Тоглогчийн цуглуулан оноог хадгалах хувьсагч
    scores = [0, 0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // Тоглоом эхлэхэд тоглогчдын оноог 0 болгох
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;


    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

    diceDom.style.display = "none";
};

newGame();

// Шоог шидэх эвент листенэр
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (isNewGame === true) {
        // 1-6 хүртэл санамсаргүй нэг тоо гаргаж авна.
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.src = "dice-" + diceNumber + ".png";

        // Буусан тоо нь 1ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
        if (diceNumber !== 1) {
            // 1-ээс ялгаатай тоо буулсан тул тоглогчийн ээлжийн оноог нэмнэ.
            roundScore = roundScore + diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;

        } else {
            // 1 буусан тул тоглогчийн ээлжийг сольж оноог 0 болгоно.
            switchPlayer()
        };
    } else {
        alert("Тоглоом дууссан байна. New game товчийг дарж шинээр эхлэнэ үү.")
    }
});


// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (isNewGame) {
        // Идэвхитэй тоглогч ээлжийн цуглуусан оноог нийт оноод нэмнэ
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // Дэлгэц дээр оноог нь өөрчилнө
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];



        // Уг тоглогч хожсон эсэхийг шалгах
        if (scores[activePlayer] >= 100) {
            isNewGame = false;
            // alert("Тоглогч " + (activePlayer + 1) + " хожлоо.");

            // Тоглогчийн нэрийг Ялагч нэсэн бичгээр сольно.
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            switchPlayer();
        }
    } else {
        alert("Тоглоом дууссан байна. New game товчийг дарж шинээр эхлэнэ үү.")
    }
});

// Тоглогчийн ээлжийг сольдог функц
function switchPlayer() {
    // Ээлжийн оноог 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    // ActivePlayer-ийг сольно
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    // Улаан цэгийг шилжүүлнэ
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // Ээлж солигдох үед шоог алга болгоно
    diceDom.style.display = "none";
};

// Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", newGame);
