import {computed, onMounted, ref} from 'vue';
import {GameStatus, type Pokemon, type PokemonResponseInterface} from '@/features/pokemon/interfaces';
import {pokemonApi} from '@/features/pokemon/api/pokemonApi';
import confetti from 'canvas-confetti';
import type {BoardInterface} from '@/features/pokemon/interfaces/board.interface';

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pointBoard = ref<BoardInterface>({
        correct: 0,
        wrong: 0,
    });
    const pokemons = ref<Pokemon[]>([]);
    const pokemonsOptions = ref<Pokemon[]>([]);
    const isLoading = computed(() => pokemons.value.length === 0);
    const getPokemon = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonResponseInterface>('/?limit=500');
        return response.data.results.map((pokemon) => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                id: +id,
                name: pokemon.name
            };
        }).sort(() => Math.random() - 0.5);
    };

    const randomPokemon = computed(() => {
        return pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)];
    });

    const getNextRoundOptions = (howMany: number = 10) => {
        gameStatus.value = GameStatus.Playing;
        pokemonsOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
    };

    const resetGame = async () => {
        pokemons.value = [];
        pokemonsOptions.value = [];
        gameStatus.value = GameStatus.Playing;
        pointBoard.value = {
            correct: 0,
            wrong: 0,
        };
        await getResponseMethods();
    };

    const checkAnswer = (id: number) => {
        if (randomPokemon.value.id === id) {
            gameStatus.value = GameStatus.Won;
            pointBoard.value.correct++;
            showConfetti();
        } else {
            gameStatus.value = GameStatus.Lost;
            pointBoard.value.wrong++;
        }
    };

    const showConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6}
        });
    };

    onMounted(async () => {
        await getResponseMethods();
    });

    const getResponseMethods = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pokemons.value = await getPokemon();
        getNextRoundOptions();
    };

    return {
        gameStatus,
        pointBoard,
        isLoading,
        pokemonsOptions,
        randomPokemon,
        getNextRoundOptions,
        checkAnswer,
        resetGame,
    };
};
