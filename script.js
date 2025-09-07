// Componente para mostrar la lista de personajes
const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://rickandmortyapi.com/api/character');
                if (!response.ok) {
                    throw new Error('Error al cargar los personajes');
                }
                const data = await response.json();
                setCharacters(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'green';
            case 'dead':
                return 'red';
            default:
                return 'grey';
        }
    };

    const translateStatus = (status) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'Vivo';
            case 'dead':
                return 'Muerto';
            case 'unknown':
                return 'Desconocido';
            default:
                return status;
        }
    };

    const translateGender = (gender) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return 'Masculino';
            case 'female':
                return 'Femenino';
            case 'genderless':
                return 'Sin género';
            case 'unknown':
                return 'Desconocido';
            default:
                return gender;
        }
    };

    const translateLocation = (location) => {
        const translations = {
            'Earth (C-137)': 'Tierra (C-137)',
            'Earth (Replacement Dimension)': 'Tierra (Dimensión de Reemplazo)',
            'Earth (C-500A)': 'Tierra (C-500A)',
            'Earth (Evil Rick\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick Malvado)',
            'Earth (Unknown dimension)': 'Tierra (Dimensión Desconocida)',
            'Citadel of Ricks': 'Ciudadela de Ricks',
            'Interdimensional Cable': 'Cable Interdimensional',
            'Dimension C-137': 'Dimensión C-137',
            'Dimension 5-126': 'Dimensión 5-126',
            'Dimension J19ζ7': 'Dimensión J19ζ7',
            'Dimension K-83': 'Dimensión K-83',
            'Dimension C-35': 'Dimensión C-35',
            'Dimension C-132': 'Dimensión C-132',
            'Dimension D-99': 'Dimensión D-99',
            'Dimension D716': 'Dimensión D716',
            'Dimension D716-B': 'Dimensión D716-B',
            'Dimension D716-C': 'Dimensión D716-C',
            'Dimension J-22': 'Dimensión J-22',
            'Dimension K-22': 'Dimensión K-22',
            'Dimension 35-C': 'Dimensión 35-C',
            'Post-Apocalyptic Earth': 'Tierra Post-Apocalíptica',
            'Purge Planet': 'Planeta de la Purga',
            'Venzenulon 7': 'Venzenulon 7',
            'Bepis 9': 'Bepis 9',
            'Cronenberg Earth': 'Tierra Cronenberg',
            'Nuptia 4': 'Nuptia 4',
            'Giant\'s Town': 'Ciudad de Gigantes',
            'Bird World': 'Mundo de Aves',
            'St. Gloopy Noops Hospital': 'Hospital St. Gloopy Noops',
            'Anatomy Park': 'Parque de Anatomía',
            'Roy: A Life Well Lived': 'Roy: Una Vida Bien Vivida',
            'Planet Squanch': 'Planeta Squanch',
            'Gear World': 'Mundo de Engranajes',
            'Gromflom Prime': 'Gromflom Prime',
            'Unity\'s Planet': 'Planeta de Unity',
            'Hideout Planet': 'Planeta Escondite',
            'Resort Planet': 'Planeta Resort',
            'Alphabetrium': 'Alfabetrium',
            'Signus 5 Expanse': 'Expansión Signus 5',
            'Pawn Shop Planet': 'Planeta de Casa de Empeños',
            'Mega Gargantuan Kingdom': 'Reino Mega Gigantesco',
            'Pluto': 'Plutón',
            'Fantasy World': 'Mundo de Fantasía',
            'Snuffles\' Dream': 'Sueño de Snuffles',
            'Gazorpazorp': 'Gazorpazorp',
            'Hamster in Butt World': 'Mundo de Hámster en el Trasero',
            'Vindicator\'s Base': 'Base de Vindicadores',
            'Earth (Fascist Dimension)': 'Tierra (Dimensión Fascista)',
            'Earth (Fascist Shrimp Dimension)': 'Tierra (Dimensión Fascista de Camarones)',
            'Earth (Wasp Dimension)': 'Tierra (Dimensión de Avispas)',
            'Earth (Zigerion\'s Base)': 'Tierra (Base de Zigerion)',
            'Earth (Phone Dimension)': 'Tierra (Dimensión de Teléfonos)',
            'Earth (Chair Dimension)': 'Tierra (Dimensión de Sillas)',
            'Earth (Cronenberg Dimension)': 'Tierra (Dimensión Cronenberg)',
            'Earth (Pizza Dimension)': 'Tierra (Dimensión de Pizza)',
            'Earth (Magic Dimension)': 'Tierra (Dimensión Mágica)',
            'Earth (Ricks\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick)',
            'Earth (Testicle Monster Dimension)': 'Tierra (Dimensión de Monstruo Testicular)',
            'Earth (D99)': 'Tierra (D99)',
            'Earth (D716)': 'Tierra (D716)',
            'Earth (D716-B)': 'Tierra (D716-B)',
            'Earth (D716-C)': 'Tierra (D716-C)',
            'Earth (J19ζ7)': 'Tierra (J19ζ7)',
            'Earth (K-83)': 'Tierra (K-83)',
            'Earth (C-35)': 'Tierra (C-35)',
            'Earth (C-132)': 'Tierra (C-132)',
            'Earth (D-99)': 'Tierra (D-99)',
            'Earth (J-22)': 'Tierra (J-22)',
            'Earth (K-22)': 'Tierra (K-22)',
            'Earth (35-C)': 'Tierra (35-C)',
            'Earth (5-126)': 'Tierra (5-126)',
            'Earth (D-99)': 'Tierra (D-99)',
            'Earth (D716)': 'Tierra (D716)',
            'Earth (D716-B)': 'Tierra (D716-B)',
            'Earth (D716-C)': 'Tierra (D716-C)',
            'Earth (J19ζ7)': 'Tierra (J19ζ7)',
            'Earth (K-83)': 'Tierra (K-83)',
            'Earth (C-35)': 'Tierra (C-35)',
            'Earth (C-132)': 'Tierra (C-132)',
            'Earth (J-22)': 'Tierra (J-22)',
            'Earth (K-22)': 'Tierra (K-22)',
            'Earth (35-C)': 'Tierra (35-C)',
            'Earth (Fascist Dimension)': 'Tierra (Dimensión Fascista)',
            'Earth (Fascist Shrimp Dimension)': 'Tierra (Dimensión Fascista de Camarones)',
            'Earth (Wasp Dimension)': 'Tierra (Dimensión de Avispas)',
            'Earth (Zigerion\'s Base)': 'Tierra (Base de Zigerion)',
            'Earth (Phone Dimension)': 'Tierra (Dimensión de Teléfonos)',
            'Earth (Chair Dimension)': 'Tierra (Dimensión de Sillas)',
            'Earth (Cronenberg Dimension)': 'Tierra (Dimensión Cronenberg)',
            'Earth (Pizza Dimension)': 'Tierra (Dimensión de Pizza)',
            'Earth (Magic Dimension)': 'Tierra (Dimensión Mágica)',
            'Earth (Ricks\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick)',
            'Earth (Testicle Monster Dimension)': 'Tierra (Dimensión de Monstruo Testicular)',
            'unknown': 'Desconocido'
        };
        
        return translations[location] || location;
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="ui active centered inline loader"></div>
                <p style={{ marginTop: '20px' }}>Cargando personajes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="character-grid">
            {characters.map((character) => (
                <div 
                    key={character.id} 
                    className="character-card"
                    onClick={() => onCharacterSelect(character)}
                >
                    <img 
                        src={character.image} 
                        alt={character.name}
                        className="character-image"
                    />
                    <div className="character-info">
                        <h3 className="character-name">{character.name}</h3>
                        <div className="character-meta">
                            <span className={`status-${character.status.toLowerCase()}`}>
                                {translateStatus(character.status)}
                            </span>
                        </div>
                        <div className="character-meta">
                            <strong>Especie:</strong> {character.species === 'Human' ? 'Humano' : character.species === 'Alien' ? 'Alienígena' : character.species === 'Humanoid' ? 'Humanoide' : character.species === 'Robot' ? 'Robot' : character.species === 'Animal' ? 'Animal' : character.species === 'Cronenberg' ? 'Cronenberg' : character.species === 'Disease' ? 'Enfermedad' : character.species === 'Poopybutthole' ? 'Culito Cagón' : character.species === 'Mythological Creature' ? 'Criatura Mitológica' : character.species === 'Vampire' ? 'Vampiro' : character.species === 'Parasite' ? 'Parásito' : character.species === 'Bepisian' ? 'Bepisiano' : character.species === 'Gromflomite' ? 'Gromflomita' : character.species === 'Gazorpian' ? 'Gazorpiano' : character.species === 'Zigerion' ? 'Zigerion' : character.species === 'Krootabulan' ? 'Krootabulano' : character.species === 'Bird-Person' ? 'Persona Pájaro' : character.species === 'Birdperson' ? 'Persona Pájaro' : character.species === 'Meeseeks' ? 'Meeseeks' : character.species === 'Squanchy' ? 'Squanchy' : character.species === 'Scary Terry' ? 'Terry el Aterrador' : character.species === 'Fart' ? 'Pedos' : character.species === 'Cromulon' ? 'Cromulon' : character.species === 'Gear-Person' ? 'Persona Engranaje' : character.species === 'Gearperson' ? 'Persona Engranaje' : character.species === 'Snuffles' ? 'Snuffles' : character.species === 'Unity' ? 'Unity' : character.species === 'Revolio Clockberg Jr.' ? 'Revolio Clockberg Jr.' : character.species === 'Floop Floopian' ? 'Floop Floopiano' : character.species === 'Zigerion Scammer' ? 'Estafador Zigerion' : character.species === 'Gazorpazorpian' ? 'Gazorpazorpiano' : character.species === 'Hamster' ? 'Hámster' : character.species === 'Giant' ? 'Gigante' : character.species === 'Microverse' ? 'Microverso' : character.species === 'Miniverse' ? 'Miniverso' : character.species === 'Teenyverse' ? 'Teenyverso' : character.species === 'Tinyverse' ? 'Tinyverso' : character.species === 'unknown' ? 'Desconocido' : character.species}
                        </div>
                        <div className="character-meta">
                            <strong>Género:</strong> {translateGender(character.gender)}
                        </div>
                        <div className="character-meta">
                            <strong>Origen:</strong> {translateLocation(character.origin.name)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Componente para mostrar los detalles de un personaje
const CharacterDetail = ({ character, onBack }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'green';
            case 'dead':
                return 'red';
            default:
                return 'grey';
        }
    };

    const getGenderIcon = (gender) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return '♂';
            case 'female':
                return '♀';
            default:
                return '⚧';
        }
    };

    const translateStatus = (status) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'Vivo';
            case 'dead':
                return 'Muerto';
            case 'unknown':
                return 'Desconocido';
            default:
                return status;
        }
    };

    const translateGender = (gender) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return 'Masculino';
            case 'female':
                return 'Femenino';
            case 'genderless':
                return 'Sin género';
            case 'unknown':
                return 'Desconocido';
            default:
                return gender;
        }
    };

    const translateLocation = (location) => {
        const translations = {
            'Earth (C-137)': 'Tierra (C-137)',
            'Earth (Replacement Dimension)': 'Tierra (Dimensión de Reemplazo)',
            'Earth (C-500A)': 'Tierra (C-500A)',
            'Earth (Evil Rick\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick Malvado)',
            'Earth (Unknown dimension)': 'Tierra (Dimensión Desconocida)',
            'Citadel of Ricks': 'Ciudadela de Ricks',
            'Interdimensional Cable': 'Cable Interdimensional',
            'Dimension C-137': 'Dimensión C-137',
            'Dimension 5-126': 'Dimensión 5-126',
            'Dimension J19ζ7': 'Dimensión J19ζ7',
            'Dimension K-83': 'Dimensión K-83',
            'Dimension C-35': 'Dimensión C-35',
            'Dimension C-132': 'Dimensión C-132',
            'Dimension D-99': 'Dimensión D-99',
            'Dimension D716': 'Dimensión D716',
            'Dimension D716-B': 'Dimensión D716-B',
            'Dimension D716-C': 'Dimensión D716-C',
            'Dimension J-22': 'Dimensión J-22',
            'Dimension K-22': 'Dimensión K-22',
            'Dimension 35-C': 'Dimensión 35-C',
            'Post-Apocalyptic Earth': 'Tierra Post-Apocalíptica',
            'Purge Planet': 'Planeta de la Purga',
            'Venzenulon 7': 'Venzenulon 7',
            'Bepis 9': 'Bepis 9',
            'Cronenberg Earth': 'Tierra Cronenberg',
            'Nuptia 4': 'Nuptia 4',
            'Giant\'s Town': 'Ciudad de Gigantes',
            'Bird World': 'Mundo de Aves',
            'St. Gloopy Noops Hospital': 'Hospital St. Gloopy Noops',
            'Anatomy Park': 'Parque de Anatomía',
            'Roy: A Life Well Lived': 'Roy: Una Vida Bien Vivida',
            'Planet Squanch': 'Planeta Squanch',
            'Gear World': 'Mundo de Engranajes',
            'Gromflom Prime': 'Gromflom Prime',
            'Unity\'s Planet': 'Planeta de Unity',
            'Hideout Planet': 'Planeta Escondite',
            'Resort Planet': 'Planeta Resort',
            'Alphabetrium': 'Alfabetrium',
            'Signus 5 Expanse': 'Expansión Signus 5',
            'Pawn Shop Planet': 'Planeta de Casa de Empeños',
            'Mega Gargantuan Kingdom': 'Reino Mega Gigantesco',
            'Pluto': 'Plutón',
            'Fantasy World': 'Mundo de Fantasía',
            'Snuffles\' Dream': 'Sueño de Snuffles',
            'Gazorpazorp': 'Gazorpazorp',
            'Hamster in Butt World': 'Mundo de Hámster en el Trasero',
            'Vindicator\'s Base': 'Base de Vindicadores',
            'Earth (Fascist Dimension)': 'Tierra (Dimensión Fascista)',
            'Earth (Fascist Shrimp Dimension)': 'Tierra (Dimensión Fascista de Camarones)',
            'Earth (Wasp Dimension)': 'Tierra (Dimensión de Avispas)',
            'Earth (Zigerion\'s Base)': 'Tierra (Base de Zigerion)',
            'Earth (Phone Dimension)': 'Tierra (Dimensión de Teléfonos)',
            'Earth (Chair Dimension)': 'Tierra (Dimensión de Sillas)',
            'Earth (Cronenberg Dimension)': 'Tierra (Dimensión Cronenberg)',
            'Earth (Pizza Dimension)': 'Tierra (Dimensión de Pizza)',
            'Earth (Magic Dimension)': 'Tierra (Dimensión Mágica)',
            'Earth (Ricks\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick)',
            'Earth (Testicle Monster Dimension)': 'Tierra (Dimensión de Monstruo Testicular)',
            'Earth (D99)': 'Tierra (D99)',
            'Earth (D716)': 'Tierra (D716)',
            'Earth (D716-B)': 'Tierra (D716-B)',
            'Earth (D716-C)': 'Tierra (D716-C)',
            'Earth (J19ζ7)': 'Tierra (J19ζ7)',
            'Earth (K-83)': 'Tierra (K-83)',
            'Earth (C-35)': 'Tierra (C-35)',
            'Earth (C-132)': 'Tierra (C-132)',
            'Earth (D-99)': 'Tierra (D-99)',
            'Earth (J-22)': 'Tierra (J-22)',
            'Earth (K-22)': 'Tierra (K-22)',
            'Earth (35-C)': 'Tierra (35-C)',
            'Earth (5-126)': 'Tierra (5-126)',
            'Earth (D-99)': 'Tierra (D-99)',
            'Earth (D716)': 'Tierra (D716)',
            'Earth (D716-B)': 'Tierra (D716-B)',
            'Earth (D716-C)': 'Tierra (D716-C)',
            'Earth (J19ζ7)': 'Tierra (J19ζ7)',
            'Earth (K-83)': 'Tierra (K-83)',
            'Earth (C-35)': 'Tierra (C-35)',
            'Earth (C-132)': 'Tierra (C-132)',
            'Earth (J-22)': 'Tierra (J-22)',
            'Earth (K-22)': 'Tierra (K-22)',
            'Earth (35-C)': 'Tierra (35-C)',
            'Earth (Fascist Dimension)': 'Tierra (Dimensión Fascista)',
            'Earth (Fascist Shrimp Dimension)': 'Tierra (Dimensión Fascista de Camarones)',
            'Earth (Wasp Dimension)': 'Tierra (Dimensión de Avispas)',
            'Earth (Zigerion\'s Base)': 'Tierra (Base de Zigerion)',
            'Earth (Phone Dimension)': 'Tierra (Dimensión de Teléfonos)',
            'Earth (Chair Dimension)': 'Tierra (Dimensión de Sillas)',
            'Earth (Cronenberg Dimension)': 'Tierra (Dimensión Cronenberg)',
            'Earth (Pizza Dimension)': 'Tierra (Dimensión de Pizza)',
            'Earth (Magic Dimension)': 'Tierra (Dimensión Mágica)',
            'Earth (Ricks\'s Target Dimension)': 'Tierra (Dimensión Objetivo de Rick)',
            'Earth (Testicle Monster Dimension)': 'Tierra (Dimensión de Monstruo Testicular)',
            'unknown': 'Desconocido'
        };
        
        return translations[location] || location;
    };

    return (
        <div className="character-detail">
            <button 
                className="back-button"
                onClick={onBack}
            >
                ← Volver a la lista
            </button>
            
            <div style={{ textAlign: 'center' }}>
                <img 
                    src={character.image} 
                    alt={character.name}
                    className="detail-image"
                />
                <h2 className="detail-name">{character.name}</h2>
                <span className={`detail-status ${character.status.toLowerCase()}`}>
                    {translateStatus(character.status)}
                </span>
            </div>

            <div className="ui segment">
                <h3>Información del Personaje</h3>
                <div className="info-list">
                    <div className="info-item">
                        <div className="info-icon">👤</div>
                        <div className="info-content">
                            <div className="info-header">Especie</div>
                            <div className="info-description">{character.species === 'Human' ? 'Humano' : character.species === 'Alien' ? 'Alienígena' : character.species === 'Humanoid' ? 'Humanoide' : character.species === 'Robot' ? 'Robot' : character.species === 'Animal' ? 'Animal' : character.species === 'Cronenberg' ? 'Cronenberg' : character.species === 'Disease' ? 'Enfermedad' : character.species === 'Poopybutthole' ? 'Culito Cagón' : character.species === 'Mythological Creature' ? 'Criatura Mitológica' : character.species === 'Vampire' ? 'Vampiro' : character.species === 'Parasite' ? 'Parásito' : character.species === 'Bepisian' ? 'Bepisiano' : character.species === 'Gromflomite' ? 'Gromflomita' : character.species === 'Gazorpian' ? 'Gazorpiano' : character.species === 'Zigerion' ? 'Zigerion' : character.species === 'Krootabulan' ? 'Krootabulano' : character.species === 'Bird-Person' ? 'Persona Pájaro' : character.species === 'Birdperson' ? 'Persona Pájaro' : character.species === 'Meeseeks' ? 'Meeseeks' : character.species === 'Squanchy' ? 'Squanchy' : character.species === 'Scary Terry' ? 'Terry el Aterrador' : character.species === 'Fart' ? 'Pedos' : character.species === 'Cromulon' ? 'Cromulon' : character.species === 'Gear-Person' ? 'Persona Engranaje' : character.species === 'Gearperson' ? 'Persona Engranaje' : character.species === 'Snuffles' ? 'Snuffles' : character.species === 'Unity' ? 'Unity' : character.species === 'Revolio Clockberg Jr.' ? 'Revolio Clockberg Jr.' : character.species === 'Floop Floopian' ? 'Floop Floopiano' : character.species === 'Zigerion Scammer' ? 'Estafador Zigerion' : character.species === 'Gazorpazorpian' ? 'Gazorpazorpiano' : character.species === 'Hamster' ? 'Hámster' : character.species === 'Giant' ? 'Gigante' : character.species === 'Microverse' ? 'Microverso' : character.species === 'Miniverse' ? 'Miniverso' : character.species === 'Teenyverse' ? 'Teenyverso' : character.species === 'Tinyverse' ? 'Tinyverso' : character.species === 'unknown' ? 'Desconocido' : character.species}</div>
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-icon">⚧</div>
                        <div className="info-content">
                            <div className="info-header">Género</div>
                            <div className="info-description">
                                {getGenderIcon(character.gender)} {translateGender(character.gender)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-icon">🌍</div>
                        <div className="info-content">
                            <div className="info-header">Origen</div>
                            <div className="info-description">{translateLocation(character.origin.name)}</div>
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-icon">📍</div>
                        <div className="info-content">
                            <div className="info-header">Ubicación Actual</div>
                            <div className="info-description">{translateLocation(character.location.name)}</div>
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-icon">📅</div>
                        <div className="info-content">
                            <div className="info-header">Fecha de Creación</div>
                            <div className="info-description">
                                {new Date(character.created).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {character.episode && character.episode.length > 0 && (
                <div className="ui segment">
                    <h3>Episodios</h3>
                    <p>Este personaje aparece en {character.episode.length} episodio(s).</p>
                    <div className="ui bulleted list">
                        {character.episode.slice(0, 5).map((episode, index) => (
                            <div key={index} className="item">
                                Episodio {episode.split('/').pop()}
                            </div>
                        ))}
                        {character.episode.length > 5 && (
                            <div className="item">... y {character.episode.length - 5} más</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Componente principal de la aplicación
const App = () => {
    const [selectedCharacter, setSelectedCharacter] = React.useState(null);

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handleBackToList = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="main-header">Rick and Morty - Personajes</h1>
                
                {selectedCharacter ? (
                    <CharacterDetail 
                        character={selectedCharacter} 
                        onBack={handleBackToList}
                    />
                ) : (
                    <CharacterList onCharacterSelect={handleCharacterSelect} />
                )}
            </div>
        </div>
    );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
