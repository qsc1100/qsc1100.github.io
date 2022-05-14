export default{
    props:{
        pokemon:{
            required:false,
            type:Object,
            default(){
                return{
                    attack:0,
                    defense:0,
                    evolution:[],
                    genus:"小鳥寶可夢",
                    hp:0,
                    id:"016",
                    img:"http://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
                    name:"波波",
                    sp_attack:0,
                    sp_defense:0,
                    speed:0
                }
            }
        }
    },
    template:`
        <div class="col-6 col-md-4 col-lg-3 my-3">
            <div class="card bg-light">
                <div class="card-body p-0">
                    <div class="card-img"> 
                        <img :src="pokemon.img" class="card-img-top"> 
                    </div>
                    <h5 class="card-title rounded bg-dark text-light d-flex p-1 mx-3"> 
                        <span class="pokemon-id pl-2">{{pokemon.id}}</span> 
                        <span>．</span>
                        <span class="pokemon-name">{{pokemon.name}}</span> 
                    </h5>
                </div>
                <div class="card-footer text-center bg-light border-0">
                    <a @click="showPokemon" href="#" data-toggle="modal" data-target=".modal"
                        class="btn btn-secondary">詳細資訊</a>
                </div>
            </div>
        </div>
    `,
    methods:{
        showPokemon(){
            this.$emit('show-modal')
        }
    },
}