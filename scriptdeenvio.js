const csv = require('@fast-csv/parse');
const nodemailer = require('nodemailer');

const senderConfig = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth:{
        user: "insira seu email aqui",
        pass: "insira a sua senha aqui" 
    }
}

const sender = nodemailer.createTransport(senderConfig)

const endEvent = (data) => {

    index = 0

    const send = () => {

        const item = data[index]

        const message = {
            from: "insira seu e-mail aqui",
            subject: `Prezado ${item.nome}, se vc recebeu minha msg, mande uma foto do seu documento`,
            text: "insira sua mensagem aqui ",
            to: item.email,
            attachments: {}
        }

        const isBillet = item.pagamento === 'Boleto'

        message.attachments['filename'] = isBillet ? `adicione o caminho do seu anexo` : `adicione o caminho do seu anexo`
        message.attachments['path']     = isBillet ? `adicione o caminho do seu anexo` : `adicione o caminho do seu anexo`

        sender.sendMail(message, () => {

            console.log(message)
            
                console.log("Email enviado com sucesso.")
                if(index < data.length - 1){
                    index ++
                    setTimeout( ()=> {send()},100)
                
            }
            
        })
    }

    send()
    
}

const readCSV = (fileName) => {

    const dataRows = []

    const parseConfig = {
        objectMode: true,
        headers: true,
        delimiter: ";"
    }

    const dataEvent = data => {dataRows.push(data)}

    csv.parseFile(fileName, parseConfig).on("data", dataEvent).on('end', () => {endEvent(dataRows)})

}

readCSV("insira aqui o caminho do seu arquivo csv")
