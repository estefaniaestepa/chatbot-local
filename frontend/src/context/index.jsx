import { AuthProvider } from './AuthContext';
import { ChatProvider } from './ChatContext';
import { ThemeProvider } from './ThemeContext';

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ChatProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ChatProvider>
  </AuthProvider>
);

export default AppProviders;