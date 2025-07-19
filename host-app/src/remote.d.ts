// remote.d.ts
declare module 'remoteApp/Button' {  
    export interface TButtonProps {
      text: string;
    }
    
    const Button: React.FC<TButtonProp>;
    export default Button;
  }