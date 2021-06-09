const fs = require('fs');
const csv = require('@fast-csv/parse');
var nodemailer = require('nodemailer');



var dataArr = [];


csv.parseFile("Boletos.csv", {
  objectMode: true,
  headers: true,
  delimiter: ";"
  })
.on("data", data => {
  dataArr.push(data);
})
.on("end", () => {
  printa();
  
});

const printa = () =>{

      
  var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth:{
        user: "insira seu email",
        pass: "insira a sua senha" }
    });
    

dataArr.forEach( item => {

    var emailASerEnviado = {
        from: "email do remetente",
        to: item.email,
        subject: `Prezado ${item.nome}, se vc recebeu minha msg, mande uma foto do seu documento`,
        text: "insira sua mensagem aqui ",
              
      }
        if (item.pagamento == 'Boleto'){    
              emailASerEnviado['attachments'] = [
                      {   // utf-8 string as an attachment
                          filename: `${item.matricula}.pdf`,
                          path: `${item.matricula}.pdf`
                      },
            ] 
        } else {
           emailASerEnviado['attachments'] = [
                      {   // utf-8 string as an attachment
                          filename: `insira o nome do seu arquivo caso debito`,
                          path: `insira aqui o PATH do anexo caso seja debito`
                      },
            ] 
        }




    remetente.sendMail(emailASerEnviado, function(error){
        if (error) {
        console.log(error);
        } else {
        console.log("Email enviado com sucesso.");
        }
        });

    })

    
}














