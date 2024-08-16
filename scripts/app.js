const app = Vue.createApp({
    data() {
        return {
            randomFact: '',
            weatherCity: 'London, Ontario',
            weatherData: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: '',
            word: '',
            dictionaryData: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            }
        };
    },
    mounted() {
        this.fetchRandomFact();
        this.fetchWeather();
    },
    methods: {
        async fetchRandomFact() {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
            const data = await response.json();
            this.randomFact = data.text;
        },
        async fetchWeather() {
            const location = this.city || 'London Ontario';
            const response = await fetch(`https://goweather.herokuapp.com/weather/London%20Ontario`);
            const data = await response.json();
            this.weatherCity = location;
            this.weatherData = {
                temperature: data.temperature,
                wind: data.wind,
                description: data.description
            };
        },
        async fetchDefinition() {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle`);
            const data = await response.json();
            const entry = data[0];
            this.dictionaryData = {
                word: entry.word,
                phonetic: entry.phonetic || '',
                partOfSpeech: entry.meanings[0].partOfSpeech || '',
                definition: entry.meanings[0].definitions[0].definition || ''
            };
        }
    }
});

app.mount('#app');
