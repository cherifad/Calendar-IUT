export abstract class Constants {
  static readonly PL_PR: string = 'pl-6 pr-6';
  static readonly DARK_THEME: any = {
    dark: true,
    colors: {
      primary: '#1E313B',
      background: '#121212',
      card: '#1E313B',
      text: 'white',
      border: '#1E313B',
      notification: 'light-content',
    },
  };
  static readonly LIGHT_THEME: any = {
    dark: false,
    colors: {
      primary: '#1E313B',
      background: '#FEFBF6',
      card: '#1E313B',
      text: 'black',
      border: '#1E313B',
      notification: 'dark-content',
    },
  };
}
