import React from "react";
import styled from "styled-components";
import { colors } from "@barmbek/DRKStyle";

const AuthorizationRequired = ({ onAuthorize }: { onAuthorize: () => void }) => (
  <>
    <Question>Diese Seiten sind nur für Mitglieder der Bereitschaft Barmbek bestimmt. Bist du Mitglied der Bereitschaft Barmbek?</Question>
    <AuthButton onClick={onAuthorize}>Ja, ich bin Mitglied der Bereitschaft Barmbek</AuthButton>
  </>
);

const Question = styled.div`
  max-width: 60ch;
  margin-bottom: 2ch;
`;

const AuthButton = styled.div`
  border: 1px solid transparent;
  border-radius: 1ch;
  background: ${colors.midblue};
  color: ${colors.lightgray};
  font-weight: bold;
  max-width: 60ch;
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
`



export default AuthorizationRequired;
