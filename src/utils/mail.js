import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com", // TODO:
        },
    });

    const emailPlainText = mailGenerator.generatePlaintext(
        options.mailgenContent,
    );

    const emailHTML = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: "maiil.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailPlainText,
        html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error(
            "Email service failed silently. Make sure that you have provided your MAILTRAP credentials in .env file",
        );
        console.error("ERROR: ", error);
    }
};

const emailVerificationMailgenContent = (username, verificationURL) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we're excited to have you on board.",
            action: {
                instructions:
                    "To verify your email please click on the following button",
                button: {
                    color: "#24a0ed",
                    text: "Verify your email",
                    link: verificationURL,
                },
            },
            outro: "Need help or have questions? Just reply to this email, we would love to help.",
        },
    };
};

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account.",
            action: {
                instructions:
                    "To reset your password click on the following button or link",
                button: {
                    color: "#24a0ed",
                    text: "Reset password",
                    link: passwordResetURL,
                },
            },
            outro: "Need help or have questions? Just reply to this email, we would love to help.",
        },
    };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail,
};
