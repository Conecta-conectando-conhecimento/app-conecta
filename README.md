# PI-Conecta
Projeto integrador 3

## Criando ambiente para desenvolvimento do projeto integrador

Antes de mais nada, tenha o git instalado

**Passo 1** -  Crie uma pasta e abra ela no vscode, pois faremos um clone da pasta(repositorio) dentro da pasta que acaba de criar.


**Passo 2** - (Clonagem do Repositorio) - clique no botão escrito code neste respositório, copie o link e faça: " git clone link-do-repositorio "

**Passo 3** - feita a clonagem, você irá para a pasta criada no repositório, da seguinte forma:

 	 cd PI-Conecta

**Passo 4** - após a clonagem, digite o seguinte código no terminal:

	npm install

**Passo 5** - agora você pode mexer tranquilamente no código, após terminar suas alterações faça git add, git commit e git push para salvar as alterações. Da seguinte forma:

	git add .
	git commit -m "Sua mensagem de commit aqui"
	git push origin nome-da-branch

**Passo 6** - Suponhamos que agora você queira levar as alterações para a branch principal, fazendo a integração com os demais códigos. Para isso, primeiro você precisa ir para a branch principal, digitando:

  	git checkout main

Estando na branch principal, digite:

 	 git merge [nome da sua branch]

Agora as alterações realizadas na sua branch foram para a principal. Porém sua branch ainda existe, você pode continuar trabalhando nela normalmente futuramente fazer o merge para atualizar a branch principal.
