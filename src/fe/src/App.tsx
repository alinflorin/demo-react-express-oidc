import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";

function App() {
  const auth = useAuth();

  return (
    <div style={{display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
      <div>header <br />
      {auth.isAuthenticated && <>{auth?.user?.profile?.email}  <button onClick={() => auth.signoutRedirect()}>Logout</button></>}
      {!auth.isAuthenticated && <><button onClick={() => auth.signinRedirect()}>Login</button></>}
      </div>
      <div style={{flex: 'auto', minHeight: 0, overflow: 'auto'}}>
        <Outlet />
      </div>
      <div>footer</div>
    </div>
  )
}

export default App;
