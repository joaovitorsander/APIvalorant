CREATE TYPE tipo_partida AS ENUM (
  'amistoso',
  'eliminatoria',
  'final',
  'semifinal',
  'quartas de final',
  'oitavas de final',
  'showmatch',
  'qualificatória',
  'treino'
);


-- TABELA Usuarios
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome_de_usuario VARCHAR(255),
    nick_usuario VARCHAR(255),
    imagem_perfil BYTEA,
    senha VARCHAR(255),
    data_registro DATE
);

-- TABELA Mapas
CREATE TABLE Mapas (
    mapa_id SERIAL PRIMARY KEY,
    nome_do_mapa VARCHAR(255),
    descricao TEXT,
    imagem_mapa BYTEA,
    data_lancamento DATE,
    map_pool BOOLEAN
);

-- TABELA Times
CREATE TABLE Times (
    time_id SERIAL PRIMARY KEY,
    nome_time VARCHAR(255),
    sigla_time VARCHAR(10),
    imagem_time BYTEA,
    Observacao TEXT,
    data_registro DATE
);

-- TABELA Camp
CREATE TABLE Camp (
    camp_id SERIAL PRIMARY KEY,
    time_id INTEGER REFERENCES Times(time_id),
    premiacao VARCHAR(255),
    organizacao VARCHAR(255),
    nome_camp VARCHAR(255),
    edicao VARCHAR(50),
    formato VARCHAR(50),
    data_inicio_camp DATE
);

-- TABELA Jogadores_Times
CREATE TABLE Jogadores_Times (
    jogador_time_id SERIAL PRIMARY KEY,
    jogador_id INTEGER REFERENCES Usuarios(usuario_id),
    time_id INTEGER REFERENCES Times(time_id),
    data_associacao DATE,
    data_desligamento DATE,
    funcao VARCHAR(50),
    situacao VARCHAR(50), --Se ele está treinando, criando conteúdo, férias, etc.
    reserva BOOLEAN --1 True, 0 False
);

-- TABELA Partidas
CREATE TABLE Partidas (
    partida_id SERIAL PRIMARY KEY,
    mapa_id INTEGER REFERENCES Mapas(mapa_id),
    camp_id INTEGER REFERENCES Camp(camp_id),
    time_id_1 INTEGER REFERENCES Times(time_id),
    time_id_2 INTEGER REFERENCES Times(time_id),
    duracao VARCHAR(50),
    data_da_partida DATE,
    rounds_time_1 INTEGER,
    rounds_time_2 INTEGER,
    observacao tipo_partida
);

-- TABELA Agentes
CREATE TABLE Agentes (
    agente_id SERIAL PRIMARY KEY,
    nome_agente VARCHAR(255),
    sexo VARCHAR(10),
    habilidade1 VARCHAR(255),
    habilidade2 VARCHAR(255),
    habilidade3 VARCHAR(255),
    ultimate VARCHAR(255)
);

-- TABELA Estatisticas_do_jogador
CREATE TABLE Estatisticas_do_jogador (
    estat_jog_id SERIAL PRIMARY KEY,
    jog_id INTEGER REFERENCES Usuarios(usuario_id),
    partida_id INTEGER REFERENCES Partidas(partida_id),
    agente_id INTEGER REFERENCES Agentes(agente_id),
    kills INTEGER,
    mortes INTEGER,
    assistencias INTEGER,
    plants INTEGER,
    defuses INTEGER
);