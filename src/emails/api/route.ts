import { Resend } from 'resend';
import emailSolicitacao from '../emailSolicitacao';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'halycia.of@sempreceub.com',
        subject: 'Hello World',
        react: emailSolicitacao(emailSolicitacao.PreviewProps)
    });

    return NextResponse.json({
        status: 'Ok'
    })
}