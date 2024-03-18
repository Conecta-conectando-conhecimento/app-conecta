CREATE TABLE `conecta`.`usuario` (
  `email` varchar(60) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `nome_completo` varchar(80) NOT NULL,
  `nome_usuario` varchar(45) NOT NULL,
  `data_de_nascimento` date NOT NULL,
  `senha` varchar(45) NOT NULL,
  `campus` varchar(45) DEFAULT NULL,
  `sobre` varchar(300) DEFAULT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`email`)
)