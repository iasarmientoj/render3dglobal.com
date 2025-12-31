const cities = [
    // COLOMBIA (COP)
    {
        id: 'bogota',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Bogotá',
        slug: 'render-3d-bogota',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: 'https://maps.app.goo.gl/6bXvRC51p4ZRmY6CA',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018804.8967923486!2d-74.081755!3d4.609710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/diseno-render-stand-feria-comercial/diseno-render-stand-feria-comercial-01.png'
    },
    {
        id: 'medellin',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Medellín',
        slug: 'render-3d-medellin',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: '', // Pendiente
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63458.74794860436!2d-75.590553!3d6.244203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad05%3A0x42137cfcc7b53b56!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/render-interiorismo-oficinas-modernas/render-interiorismo-oficinas-modernas-01.png'
    },
    {
        id: 'cali',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Cali',
        slug: 'render-3d-cali',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: 'https://maps.app.goo.gl/Q5QXNETfkvWc7pew6',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63695.666324864!2d-76.531989!3d3.437220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0cc4bb3f1%3A0x1f0fb53c0c4f9693!2sCali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/render-3d-casa-campestre-estilo-colonial/render-3d-casa-campestre-estilo-colonial-01.png'
    },
    {
        id: 'barranquilla',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Barranquilla',
        slug: 'render-3d-barranquilla',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: 'https://maps.app.goo.gl/2ghTfWHvC3m8gmnC9',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62656.32757288675!2d-74.806981!3d10.963889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d44d12ae605%3A0x2a58c35275d31!2sBarranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/render-apartamento-interior-vista-panoramica/render-apartamento-interior-vista-panoramica-01.png'
    },
    {
        id: 'cartagena',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Cartagena',
        slug: 'render-3d-cartagena',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: 'https://maps.app.goo.gl/5GsgzirTLNTPXZDK7',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125586.29467770857!2d-75.539322!3d10.391049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e7ae22c60d%3A0xc3b7cb76059e74!2sCartagena%2C%20Bol%C3%ADvar!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/renderizado-3d-fachada-hotel-lujo/renderizado-3d-fachada-hotel-lujo-01.png'
    },
    {
        id: 'santamarta',
        country: 'Colombia',
        countryCode: 'CO',
        flag: '🇨🇴',
        city: 'Santa Marta',
        slug: 'render-3d-santa-marta',
        currency: 'COP',
        currencySymbol: '$',
        phone: '+593 95 903 5265',
        mapLink: '', // Pendiente
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62590.2312217032!2d-74.211904!3d11.231627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef4f6693d25d045%3A0xe744e26210214!2sSanta%20Marta%2C%20Magdalena!5e0!3m2!1ses!2sco!4v1628100000000!5m2!1ses!2sco',
        terminos: { material: 'Madecor y Tablex', construccion: 'Mampostería' },
        heroImage: 'assets/projects/render-3d-casa-campestre-estilo-colonial/render-3d-casa-campestre-estilo-colonial-01.png'
    },
    // ECUADOR (USD)
    {
        id: 'guayaquil',
        country: 'Ecuador',
        countryCode: 'EC',
        flag: '🇪🇨',
        city: 'Guayaquil',
        slug: 'render-3d-guayaquil',
        currency: 'USD',
        currencySymbol: '$',
        phone: '+593 95 903 5265',
        mapLink: 'https://maps.app.goo.gl/duSVaR6U6Rpy1xUK8',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255142.124577884!2d-79.994246!3d-2.196160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13c17b6c5965%3A0x67a36c7a76e1882!2sGuayaquil%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1628100000000!5m2!1ses!2sec',
        terminos: { material: 'Anaqueles y Gypsum', construccion: 'Hormigón' },
        heroImage: 'assets/projects/diseno-render-stand-feria-comercial/diseno-render-stand-feria-comercial-01.png'
    },
    {
        id: 'quito',
        country: 'Ecuador',
        countryCode: 'EC',
        flag: '🇪🇨',
        city: 'Quito',
        slug: 'render-3d-quito',
        currency: 'USD',
        currencySymbol: '$',
        phone: '+57 313 2060072',
        mapLink: '', // Pendiente
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127670.334795244!2d-78.524948!3d-0.180653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a400242229b%3A0x88022b7933973c9c!2sQuito%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1628100000000!5m2!1ses!2sec',
        terminos: { material: 'Anaqueles y Gypsum', construccion: 'Hormigón' },
        heroImage: 'assets/projects/render-interiorismo-oficinas-modernas/render-interiorismo-oficinas-modernas-01.png'
    }
];

module.exports = cities;
