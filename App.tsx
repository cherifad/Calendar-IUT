import React, {useEffect} from 'react';
import AppNavigation from './src/app.naviguation';
import { getData } from './src/data.importer';

const App = () => {
  useEffect(() => {
    getData('fav_group', false).then(value => {
      (global as any).fav_group = value;
    })
    .catch(error => {
      console.error("App.tsx : " + error);
    });
  }, []);

  return <AppNavigation />;
};

export default App;
