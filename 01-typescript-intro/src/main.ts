import './style.css'

// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// import './topics/01-basic-types'; --> IMPORTAR UN MODULO
// import './topics/02-object-interface';
// import './topics/03-functions';
// import './topics/04-homework-types';
// import './topics/05-basic-destructuring';
//import './topics/06-function-destructuring';
// import './topics/07-import-export';
// import './topics/08-classes';
// import './topics/09-generics';
// import './topics/10-decorators';
import './topics/11-optional-chaining';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  Hola Mundo
`;

console.log('Hola Mundo');

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
