import { Category, Post } from "@/types";

const CATEGORIES: Category[] = [
    'Tech', 'Politics Left', 'Politics Right', 'Climate', 'Business', 'Wellness', 'Science', 'Entertainment'
];

const TITLES = {
    'Tech': [
        "AI is taking over jobs faster than expected",
        "Why Rust is the future of systems programming",
        "The new iPhone features are disappointing",
        "Quantum computing explained for dummies",
        "Is Web3 finally dead?",
        "Silicon Valley's latest obsession: Immortality"
    ],
    'Politics Left': [
        "Universal Basic Income: A necessity?",
        "Tax the rich to save the planet",
        "Why unions are making a comeback",
        "Healthcare is a human right, not a privilege",
        "Addressing systemic inequality in 2026"
    ],
    'Politics Right': [
        "Why free markets solve poverty best",
        "The dangers of over-regulation",
        "Protecting traditional values in a modern world",
        "Fiscal responsibility is key to national survival",
        "Individual liberty vs collective security"
    ],
    'Climate': [
        "Global temperatures hit new record high",
        "Simple ways to reduce your carbon footprint",
        "Is nuclear energy green enough?",
        "The plastic crisis: deeper than we thought",
        "Ocean acidification threatens marine life"
    ],
    'Business': [
        "Startup strategies for a recession",
        "Remote work is here to stay",
        "Crypto markets crash again",
        "Leadership lessons from top CEOs",
        "Investing 101: Stocks vs Real Estate"
    ],
    'Wellness': [
        "Meditation techniques for busy people",
        "The benefits of a plant-based diet",
        "How scrolling affects your mental health",
        "Sleep better with these 5 tips",
        "Digital detox: Reclaiming your attention"
    ],
    'Science': [
        "New telescope reveals secrets of the early universe",
        "CRISPR gene editing: Ethical dilemmas",
        "Mars colonization: Closer than you think",
        "The physics of black holes",
        "Breakthrough in fusion energy"
    ],
    'Entertainment': [
        "Top 10 movies of the year so far",
        "Celebrity gossip: Who is dating who?",
        "The evolution of video game graphics",
        "Why streaming services are raising prices",
        "Music festivals are changing"
    ]
};

const COLORS: Record<Category, string> = {
    'Tech': 'bg-blue-500',
    'Politics Left': 'bg-rose-500',
    'Politics Right': 'bg-indigo-600',
    'Climate': 'bg-green-500',
    'Business': 'bg-slate-600',
    'Wellness': 'bg-teal-400',
    'Science': 'bg-purple-500',
    'Entertainment': 'bg-yellow-500' // Using yellow for pop culture
};

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function generatePosts(count: number = 100): Post[] {
    const posts: Post[] = [];

    for (let i = 0; i < count; i++) {
        const category = CATEGORIES[randomInt(0, CATEGORIES.length - 1)];
        const titles = TITLES[category];
        const title = titles[randomInt(0, titles.length - 1)];

        // Simulate ideological bias
        let ideological_score = 0;
        if (category === 'Politics Left') ideological_score = randomFloat(-1.0, -0.3);
        else if (category === 'Politics Right') ideological_score = randomFloat(0.3, 1.0);
        else if (category === 'Climate') ideological_score = randomFloat(-0.8, -0.1); // Leans left
        else if (category === 'Business') ideological_score = randomFloat(0.1, 0.7); // Leans right
        else ideological_score = randomFloat(-0.2, 0.2); // Neutral

        // Simulate engagement metrics (power law distribution approximation)
        const isViral = Math.random() > 0.9;
        const baseLikes = isViral ? randomInt(1000, 50000) : randomInt(10, 500);
        const likes = baseLikes;
        const shares = Math.floor(likes * randomFloat(0.05, 0.4));

        posts.push({
            id: `post-${i + 1}`,
            title: `${title} #${i + 1}`,
            category,
            ideological_score: parseFloat(ideological_score.toFixed(2)),
            likes,
            shares,
            reading_time: randomInt(1, 15),
            engagement_rate: parseFloat(randomFloat(0.01, 0.15).toFixed(3)),
            image_color: COLORS[category]
        });
    }

    return posts;
}

export const INITIAL_POSTS = generatePosts(100);
