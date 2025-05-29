# CineFlow

Bem-vindo ao **CineFlow**! Sua plataforma definitiva para descobrir filmes, assistir trailers e explorar o vasto universo cinematográfico. Com uma interface limpa, moderna e focada na experiência do usuário, o CineFlow é o seu novo guia para o cinema.

## Sobre o Projeto

O CineFlow é uma aplicação web React que permite aos usuários:

* **Descobrir filmes populares e em cartaz:** Navegue por uma vasta coleção de títulos.
* **Pesquisar filmes:** Encontre qualquer filme usando a barra de busca e filtros avançados.
* **Visualizar detalhes completos:** Acesse sinopses, informações do elenco, trailers e muito mais.
* **Design responsivo:** Desfrute de uma experiência consistente em dispositivos móveis, tablets e desktops.

Este projeto foi desenvolvido utilizando a API do TMDB (The Movie Database) para fornecer dados atualizados e abrangentes sobre filmes.

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **JavaScript:** Linguagem de programação principal.
* **HTML5:** Estrutura da página.
* **CSS3:** Estilização da interface, com ênfase em **CSS Modules** ou **Tailwind CSS** para modularidade e responsividade.
* **Axios / Fetch API:** Para requisições HTTP à API do TMDB.
* **React Router DOM:** Para gerenciamento de rotas na aplicação.
* **Google Fonts (Poppins):** Para uma tipografia limpa e moderna.

## Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (ou Yarn) instalados em seu ambiente.

### 1. Clonar o Repositório

```bash
git clone https://github.com/Eduarrda7444/cineflow.git
cd cineflow
```

### 2. Instalar as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar a API Key

O projeto utiliza a API do TMDB. Você precisará de uma chave de API para que os dados dos filmes sejam carregados.

* Crie um arquivo `.env` na raiz do projeto.
* Adicione sua chave de API do TMDB a este arquivo, conforme o exemplo:

    ```
    REACT_APP_TMDB_API_KEY=cf6ec6ffbab96b9197ffb9188ffaa4
    ```

    (A chave `cf6ec6ffbab96b9197ffb9188ffaa4` já foi fornecida e pode ser usada diretamente, mas a prática recomendada é usar variáveis de ambiente.)

### 4. Iniciar a Aplicação

```bash
npm start
# ou
yarn start
```

A aplicação será aberta automaticamente no seu navegador padrão em `http://localhost:3000`.

## Cores e Design System

O CineFlow segue um design system rigoroso para garantir consistência e uma estética profissional:

* **Fundo principal:** `#121212`
* **Cards e containers:** `#1E1E1E`
* **Destaques e botões:** `#0466C8`
* **Textos principais:** `#E0E0E0`
* **Textos secundários:** `#9E9E9E`
* **Fonte:** Poppins (Google Fonts)
* **Responsividade:** Otimizado para mobile (320px), tablet (768px) e desktop (1024px+).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
