declare module 'remoteMusicApp/App' {
    import { ComponentType } from 'react';
    
    interface RemoteAppProps {
      userRole?: string;
    }
    
    const App: ComponentType<RemoteAppProps>;
    export default App;
  }