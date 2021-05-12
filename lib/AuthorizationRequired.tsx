import React from "react";

const AuthorizationRequired = ({ onAuthorize }: { onAuthorize: () => void }) => (
  <>
    <p>Diese Seiten sind nur für Mitglieder der Bereitschaft Barmbek bestimmt. Bist du Mitglied der Bereitschaft Barmbek?</p>
    <button type="button" onClick={onAuthorize}>Ja, ich bin Mitglied der Bereitschaft Barmbek</button>
  </>
);

export default AuthorizationRequired;
