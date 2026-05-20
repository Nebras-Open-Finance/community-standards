export type ArticleKind = 'press-release' | 'news' | 'regulation' | 'conference'

export const ARTICLE_KIND_LABELS: Record<ArticleKind, string> = {
  'press-release': 'Press release',
  'news':          'News',
  'regulation':    'Regulation',
  'conference':    'Conference',
}

export const ARTICLE_KINDS: readonly ArticleKind[] = [
  'press-release',
  'news',
  'regulation',
  'conference',
]

interface RawHomeArticle {
  link: string
  source: string
  kind: ArticleKind
  date: string
  dateLabel: string
  imageSrc: string
  title: string
  text: string
}

export interface HomeArticle extends RawHomeArticle {
  id: string
}

const rawArticles: RawHomeArticle[] = [
  {
    link: 'https://fintechnews.media/2026/05/06/lean-technologies-scales-pay-by-bank-in-the-uae-as-open-finance-payments-go-live/',
    source: 'Fintech News',
    kind: 'press-release',
    date: '2026-05-06',
    dateLabel: '6 May 2026',
    imageSrc: '/images/articles/lean-scales.png',
    title: 'Lean Technologies Scales Pay by Bank in the UAE as Open Finance Payments Go Live',
    text: "Lean Technologies, the MENA region's leading financial infrastructure provider, today announced the expansion of its Pay by Bank capabilities, built on the UAE's newly operational Open Finance framework.",
  },
  {
    link: 'https://wio.io/altareq',
    source: 'Wio Bank',
    kind: 'press-release',
    date: '2026-04-16',
    dateLabel: '16 April 2026',
    imageSrc: '/images/articles/wio.png',
    title: "Wio Bank has successfully completed its Open Finance enablement under AlTareq, Central Bank of The UAE's Open Finance initiative",
    text: "AlTareq, the UAE's open finance initiative, is now live and enabled for your Wio account, so you can manage your finances on your terms in a new era of connected financial services.",
  },
  {
    link: 'https://www.adib.ae/en/news/2026/apr/uaes-open-finance-altareq-initiative?utm_source=social&oczpid=195a1219-9152-473b-9a3f-55119be2446a',
    source: 'ADIB',
    kind: 'press-release',
    date: '2026-04-16',
    dateLabel: '16 April 2026',
    imageSrc: '/images/articles/adib-tpp.png',
    title: "ADIB becomes the UAE's first bank licensed to operate as an open finance provider under the UAE's Open Finance Altareq Initiative",
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has become the first bank in the UAE to be licensed as a Third-Party Provider (TPP) or Open Finance Provider under the UAE Central Bank Open Finance AlTareq initiative. This milestone marks a significant step in ADIB's transformation journey and 2035 vision to build the bank of the future.",
  },
  {
    link: 'https://www.zawya.com/en/press-release/companies-news/adib-becomes-the-uaes-first-bank-licensed-to-operate-as-an-open-finance-provider-under-the-uaes-open-finance-altareq-initiative-ybyjb320',
    source: 'Zawya',
    kind: 'press-release',
    date: '2026-04-16',
    dateLabel: '16 April 2026',
    imageSrc: '/images/articles/adib-tpp-2.png',
    title: "ADIB becomes the UAE's first bank licensed to operate as an open finance provider under the UAE's Open Finance Altareq Initiative",
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has become the first bank in the UAE to be licensed as a Third-Party Provider (TPP) or Open Finance Provider under the UAE Central Bank Open Finance AlTareq initiative. This milestone marks a significant step in ADIB's transformation journey and 2035 vision to build the bank of the future.",
  },
  {
    link: 'https://www.openbankingexpo.com/news/amazon-expands-uk-payment-options-with-pay-by-bank-via-partnership-with-truelayer/',
    source: 'Open Banking Expo',
    kind: 'news',
    date: '2026-02-10',
    dateLabel: '10 Feb 2026',
    imageSrc: '/images/articles/amazon.png',
    title: 'Amazon expands UK payment options with Pay by Bank via partnership with TrueLayer',
    text: 'Amazon has expanded the range of payment options available to UK customers, giving shoppers more choice over how they pay at checkout. From Pay by Bank to cards, instalments, gift cards and rewards points, the move reflects a broader shift towards more flexible, account-to-account payment experiences in everyday commerce.',
  },
  {
    link: 'https://gulfnews.com/business/banking/how-open-finance-in-uae-banks-is-driving-faster-credit-and-new-services-1.500418393',
    source: 'Gulf News',
    kind: 'news',
    date: '2026-01-23',
    dateLabel: '23 Jan 2026',
    imageSrc: '/images/articles/faster-credit.png',
    title: 'How open finance in UAE banks is driving faster credit and new services',
    text: 'UAE banking sector is entering a new phase of digital transformation as open finance begins to roll out, allowing individuals and businesses to securely share and initiate services such as payments through regulated third-party providers, all within a strict, consent-based framework.',
  },
  {
    link: 'https://uaefintechvibes.com/adib-leads-open-finance-initiative-altareq/',
    source: 'UAE Fintech Vibes',
    kind: 'news',
    date: '2026-01-21',
    dateLabel: '21 Jan 2026',
    imageSrc: '/images/articles/adib-sharia.png',
    title: 'ADIB Leads the Shariah-Compliant Digital Wave with the Open Finance Initiative AlTareq',
    text: "Abu Dhabi Islamic Bank (ADIB), a global leader in Islamic finance, has announced a landmark achievement in its digital transformation journey. In alignment with its Vision 2035, ADIB has officially become the first Islamic bank in the UAE to implement Open Finance under the Open Finance Initiative AlTareq, a strategic project led by the Central Bank of the UAE (CBUAE).",
  },
  {
    link: 'https://www.openbankingexpo.com/news/abu-dhabi-islamic-bank-implements-open-finance-with-support-from-altareq/',
    source: 'Open Banking Expo',
    kind: 'news',
    date: '2026-01-20',
    dateLabel: '20 Jan 2026',
    imageSrc: '/images/articles/adib-live.jpg',
    title: 'Abu Dhabi Islamic Bank implements Open Finance with support from AlTareq',
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has taken another major step in shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a key milestone in the UAE's Open Finance journey under AlTareq, the Central Bank of the UAE's (CBUAE) Open Finance Initiative.",
  },
  {
    link: 'https://www.linkedin.com/pulse/when-open-finance-became-real-customers-uae-faisal-toukan-9kvsf/',
    source: 'LinkedIn · Faisal Toukan',
    kind: 'news',
    date: '2026-01-20',
    dateLabel: '20 Jan 2026',
    imageSrc: '/images/articles/of-real-zina.png',
    title: 'When Open Finance Became Real for Customers in the UAE',
    text: 'We are witnessing the beginning of a shift in how money moves in the UAE. For the first time, a customer in the country has completed a live, regulated Open Finance payment from inside a Ziina app experience. What was once a policy framework and a technical standard is now a real interaction available to people who use Ziina every day.',
  },
  {
    link: 'https://ffnews.com/newsarticle/fintech/adib-becomes-first-islamic-bank-to-implement-open-finance-with-the-support-of-the-cbuaes-open-finance-initiative-altareq/',
    source: 'FF News',
    kind: 'news',
    date: '2026-01-20',
    dateLabel: '20 Jan 2026',
    imageSrc: '/images/articles/adib-first.jpg',
    title: "ADIB Becomes First Islamic Bank to Implement Open Finance With the Support of the CBUAE's Open Finance Initiative AlTareq",
    text: "Abu Dhabi Islamic Bank (ADIB) has taken another major step in shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a key milestone in the UAE's Open Finance journey under AlTareq.",
  },
  {
    link: 'https://www.wamda.com/2026/01/ziina-uae-execute-live-open-finance-payments-lean',
    source: 'Wamda',
    kind: 'news',
    date: '2026-01-15',
    dateLabel: '15 Jan 2026',
    imageSrc: '/images/articles/zina-lean.jpg',
    title: 'Ziina becomes first in the UAE to execute live Open Finance payments with Lean',
    text: "Lean Technologies, the MENA region's leading financial infrastructure provider, and Ziina, the UAE's homegrown consumer and business payments platform, announce the launch of the country's first live customer-initiated Open Finance payment experience under the Central Bank of the UAE's (CBUAE) Open Finance framework.",
  },
  {
    link: 'https://mena-fintech.org/news/pay10-and-first-abu-dhabi-bank-announce-open-finance-go-live-under-al-tareq-scheme/',
    source: 'MENA Fintech',
    kind: 'press-release',
    date: '2026-01-01',
    dateLabel: '01 Jan 2026',
    imageSrc: '/images/articles/pay10-fab.png',
    title: 'Pay10 and First Abu Dhabi Bank announce Open Finance go live under Al Tareq scheme',
    text: "Pay10 and First Abu Dhabi Bank (FAB) have gone live on Open Finance for its retail customers in the UAE, marking a key milestone in the UAE's Open Finance journey under the Central Bank of the UAE's Open Finance Initiative, AlTareq.",
  },
  {
    link: 'https://gulfnews.com/amp/story/business%2Fbanking%2Ffab-pay10-go-live-with-uae-open-finance-initiative-1.500394316',
    source: 'Gulf News',
    kind: 'news',
    date: '2025-12-30',
    dateLabel: '30 Dec 2025',
    imageSrc: '/images/articles/fab-live.png',
    title: 'FAB, Pay10 go live with UAE Open Finance initiative',
    text: "Abu Dhabi: First Abu Dhabi Bank (FAB) and Pay10 have officially gone live on Open Finance for retail customers, marking a significant step in the UAE's Open Finance journey under the Central Bank's Al Tareq initiative.",
  },
  {
    link: 'https://www.zawya.com/en/press-release/companies-news/pay10-and-commercial-bank-of-dubai-launch-open-finance-under-the-uaes-al-tareq-initiative-oduv1ph5',
    source: 'Zawya',
    kind: 'press-release',
    date: '2025-12-28',
    dateLabel: '28 Dec 2025',
    imageSrc: '/images/articles/cbd-pay10.png',
    title: "Pay10 and Commercial Bank of Dubai launch Open Finance under the UAE's Al Tareq Initiative",
    text: "Dubai, UAE: Pay10 and Commercial Bank of Dubai has announced the successful go-live of Open Finance services under the UAE's Open Finance Initiative, AlTareq, marking a significant advancement in the country's transition toward regulated, customer-centric digital financial services.",
  },
  {
    link: 'https://www.cbd.ae/aboutus/media-centre/press-room/news?Id=bb1563ff-458f-66de-b8c5-ff0b00b6b24a',
    source: 'CBD',
    kind: 'press-release',
    date: '2025-12-23',
    dateLabel: '23 Dec 2025',
    imageSrc: '/images/articles/cbd-live.jpg',
    title: "Commercial Bank of Dubai Sets New Benchmark as UAE's First Bank to Fully Activate Open Finance for Customers",
    text: "Commercial Bank of Dubai (CBD) has set a new benchmark for the UAE banking sector by becoming the first bank in the country to fully activate Open Finance into live operational use under the Central Bank of the UAE's Open Finance Initiative, AlTareq.",
  },
  {
    link: 'https://openfinance-hackathon.com/',
    source: 'UAE Open Finance + AI Hackathon',
    kind: 'conference',
    date: '2025-11-14',
    dateLabel: '14 Nov 2025',
    imageSrc: '/images/articles/hackathon.png',
    title: 'The Grand Finale: UAE Open Finance + AI Hackathon',
    text: "The stage is set for the final showdown, where the region's brightest developers, fintech innovators, and AI visionaries come together to present the future of financial services.",
  },
  {
    link: 'https://fintechnews.media/2025/11/04/mercury-receives-deemed-open-finance-license-approval-from-the-central-bank-of-the-uae/',
    source: 'Fintech News',
    kind: 'regulation',
    date: '2025-11-04',
    dateLabel: '4 Nov 2025',
    imageSrc: '/images/articles/merc.png',
    title: 'Mercury receives deemed Open Finance License approval from the Central Bank of the UAE',
    text: 'Dubai: Mercury Payments Services (Mercury), a leading regional payments infrastructure and technology provider, is proud to announce that it has been granted approval for a deemed Open Finance License by the Central Bank of the UAE (CBUAE).',
  },
  {
    link: 'https://fintechnews.ae/27167/fintechdubai/tarabut-uae-central-bank-open-finance-approval/',
    source: 'Fintech News AE',
    kind: 'regulation',
    date: '2025-08-05',
    dateLabel: '5 Aug 2025',
    imageSrc: '/images/articles/tarabut-lic.png',
    title: 'Tarabut Secures UAE Central Bank Approval for Open Finance Operations',
    text: "Tarabut, a Dubai-based open banking and embedded finance platform, has received in-principle approval from the Central Bank of the United Arab Emirates (CBUAE), following the introduction of the UAE's Open Finance regulation.",
  },
  {
    link: 'https://mena-fintech.org/news/pay10-processes-the-uaes-first-open-finance-transaction-under-central-bank-of-the-uaes-framework/',
    source: 'MENA Fintech',
    kind: 'news',
    date: '2025-08-04',
    dateLabel: '4 Aug 2025',
    imageSrc: '/images/articles/pay10.png',
    title: "Pay10 Processes the UAE's First Open Finance Transaction Under Central Bank of the UAE's Framework",
    text: "Pay10, the UAE's first licensed third-party provider (TPP) under the Central Bank of the UAE's (CBUAE) Open Finance framework, announces it has successfully processed the country's first live Open Finance transaction in partnership with Abu Dhabi Commercial Bank (ADCB).",
  },
  {
    link: 'https://www.agbi.com/banking-finance/2025/08/adcb-open-finance-uae-will-transform-the-banking-experience/',
    source: 'AGBI',
    kind: 'news',
    date: '2025-08-01',
    dateLabel: '1 Aug 2025',
    imageSrc: '/images/articles/adcb-pay10.png',
    title: 'ADCB is proud to be the first certified bank in the UAE to complete a transaction with Pay10',
    text: "The UAE is on the cusp of a transformation in financial services, as the Central Bank of the UAE (CBUAE) rolls out its pioneering Open Finance initiative — a key pillar of the country's ambition to become a leading global financial hub.",
  },
  {
    link: 'https://ffnews.com/newsarticle/fintech/spare-open-finance-uae-approval/',
    source: 'FF News',
    kind: 'regulation',
    date: '2025-08-01',
    dateLabel: '1 Aug 2025',
    imageSrc: '/images/articles/spare.png',
    title: 'Spare Receives In-Principle Approval From the Central Bank of the UAE for Open Finance License',
    text: "Spare, a leading Open Finance infrastructure provider, has received In-Principle Approval (IPA) from the Central Bank of the UAE (CBUAE) to operate under the country's Open Finance regulatory framework.",
  },
  {
    link: 'https://www.openbankingexpo.com/news/spare-secures-uae-central-bank-approval-for-open-finance-license/',
    source: 'Open Banking Expo',
    kind: 'regulation',
    date: '2025-07-31',
    dateLabel: '31 Jul 2025',
    imageSrc: '/images/articles/spare-lic.png',
    title: 'Spare secures UAE central bank approval for Open Finance license',
    text: "Spare, a leading Open Finance infrastructure provider, has received in-principle approval from the Central Bank of the UAE (CBUAE) to operate under the country's Open Finance regulatory framework.",
  },
  {
    link: 'https://nymcard.com/2025/05/09/nymcard-launches-open-finance-services-under-cbuae-open-finance-regulation/',
    source: 'NymCard',
    kind: 'regulation',
    date: '2025-05-09',
    dateLabel: '9 May 2025',
    imageSrc: '/images/articles/nymcard.png',
    title: 'NymCard Launches Open Finance Services Under CBUAE Open Finance Regulation',
    text: "NymCard, the MENA region's leading embedded finance platform, today announced that it is now officially licensed to provide Open Finance services under the Central Bank of the UAE's Open Finance regulation.",
  },
]

function deriveId(link: string): string {
  return link.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 90)
}

export const articles: HomeArticle[] = rawArticles
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((a): HomeArticle => ({ ...a, id: deriveId(a.link) }))

export function countByKind(): Record<'all' | ArticleKind, number> {
  const counts: Record<'all' | ArticleKind, number> = {
    all: articles.length,
    'press-release': 0,
    'news': 0,
    'regulation': 0,
    'conference': 0,
  }
  for (const a of articles) counts[a.kind] += 1
  return counts
}
