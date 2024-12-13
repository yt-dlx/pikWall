import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      title: "The Star and the Traveler",
      content:
        "In a vast galaxy, a lone traveler wandered, searching for meaning. One night, a bright star caught his eye, its light a beacon in the darkness. The star spoke, 'Why do you wander so?' The traveler replied, 'I seek purpose.' The star twinkled and said, 'Your journey is your purpose. Each step you take lights up the universe in ways you cannot see.' The traveler smiled, realizing that his search itself brought light to the cosmos. From that day on, he traveled with renewed spirit, knowing that every journey has value, even if the destination is unknown.",
      moral: "The journey itself is often more important than the destination.",
      images: [
        { src: "/placeholder.svg?height=300&width=533", alt: "Galaxy 1" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Traveler" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Star" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Cosmic Journey" }
      ]
    },
    {
      id: 2,
      title: "The Nebula's Embrace",
      content:
        "In the heart of a vibrant nebula, two gas clouds drifted, one bright and one dim. The bright cloud boasted of its brilliance, while the dim cloud listened quietly. As eons passed, the bright cloud's glow began to fade, having spent its energy too quickly. The dim cloud, however, had been slowly gathering stardust and growing stronger. It now shone with a soft, enduring light. The once-bright cloud realized that true radiance comes not from momentary brilliance, but from patient growth and inner strength.",
      moral: "Slow and steady growth often leads to lasting success.",
      images: [
        { src: "/placeholder.svg?height=300&width=533", alt: "Nebula 1" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Bright Cloud" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Dim Cloud" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Enduring Light" }
      ]
    },
    {
      id: 3,
      title: "The Cosmic Orchestra",
      content:
        "In the depths of space, celestial bodies moved in a grand, silent dance. A young comet, dazzled by its own brilliance, zoomed recklessly through the cosmos, disrupting the harmony. The wise old planets tried to guide it, but the comet ignored their advice. One day, it collided with an asteroid belt, losing much of its tail. Humbled, it learned to move in rhythm with the others. To its surprise, as part of the cosmic orchestra, its light shone even brighter, creating beautiful patterns across the galaxy.",
      moral: "True harmony comes from cooperation, not individual brilliance.",
      images: [
        { src: "/placeholder.svg?height=300&width=533", alt: "Cosmic Dance" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Reckless Comet" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Asteroid Collision" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Cosmic Harmony" }
      ]
    },
    {
      id: 4,
      title: "The Lonely Black Hole",
      content:
        "At the center of a galaxy, a massive black hole felt lonely and misunderstood. Everything that came near was pulled in, never to return. The black hole longed for companionship but didn't know how to interact without destruction. A brave photon approached, dancing at the event horizon. Instead of being consumed, it taught the black hole about balance and gentle interaction. The black hole learned to harness its power responsibly, becoming a nurturing force that helped form new stars and planets, finding joy in creation rather than consumption.",
      moral: "Even the most powerful forces can learn gentleness and creation.",
      images: [
        { src: "/placeholder.svg?height=300&width=533", alt: "Lonely Black Hole" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Brave Photon" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Event Horizon Dance" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Cosmic Creation" }
      ]
    },
    {
      id: 5,
      title: "The Stardust Sisters",
      content:
        "Two particles of stardust, born from the same supernova, drifted apart across the universe. One became part of a beautiful nebula, admired by astronomers. The other joined a humble planet, becoming part of its core. The nebula stardust felt superior, but the planet stardust found purpose in supporting life. Eons later, when the planet evolved intelligent beings who gazed upon the nebula, the sisters realized that beauty and purpose can take many forms, and that their separation had allowed them to play unique, equally important roles in the cosmic story.",
      moral: "Every part of existence, no matter how small, has its own importance and beauty.",
      images: [
        { src: "/placeholder.svg?height=300&width=533", alt: "Supernova Birth" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Beautiful Nebula" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Humble Planet" },
        { src: "/placeholder.svg?height=300&width=533", alt: "Cosmic Perspective" }
      ]
    }
  ]);
}
