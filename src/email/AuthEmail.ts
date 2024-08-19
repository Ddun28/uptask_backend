import { transpoter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : IEmail ) => {
      const infor =  await transpoter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta<p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}">Confirmar cuenta</a>
                <p>E ingresa el codigo:  <b>${user.token}</b></p>
                <p>Este token expira en 10 min</p>
            `
        })
    }

    static sendPasswordResetToken = async (user : IEmail ) => {
        const infor =  await transpoter.sendMail({
              from: 'UpTask <admin@uptask.com>',
              to: user.email,
              subject: 'UpTask - Restablece tu password',
              text: 'UpTask - Confirma tu cuenta',
              html: `<p>Hola: ${user.name}, has solicitado restablecer tu password<p>
                  <p>Visita el siguiente enlace:</p>
                  <a href="${process.env.FRONTEND_URL}/auth/new-password">Confirmar cuenta</a>
                  <p>E ingresa el codigo:  <b>${user.token}</b></p>
                  <p>Este token expira en 10 min</p>
              `
          })
      }
}