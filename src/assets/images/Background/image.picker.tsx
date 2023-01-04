interface Image {
  name: string;
  image: any;
}

export class BackgroundImage {
  private static images: Array<Image> = [
    {
      name: 'food.png',
      image: require('./food.png'),
    },
    {
        name: 'food_focused.png',
        image: require('./food_focused.png'),
    },
    {
      name: 'settings.png',
      image: require('./settings.png'),
    },
    {
        name: 'settings_focused.png',
        image: require('./settings_focused.png'),
    },
    {
      name: 'home.png',
      image: require('./home.png'),
    },
    {
        name: 'default.png',
        image: require('./default.png'),
    },
    {
        name: 'default_focused.png',
        image: require('./default_focused.png'),
    },
    {  
        name: 'home_focused.png',
        image: require('./home_focused.png'),
    },
    {
        name: 'about.png',
        image: require('./about.png'),
    },
    {
        name: 'about_focused.png',
        image: require('./about_focused.png'),
    }
  ];

  static GetImage = (name: string) => {
    const fullname = name + '.png';
    const found = BackgroundImage.images.find(e => e.name === fullname);
    return found ? found.image : null;
  };

  static GetNumberOfImages = () => {
    return BackgroundImage.images.length;
  };
}
