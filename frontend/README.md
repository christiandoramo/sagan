## Passo a passo instalação:::::::

### 1° passo
* Crie uma pasta em seu sistema e clone o repositório lá dentro utilizando ```git clone https://github.com/sagan-ufrpe/frontend-scievents.git```

### 2° passo
* Abra o terminal dentro do projeto, de preferência utilize sempre o Bash ou Zsh. Para windows utilize o do WSL-Ubuntu que é o bash nativo do linux. Instale a versão do nodejs e pnpm (gerenciador de pacote) utilizado no projeto. Lembre-se de **não** utilizar npm! Use **pnpm**

**asdf list nodejs** lista as versões do nodejs que você possui instalado no asdf.
**asdf list pnpm** lista as versões do pnpm que você possui instalado no asdf.

```asdf install nodejs 18.18.2``` (se não tiver instalado essa versão do nodejs no ASDF instale)
```asdf local nodejs 18.18.2``` (seta o nodejs nessa versão no seu projeto)
```asdf install pnpm 8.9.2``` (se não tiver instalado essa versão do pnpm no ASDF instale)
```asdf local pnpm 8.9.2``` (seta o pnpm nessa versão no seu projeto)

### 3° passo
* Instale as dependências do projeto utilizando ```pnpm install```

### 4° passo

* Rode o projeto utilizando ```pnpm run dev```

