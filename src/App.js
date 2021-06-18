import ToDo from './components/todo/todo.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginContext from './auth/context.js'
import SiteContext from './context/siteContext'


function App() {
  return (
    <LoginContext>
      <SiteContext>
        <ToDo />
      </SiteContext>
    </LoginContext>
  );
}

export default App;