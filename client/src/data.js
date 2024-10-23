import { TbBeach, TbPool } from "react-icons/tb";
import {
  GiCampingTent,
  GiBarn,
  GiBoatFishing,
  GiLighthouse,
  GiCactus,
  GiForestCamp,
  GiWindmill,
  GiTreehouse,
} from "react-icons/gi";
import {
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
  FaTableTennis,
  FaHotTub,
} from "react-icons/fa";
import { FaTent, FaTableCellsColumnLock } from "react-icons/fa6";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond, IoGameController } from "react-icons/io5";
import {
  MdMicrowave,
  MdHouseboat,
  MdBungalow,
  MdBalcony,
  MdYard,
  MdPets,
  MdPhoneBluetoothSpeaker,
} from "react-icons/md";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiMusicSpell,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Arctic",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    label: "Yurt",
    icon: <FaTent />,
    description: "This property is on an Yurt!",
  },
  {
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    label: "Bubble Tent",
    icon: <GiCampingTent />,
    description: "This property is unique!",
  },
  {
    label: "Amazing Pools",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Boat house",
    icon: <MdHouseboat />,
    description: "This property boat house property!",
  },
  {
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    label: "OW Bungalow",
    icon: <MdBungalow />,
    description: "This property is in a Bungalow!",
  },
  {
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    label: "Light House",
    icon: <GiLighthouse />,
    description: "This property is in light house environment!",
  },
  {
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    label: "Treehouse",
    icon: <GiTreehouse />,
    description: "This property is in a treehouse!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "A room",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A shared room",
    description:
      "Guests sleep in a room or common area that may be shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Hot Tub",
    icon: <FaHotTub />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Game room",
    icon: <IoGameController />,
  },
  {
    name: "Smart lock",
    icon: <FaTableCellsColumnLock />,
  },
  {
    name: "Bluetooth Speaker",
    icon: <MdPhoneBluetoothSpeaker />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "Tennis",
    icon: <FaTableTennis />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Sauna",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Music Library",
    icon: <GiMusicSpell />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Scenic view",
    icon: <MdBalcony />,
  },
  {
    name: "Outdoor fire pit",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />,
  },
  {
    name: "Pet allowed",
    icon: <MdPets />,
  },
];

export const experiences = [
  {
    id: 1,
    name: "Tropical Escape : Your Private Paradise Awaits",
    host: "Hosted by Jolene",
    status: "Sold out",
    image: [
      "/assets/i1.jpg",
      "/assets/i2.jpg",
      "/assets/i3.jpg",
      "/assets/i4.jpg",
      "/assets/i5.jpg",
    ],
    location: "Ari Atoll, Maldives",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Discover unparalleled luxury in the Maldives, where crystal-clear waters meet pristine white sands. Enjoy breathtaking sunsets, world-class amenities, and the ultimate in relaxation at your exclusive island retreat.",
    highlights: [
      "Start your day with a sunrise stroll along your secluded beach.",
      "Experience gourmet dining with fresh, locally-sourced seafood and tropical flavors.",
      "Unwind with traditional Maldivian spa treatments and island-inspired wellness rituals.",
      "Meditate with the calming sound of the ocean waves as your backdrop.",
    ],
    reviews: [
      {
        name: "Joel",
        location: "Morrisville, North Carolina",
        rating: 5,
        review:
          "Sophia made our stay in the Maldives truly magical. With breathtaking ocean views, private beach access, and impeccable service, every moment was a slice of paradise. Ideal for an unforgettable tropical escape.",
        yearsOnAirbnb: "4 months ago",
      },
    ],
  },
  {
    id: 2,
    name: "Charming Lakeside Home with Scenic Vistas",
    host: "Hosted by Noel",
    status: "Available",
    image: [
      "/assets/i6.jpg",
      "/assets/i7.jpg",
      "/assets/i8.jpg",
      "/assets/i9.jpg",
      "/assets/i10.jpg",
    ],
    location: "Lake Tahoe, California",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Experience serene lakefront living in this beautiful home, offering breathtaking water views and direct access to the lake. Perfect for relaxation and outdoor activities, this property is a peaceful retreat with modern amenities.",
    highlights: [
      "Stunning Lake Views: Breathtaking vistas of the lake right from the property.",
      "Private Waterfront Access: Direct access to the lake for swimming, kayaking, or relaxing by the water.",
      "Tranquil Setting: A peaceful retreat with the soothing sounds of the lake and nature.",
      "Spacious Outdoor Deck: Perfect for enjoying sunrise or sunset views over the water.",
      "Cozy Fire Pit: Ideal for evening gatherings and marshmallow roasting by the lake.",
      "Elegant Interior Design: Stylish and comfortable living spaces that complement the lakeside ambiance.",
      "Exclusive Use: A private haven with all amenities focused on relaxation and comfort.",
    ],
    reviews: [
      {
        name: "Emily",
        location: "London, UK",
        rating: 5,
        review:
          "The MomentStay team provided an unforgettable stay at this beautiful lakeside retreat. With stunning views, direct lake access, and exceptional service, the experience was both relaxing and luxurious. Perfect for a tranquil escape or lakeside adventure.",
        yearsOnAirbnb: "2 weeks ago",
      },
    ],
  },
  {
    id: 3,
    name: "Arctic Retreat: A Unique Blend of Cozy and Cool",
    host: "Hosted by Luca",
    status: "Available",
    image: [
      "/assets/i11.jpg",
      "/assets/i12.jpg",
      "/assets/i13.jpg",
      "/assets/i14.jpg",
      "/assets/i15.jpg",
    ],
    location: "Reykjavík, Iceland",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Discover a magical Arctic escape with this charming retreat. Surrounded by breathtaking snow-covered landscapes and the mesmerizing Northern Lights, this cozy cabin offers a unique and serene winter adventure.",
    highlights: [
      "Stunning snow-covered landscapes",
      "Northern Lights views",
      "Cozy, well-appointed cabin",
      "Serene winter adventure",
    ],
    reviews: [
      {
        name: "John",
        location: "Tromsø, Norway",
        rating: 5,
        review:
          "Staying at this Arctic retreat was a once-in-a-lifetime experience. Surrounded by breathtaking snow-covered landscapes and the mesmerizing Northern Lights, it was truly magical. The cozy cabin was perfect for warming up after days of snow adventures. An ideal getaway for anyone seeking serene winter wonderlands and unforgettable natural phenomena.",
        yearsOnAirbnb: "1 month ago",
      },
    ],
  },
  {
    id: 4,
    name: "Dive into Luxury with This Stunning Pool House",
    host: "Hosted by Hans",
    status: "Available",
    image: [
      "/assets/i16.jpg",
      "/assets/i17.jpg",
      "/assets/i18.jpeg",
      "/assets/i19.jpg",
      "/assets/i20.jpg",
    ],
    location: "Palm Springs, California",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Dive into luxury with a stay at this stunning pool house. Enjoy multiple swimming pools, stylish outdoor living spaces, and unparalleled relaxation in a beautiful setting designed for ultimate comfort and leisure.",
    highlights: [
      "Multiple stunning swimming pools",
      "Stylish outdoor living areas",
      "Luxurious poolside amenities",
      "Exceptional relaxation and comfort",
    ],
    reviews: [
      {
        name: "Samantha",
        location: "Miami, FL",
        rating: 5,
        review:
          "The pool facilities at this property were nothing short of spectacular. From the infinity pool with panoramic city views to the serene private pool surrounded by lush gardens, every swim was a delight. The poolside service and amenities were top-notch, making it the perfect place to relax and soak up the sun. An exceptional choice for pool lovers seeking luxury and relaxation.",
        yearsOnAirbnb: "2 weeks ago",
      },
    ],
  },
  {
    id: 5,
    name: "Opulent Luxury Home: Where Elegance and Comfort Converge",
    host: "Hosted by Yuki",
    status: "Available",
    image: [
      "/assets/i21.jpg",
      "/assets/i22.jpg",
      "/assets/i23.jpg",
      "/assets/i24.jpg",
      "/assets/i25.jpg",
    ],
    location: "Monaco, French Riviera",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Indulge in unparalleled luxury with a stay in this exquisite home. Featuring opulent design, top-notch amenities, and breathtaking views, this property offers an extraordinary experience of elegance and sophistication.",
    highlights: [
      "Opulent design and furnishings",
      "Top-of-the-line amenities",
      "Stunning panoramic views",
      "Exceptional comfort and elegance",
    ],
    reviews: [
      {
        name: "Alexander",
        location: "Beverly Hills, CA",
        rating: 5,
        review:
          "This luxury home exceeded all expectations with its opulent design and top-of-the-line amenities. The spacious rooms, exquisite furnishings, and private spa created an atmosphere of unparalleled comfort and sophistication. The stunning views from every angle added to the sense of grandeur. A truly extraordinary stay for those seeking elegance and exclusivity in a prime location.",
        yearsOnAirbnb: "3 weeks ago",
      },
    ],
  },
  {
    id: 6,
    name: "Step into History with This Captivating Windmill House",
    host: "Hosted by Aisha",
    status: "Sold out",
    image: [
      "/assets/i26.jpg",
      "/assets/i27.jpg",
      "/assets/i28.jpg",
      "/assets/i29.jpg",
      "/assets/i30.jpg",
    ],
    location: "Cambridge, England",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Stay in a beautifully restored windmill and experience a unique blend of history and comfort. Enjoy panoramic views and a charming atmosphere that captures the essence of traditional Dutch architecture.",
    highlights: [
      "Unique windmill architecture",
      "Panoramic countryside views",
      "Cozy, thoughtfully designed interiors",
      "Authentic Dutch experience",
    ],
    reviews: [
      {
        name: "Olivia",
        location: "Zaanse Schans, Netherlands",
        rating: 5,
        review:
          "Staying in this charming windmill house was a delightful experience. The unique architecture and historical character provided an authentic Dutch experience. Inside, the cozy and thoughtfully designed interiors offered comfort and warmth, while the picturesque views of the surrounding countryside were simply enchanting. A perfect blend of tradition and comfort for a memorable getaway.",
        yearsOnAirbnb: "1 month ago",
      },
    ],
  },
  {
    id: 7,
    name: "Embrace Classic Charm in This Traditional Residence",
    host: "Hosted by David",
    status: "Available",
    image: [
      "/assets/i31.jpg",
      "/assets/i32.jpg",
      "/assets/i33.jpg",
      "/assets/i34.jpg",
      "/assets/i35.jpg",
    ],
    location: "Chiang Mai, Thailand",
    details: {
      guests: "2 Guests",
      bedroom: "3 Bedrooms",
      bed: "5 Beds",
      bathroom: "2 Bathrooms",
    },
    description:
      "Experience the elegance of traditional design with a stay in this charming home. Surrounded by serene landscapes, enjoy the warmth of authentic craftsmanship and timeless aesthetics.",
    highlights: [
      "Classic architectural elements",
      "Authentic and elegant furnishings",
      "Serene and picturesque surroundings",
      "Warm, inviting atmosphere",
    ],
    reviews: [
      {
        name: "Sophia",
        location: "Kyoto, Japan",
        rating: 5,
        review:
          "This traditional home offered a beautifully serene and authentic experience. The meticulous design and attention to detail, from the tatami mats to the shoji screens, created a calming and elegant atmosphere. The garden and koi pond added to the tranquil setting, making it an ideal retreat for those seeking to immerse themselves in Japanese culture and aesthetics. An exceptional stay that beautifully blends tradition with comfort.",
        yearsOnAirbnb: "1 month ago",
      },
    ],
  },
];

export const selectedCategories = [
  { label: "Bubble Tent", img: "/assets/bt.jpg" },
  { label: "Light House", img: "/assets/lh.jpg" },
  { label: "Yurt", img: "/assets/yurt.jpeg" },
  { label: "Treehouse", img: "/assets/treehouse.jpg" },
  { label: "OW Bungalow", img: "/assets/ob.jpg" },
  { label: "Boat House", img: "/assets/bh.jpg" },
];
