import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";
  
  interface VercelInviteUserEmailProps {
    username?: string;
    userImage?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    teamName?: string;
    teamImage?: string;
    inviteLink?: string;
    inviteFromIp?: string;
    inviteFromLocation?: string;
  }
  
  //const baseUrl = process.env.VERCEL_URL
    //? `https://${process.env.VERCEL_URL}`
    //: "";

    const baseUrl = 'http://localhost:3000';
  
  export const emailSolicitacao = ({
    username,
    userImage,
    invitedByUsername,
    invitedByEmail,
    teamName,
    teamImage,
    inviteLink,
    inviteFromIp,
    inviteFromLocation,
  }: VercelInviteUserEmailProps) => {
    const previewText = `Junte-se a ${invitedByUsername} no Conecta`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src={"src/public/assets/conectaLogo.png"} 
                  width="40"
                  height="37"
                  alt="Conecta"
                  className="my-0 mx-auto"
                />
              </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Junte-se ao time <strong>{teamName}</strong> no <strong>Conecta</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Olá {username},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>{invitedByUsername}</strong> (
                <Link
                  href={`mailto:${invitedByEmail}`}
                  className="text-blue-600 no-underline"
                >
                  {invitedByEmail}
                </Link>
                ) te convidou para o time <strong>{teamName}</strong>.
              </Text>
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      className="rounded-full"
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                  <Column align="center">
                    <Img
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                      height="9"
                      alt="invited you to"
                    />
                  </Column>
                  <Column align="left">
                    <Img
                      className="rounded-full"
                      src={teamImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                </Row>
              </Section>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={inviteLink}
                >
                  Junte-se ao time
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                ou copie e cole esta URL no seu navegador:{" "} 
                <Link href={inviteLink} className="text-blue-600 no-underline">
                  {inviteLink}
                </Link>
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                Este convite é para {" "} 
                <span className="text-black">{username}</span>. Este convite foi enviado por
                <span className="text-black">{inviteFromIp}</span>{" "}
                localizado em {" "}
                <span className="text-black">{inviteFromLocation}</span>. Se você
                não esperava este convite, você pode ignorar este e-mail. Se
                você está preocupado com a segurança da sua conta, responda a
                este e-mail para entrar em contato conosco.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  emailSolicitacao.PreviewProps = {
    username: "alanturing",
    /*userImage: `${baseUrl}/static/vercel-user.png`,*/
    userImage: './public/assets/FotoPerfilTelaTeste.png',
    invitedByUsername: "Alan",
    invitedByEmail: "alan.turing@example.com",
    teamName: "Enigma",
    teamImage: `${baseUrl}/static/vercel-team.png`,
    inviteLink: "https://example.com/",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "São Paulo, Brazil",
  } as VercelInviteUserEmailProps;
  
  export default emailSolicitacao;
  