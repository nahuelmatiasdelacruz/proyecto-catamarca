const generateBody = (name,hash) => {
    const bodyMail = `
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                *{
                    font-family: 'Montserrat', sans-serif;
                }
                body{
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100vh;
                }
                .main{
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .header, .footer{
                    width: 100%;
                    background-color: #337ab7;
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                }
                img{
                    width: 60%;
                    box-sizing: border-box;
                }
                .main-content{
                    height: 85%;
                    margin: 0;
                }
                .footer{
                    margin: 0;
                    bottom: 0;
                }
                .title{
                    color: #337ab7;
                    text-align: center;
                }
                p{
                    margin-top: 20px;
                }
                a{
                    text-align: center;
                    text-transform: uppercase;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="main-content">
                <header class="header">
                    <img src="http://138.219.43.175/logo_catamarca.png" alt="Logo Catamarca"/>
                </header>
                <main class="main">
                    <h2 class="title">Hola ${name}</h2>
                    <p>Gracias por registrarte en la aplicación, para completar el registro, haga click en el siguiente enlace y genere su contraseña:</p>
                    <p>Recuerde que su usuario es su numero de CUIL</p>
                    <a href="http://138.219.43.175/confirmarregistro?$hash=${hash}">Confirmar registro</a>
                </main>
            </div>
            <footer class="footer">
                <img src="http://138.219.43.175/logo_trabajo.png" alt="Logo Catamarca"/>
            </footer>
        </body>
    `
    return bodyMail;
}

module.exports = {generateBody}