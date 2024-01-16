import {useHttp} from '../hooks/requestHook/http.hook';

const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _apiKey = 'apikey=93dc9b59407c5e263d983f4570eb7621';

const useMarvelService = () => {
    const {request} = useHttp();

    

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        if (!character.description) {
            character.description = 'Missing description';
        };

        if (character.description.length > 215) {
            character.description = character.description.slice(0, 215) + '...';
        };

        if (character.comics === null) {
            character.comics.items += 'comics not found'
        };

        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        };
    };

    return {getCharacter};
};

export default useMarvelService;