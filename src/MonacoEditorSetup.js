import { Monaco } from '@monaco-editor/react';

export function setupMonaco() {
  Monaco.init().then(monaco => {
    // Vous pouvez configurer des options supplémentaires ici si nécessaire
    // par exemple, définir le thème, la langue par défaut, etc.
  });
}