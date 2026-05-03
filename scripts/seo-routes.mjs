/*
 * Single source of truth for prerendered route metadata.
 *
 * Each entry produces one static `<path>/index.html` file at build time
 * with route-specific <title>, meta description, canonical link, OG tags,
 * H1, navigation, and crawlable text content.
 *
 * Edit this file when you add a new public route.
 */

export const SITE_ORIGIN = 'https://claritasstudios.com';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/animations/', label: 'Animations' },
  { href: '/saints/', label: 'Saints' },
  { href: '/prayers/', label: 'Prayers' },
  { href: '/feastdayactivities/', label: 'Feast Day Activities' },
  { href: '/resources/', label: 'Resources' },
  { href: '/team/', label: 'Team' },
  { href: '/give/', label: 'Give' },
  { href: '/contact/', label: 'Contact' },
];

const ANIMATION_SERIES = [
  {
    slug: 'hailmary',
    title: 'Hail Mary',
    description: 'Learn one of the most beautiful prayers in the Catholic tradition. A prayer of love and devotion to our Blessed Mother Mary.',
    age: 'Ages 2+',
    year: '2020',
  },
  {
    slug: 'prayertimewithangels',
    title: 'Prayer Time with Angels',
    description: 'Join Theo and Felicity as they learn common Catholic prayers from their guardian angels.',
    age: 'Ages 6+',
    year: '2023',
  },
  {
    slug: 'daisyandsheep',
    title: 'Daisy and Sheep',
    description: 'Join Daisy and Sheep as they learn about the Mass one part at a time and discover fun facts about the Catholic Church.',
    age: 'Ages 10+',
    year: '2024',
  },
  {
    slug: 'songsofthesaints',
    title: 'Songs of the Saints',
    description: 'Sing along with your favorite saints in this musical journey.',
    age: 'Ages 10+',
    year: '2025',
  },
  {
    slug: 'gigglesandgraceshow',
    title: 'Giggles and Grace Show',
    description: 'A musical animated short film that celebrates the joy of thanking God even when things go wrong.',
    age: 'Ages 2+',
    year: '2025',
  },
  {
    slug: 'prayingwiththesaints',
    title: 'Praying with the Saints',
    description: 'Pray common prayers with the saints in this collection of 12 videos featuring St. Thérèse of Lisieux and Carlo Acutis.',
    age: 'Ages 6+',
    year: '2025',
  },
];

function animationSeriesRoute(series) {
  return {
    path: `/animations/${series.slug}/`,
    title: `${series.title} | Catholic Animations | Claritas Studios`,
    description: series.description,
    h1: series.title,
    intro: `${series.description} ${series.age}. Released ${series.year}.`,
    sections: [
      {
        heading: 'About this series',
        paragraphs: [
          series.description,
          `Recommended for ${series.age}.`,
        ],
        links: [
          { href: '/animations/', label: 'Browse all animations' },
        ],
      },
    ],
  };
}

export const ROUTES = [
  {
    path: '/',
    title: 'Free Catholic Animations for Children | Claritas Studios',
    description: 'Claritas Studios creates free Catholic animations, prayers, saint stories, and feast-day activities to help children grow in their love of God and neighbor.',
    h1: 'Free Catholic Animations for Children',
    intro: 'Claritas Studios is a Catholic nonprofit creating animated stories, prayers, and resources that help children encounter the beauty of the faith.',
    sections: [
      {
        heading: 'Watch our animations',
        paragraphs: [
          'Our original animated series cover the rosary, the Mass, the saints, and core prayers of the Catholic tradition. Every video is free to watch and share.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels' },
          { href: '/animations/daisyandsheep/', label: 'Daisy and Sheep' },
          { href: '/animations/songsofthesaints/', label: 'Songs of the Saints' },
          { href: '/animations/gigglesandgraceshow/', label: 'Giggles and Grace Show' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints' },
        ],
      },
      {
        heading: 'Explore prayers, saints, and feast days',
        paragraphs: [
          'Beyond animation we publish printable prayers, saint biographies for kids, and seasonal feast-day activities families can use at home or in the classroom.',
        ],
        links: [
          { href: '/prayers/', label: 'Catholic Prayers' },
          { href: '/saints/', label: 'Lives of the Saints' },
          { href: '/feastdayactivities/', label: 'Feast Day Activities' },
          { href: '/resources/', label: 'Resources for Parents and Teachers' },
        ],
      },
      {
        heading: 'Support our mission',
        paragraphs: [
          'Claritas Studios is a 501(c)(3) Catholic nonprofit. Every donation helps us produce more free, faithful content for families.',
        ],
        links: [
          { href: '/give/', label: 'Donate' },
          { href: '/team/', label: 'Meet the team' },
          { href: '/contact/', label: 'Contact us' },
        ],
      },
    ],
  },
  {
    path: '/animations/',
    title: 'Catholic Animations for Kids | Claritas Studios',
    description: 'Watch free Catholic animated series for children: Hail Mary, Prayer Time with Angels, Daisy and Sheep, Songs of the Saints, Giggles and Grace, and Praying with the Saints.',
    h1: 'Catholic Animations for Kids',
    intro: 'Browse every animated series produced by Claritas Studios. Each show is free to watch online and designed to nurture a child’s love of God and the saints.',
    sections: [
      {
        heading: 'Series',
        paragraphs: [
          'Our catalog includes original short films and ongoing series for ages 2 and up.',
        ],
        links: ANIMATION_SERIES.map((s) => ({
          href: `/animations/${s.slug}/`,
          label: `${s.title} — ${s.age}`,
        })),
      },
    ],
  },
  ...ANIMATION_SERIES.map(animationSeriesRoute),
  {
    path: '/team/',
    title: 'About Our Catholic Animation Nonprofit | Claritas Studios',
    description: 'Meet the team behind Claritas Studios. We are a Catholic nonprofit creating animated stories, prayers, and resources for children and families.',
    h1: 'About Claritas Studios',
    intro: 'Claritas Studios is a Catholic nonprofit. Our team of animators, writers, musicians, and theologians collaborates to make beautiful, faithful media for children.',
    sections: [
      {
        heading: 'Our mission',
        paragraphs: [
          'We exist to help children encounter Jesus Christ through stories, prayer, and beauty. Every project is rooted in Catholic teaching and made for the whole family.',
        ],
      },
      {
        heading: 'Get involved',
        paragraphs: [
          'We are always looking for collaborators, partner parishes, and donors who share our mission.',
        ],
        links: [
          { href: '/give/', label: 'Support our work' },
          { href: '/contact/', label: 'Contact the team' },
        ],
      },
    ],
  },
  {
    path: '/resources/',
    title: 'Catholic Resources for Parents and Teachers | Claritas Studios',
    description: 'Free Catholic resources for parents, catechists, and teachers: printable activities, prayer guides, saint biographies, and feast-day worksheets.',
    h1: 'Resources for Parents and Teachers',
    intro: 'Free downloadable Catholic resources from Claritas Studios. Use these printables and guides at home, in the classroom, or in your parish faith-formation program.',
    sections: [
      {
        heading: 'Browse by topic',
        paragraphs: [
          'Resources cover prayer, the Mass, the saints, the liturgical year, and the lives of children’s patron saints.',
        ],
        links: [
          { href: '/prayers/', label: 'Prayers' },
          { href: '/saints/', label: 'Saints' },
          { href: '/feastdayactivities/', label: 'Feast Day Activities' },
          { href: '/animations/', label: 'Animated series' },
        ],
      },
    ],
  },
  {
    path: '/give/',
    title: 'Donate to Claritas Studios | Support Catholic Animation for Children',
    description: 'Make a tax-deductible donation to Claritas Studios. Your gift funds free Catholic animations, prayers, and resources for families around the world.',
    h1: 'Support Claritas Studios',
    intro: 'Claritas Studios is a 501(c)(3) Catholic nonprofit. Donations are tax-deductible and directly fund the production of new animations and free resources.',
    sections: [
      {
        heading: 'Why give',
        paragraphs: [
          'Every dollar helps us reach more children with beautiful, faithful storytelling. We keep our animations free so any family can watch.',
        ],
      },
      {
        heading: 'Other ways to help',
        paragraphs: [
          'Share our animations, pray for our team, or partner with us through your parish or school.',
        ],
        links: [
          { href: '/contact/', label: 'Contact us about partnerships' },
          { href: '/animations/', label: 'Watch and share our animations' },
        ],
      },
    ],
  },
  {
    path: '/contact/',
    title: 'Contact Claritas Studios | Catholic Animation Studio',
    description: 'Get in touch with Claritas Studios. We welcome partnership, press, and parish inquiries about our Catholic animations and resources.',
    h1: 'Contact Claritas Studios',
    intro: 'We love hearing from families, parishes, and schools who use our animations. Reach out with questions, partnership ideas, or press inquiries.',
    sections: [
      {
        heading: 'Stay in touch',
        paragraphs: [
          'Subscribe to our newsletter for new releases, free downloads, and behind-the-scenes updates from our team.',
        ],
        links: [
          { href: '/give/', label: 'Donate' },
          { href: '/team/', label: 'Meet the team' },
        ],
      },
    ],
  },
  {
    path: '/saints/',
    title: 'Lives of the Saints for Kids | Claritas Studios',
    description: 'Read short Catholic saint biographies for children. Discover patron saints, feast days, and inspiring stories of faith from across the centuries.',
    h1: 'Lives of the Saints',
    intro: 'Browse short saint biographies written for children. Each entry includes the saint’s feast day and a kid-friendly summary of their life and witness.',
    sections: [
      {
        heading: 'Discover the saints',
        paragraphs: [
          'From early martyrs to modern witnesses like Carlo Acutis, the lives of the saints show the many ways the Holy Spirit works in the world.',
        ],
        links: [
          { href: '/feastdayactivities/', label: 'Feast Day Activities' },
          { href: '/animations/songsofthesaints/', label: 'Songs of the Saints animation' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints animation' },
        ],
      },
    ],
  },
  {
    path: '/prayers/',
    title: 'Catholic Prayers for Children | Claritas Studios',
    description: 'Learn classic Catholic prayers with your children: the Hail Mary, Our Father, Glory Be, Angelus, Act of Contrition, and more, paired with animated explainers.',
    h1: 'Catholic Prayers for Children',
    intro: 'A growing library of classic Catholic prayers in plain English, paired with our animations so children can both hear and pray each one.',
    sections: [
      {
        heading: 'Featured prayers',
        paragraphs: [
          'Start with the prayers every Catholic child should know.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary (animation)' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints' },
        ],
      },
    ],
  },
  {
    path: '/feastdayactivities/',
    title: 'Catholic Feast Day Activities for Families | Claritas Studios',
    description: 'Celebrate the Catholic liturgical year with free feast-day activities, printables, recipes, and prayer guides designed for families and classrooms.',
    h1: 'Feast Day Activities',
    intro: 'Celebrate the Catholic liturgical year at home or in the classroom. Each feast day includes a short reflection plus printable activities and family prayer ideas.',
    sections: [
      {
        heading: 'Live the liturgical year',
        paragraphs: [
          'From Advent and Christmas to Lent and Easter, the Church’s calendar is full of opportunities to teach the faith through celebration.',
        ],
        links: [
          { href: '/saints/', label: 'Lives of the Saints' },
          { href: '/resources/', label: 'All resources' },
        ],
      },
    ],
  },
];
