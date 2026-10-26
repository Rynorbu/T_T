// All the words on the site live here — edit freely to make it more personal.

export const NAME_FIRST = 'Yeshi'
export const NAME_LAST = 'Tshomo'
export const NAME_TIBETAN = 'ཡེ་ཤེས་མཚོ་མོ།'

const p = (n) => `${import.meta.env.BASE_URL}photos/p${String(n).padStart(2, '0')}.jpg`

export const photos = [
  { src: p(1), caption: 'in a sea of cosmos', tag: 'kira' },
  { src: p(2), caption: 'holding the prettiest one', tag: 'kira' },
  { src: p(3), caption: 'sunflowers tried to compete', tag: 'kira' },
  { src: p(4), caption: 'the valley, and that smile', tag: 'travel' },
  { src: p(5), caption: 'golden hour in the pines', tag: 'travel' },
  { src: p(6), caption: 'summer, softly', tag: 'travel' },
  { src: p(7), caption: 'the whole valley behind her', tag: 'travel' },
  { src: p(8), caption: 'pure sunshine energy', tag: 'moods' },
  { src: p(9), caption: 'befriends every dog', tag: 'travel' },
  { src: p(10), caption: 'laughing in the sun', tag: 'kira' },
  { src: p(11), caption: 'quiet moments', tag: 'kira' },
  { src: p(12), caption: 'on stage, glowing', tag: 'kira' },
  { src: p(13), caption: 'pink suits her', tag: 'kira' },
  { src: p(14), caption: 'sleepy & sweet', tag: 'moods' },
  { src: p(15), caption: 'café daydreams', tag: 'moods' },
  { src: p(16), caption: 'night-time elegance', tag: 'moods' },
  { src: p(17), caption: 'city afternoons', tag: 'moods' },
  { src: p(18), caption: 'thinking about… football?', tag: 'moods' },
  { src: p(19), caption: 'that wink 😉', tag: 'moods' },
  { src: p(20), caption: 'effortlessly cool', tag: 'moods' },
]

export const traits = [
  'radiant', 'kind-hearted', 'graceful', 'funny', 'gentle',
  'brave', 'beautiful', 'one of a kind', 'sunshine', 'precious',
]

export const chapters = [
  {
    num: '01',
    title: 'Cosmos Season',
    text: 'Fields full of pink and white flowers — and somehow she is still the first thing you notice.',
    photos: [1, 2, 3],
  },
  {
    num: '02',
    title: 'Mountains & Valleys',
    text: 'From the Punakha valley to the wide open meadows — every landscape looks better with her in it.',
    photos: [4, 7, 9],
  },
  {
    num: '03',
    title: 'Golden Afternoons',
    text: 'Pine trees, warm light, soft dresses. The kind of days that feel like a dream.',
    photos: [5, 6, 14],
  },
  {
    num: '04',
    title: 'All Her Moods',
    text: 'Playful, thoughtful, cheeky, calm — every version of her is a favourite.',
    photos: [19, 18, 8],
  },
]

export const reasons = [
  { icon: '🌸', text: 'Her smile can turn a cloudy day into sunshine.' },
  { icon: '✨', text: 'She carries herself with so much grace.' },
  { icon: '😂', text: 'She is genuinely, effortlessly funny.' },
  { icon: '🐶', text: 'Even the biggest dogs trust her instantly.' },
  { icon: '💙', text: 'She looks stunning in every colour of kira.' },
  { icon: '🏔️', text: 'She finds beauty in every place she goes.' },
  { icon: '🤍', text: 'She makes people feel seen and cared for.' },
  { icon: '🌻', text: 'She is soft and strong at the same time.' },
  { icon: '💫', text: 'There is simply nobody else like her.' },
]

export const letter = [
  'Hi Yeshi,',
  'I know this might be a little unexpected — but I wanted to make something that shows how special I think you are.',
  'Your smile, your laugh, the way you light up every place you go… it is hard not to notice. Somewhere along the way, I started looking forward to every moment with you.',
  'I am not asking for anything big. I just wanted you to know that someone sees how wonderful you are, and thinks about you more than they probably should.',
  'If you ever feel like getting to know me a little more, I would really like that. And no matter what — keep shining, and never stop being you.',
]

export const signature = '— YR ✿'
