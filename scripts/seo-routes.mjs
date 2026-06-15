/*
 * Single source of truth for prerendered route metadata.
 *
 * Each entry produces one static `<path>/index.html` file at build time
 * with route-specific <title>, meta description, canonical link, OG tags,
 * Twitter card tags, H1, navigation, and crawlable text content.
 *
 * Required per-route fields (issue #35):
 *   path, title, description, canonical, ogTitle, ogDescription, ogUrl,
 *   ogImage, twitterTitle, twitterDescription, twitterImage, h1
 *
 * Most of these are derived from `path`, `title`, and `description`. Use
 * `buildRoute` to ensure the derived fields are filled in consistently.
 *
 * Edit this file when you add a new public route.
 */

export const SITE_ORIGIN = 'https://claritasstudios.com';

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/images/thumbnails/CSCThumbnail.png`;

const ORG_NAME = 'Claritas Studios';
const ORG_URL = SITE_ORIGIN;
const ORG_LOGO = `${SITE_ORIGIN}/assets/Favicons/PNG/128x128-favicon.png`;
const ORG_TAX_ID = '85-4194883';
const ORG_SAME_AS = [
  'https://www.youtube.com/@ClaritasStudios',
  'https://www.instagram.com/claritasstudios',
  'https://blog.claritasstudios.com',
  'https://www.facebook.com/claritasstudios',
];

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
    image: '/assets/images/CarouselThumbnails/HailMary.png',
  },
  {
    slug: 'prayertimewithangels',
    title: 'Prayer Time with Angels',
    description: 'Join Theo and Felicity as they learn common Catholic prayers from their guardian angels.',
    age: 'Ages 6+',
    year: '2023',
    image: '/assets/images/CarouselThumbnails/PrayerTimeWithAngels.png',
  },
  {
    slug: 'daisyandsheep',
    title: 'Daisy and Sheep',
    description: 'Join Daisy and Sheep as they learn about the Mass one part at a time and discover fun facts about the Catholic Church.',
    age: 'Ages 10+',
    year: '2024',
    image: '/assets/images/CarouselThumbnails/DaisyAndSheep.png',
  },
  {
    slug: 'songsofthesaints',
    title: 'Songs of the Saints',
    description: 'Sing along with your favorite saints in this musical journey.',
    age: 'Ages 10+',
    year: '2025',
    image: '/assets/images/CarouselThumbnails/SongsOfTheSaints.png',
  },
  {
    slug: 'gigglesandgraceshow',
    title: 'Giggles and Grace Show',
    description: 'A musical animated short film that celebrates the joy of thanking God even when things go wrong.',
    age: 'Ages 2+',
    year: '2025',
    image: '/assets/images/CarouselThumbnails/GigglesAndGrace.webp',
  },
  {
    slug: 'prayingwiththesaints',
    title: 'Praying with the Saints',
    description: 'Pray common prayers with the saints in this collection of 12 videos featuring St. Thérèse of Lisieux and Carlo Acutis.',
    age: 'Ages 6+',
    year: '2025',
    image: '/assets/images/CarouselThumbnails/PrayingWithTheSaints.png',
  },
];

/**
 * Fills in derived metadata fields. Per-route overrides win; everything else
 * is derived from path/title/description so a route author only has to write
 * the unique copy.
 */
function buildRoute(route) {
  const url = `${SITE_ORIGIN}${route.path}`;
  const title = route.title;
  const description = route.description;
  const ogImage = route.ogImage
    ? (route.ogImage.startsWith('http') ? route.ogImage : `${SITE_ORIGIN}${route.ogImage}`)
    : DEFAULT_OG_IMAGE;
  return {
    ...route,
    canonical: route.canonical || url,
    ogTitle: route.ogTitle || title,
    ogDescription: route.ogDescription || description,
    ogUrl: route.ogUrl || url,
    ogImage,
    twitterTitle: route.twitterTitle || route.ogTitle || title,
    twitterDescription: route.twitterDescription || route.ogDescription || description,
    twitterImage: route.twitterImage
      ? (route.twitterImage.startsWith('http') ? route.twitterImage : `${SITE_ORIGIN}${route.twitterImage}`)
      : ogImage,
  };
}

function buildOrganizationSchema(opts = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'NGO'],
    name: ORG_NAME,
    url: ORG_URL,
    logo: ORG_LOGO,
    nonprofitStatus: 'Nonprofit501c3',
    sameAs: ORG_SAME_AS,
    knowsAbout: [
      'Catholic education for children',
      'Catholic prayers',
      'Lives of the Saints',
      'Catholic animation for families',
      'Feast day activities',
    ],
    ...opts,
  };
}

function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: ORG_URL,
  };
}

function buildBreadcrumbSchema(path, label) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORG_URL}/` },
      { '@type': 'ListItem', position: 2, name: label, item: `${ORG_URL}${path}` },
    ],
  };
}

function buildTVSeriesSchema(series) {
  const image = series.image.startsWith('http') ? series.image : `${ORG_URL}${series.image}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: series.title,
    description: series.description,
    url: `${ORG_URL}/animations/${series.slug}/`,
    image,
    startDate: series.year,
    creator: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
  };
}

function animationSeriesRoute(series) {
  return buildRoute({
    path: `/animations/${series.slug}/`,
    title: `${series.title} | Catholic Animations | Claritas Studios`,
    description: series.description,
    ogImage: series.image,
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
    jsonLd: [
      buildBreadcrumbSchema(`/animations/${series.slug}/`, series.title),
      buildTVSeriesSchema(series),
    ],
  });
}

const RAW_ROUTES = [
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
    jsonLd: [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
    ],
  },
  {
    path: '/animations/',
    title: 'Catholic Animations for Children | Claritas Studios',
    description: 'Watch free Catholic animations for children from Claritas Studios. Original animated series covering the Mass, the saints, and Catholic prayers — for ages 2 and up.',
    h1: 'Catholic Animations for Children',
    intro: 'Claritas Studios creates free Catholic animations for children that bring the faith to life through beautiful storytelling. Every series is free to watch and designed to nurture a child\'s love of God, Mary, and the saints.',
    sections: [
      {
        heading: 'Our Catholic Animated Series',
        paragraphs: [
          'Our catalog of Catholic animations for children includes original short films and ongoing series for ages 2 and up. Each series focuses on a different dimension of the faith — from learning the Hail Mary to discovering the lives of the saints.',
        ],
        links: ANIMATION_SERIES.map((s) => ({
          href: `/animations/${s.slug}/`,
          label: `${s.title} — ${s.age}`,
        })),
      },
      {
        heading: 'Catholic Animations for Every Age',
        paragraphs: [
          'Our free Catholic animated series span ages 2 through 12 and beyond. Hail Mary and Giggles and Grace are perfect for toddlers and early learners. Prayer Time with Angels and Praying with the Saints work well for ages 6 and up. Daisy and Sheep and Songs of the Saints are crafted for older children and teens ready for deeper dives into the Mass and the lives of the saints.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary — Ages 2+' },
          { href: '/animations/gigglesandgraceshow/', label: 'Giggles and Grace Show — Ages 2+' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels — Ages 6+' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints — Ages 6+' },
          { href: '/animations/daisyandsheep/', label: 'Daisy and Sheep — Ages 10+' },
          { href: '/animations/songsofthesaints/', label: 'Songs of the Saints — Ages 10+' },
        ],
      },
      {
        heading: 'For Catholic Schools, CCD, and Parish Programs',
        paragraphs: [
          'All Claritas Studios animations are free to use in Catholic schools, religious education classes, CCD programs, and parish faith-formation. Teachers and catechists use our series as visual introductions to prayer, the Mass, the sacraments, and the saints. Every video is embeddable and shareable at no cost.',
        ],
        links: [
          { href: '/prayers/', label: 'Catholic Prayers for Children' },
          { href: '/saints/', label: 'Lives of the Saints for Kids' },
          { href: '/resources/', label: 'Free Printable Resources' },
          { href: '/contact/', label: 'Contact us about partnerships' },
        ],
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [],
      },
      {
        heading: 'Are these Catholic animations free?',
        paragraphs: [
          'Yes. Every episode from every Claritas Studios series is completely free to watch online — no account, no subscription, no cost. We are a 501(c)(3) Catholic nonprofit supported by donations, which allows us to keep all our Catholic animations free for families, schools, and parishes worldwide.',
        ],
        links: [
          { href: '/give/', label: 'Support Claritas Studios' },
        ],
      },
      {
        heading: 'What topics do the Catholic animations cover?',
        paragraphs: [
          'Our Catholic animations for children cover the Hail Mary, core Catholic prayers, parts of the Mass, Songs of the Saints, and devotional prayer. Topics include the rosary, the sacraments, liturgy, and Catholic feast days — giving children a well-rounded introduction to the faith through story and song.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary — the prayer' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels — Catholic prayers' },
          { href: '/animations/daisyandsheep/', label: 'Daisy and Sheep — the Mass' },
          { href: '/animations/songsofthesaints/', label: 'Songs of the Saints — lives of the saints' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints — devotional prayer' },
        ],
      },
      {
        heading: 'Can I watch these in Spanish or other languages?',
        paragraphs: [
          'Yes. Several series are available in additional languages. Hail Mary is available in English, ASL, and Swedish. Daisy and Sheep is available in English and Spanish. Prayer Time with Angels is available in English and Urdu. Use the language selector on the episode page to switch.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary — English, ASL, and Swedish' },
          { href: '/animations/daisyandsheep/', label: 'Daisy and Sheep — English and Spanish' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels — English and Urdu' },
        ],
      },
      {
        heading: 'Who makes these Catholic animated videos?',
        paragraphs: [
          'Claritas Studios is a U.S.-based Catholic nonprofit. Our team of animators, writers, musicians, and theologians creates each series to be faithful to Catholic teaching and beautiful for children. Every episode is reviewed for theological accuracy before release.',
        ],
        links: [
          { href: '/team/', label: 'Meet the Claritas Studios team' },
        ],
      },
      {
        heading: 'How often is new content released?',
        paragraphs: [
          'New episodes are released throughout the year across our active series. Subscribe to our newsletter or follow us on YouTube to be notified when new Catholic animations for children are available.',
        ],
        links: [
          { href: 'https://blog.claritasstudios.com/subscribe', label: 'Subscribe to the newsletter' },
          { href: 'https://www.youtube.com/@claritasstudios', label: 'Claritas Studios on YouTube' },
        ],
      },
      {
        heading: 'More Catholic Resources for Families',
        paragraphs: [
          'Our Catholic animations are just one part of what Claritas Studios offers. Explore free Catholic prayers, saint biographies for kids, feast-day activities, and printable resources to enrich your family\'s faith life.',
        ],
        links: [
          { href: '/prayers/', label: 'Catholic Prayers for Children' },
          { href: '/saints/', label: 'Lives of the Saints for Kids' },
          { href: '/feastdayactivities/', label: 'Feast Day Activities' },
          { href: '/resources/', label: 'Free Printable Resources' },
        ],
      },
    ],
    jsonLd: [
      buildBreadcrumbSchema('/animations/', 'Catholic Animations for Children'),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are Catholic animations from Claritas Studios free to watch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every episode from every Claritas Studios series is completely free to watch online — no account, no subscription, no cost. Claritas Studios is a 501(c)(3) Catholic nonprofit supported by donations, which allows all Catholic animations to remain free for families, schools, and parishes worldwide.',
            },
          },
          {
            '@type': 'Question',
            name: 'What ages are Claritas Studios Catholic animations for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Claritas Studios produces Catholic animations for children across a range of ages. Hail Mary and Giggles and Grace are designed for ages 2 and up. Prayer Time with Angels and Praying with the Saints are recommended for ages 6 and up. Daisy and Sheep and Songs of the Saints are best suited for ages 10 and up.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use these Catholic animations in a Catholic school or CCD class?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All Claritas Studios animations are free to use in Catholic schools, religious education classes, CCD programs, and parish faith-formation. Teachers and catechists use our series as visual introductions to prayer, the Mass, the sacraments, and the saints. Every video is embeddable and shareable at no cost.',
            },
          },
          {
            '@type': 'Question',
            name: 'What topics do the Catholic animations for children cover?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our Catholic animations for children cover the Hail Mary, core Catholic prayers, parts of the Mass, the lives of the saints, and devotional prayer. Topics include the rosary, the sacraments, liturgy, and Catholic feast days — giving children a well-rounded introduction to the faith through story and song.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are there Catholic animations in Spanish or other languages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Several series are available in additional languages. Hail Mary is available in English, ASL, and Swedish. Daisy and Sheep is available in English and Spanish. Prayer Time with Angels is available in English and Urdu. Use the language selector on the episode page to switch.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who makes these Catholic animated videos for children?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Claritas Studios is a U.S.-based Catholic nonprofit. A team of animators, writers, musicians, and theologians creates each series to be faithful to Catholic teaching and beautiful for children. Every episode is reviewed for theological accuracy before release.',
            },
          },
        ],
      },
    ],
  },
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
    jsonLd: [buildBreadcrumbSchema('/team/', 'About Claritas Studios')],
  },
  {
    path: '/resources/',
    title: 'Catholic Resources for Families | Claritas Studios',
    description: 'Free Catholic resources for parents, catechists, and teachers: printable activities, prayer guides, saint biographies, and feast-day worksheets.',
    h1: 'Resources for Parents and Teachers',
    intro: 'Free downloadable Catholic resources from Claritas Studios. Use these printables and guides at home, in the classroom, or in your parish faith-formation program.',
    sections: [
      {
        heading: 'Browse by topic',
        paragraphs: [
          'Resources cover prayer, the Mass, the saints, the liturgical year, and the lives of children\'s patron saints.',
        ],
        links: [
          { href: '/prayers/', label: 'Prayers' },
          { href: '/saints/', label: 'Saints' },
          { href: '/feastdayactivities/', label: 'Feast Day Activities' },
          { href: '/animations/', label: 'Animated series' },
        ],
      },
    ],
    jsonLd: [buildBreadcrumbSchema('/resources/', 'Resources for Parents and Teachers')],
  },
  {
    path: '/give/',
    title: 'Donate to Free Catholic Animations | Claritas Studios',
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
    jsonLd: [
      buildBreadcrumbSchema('/give/', 'Support Claritas Studios'),
      buildOrganizationSchema({ taxID: ORG_TAX_ID }),
    ],
  },
  {
    path: '/contact/',
    title: 'Contact Claritas Studios',
    description: 'Get in touch with Claritas Studios. We welcome partnership, press, and parish inquiries about our Catholic animations and resources for children.',
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
    jsonLd: [buildBreadcrumbSchema('/contact/', 'Contact Claritas Studios')],
  },
  {
    path: '/saints/',
    title: 'Lives of the Saints for Kids | Claritas Studios',
    description: 'Read short Catholic saint biographies for children. Discover patron saints, feast days, and inspiring stories of faith from across the centuries.',
    h1: 'Lives of the Saints',
    intro: 'Browse short saint biographies written for children. Each entry includes the saint\'s feast day and a kid-friendly summary of their life and witness.',
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
    jsonLd: [buildBreadcrumbSchema('/saints/', 'Lives of the Saints')],
  },
  {
    path: '/prayers/',
    title: 'Catholic Prayers for Children | Claritas Studios',
    description: 'Learn classic Catholic prayers with your children: the Hail Mary, Our Father, Glory Be, Angelus, Guardian Angel prayer, and more, paired with free animated explainers.',
    h1: 'Catholic Prayers for Children',
    intro: 'Teaching children to pray is one of the greatest gifts a parent or catechist can give. Here you will find the classic Catholic prayers for children that form the foundation of a life of faith — from the Our Father and Hail Mary to the Angelus and Guardian Angel prayer.',
    sections: [
      {
        heading: 'Why teach children Catholic prayers?',
        paragraphs: [
          'Memorizing Catholic prayers gives children a vocabulary for speaking with God. When children know these prayers by heart, they can turn to them in moments of joy, fear, gratitude, or sadness — no matter where they are.',
          'The prayers on this page are the ones the Church has treasured for centuries. They cover adoration, petition, intercession, and thanksgiving, giving children a well-rounded way to approach God each day.',
        ],
      },
      {
        heading: 'Essential Catholic prayers to learn',
        paragraphs: [
          'These are the core Catholic prayers every child should know: the Our Father (the prayer Jesus himself taught), the Hail Mary, the Glory Be, the Guardian Angel prayer, the Saint Michael prayer, and the Angelus.',
        ],
      },
      {
        heading: 'Learn Catholic prayers through animation',
        paragraphs: [
          'Watching and hearing a prayer brings it to life for young children. Our free animated series are designed to help children not just memorize Catholic prayers but truly understand and love them.',
        ],
        links: [
          { href: '/animations/hailmary/', label: 'Hail Mary — animated episode for children ages 2+' },
          { href: '/animations/prayertimewithangels/', label: 'Prayer Time with Angels — learn core prayers with Theo and Felicity (ages 6+)' },
          { href: '/animations/prayingwiththesaints/', label: 'Praying with the Saints — 12 episodes with St. Thérèse and Carlo Acutis (ages 6+)' },
        ],
      },
      {
        heading: 'Tips for praying with children',
        paragraphs: [
          'The best way to teach Catholic prayers for children is to pray them together out loud, every day. Start with one prayer at a time, pray at the same time each day, explain the meaning in simple words, and use our animations to reinforce the words visually.',
        ],
      },
      {
        heading: 'More Catholic resources for children',
        paragraphs: [
          'Prayers are just one part of a rich Catholic education. Explore our free resources for families and classrooms.',
        ],
        links: [
          { href: '/saints/', label: 'Lives of the Saints — short biographies for kids' },
          { href: '/feastdayactivities/', label: 'Feast Day Activities — celebrate the liturgical year at home' },
          { href: '/resources/', label: 'Printable resources — prayer cards, activity sheets, and more' },
          { href: '/animations/', label: 'All animations — free Catholic video series for families' },
        ],
      },
    ],
    jsonLd: [buildBreadcrumbSchema('/prayers/', 'Catholic Prayers for Children')],
  },
  {
    path: '/feastdayactivities/',
    title: 'Catholic Feast Day Activities for Families | Claritas Studios',
    description: 'Celebrate the Catholic liturgical year with free feast-day activities, printables, recipes, and prayer guides designed for families and classrooms.',
    h1: 'Feast Day Activities',
    intro: 'Celebrate the Catholic liturgical year at home or in the classroom. Each feast day includes a short reflection plus printable activities and family prayer ideas.',
    ogImage: '/assets/images/thumbnails/FeastDayActivityThumbnail.png',
    sections: [
      {
        heading: 'Live the liturgical year',
        paragraphs: [
          'From Advent and Christmas to Lent and Easter, the Church\'s calendar is full of opportunities to teach the faith through celebration.',
        ],
        links: [
          { href: '/saints/', label: 'Lives of the Saints' },
          { href: '/resources/', label: 'All resources' },
        ],
      },
    ],
    jsonLd: [buildBreadcrumbSchema('/feastdayactivities/', 'Feast Day Activities')],
  },
];

export const ROUTES = [
  ...RAW_ROUTES.map(buildRoute),
  ...ANIMATION_SERIES.map(animationSeriesRoute),
];
