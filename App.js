const App = {
  template: `
  <div id="app" class="container1">
    <a id="menu" href ="prepare_upwork_english_spelling_test">Home</a>
    <h1>
      <span>HANGMAN GAME</span>
    </h1>
    <p>Learn words from Upwork 2018 English Spelling Test in game!<p>
    <p>Use the alphabet below to guess the word, or click hint to get a clue. </p>

    <div class="theAbc">
      <ul id="letters">
        <li v-for="item in items" v-bind:class="{ 'removed':item.checked }">
          <!--// 5. Принимаем ввод буквы от игрока -->
          <!--// 7. Убрать использованную букву из алфавита-клавиатуры игры -->
          <button @click="check(item)" v-bind:disabled="item.checked">
            {{ item.text }}
          </button>
        </li>
      </ul>
    </div>


    <p id="categoryTitle"> {{ selectCat }} </p>

    <div id="hold">
      <ul id="my-word">
        <li v-for="gues in arrayOfGuesses">
          {{ gues }}
        </li>
      </ul>
    </div>
    <p id="clue">Clue -<span v-show="showHint"> {{ getHint }} </span></p>

    <componentcanvas
            v-bind:val="lives">
    </componentcanvas>

    <p class="displayLives">{{ comments }} </p>
    <div class="divcontrols">
      <!--// 6. Принимаем ввод запроса подсказки от игрока и отображаем 	подсказку -->
      <button  v-on:click="showHint = !showHint"
        v-bind:title="btnTexts"
        class="controls">
      Hint</i>
      </button>

      <button  @click="start()"
        class="controls">
        Play again</i>
      </button>
    </div>
    <p class="credits"><span>Made with </span> <i class="far fa-smile"></i> & <a href="http://vuejs.org/" target="_blank" ><i class="fab fa-vuejs"></i></a> .</p>
  </div>
  `,

//<script>

// model
  name: 'app',
  components: {
    componentcanvas
  },
  data() {
    // подготовка данных
    // импорт слов и подсказок из data-words.js
    const parsedWords = JSON.parse(data);

    function iterateRec(obj) {
      for (let key in obj) {
        let value = obj[key];

        if (typeof value == "string") {
          // all words to lower case
          obj[key] = obj[key].toLowerCase();
        }

        // detect object
        if (typeof value == "object") {

          // go Recursion
          iterateRec(value);
        }
      }
    }


    let arrTopics = parsedWords.topics;

    iterateRec(arrTopics);

    console.log(arrTopics);

    const alphabet = [
    {text: 'a', checked: false},
    {text: 'b', checked: false},
    {text: 'c', checked: false},
    {text: 'd', checked: false},
    {text: 'e', checked: false},
    {text: 'f', checked: false},
    {text: 'g', checked: false},
    {text: 'h', checked: false},
    {text: 'i', checked: false},
    {text: 'j', checked: false},
    {text: 'k', checked: false},
    {text: 'l', checked: false},
    {text: 'm', checked: false},
    {text: 'n', checked: false},
    {text: 'o', checked: false},
    {text: 'p', checked: false},
    {text: 'q', checked: false},
    {text: 'r', checked: false},
    {text: 's', checked: false},
    {text: 't', checked: false},
    {text: 'u', checked: false},
    {text: 'v', checked: false},
    {text: 'w', checked: false},
    {text: 'x', checked: false},
    {text: 'y', checked: false},
    {text: 'z', checked: false}
    ];

    return {
        items: alphabet,
        arrayOfTopics: arrTopics,
        hints: parsedWords.hints,
        selectedTopic: [],
        word: '',
        arrayOfGuesses: [],
        lives: 10,
        counter: 0,
        space: 0,
        showHint: false
      }
  },
  computed: {
    selectCat: function () {
      if (this.selectedTopic === this.arrayOfTopics[0]) {
        return "The Chosen Category Is The Words for study A-M";
      } else if (this.selectedTopic === this.arrayOfTopics[1]) {
        return "The Chosen Category Is The Words for study N-Z";
      } else if (this.selectedTopic === this.arrayOfTopics[2]) {
        return "The Chosen Category Is Words of context";
      }
    },
    comments: function(){

      // 11. Если счетчик правильно угаданных букв === длине слова Вывести "You Win!" ("Вы выиграли!")
      if (this.counter + this.space === this.arrayOfGuesses.length) {
        return "You Win!";
      }
      // 15. Если количество жизней <1 Вывести "Game Over" ("Игра закончена")
      else if (this.lives < 1){
        return "Game Over";
      } else {
        return "You have " + this.lives + " lives";
      }
    },
    btnTexts: function() {
      return this.showHint ? 'Hide' : 'Show';
    },
    getHint: function() {
      let categoryIndex = this.arrayOfTopics.indexOf(this.selectedTopic);
      let hintIndex = this.selectedTopic.indexOf(this.word);
      if (categoryIndex >= 0 && hintIndex >= 0){
        return this.hints[categoryIndex][hintIndex];
      } else {
      return "error";
      }
    }
  },
  methods: {
    start: function () {
      // 2. Выбрать случайную категорию
      this.selectedTopic = this.arrayOfTopics[Math.floor(Math.random() * this.arrayOfTopics.length)];
      // 3. Выбрать случайное слово
      let wordRand = this.selectedTopic[Math.floor(Math.random() * this.selectedTopic.length)];
      this.word = wordRand;
      console.log(this.word);
      this.buttons();
      // 4. Показать игроку текущее состояние игры
      this.startArrayOfGuesses();
      this.lives = 10;
      this.counter = 0;
      this.space = 0;
      this.showHint = false;
    },
    buttons: function () {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = false;
      }
    },
    startArrayOfGuesses: function () {
      this.arrayOfGuesses = [];
      for (var i = 0; i < this.word.length; i++) {
        if (this.word[i] === "-") {
          this.arrayOfGuesses.push("-");
          this.space = 1;
        } else {
          this.arrayOfGuesses.push("_");
        }
      }
      console.log(this.arrayOfGuesses);
    },
    check: function (item) {
      let guessedLetter = item.text;
      let indexInAbc = this.items.indexOf(item);

      if (indexInAbc >= 0) {
         this.items[indexInAbc].checked = true;
      }

      let j = this.word.indexOf(guessedLetter);
      console.log(j);
      // 8. Если буква в слове есть
      if (j >= 0){
        for (var i = 0; i < this.word.length; i++) {
          if (this.word[i] === guessedLetter) {
            // 9. Увеличить счетчик правильно угаданных букв на 1
            this.counter += 1;
            // 10. Подставить угаданную 	букву
            this.arrayOfGuesses[i] = guessedLetter;
          }
        }
      }
      // 12. Если буквы в слове нет
      else {
      // 13. Уменьшить на 1 количество жизней
      // 14. Дорисовать 1  элемент к «виселице»
        this.lives -= 1;
      }
    }
  },
  mounted() {
    // 1. нач
    this.start();
  },


//</script>
/*
</style>
    <style src="./css/app.css"></style>
</style>
*/
};
