import card from './card.js'

const app = new Vue({
    el: '#app',
    data: {
        //首頁設定
        headerSetting: {
            mainImg: './images/722.png',
            subImg: './images/bottomRight.png'
        },
        //寶可夢資料
        pokemonData: {
            pokemonRequestUrl: 'https://raw.githubusercontent.com/jacko1114/Homeworks/main/Pokemon/js/pokemons.json',//資料來源
            pokemonArray: [], //放所有寶可夢資料
            cardArray: [], //渲染在畫面上的寶可夢資料
            currentPokemon: {  //儲存 Model 上要渲染的寶可夢資料
                index: '',
                id: '',
                name: '',
                hp: '',
                attack: '',
                defense: '',
                sp_attack: '',
                sp_defense: '',
                speed: '',
                img: '',
                type: '',
                evolution: '',
                genus: ''
            }
        },
        // Page活動設定
        pageSetting: {
            index: 0
        }
    },
    created() {  //Vue生命週期 - 創建完成(可以訪問this實體)
        this.getPokemonData()
    },
    methods: {
        getPokemonData() {  //把所有寶可夢資料拉下來
            axios.get(this.pokemonData.pokemonRequestUrl)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200 && res.data.length != 0) {
                        this.pokemonData.pokemonArray = res.data.map((item, index) => ({
                            index: index,
                            id: item.id.toString().padStart(3, '0'),
                            name: item.name.chinese,
                            hp: item.base.HP,
                            attack: item.base.Attack,
                            defense: item.base.Defense,
                            sp_attack: item.base['Sp_Attack'],
                            sp_defense: item.base['Sp_Defense'],
                            speed: item.base.Speed,
                            img: `http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, "0")}.png`,
                            type: item.type,
                            evolution: item.evolution,
                            genus: item.genus
                        }))
                    }
                })
                .catch((error) => { console.warn(error) })
        },
        addAllCards() {  //加入全部卡片
            this.pokemonData.cardArray = this.pokemonData.pokemonArray
        },
        showPokemon(index) { //把要渲染到model上的資料加到 currentPokemon
            this.pokemonData.currentPokemon = this.pokemonData.pokemonArray[index]
        },
        addOneCard() { //加入一張卡片
            if(this.pageSetting.index > this.pokemonData.pokemonArray.length -1) return //防呆
            this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[this.pageSetting.index])
            this.pageSetting.index++
        },
        removeOneCard() {  //移除一張卡片
            if(this.pageSetting.index == 0 ) return //防呆
            this.pokemonData.cardArray.splice(this.pageSetting.index - 1, 1)
            this.pageSetting.index--
        },
        resetCard() { //重置
            this.pokemonData.cardArray = []
            this.pageSetting.index = 0
        }
    },
    components:{
        'pokemon-card': card
    }
})