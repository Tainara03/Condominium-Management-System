
FRONT -> ROUTERS -> CONTROLLER -> SERVICE -> REPOSITORY
                                                ↑
                                            INTERFACES

- FRONT faz uma request por meio do endereço HTTP 

- ROUTES indica qual CONTROLLER deve ser chamado baseado no endereço da request e chama o CONTROLLER.

- CONTROLLER descompacta a request e chama o SERVICE responsável

- SERVICE aplica as regras de negócio e decide o que vai ser feito no banco chamando o REPOSITORY para isso

- REPOSITORY utiliza as INTERFACES para utilizar o banco de dados as alterações necessárias e devolve a resposta

- SERVICE devolve ao CONTROLLER uma resposta que pode ser nada, um erro ou a resposta do banco

- CONTROLLER recebe a resposta do service e devolve a resposta com um códgio HTTP e o corpo da respota.

