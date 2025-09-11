// app/page.tsx

'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar'

// --- Data Structures ---
interface HouseData {
  houseNumber: number;
  title: string;
  description?: string | string[];
  beneficEffects?: string[];
  maleficEffects?: string[];
  keyNotes?: string[];
  remedies?: string[];
  customSections?: { title: string; points: string[] }[];
}

interface PlanetData {
  name: string;
  houses: HouseData[];
}

// --- ASTROLOGICAL DATA (Updated) ---
const astrologyData: PlanetData[] = [
  {
    name: 'Sun',
    houses: [
      {
        houseNumber: 1,
        title: 'Sun in House No. 1: A Royal Person',
        description: "The placement of the Sun in House No. 1 suggests a powerful and influential individual, often with a royal or authoritative demeanor. This position emphasizes the importance of religiosity as a sustaining force in the world.",
        customSections: [
          {
            title: 'Key Influences and Characteristics',
            points: [
              'Pious King: When the Sun is in Houses 1, 5, or 11, it can indicate a highly pious and king-like individual. They tend to rely on their own observations, respect traditional wisdom, and help the less fortunate.',
              "Saturn's Influence: An inherent influence of Saturn can cause disharmony, even for an otherwise powerful and religious person. This may lead to being trapped in negative habits. A remedy suggested is to feed crows with meat occasionally to mitigate Saturn's effects.",
              'Wealth and Prosperity: Wealth significantly increases with the Moon in House No. 2 and Saturn in House No. 11. Mercury and Venus together in a favorable aspect ensure lifelong prosperity. Even if the Sun is "eclipsed," excellent earnings are possible if Venus and Mercury aspect each other.',
              "Family and Relationships: Venus in House No. 7 can shorten the father's life. A spouse may experience poor health. Saturn in House No. 8 indicates the loss of multiple wives. Mars in House No. 5 can lead to the loss of sons. If House No. 7 is blank (dormant Sun), the native's fortune will shine after marriage (ideally before age 24).",
            ],
          },
        ],
        beneficEffects: [
          'King-like Officer: Possessing a mature outlook on life, they are inclined to build charitable institutions and wells.',
          'Self-Made & Wealthy: While they may not inherit property from their father, they will be self-made and wealthy.',
          'Philanthropic: Despite a potentially rash temper, they are philanthropic and helpful to the poor.',
          'Long Life: Both the native and their parents are predicted to have long lives.',
          'Power and Authority: They will be a person of significant power and authority, often earning through travel.',
        ],
        maleficEffects: [
          "Sun in House No. 1, 5, 11: Despite power, authority, and religious nature, there's a 25% chance of being trapped in vice habits due to Saturn's influence.",
          "Venus in House No. 7: Can lead to the father's early death and the wife's sickness.",
          'Mars in House No. 5: May result in the death of multiple sons.',
          'Saturn in House No. 8: May result in the death of multiple wives.',
          'House No. 7 Blank (Dormant Sun): If marriage doesn\'t occur before 24, the "self-awakened" Sun after starting a job or business will have malefic effects for 24 years.',
        ],
        remedies: [
          'Boring a Hand Pump: Installing a hand pump in the ancestral house can ward off evil effects after 10 years of its installation.',
        ],
      },
      {
        houseNumber: 2,
        title: 'Sun in House No. 2: A Generous and Powerful Individual',
        description: "The placement of the Sun in House No. 2 suggests an individual who is a generous friend and a powerful person. This position primarily highlights the significance of self-earned wealth as a source of auspiciousness and warns against receiving unearned benefits.",
        beneficEffects: [
          'Highly religious, possess a balanced nature, have average financial standing, and are helpful to friends and relatives.',
          'Comfort of Conveyance: The native will enjoy good conveyances if Sun is linked with Jupiter.',
          'Family Prosperity: The mother\'s brother will lead a good life, and the in-laws of daughters will be prosperous.',
          'Victory over Enemies: Enemies will perish quickly.',
        ],
        maleficEffects: [
          'Sun Alone in House No. 2: Negatively impacts items ruled by Venus such as the wife, potatoes, ghee, etc. Causes conflict with relatives due to the spouse. Litigations can lead to ruin.',
          'Reduced Longevity for Female Relatives: The wives of the native and their brothers, as well as sisters and the mother, may experience shorter lifespans.',
          'Moon in House No. 8: The native should strictly avoid accepting donations or engaging in corrupt practices.',
        ],
      },
      {
        houseNumber: 3,
        title: 'Sun in House No. 3: A Self-Made and Wealthy Individual',
        description: "The presence of the Sun in House No. 3 signifies a wealthy person whose fortune is primarily derived from self-earned wealth. This placement emphasizes the importance of good character.",
        beneficEffects: [
          'The native will be handsome and prosperous, earning well through their own efforts.',
          'The native is blessed with a long life, as are their children.',
          'They are rich and magnanimous, taking a harsh stance against falsehood.',
          'Proficient in Mathematics, Astrology, and related subjects if Mercury is well-placed.',
        ],
        maleficEffects: [
          'Weak Moon: This can lead to the native being vulnerable to theft or burglary, even during the daytime.',
          "Weak House No. 9: Suggests that the native's father and grandfather will be poor.",
          'Poor Mars: The Sun will yield malefic results for the native, though their own luck may not entirely abandon them.',
        ],
      },
      {
        houseNumber: 4,
        title: "Sun in House No. 4: A Toiler for Others, Keeper of Secret Wealth",
        description: "The placement of the Sun in House No. 4 indicates an individual who toils diligently to save for others, particularly their children. This position highlights the paradox of being known as a 'millionaire' while simultaneously battling internal greed.",
        beneficEffects: [
          'Clear-hearted, broad-minded, intelligent, and possess power and authority.',
          'Abundant Wealth and Health: There will be plenty of wealth and health, leading to a royal life.',
          'Compassionate Nature: They prefer to suffer themselves rather than allow others to suffer.',
        ],
        maleficEffects: [
          'Sun Afflicted: Can lead to greed, deception, theft, and bad habits. There\'s a risk of their own house catching fire.',
          "Saturn in House No. 7 or Malefic Rahu-Ketu-Saturn: The native's children will be unlucky and prone to vice. They might suffer from night blindness.",
        ],
        remedies: ['Giving alms/food to ten blind persons can help clear the "poison" of House No. 5 and House No. 10.'],
      },
      {
        houseNumber: 5,
        title: 'Sun in House No. 5: Master of Family Welfare',
        description: "The placement of the Sun in House No. 5 signifies a native who is the master of the welfare of their family, especially concerning children. It emphasizes that a pure heart, free from jealousy, is key to fulfilling desires.",
        beneficEffects: [
          'Financially benefited after the birth of a son.',
          'Often described as having double strength, being lucky, and having dutiful children.',
          'A kitchen located on the Eastern side of the house will be beneficial.',
        ],
        maleficEffects: [
          'Jupiter in House No. 10: Can lead to death or separation/divorce of a spouse, often resulting in more than one marriage.',
          'Saturn in House No. 3: Results in the death of sons, a troubled life, and financial difficulties.',
        ],
        remedies: ['Feeding a red-faced monkey will enhance the benefic effects of the Sun.'],
      },
      {
        houseNumber: 6,
        title: 'Sun in House No. 6: Contentment and Resilience',
        description: "The placement of the Sun in House No. 6 suggests a native who is content with their luck and experiences no anxiety for wealth. Their destiny is robust and ensures their sustenance.",
        beneficEffects: [
          'Lucky and contented.',
          'No one can deprive the native of their livelihood.',
          'Might have a rash temperament but are resourceful.',
        ],
        maleficEffects: [
          "Ketu's Adverse Impact: Items ruled by Ketu (birth of son, maternal uncle, finances) will be adversely affected.",
          "Obstinacy and Structural Damage: Being obstinate and breaking the back western wall of the house will adversely affect the native.",
          "Mars in House No. 10: The native's sons will die.",
        ],
        remedies: ['Giving jaggery (gur) or wheat to monkeys, or barley or wheat to ants.', 'Extinguishing the fire used for evening meals with milk.'],
      },
      {
        houseNumber: 7,
        title: 'Sun in House No. 7: A King Without a Crown',
        description: 'The placement of the Sun in House No. 7 describes an individual who is like "a king without a crown"—someone who toils diligently for prosperity but may not openly display their royal stature.',
        beneficEffects: [
          'Blessed with a house facing the roadside. They would be arrogant and brave.',
          'After the age of 34, the native will be blessed with wealth and family prosperity.',
          'The native will be intelligent and blessed with a chaste wife.',
        ],
        maleficEffects: [
          'Early downfall in the status of parents. Maternal and paternal sisters may also suffer losses.',
          'The son may be deaf or insane.',
          'If the native is rash-tempered and selfish, they will suffer downfall.',
        ],
        remedies: [
          'Maintain a clean and sober outlook.',
          'After preparing dinner, extinguish the firepan with milk.',
          'Start any work after taking a sip of sweet or ordinary water.',
        ],
      },
      {
        houseNumber: 8,
        title: 'Sun in House No. 8: The Truthful Saint',
        beneficEffects: [
            "Government favours will accrue from the 22nd year of life.",
            "Here the Sun makes the native truthful, saintly and king-like. Nobody would be able to harm him."
        ],
        maleficEffects: [
            "Mercury in the 2nd house will create economic crisis.",
            "Native will be short tempered, impatient & will have ill health."
        ],
        remedies: [
            "Never keep a white cloth in the house.",
            "Never live in the house facing south.",
            "Always eat something sweet and drink water before starting any new work.",
            "Throw copper coins in a burning pyre (Chita) whenever possible.",
            "Throw Gur (jaggery) in running water."
        ],
      },
      {
        houseNumber: 9,
        title: 'Sun in House No. 9: A Source of Strength and Lasting Fortune',
        description: 'The placement of the Sun in House No. 9 bestows a long life and a full family, signifying the Sun "after eclipse" becoming a source of strength for the entire lineage.',
        beneficEffects: [
          'The native is self-respecting, fortunate, and enjoys long prosperity.',
          'Possesses the power to cure patients, even if not a doctor.',
          'All members of their dynasty (lineage) will enjoy long lives.',
        ],
        maleficEffects: [
          'The native may be angry and experience discomfort from brothers.',
          'Accepting donations of silver or bribes will lead to inauspicious results.',
          'Rahu in House No. 1, 3, or 5: The native will lack faith in religion and will excessively hanker after pleasures.',
        ],
        remedies: ['Keeping a number of brass utensils at home can reduce the "poison" of Mercury.'],
      },
      {
        houseNumber: 10,
        title: 'Sun in House No. 10: Master of Health, Respect, and Wealth',
        description: "The placement of the Sun in House No. 10 indicates an individual who is a master of health, respect, and wealth. However, they may possess a suspicious nature. Proper conduct and respect for elders are crucial for sustained success.",
        beneficEffects: [
          'Experiences gain from the Government, comfort of servants and conveyances, and good health.',
          'Will possess wealth, respect, and good health.',
        ],
        maleficEffects: [
          "Early death of the mother and conflicts with authorities.",
          'Unfavorable for ancestral property and comforts from parents.',
          'Causes eyesight affliction and losses in businesses related to Saturn.',
        ],
        remedies: ['Care and respect for elders brings glory and success.', 'White or light pink headgear is auspicious.'],
      },
      {
        houseNumber: 11,
        title: 'Sun in House No. 11: The Religious but Self-Centered Gainer',
        description: "The placement of the Sun in House No. 11 describes an individual who is religious but may also be self-centered and greedy, yet possesses a forgiving nature. This house emphasizes the profound impact of dietary choices and moral conduct on one's progeny.",
        beneficEffects: [
          'If the native is a vegetarian, they will be blessed with a son at the earliest.',
          'If religious, they will lead a comfortable and long life.',
          'The native will be a man of power and authority.',
        ],
        maleficEffects: [
          'If the native is a meat-eater, it can lead to the loss of male offspring.',
          'Sun Alone in House No. 11: The native will lose their self-made house, suffer financial losses, and have sickly children.',
        ],
        remedies: ['Give up liquor and meat to be blessed with sons.', 'Carrots, radish, turnips, and almonds should be kept by the bedside at night and donated at a religious place in the morning.'],
      },
      {
        houseNumber: 12,
        title: "Sun in House No. 12: The Carefree King",
        description: `The placement of the Sun in House No. 12 describes a "carefree king" who enjoys comfortable sleep but is paradoxically "burnt by fire lit by others." This suggests an individual who may face problems originating from external sources.`,
        beneficEffects: [
          'Will experience a happy domestic life.',
          'The more religious they are, the more they will be blessed with comforts and wealth.',
          'Ketu in House No. 2: The native will start earning after the age of 24 years, and life will be pleasurable.',
        ],
        maleficEffects: [
          'May become sad, suffer from eye afflictions and mental problems.',
          'Sun is alone: Head injury, afflicted relations with spouse, and ill repute.',
          "Rahu-Ketu & Saturn in House No. 1: The native will become poor.",
        ],
        remedies: ['To avoid the evil effects, one should forgive enemies.', 'Service to Sadhus (holy persons) and rearing cows will be helpful.', 'Observe religiosity and do not give false evidence.'],
      },
    ],
  },
  {
    name: 'Moon',
    houses: [
        { houseNumber: 1, title: 'Moon in House No. 1: The Mother\'s Progeny', description: "The 1st house belongs to Mars and Sun. When Moon is placed here, it's influenced by three mutual friends. Such a native will be soft-hearted and inherit traits from their mother. As long as the native keeps his mother happy, he will prosper. Things and relatives of Mercury (e.g., green color, wife's sister) will be harmful. Burning or selling milk for profit is destructive. Serving water and milk freely ensures a long life (around 90 years) with honour and fame from the government.", remedies: ["Do not marry between the age of 24 and 27.", "Do not build a house from your earnings between 24 and 27.", "Keep away from the green colour and wife's sister.", "Do not keep a silver pot with a snout (Toti) in the house.", "Offer water to the roots of a Banyan tree.", "Insert copper nails on the four corners of your bed.", "When crossing a river, always throw coins in it for your children's welfare.", "Always keep a silver Thali in your house.", "Use Silver pots for drinking water or milk."] },
        { houseNumber: 2, title: 'Moon in House No. 2: The Fortunate Heir', description: "This house is influenced by Jupiter, Venus, and Moon. Moon gives very good results here. The native may not have sisters but will have brothers. He will receive his due share of parental properties and is assured of male offspring. He will receive a good education. Business associated with Moon's things will be highly advantageous. Ketu in the 12th house will cause an eclipse of the Moon here, depriving the native of either good education or male children.", remedies: ["A temple within the native's house may deprive the native of a male issue.", "Things associated with the Moon (silver, rice, mother's blessings) will prove very lucky.", "Offer green coloured clothes to small girls continuously for 43 days.", "Place a square piece of silver into the foundation of your house."] },
        { houseNumber: 3, title: 'Moon in House No. 3: The Wealthy Protector', description: "This house is influenced by Mars, Mercury, and Moon. Here the Moon proves highly beneficial, ensuring a long life and great wealth. If there are no planets in the 9th and 11th houses, Mars and Venus will give good results. With the advancement of the native's education, the economic condition of his father will deteriorate, but without affecting his education adversely. If the Moon is malefic, it will cause a great loss of wealth.", remedies: ["Offer in donation things associated with the Moon (silver, rice) after a daughter's birth, and things of the Sun (wheat, jaggery) after a son's birth.", "Do not make use of your daughter's money and wealth.", "Serve guests and others by offering them milk and water freely.", "Worship Goddess Durga and obtain the blessings of small girls by touching their feet after serving them food."] },
        { houseNumber: 4, title: 'Moon in House No. 4: The Honored and Powerful Heart', description: "This house is the permanent residence of the Moon, making it very strong and powerful. The use of things represented by the Moon will be highly beneficial. The native will be a reputed and honored person with a soft heart and all sorts of riches. He will inherit his mother's traits and face problems boldly. He will receive honor from the government and provide peace and shelter to others. Expenditure will augment income.", remedies: ["Selling milk for profit or burning it for making Khoya will have very adverse effects on income, lifespan, and mental peace.", "Adultery and flirtation will be seriously detrimental to reputation and wealth.", "The more the expenses, the more the income.", "Before beginning any new work, place a pitcher filled with milk in the house.", "For warding off evil from Jupiter in the 10th, visit places of worship with your grandfather."] },
        { houseNumber: 5, title: 'Moon in House No. 5: The Just Benefactor', description: "This house is influenced by the Sun, Ketu, and Moon. The native will adopt just means to earn wealth and will not yield to wrongdoing. He may not do well in business but will receive favors from the government. He will have 5 sons if Ketu is well placed. By his education, he will undertake measures for others' welfare, but others will not do good to him. The native will be destroyed if he becomes greedy, selfish, or fails to keep his plans a secret.", remedies: ["Keep control over your tongue; never use abusive language.", "Avoid becoming greedy and over-selfish.", "Deceit and dishonesty towards others will affect you adversely.", "Acting upon the advice of another person before trying to harm anybody will ensure very good results.", "Public service will enhance income and reputation."] },
        { houseNumber: 6, title: 'Moon in House No. 6: The Struggling Healer', description: "This house is affected by Mercury and Ketu. The native will receive education with obstacles and struggle to reap its benefits. The native could enliven a dying person by putting a few drops of water in his mouth. If the Moon is malefic and Mercury is in the 2nd or 12th, the native will have suicidal tendencies. If the Sun is in the 12th, the native or his wife will have severe eye defects.", remedies: ["Serve milk to your father with your own hands.", "Never take milk during the night.", "Do not offer milk as a donation, except at religious places.", "Digging wells for the public will destroy the issues, but digging them in a hospital or cremation ground will not be harmful."] },
        { houseNumber: 7, title: 'Moon in House No. 7: The Spiritual Poet', description: "This house belongs to Venus and Mercury. Educational achievements will be fruitful for earning wealth. He may not have properties but will always have cash. He has good potential for being a poet or astrologer, or else he will be characterless with a great love for mysticism. The 7th Moon also denotes conflict between the wife and mother and adverse effects in the milk trade. Disobedience towards the mother will cause tensions.", remedies: ["Avoid marriage in the 24th year of your life.", "Always keep your mother happy.", "Never sell milk or water for profit.", "Do not burn milk for making Khoya.", "Ensure that in marriage your wife brings silver and rice from her parents, equal to her weight."] },
        { houseNumber: 8, title: 'Moon in House No. 8: The Tested Scholar', description: "This house belongs to Mars and Saturn. The Moon here affects the education of the native adversely. If education goes well, the mother's life will be shortened; often the native loses both. The 7th Moon often deprives the native of parental properties. If there is a well or pond adjacent to the parental property, he will receive adverse results all through his life.", remedies: ["Avoid gambling and flirting.", "Perform Shraddha ceremony for your ancestors.", "Do not build a house by covering a well with a roof.", "Obtain blessings of the old and children by touching their feet.", "Bring water from a well within a cremation ground and place it in your house.", "Offer gram and pulse in places of worship."] },
        { houseNumber: 9, title: 'Moon in House No. 9: The Pious Pilgrim', description: "This house belongs to Jupiter, a great friend of the Moon. The native will imbibe traits of both planets: good conduct, soft-heartedness, and a religious bent of mind. He will live up to 75 years. A friendly planet in the 5th house will augment comforts from the son and interest in religious deeds. A friendly planet in the 3rd ensures a great increase in wealth.", remedies: ["Install things associated with the Moon within the house (e.g., a square piece of silver in an almirah).", "Serve laborers with milk.", "Offer milk to snakes and rice to fish."] },
        { houseNumber: 10, title: 'Moon in House No. 10: The Long-Lived Professional', description: "The 10th house is ruled by Saturn. Moon here ensures a long life of about 90 years. Moon and Saturn are inimical, so liquid medicines will be harmful. Milk will act as a poison if taken at night. If he is a surgeon, he will earn great fame and wealth. If the 2nd and 4th houses are empty, wealth will rain on him. If Saturn is in the 1st, the native's life will be destroyed by the opposite sex.", remedies: ["Visits to religious places will enhance fortune.", "Store natural rainwater or river water in a container in your house for 15 years.", "Avoid taking milk during the night.", "Milch animals will not be beneficial or auspicious in your house.", "Abstain from wine, meat, and adultery."] },
        { houseNumber: 11, title: 'Moon in House No. 11: The Challenged Gainer', description: "This house is influenced by Jupiter and Saturn. The Moon here will destroy its enemy Ketu's things, i.e., the sons of the native. The Moon is weakened by the combined power of Saturn and Ketu. If Ketu is in the 4th, the mother's life is endangered. Business associated with Mercury will be harmful. Starting house construction on Saturdays will be disastrous. Participating in marriage ceremonies on Fridays will damage fortunes.", remedies: ["Offer milk in a Bhairo Mandir and donate it liberally.", "Ensure the grandmother does not see her grandson.", "Heat a piece of gold in fire and put it in a glass of milk before drinking.", "Throw 125 pieces of sweet (Peda) in a river."] },
        { houseNumber: 12, title: 'Moon in House No. 12: The Intuitive Spender', description: "This house belongs to Moon's friend Jupiter. Moon here will have good effects on Mars but will harm Mercury and Ketu. Business associated with the house where Mars is placed will be highly beneficial. The Moon here causes a general fear of unforeseen troubles, destroying sleep and peace of mind. Ketu in the 4th house will become weak and affect the son and mother adversely.", remedies: ["Wearing Gold in ears, drinking milk after inserting a hot piece of gold in it, and visiting religious places will ward off evils.", "Never offer milk and food to religious saints/sadhus.", "Do not open a school or help children with free education."] },
    ],
  },
  {
    name: 'Mars',
    houses: [
      { houseNumber: 1, title: 'Mars in House No. 1: The Courageous Traditionalist', description: "Mars here makes the native devoted to ancestral traditions. They are logical, courageous, and difficult to defeat. Saturn-related activities (iron, machinery) are beneficial. Relationships require careful handling. They often face physical injuries." , remedies: ["Visit Hanuman temple on Tuesdays; offer Boondi Ladoos.", "Control anger and ego."]},
      { houseNumber: 2, title: 'Mars in House No. 2: The Fiery Speaker and Earned Wealth', description: "Gives harsh speech, which blocks opportunities and creates family disharmony. Health problems like gastric troubles may occur. Mars brings gains through financial institutions. Teeth problems are common. Arrogance must be avoided." , remedies: ["Remain humble and control speech.", "Eat something sweet (honey with water) before new ventures.", "Perform langar (food donation)."]},
      { houseNumber: 3, title: 'Mars in House No. 3: The Determined Communicator', description: "Strengthens courage, logic, and willpower. Natives defend their beliefs and appear stubborn. They do well in creative fields. If afflicted, may suffer from throat or thyroid issues. They never tolerate injustice." , remedies: ["Avoid keeping water elements in the northeast.", "Donate 3 Boondi Ladoos in a temple.", "Donate stationery supplies."]},
      { houseNumber: 4, title: 'Mars in House No. 4: The Emotionally Turbulent Warrior', description: "Mars is debilitated here. Causes stomach troubles, disturbed peace, property disputes, and strained sibling relations. Anger becomes self-destructive. Vehicles often suffer early damage. Natives feel discontent but have the determination to rebuild." , remedies: ["Offer honey mixed with milk and water at a Banyan tree root.", "Keep a gold square piece in pocket.", "Donate to police, army, or defense funds."]},
      { houseNumber: 5, title: 'Mars in House No. 5: The Passionate Creator', description: "Gives enthusiasm, intelligence, quick decision-making, and a strong digestive system. Natives excel in emergencies. However, they may misuse talents, face issues in education, love affairs, or progeny if afflicted. Retrograde Mars can bring miscarriages." , remedies: ["Keep promises; avoid arrogance.", "Respect father, bosses, and management.", "Plant and maintain a Neem tree."]},
      { houseNumber: 6, title: 'Mars in House No. 6: The Victorious Worker', description: "Gives courage, logical speech, and power over enemies, but causes intestinal or immune issues. Professionally, natives do well in Mercury-related work. Incidents like theft or snatching are possible." , remedies: ["Perform Saturn-related remedies for family comfort.", "Donate salt-based items; avoid sweets.", "Worship Lord Ganesha.", "Exchange gifts with siblings."]},
      { houseNumber: 7, title: 'Mars in House No. 7: The Ambitious and Demanding Partner', description: "Makes natives ambitious and wealthy but creates marital tensions. They may be over-possessive or argumentative. Partners tend to be courageous but impatient. Friction in household life is common." , remedies: ["Keep a silver brick at home.", "Offer sweets to sisters, widows, or daughters.", "Donate red lentils or Boondi Ladoos."]},
      { houseNumber: 8, title: 'Mars in House No. 8: The Agent of Sudden Transformation', description: "Causes sudden changes, property disputes, constipation, arthritis, or piles. Health concerns are common. The native honors commitments but loses people due to bluntness. They often complete ancestral karmas." , remedies: ["Seek blessings of widows and offer sweets.", "Eat meals in the kitchen.", "Offer tandoor-baked bread to dogs.", "Keep a dark room at home."]},
      { houseNumber: 9, title: 'Mars in House No. 9: The Adventurous Believer', description: "Makes natives rigid in beliefs, adventurous, and risk-taking, but prone to injuries. They should be careful in legal/property paperwork. Relationship troubles may occur due to poor communication. Blessings of elders are fortunate." , remedies: ["Respect father, boss, and Guru.", "Follow family rituals and traditions.", "Offer rice, milk, and jaggery at religious places."]},
      { houseNumber: 10, title: 'Mars in House No. 10: The Exalted Leader', description: "Mars is exalted here, giving courage, leadership, and prosperity. It benefits the family if the native is born poor. With Moon in 4th house, Lakshmi Yoga arises." , remedies: ["Avoid selling ancestral property or family gold.", "Help the blind or visually impaired.", "Stay humble and patient in work."]},
      { houseNumber: 11, title: 'Mars in House No. 11: The Ambitious Goal-Setter', description: "Gives risk-taking nature and ambition, but malefic influence causes family disputes and narrow-mindedness. They overthink the future and constantly chase goals. Ancestors’ karmas affect them." , remedies: ["Keep a small bottle of honey.", "Eat tandoor food with family once a month.", "Keep or care for a dog.", "Feed red-faced monkeys."]},
      { houseNumber: 12, title: 'Mars in House No. 12: The Impulsive Detached Soul', description: "May cause impulsive losses, bedroom troubles, and absent-mindedness. Charity and meditation are essential for balance. If benefics are well placed, natives gain through charity or foreign settlement. Otherwise, wealth may be lost forcefully." , remedies: ["Distribute sweets before leaving home.", "Plant a pomegranate tree on Tuesdays.", "Consume honey in the morning.", "Meditate regularly."]},
    ],
  },
  {
    name: 'Mercury',
    houses: [
        { houseNumber: 1, title: 'Mercury in House No. 1: The Diplomatic Administrator', description: "Makes the native kind, humorous, and diplomatic with administrative skill. They live long and may be selfish. Receives favor from the government. Daughters have luxurious lives. If Sun is with Mercury, the wife comes from a rich family. The native is adept at influencing others.", remedies: ["Keep away from green colored things.", "Avoid consumption of meat, eggs, and liquor.", "A business that requires sitting at one place is more beneficial."] },
        { houseNumber: 2, title: 'Mercury in House No. 2: The Intelligent Strategist', description: "Makes the native intelligent, self-centered, a destroyer of enemies, and a cheat. He provides happiness to his father and will be rich. Things represented by Mars and Venus will be beneficial.", remedies: ["Abstain from eggs, meat, and liquor.", "Association with sisters-in-law is harmful.", "Keeping sheep, goat, and parrots as pets is prohibited."] },
        { houseNumber: 3, title: 'Mercury in House No. 3: The Complicated Sibling', description: "Not considered good. The native receives benefits from his brother but is not beneficial to his brother. It adversely affects the income and condition of the father.", remedies: ["Clean your teeth with alum every day.", "Feed birds and donate a goat.", "Don't live in a south-facing house.", "Distribute medicines for asthma."] },
        { houseNumber: 4, title: 'Mercury in House No. 4: The Fortunate Trader', description: "The native is considered fortunate, dear to his mother, a good trader, and receives favors from the government. However, it may adversely affect the income and health of another person.", remedies: ["Wear a silver chain for mental peace and a golden chain for wealth.", "Apply a Kesar tilak for 43 days.", "Serve monkeys by offering jaggery."] },
        { houseNumber: 5, title: 'Mercury in House No. 5: The Wise and Wealthy Progeny', description: "Makes the native happy, wealthy, and wise. Spontaneous utterances from the native's mouth will certainly prove true. Gives very good results if Moon or any male planet is in houses 3, 5, 9, or 11.", remedies: ["Wear a copper coin in a white thread for riches.", "Serve cows for the happiness of your wife and good luck.", "A Gomukhi house (narrow at the front) is auspicious; a Shermukhi house (wider at the front) is disastrous."] },
        { houseNumber: 6, title: 'Mercury in House No. 6: The Self-Made Wordsmith', description: "Mercury is exalted here. The native will be a self-made man and will receive benefits from agricultural land, stationery, and printing. Good or evil words from his mouth will never go to waste. A north-facing house gives bad results.", remedies: ["Bury a bottle of Ganga water in agricultural land.", "Wife should wear a silver ring on her left hand.", "Starting important work in the presence of a girl or with flowers is auspicious."] },
        { houseNumber: 7, title: 'Mercury in House No. 7: The Powerful Diplomat', description: "Highly beneficial for others for whom the native wishes well. In a female horoscope, it produces good results. The native's pen wields more power than the sword. The sister of the native's wife will be very helpful.", remedies: ["Avoid any business in partnership.", "Avoid speculation.", "Do not keep a relationship with a sister-in-law of spoiled character."] },
        { houseNumber: 8, title: 'Mercury in House No. 8: The Troubled Soul', description: "Gives very bad results. The native lives a hard life, victimized by diseases. Income goes down between ages 32-34. If Rahu is also here, the native may face jail or hospitalization. Causes blood disorders, eye problems, and business loss.", remedies: ["Get an earthen pot filled with honey and bury it in a deserted area.", "Place milk or rainwater in a container on the roof.", "Put a ring in your daughter's nose."] },
        { houseNumber: 9, title: 'Mercury in House No. 9: The Restless Mind', description: "Provides very bad results as this house belongs to Jupiter (inimical). Causes continuous mental restlessness and defamation. If Moon, Ketu, and Jupiter are in certain houses, results are not advantageous.", remedies: ["Avoid the use of green color.", "Get your nose pricked.", "Offer a mushroom-filled earthen pot to a religious place.", "Do not accept any tabeez (amulet) from a sadhu or faqir."] },
        { houseNumber: 10, title: 'Mercury in House No. 10: The Favored Professional', description: "Provides favor from the government and good sources of livelihood. The native manages to get his work done in every way. Business flourishes in a Shermukhi house, but residency in such a house gives disastrous results.", remedies: ["Consumption of eggs, meat, and liquor is strictly prohibited.", "Offer rice and milk in religious places."] },
        { houseNumber: 11, title: 'Mercury in House No. 11: The Unrewarded Achiever', description: "Gives bad results due to enmity with Jupiter. At age 34, the native undertakes works of extreme foolishness, causing loss of wealth, peace, and reputation. However, the children will be well-educated and marry into rich families.", remedies: ["Wear a copper coin in the neck with a white thread.", "Do not keep a widowed sister or father's sister in your house.", "Avoid green color and emerald.", "Do not accept any Tabeez from a sadhu or faqir."] },
        { houseNumber: 12, title: 'Mercury in House No. 12: The Sleepless Thinker', description: "Destroys night's sleep and causes troubles. The native suffers from headaches but has a long life. If accompanied by Saturn, very good results follow. Daughters, sisters, and nieces will be unhappy while living in the native's house. Speculation is harmful. Marriage in the 25th year is harmful to the wife and father.", remedies: ["Throw a new empty pitcher in a river.", "Wear a stainless steel ring.", "Apply a Kesar tilak.", "Take advice from another person before starting any new work."] },
    ],
  },
  {
    name: 'Jupiter',
    houses: [
      {
        houseNumber: 1,
        title: 'Jupiter in House No. 1: The Noble and Fortunate Soul',
        beneficEffects: [
          'Blesses the native with rising fortune through diligence and higher learning.',
          'The personality is wealthy, religious, generous, and magnanimous.',
          'Strong support from mother and influential female figures.',
          'Health remains generally good; courageous and calm under pressure.',
        ],
        maleficEffects: [
          'If afflicted by Mercury, Venus, Saturn, or Rahu, the native may suffer illiteracy or poverty.',
          'Saturn’s influence after 42 can cause severe challenges.',
          'Challenges occur every 8th year; cursing others backfires heavily.',
        ],
        keyNotes: [
          'Jupiter performs best if House 7 is vacant and House 11 contains benefics.',
          'Life is blessed with education, nobility, and a visionary outlook.',
        ],
        remedies: [
          'Perform regular worship of Jupiter (Brihaspati) with yellow clothes and offerings.',
          'Avoid cursing others or speaking ill; maintain a charitable nature.',
          'Chant Jupiter’s mantra: “Om Gurave Namah” daily.',
        ],
      },
      {
        houseNumber: 2,
        title: 'Jupiter in House No. 2: The Guru of Wealth and Family',
        beneficEffects: [
          'Jupiter is most powerful here, becoming the “Guru” of family and wealth.',
          'Grants hidden wealth, lottery-like windfalls, and ancestral property benefits.',
          'Gains from in-laws, government, and father are strong.',
          'The native becomes a respected family man, teacher, and spiritual guru figure.',
        ],
        maleficEffects: [
          'Rahu or Ketu in Houses 2 or 8 can pollute Jupiter’s influence, risking family destruction.',
          'Saturn or Venus afflicting these houses cause health and financial problems.',
          'Mercury in the 9th house can bring jail or loss of prestige.',
        ],
        remedies: [
          'Propitiate malefic planets in the 8th house regularly.',
          'Give milk to serpents on Saturn transit through House 2.',
          'Early marriage (before 22) is auspicious.',
        ],
      },
      {
        houseNumber: 3,
        title: 'Jupiter in House No. 3: The Wise Communicator',
        beneficEffects: [
          'Native becomes an eloquent orator, skilled writer, and respected advisor.',
          'Gains goodwill and support from siblings and public.',
        ],
        maleficEffects: [
          'Saturn or Rahu in Houses 9 or 12 diminish Jupiter’s wisdom.',
          'Ego clashes with brothers, stubbornness, and misuse of knowledge.',
        ],
        remedies: ['Maintain a clean home temple, especially on Thursdays.', 'Feed jaggery to cows regularly.', 'Respect and serve elder brothers and siblings.'],
      },
      {
        houseNumber: 4,
        title: 'Jupiter in House No. 4: The Guardian of Home and Heritage',
        beneficEffects: ['Peaceful, harmonious family life and property gains.', 'Strong education and deep-rooted cultural and spiritual values.'],
        maleficEffects: ['Affliction from Moon or Mars causes tension.', 'Malefic planets in the 10th house can spoil home peace.', 'Problems with mother or property disputes.'],
        remedies: ['Install a water pot (Kalash) in the temple area.', 'Keep home free of clutter and negativity.', 'Show reverence and care for mother and maternal relatives.'],
      },
      {
        houseNumber: 5,
        title: 'Jupiter in House No. 5: The Blessed Teacher and Parent',
        beneficEffects: ['Blessing of wise and spiritual children.', 'Success in education, mantra siddhi, and spiritual initiation.'],
        maleficEffects: ['Affliction by Venus or Moon leads to intellectual confusion.', 'Rahu-Ketu axis spoils purity of thought and delay in childbirth.'],
        remedies: ['Avoid dishonesty with teachers and elders.', 'Donate turmeric on Thursdays.', 'Regularly recite Vishnu Sahasranama or Jupiter’s mantra.'],
      },
      {
        houseNumber: 6,
        title: 'Jupiter in House No. 6: The Wise Victor over Enemies',
        beneficEffects: ['Victory over enemies through wisdom and tact.', 'Success in legal fields, medicine, and healing professions.'],
        maleficEffects: ['Jupiter combust or afflicted by Sun/Mars causes health issues like diabetes or liver problems.', 'Ego clashes in service roles and enemies from within family.'],
        remedies: ['Feed yellow lentils or grams to cows on Thursdays.', 'Offer water to Peepal tree regularly.', 'Show respect and care for the poor and sick.'],
      },
      {
        houseNumber: 7,
        title: 'Jupiter in House No. 7: The Noble Partner',
        beneficEffects: ['Harmonious marriage with noble spouse.', 'High moral values and success in business partnerships.'],
        maleficEffects: ['Venus or Moon afflicted causes ego issues with spouse.', 'Marital discord and business losses due to pride.'],
        remedies: ['Avoid non-vegetarian food and alcohol.', 'Respect and support spouse unconditionally.', 'Worship Vishnu or Jupiter daily.'],
      },
      {
        houseNumber: 8,
        title: 'Jupiter in House No. 8: The Seeker of Hidden Knowledge',
        beneficEffects: ['Sudden financial gains, occult knowledge, and ancestral blessings.'],
        maleficEffects: ['Saturn or Ketu affliction causes fear, anxiety, and chronic health problems.', 'Financial losses due to misjudgment and ancestral curses.'],
        remedies: ['Light mustard oil lamp in Shani temple on Saturdays.', 'Donate yellow sweets in religious places.', 'Offer turmeric water to the Sun daily.'],
      },
      {
        houseNumber: 9,
        title: 'Jupiter in House No. 9: The Fortunate Disciple of Dharma',
        beneficEffects: ['Excellent luck, support from father and gurus.', 'Wisdom, dharma, and spiritual growth with long travels.'],
        maleficEffects: ['Affliction by Rahu, Saturn, or weak Sun leads to egoistic spirituality.', 'Conflicts with father or spiritual teachers.', 'Luck fails despite efforts.'],
        remedies: ['Donate books to poor children and libraries.', 'Serve father and gurus honestly.', 'Chant “Om Gurave Namah” regularly.'],
      },
      {
        houseNumber: 10,
        title: 'Jupiter in House No. 10: The Righteous Leader',
        beneficEffects: ['Government jobs, high positions, and spiritual reputation.', 'Success through righteous action and karma.'],
        maleficEffects: ['Affliction by Rahu/Ketu or Venus causes career fall.', 'Mars in 4th house spoils moral decisions.', 'Disrespect from subordinates and pride problems.'],
        remedies: ['Light cow ghee diya daily in temple.', 'Avoid improper donations.', 'Apply yellow sandalwood tilak regularly.'],
      },
      {
        houseNumber: 11,
        title: 'Jupiter in House No. 11: The Fulfiller of Great Desires',
        beneficEffects: ['Fulfillment of desires and great income.', 'Large, spiritual friend circle and network.'],
        maleficEffects: ['Debilitated Jupiter or Ketu/Saturn spoils morals.', 'Overexpectation causes depression.', 'Hypocrisy and delayed success.'],
        remedies: ['Water banana trees on Thursdays.', 'Donate yellow pulses to needy.', 'Practice honesty in friendships.'],
      },
      {
        houseNumber: 12,
        title: 'Jupiter in House No. 12: The Seeker of Moksha',
        beneficEffects: ['Strong spiritual growth and intuition.', 'Possible foreign settlement for good cause.', 'Connection to moksha and deep dream knowledge.'],
        maleficEffects: ['Saturn or Moon affliction causes wasteful expenses.', 'Imprisonment, defamation, and spiritual arrogance.', 'Blind donations harm finances.'],
        remedies: ['Donate yellow clothes to Brahmins.', 'Sleep with a yellow handkerchief under pillow.', 'Practice meditation and keep a dream journal.'],
      },
    ],
  },
  {
    name: 'Venus',
    houses: [
        { houseNumber: 1, title: 'Venus in House No. 1: The Charismatic Self', description: "Venus controls romance, Saturn controls sight. Benefic Saturn suggests marriage before employment, but marriage at 25 can bring loss. Malefic Mercury harms progeny; malefic Sun spoils family life. The effects depend on whether it forms a 'Crow Line' (malefic) or 'Fish Line' (benefic).", beneficEffects: ["Royal affairs flourish.", "Spouse rules the family.", "Longevity (~100 yrs) and many children if Mars is in 6/7/12.", "Becomes a Sufi inside, reckless outside."], maleficEffects: ["Philandering youth leads to destruction.", "Malefic Venus may harm the mother.", "Casanova tendencies, poor health, destructive behavior."], remedies: ["Donate barley or 'satnaja' (7-grain mix).", "Control sexual urges.", "Follow elders' advice."] },
        { houseNumber: 2, title: 'Venus in House No. 2: The Embodiment of Lakshmi', description: "House No. 2 is the seat of prosperity. Venus here gives the effects of Saturn in House 9. Living in a house that is narrow at the front and broad at the rear brings prosperity. Dealing in gold brings misfortune.", beneficEffects: ["No need to seek favors; divine support is always available.", "Every 8th year, wealth increases. In-laws are supportive.", "Venus is Lakshmi incarnate; respect for the spouse brings benefits.", "Outwardly saintly but romantic within; 60 years of wealth."], maleficEffects: ["Living in a House No. 3 or dealing in gold brings misery.", "In a woman's chart, the husband may be impotent.", "House 8 blank leads to no children and destruction via prostitutes or widows."], remedies: ["Take Mars-based medicines to build blood and vitality."] },
        { houseNumber: 3, title: 'Venus in House No. 3: The Respected Partner', description: "Venus in the 3rd makes men loved by women, yet their own wife is dominant and brave. Gains can come even from bad women if the wife is respected. Venus here protects from death, theft, and cheating.", beneficEffects: ["Wife supports like a male friend and brings prosperity.", "A pious spouse and no theft if Ketu is benefic.", "Pilgrimage at 20 and parental help if Mercury is benefic."], maleficEffects: ["Bad health and diseased family life if Jupiter is in the 9th.", "Decline in wealth post-34 if Mercury is in the 11th.", "Loss in youth (16–34 yrs) if Mars or Mercury is malefic."], remedies: ["Respect your wife, even if she dominates."] },
        { houseNumber: 4, title: 'Venus in House No. 4: The Seeker of Illicit Love', description: "Illicit affairs bring disrepute. If Houses 2 & 7 are blank and Venus is alone, reputation is damaged despite having two wives. The condition of the roof affects the wife's health.", beneficEffects: ["Frequent and joyful travels; comforts grow after 4 years of marriage.", "Wife enjoys life but may not give comfort to the husband.", "Encourages flirtation and romantic encounters."], maleficEffects: ["A vagabond wife and loss of character if Mercury/Ketu is malefic.", "Covering or constructing over a well leads to childlessness.", "Marriage at certain ages is inauspicious (22, 24, 25, etc.).", "Daughters may become a cause of ruin."], remedies: ["Male marrying the same woman twice simulates the 'two wives' condition.", "Use Mars-related items/business to help wife’s health.", "Throw Jupiterian items in a well.", "Create a pond on the rooftop."] },
        { houseNumber: 5, title: 'Venus in House No. 5: The Prolific Parent', description: "This is the house of progeny, love, and dharma. Service of cows and Moon remedies bring great gains. Character defines wealth—licentiousness ruins everything.", beneficEffects: ["Many children, a lucky spouse, and wealth through Venusian articles.", "Native becomes a lover of the motherland.", "Religious guide and chaste spouse if Mercury, Saturn, Ketu are alive."], maleficEffects: ["Polluted or misaligned Venus leads to destruction.", "Enemies (Sun, Moon, Rahu) in Houses 1/7 bring misfortune.", "Love marriage may lead to unfaithful children."], remedies: ["Serve a cow and maintain a clean character.", "Wash private parts with curd or milk to invite wealth."] },
        { houseNumber: 6, title: 'Venus in House No. 6: The Debilitated Giver', description: "Reflects the pursuit of money and domination over relatives. The native may be immoral but charming, with good health. Doesn't gain from government jobs but may benefit from a woman who does.", beneficEffects: ["Losses due to helping others, but a comfortable old age.", "Gains from siblings, father, and relations.", "Moon alive neutralizes Venus's malefic effects."], maleficEffects: ["Denial of progeny, eunuch tendencies if Saturn/Ketu is malefic.", "Wife being barefoot can lead to denial of children.", "Death of father in childhood; enemies are active until the 42nd year."], remedies: ["Wife should wear socks or a gold head ornament.", "Donate 2 gold ornaments at marriage for lifelong progeny benefit.", "Keep a silver bar or articles in the home."] },
        { houseNumber: 7, title: 'Venus in House No. 7: The Influential Companion', description: 'Venus is highly benefic if alone. Marriage at 25 brings a comfortable married life. The wife is beautiful and virtuous. Partnership with the wife\'s relatives leads to loss.', beneficEffects: ["Long life (83–94 yrs), gain through travels.", "Wife: beautiful, virtuous, non-interfering.", "Saturn’s aspect is helpful, lots of work-related travel."], maleficEffects: ["Loss through opposite sex, licentious nature ruins self.", "Conjunction with Jupiter: trouble in childbirth, business loss.", "Moon in 1st is unlucky."], remedies: ["Avoid partnerships with wife’s relatives.", "Don’t keep a white cow.", "Keep a cool, kind heart and avoid excessive sexual indulgence."] },
        { houseNumber: 8, title: 'Venus in House No. 8: The Harsh but Potent Influence', description: 'This position brings harsh and mysterious influences. The wife’s harsh words are impactful and should be respected. The native is religious and gets victory over enemies.', beneficEffects: ["Religious, gets victory over enemies.", "Gains through own efforts, contented with self-earnings."], maleficEffects: ["Loss of progeny, wealth, health of spouse.", "Character under question, diseases like syphilis.", "In-laws are harmed if the 2nd house is blank."], remedies: ["Donate barley or bury it under the earth (to save wife’s health).", "Donation of cow, copper coin or flower in a sewer.", "Avoid accepting donations; offer prayers in temples."] },
        { houseNumber: 9, title: 'Venus in House No. 9: The Wealthy Toiler', description: 'Wealth comes through self-efforts, not from forefathers. The native is intelligent and industrious. Malefic in the 25th year, causing loss via marriage, cows, or farming.', beneficEffects: ["Wealth through self-efforts.", "Visits to holy places.", "Venus acts 9× benefic if a mare, well, silver/honey is kept in the house."], maleficEffects: ["Financial loss, wife diseased from the day of marriage.", "Malefic Jupiter-Venus – obstruction in childbirth.", "Blood-related diseases, misery due to malefic Mars."], remedies: ["Bury a square silver piece in a Neem tree.", "Wife wears red bangles or thread.", "Prayer, donation of a cow."] },
        { houseNumber: 10, title: 'Venus in House No. 10: The Saturn-like Professional', description: 'Venus acts as Saturn. The native enjoys comforts, travel, and good health of the wife. A rich and comfortable old age if the western wall of the house is kuchcha (earthen).', beneficEffects: ["Comforts, travel, gardens, orchards, good health of wife.", "Rich & comfortable old age if the western wall of the house is unpaved.", "Moon alone in 2/4/7 brings vehicles and wealth."], maleficEffects: ["Excessive lust leads to destruction of progeny.", "Relations with other women cause trouble through children in old age.", "Eye problems in wife, diseases in private parts."], remedies: ["Wash wife’s private parts with curd if there are progeny issues.", "Donate a Kapila cow.", "Avoid clever, Saturn-like actions."] },
        { houseNumber: 11, title: 'Venus in House No. 11: The Handsome Wealth-Lover', description: 'The native is handsome, wealthy, and lives a comfortable life. However, excess may cause impotence. The wife may be unhappy from the day of marriage.', beneficEffects: ["Handsome, wealthy, comfortable life.", "Earnings for 12 yrs guaranteed.", "Daughters bring wealth."], maleficEffects: ["Wife from marriage day is unhappy, questionable character.", "Changeable nature, hidden actions, deceiving looks."], remedies: ["Kapila cow donation.", "Wife should not control household finance.", "Avoid excessive indulgence in pleasure."] },
        { houseNumber: 12, title: 'Venus in House No. 12: The Helpful Deity in Crisis', description: 'The spouse is lucky, and comforts flow for 37 years post-marriage. Royal favors and a good sex life are indicated. However, the spouse can be diseased and unhappy if Venus is afflicted.', beneficEffects: ["Spouse is lucky, comforts flow for 37 years post-marriage.", "Royal favours, comforts from wife, good sex life.", "Conjugal bliss, long life.", "Gains through music, poetry."], maleficEffects: ["Spouse diseased, unhappy.", "Excess masturbation, night discharge, urinary diseases.", "Loss of virility, dual sex (if Mars + Saturn afflict)."], remedies: ["Spouse should bury a blue flower in the jungle in the evening.", "Respect spouse, avoid blue cows, donate mustard oil.", "Medicines of Saturn (fish oil, iron) and Moon (milk, silver) for 40–43 days."] },
    ],
  },
  {
    name: 'Saturn',
    houses: [
        { houseNumber: 1, title: 'Saturn in House No. 1: The Long-Lived Ascetic', description: "1st house is influenced by Sun and Mars. Saturn here gives good results only when houses 3, 7, or 10 are not occupied by inimical planets. If Mercury, Venus, Rahu, or Ketu is in the 7th house, Saturn gives good results. A hairy body indicates poverty if Saturn is malefic. The native has a long life.", remedies: ["Abstinence from alcohol and non-vegetarian meals.", "Burying Surma in the ground is beneficial for promotion.", "Serving a monkey leads to prosperity.", "Offering sweet milk to the roots of a banyan tree gives good results for education and health."] },
        { houseNumber: 2, title: 'Saturn in House No. 2: The Wise and Just Treasurer', description: "The native will be wise, kind, and just, with a religious temperament. He will enjoy wealth. The planets in the 8th house will determine if Saturn is benefic or malefic. After the native's marriage, his in-laws will face problems if Saturn is malefic.", remedies: ["Going barefoot to a temple for forty-three days.", "Putting a tilak of curd or milk on the forehead.", "Offering milk to a snake."] },
        { houseNumber: 3, title: 'Saturn in House No. 3: The Intuitive and Healthy Individual', description: "Saturn gives good results in this house. The native will be healthy, wise, and very intuitive. If wealthy, he will have few male family members, and vice versa. As long as he abstains from wine and non-vegetarianism, he will enjoy a long and healthy life.", remedies: ["Serve three dogs.", "Distribute eye medicines for free.", "Keeping a dark room in the house is highly beneficial."] },
        { houseNumber: 4, title: 'Saturn in House No. 4: The Devoted but Tested Homemaker', description: "This house belongs to Moon, so results are mixed. The native will be devoted to his parents and loving. When health is bad, using Saturn-related things gives good results. Someone in the family will be in the medical profession. Drinking wine, killing snakes, or laying the house foundation at night gives very bad results if Saturn is malefic.", remedies: ["Offer milk to a snake and rice to a crow or buffalo.", "Pour milk into a well.", "Pour rum into running water."] },
        { houseNumber: 5, title: 'Saturn in House No. 5: The Proud and Delayed Parent', description: "This house belongs to Sun (inimical). The native will be proud. He should not construct a house until age 48, or his son will suffer. He should live in a house bought by his son. Keeping Jupiter and Mars articles in the ancestral house helps children's welfare. A hairy body suggests dishonesty.", remedies: ["Distribute salty things while celebrating a son's birthday.", "Offer almonds in the temple and keep half at home."] },
        { houseNumber: 6, title: 'Saturn in House No. 6: The Nocturnal Achiever', description: "Work related to Saturn done at night will be beneficial. Marriage after 28 produces good results. If Ketu is well-placed, the native enjoys wealth, profitable journeys, and happiness from children. Bringing Saturn-related things (leather, iron) home gives bad results if Saturn is malefic.", remedies: ["Serve a black dog and offer it meals.", "Offer coconut and almonds in running water.", "Serving snakes is advantageous for children's welfare."] },
        { houseNumber: 7, title: 'Saturn in House No. 7: The Profitable and Prosperous Partner', description: "This house is influenced by Mercury and Venus (friends), so Saturn gives very good results. Professions like machinery and iron will be profitable. If the native maintains a good relationship with his wife, he will be rich, prosperous, and have a long, healthy life. Adultery and wine make Saturn malefic.", remedies: ["Bury a flute filled with sugar in a deserted place.", "Serve a black cow."] },
        { houseNumber: 8, title: 'Saturn in House No. 8: The Long-Lived Survivor', description: "No planet is auspicious here. The native has a long life, but his father's lifespan is short, and his brothers become foes. Saturn gives bad results if Mercury, Rahu, and Ketu are malefic in the horoscope.", remedies: ["Keep a square piece of silver.", "Put milk in water and sit on a stone or wood while taking a bath."] },
        { houseNumber: 9, title: 'Saturn in House No. 9: The Successful Engineer and Traveler', description: "The native will have three houses and be a successful tour operator or civil engineer. He will enjoy a long, happy life, and his parents will also be happy. The native will have a son, though he will be born late. Being helpful to others ensures Saturn gives good results.", remedies: ["Offer rice or almonds in running water.", "Work associated with Jupiter (gold, Kesar) and Moon (silver, cloth) will give good results."] },
        { houseNumber: 10, title: 'Saturn in House No. 10: The Ambitious Authority', description: "This is Saturn's own house, where it gives good results. The native will enjoy wealth and property as long as he does not get a house constructed. He will be ambitious and receive favors from the government. He should work while sitting at one place to enjoy the benefits.", remedies: ["Go to the temple.", "Abstinence from meat, wine, and eggs.", "Offer food to ten blind people."] },
        { houseNumber: 11, title: 'Saturn in House No. 11: The Shrewd Earner', description: "Fate will be decided at the age of forty-eight. The native will never be childless. He will earn money by shrewdness and deceit. Saturn's results depend on the position of Rahu and Ketu.", remedies: ["Before an important work, place a vessel of water and drop oil or wine on the earth for forty-three days.", "Abstain from drinking and maintain a good moral character."] },
        { houseNumber: 12, title: 'Saturn in House No. 12: The Wealthy Recluse', description: "Saturn gives good results here. The native will not have enemies and will have many houses. His family and business will increase, and he will be very rich. Saturn becomes malefic if the native drinks wine, becomes non-vegetarian, or if the dark room in the house is illuminated.", remedies: ["Tie twelve almonds in a black cloth, place it in an iron pot, and keep it in a dark room."] },
    ],
  },
  {
    name: 'Rahu',
    houses: [
        { houseNumber: 1, title: 'Rahu in House No. 1: The High-Achieving King', description: "1st house is like a throne. Rahu here gives the result of an exalted Sun. The native achieves a position higher than his qualifications. It will give good results unless Mars, Saturn, and Ketu are weak. If malefic, never take electric equipment or blue/black clothes from in-laws, as it affects the son.", remedies: ["Offer 400 gm lead in running water.", "Wear silver in the neck.", "Mix barley in milk (1:4 ratio) and offer in running water.", "Offer coconut in running water."] },
        { houseNumber: 2, title: 'Rahu in House No. 2: The Royal but Risky Path', description: "If benefic, one gets money, prestige, and lives like a king with a long life. If Jupiter is benefic, early life is wealthy. If malefic, the native is poor, has a bad family life, and suffers from intestinal disorders. He is killed by a weapon and cannot save money.", remedies: ["Keep a solid silver ball in the pocket.", "Wear things associated with Jupiter (gold, yellow cloth).", "Keep cordial relations with your mother.", "After marriage, do not take any electric equipment from in-laws."] },
        { houseNumber: 3, title: 'Rahu in House No. 3: The Fearless and Clairvoyant Friend', description: "This is the 'Pukka Ghar' of Rahu. If benefic, the native enjoys great wealth and a long life. He is fearless, a loyal friend, and a clairvoyant. He is never issueless and is victorious over enemies. If malefic, his brothers and relatives waste his money. He has defective speech.", remedies: ["Never keep ivory or things of ivory in the house."] },
        { houseNumber: 4, title: 'Rahu in House No. 4: The Intelligent Spender', description: "This house belongs to Moon (enemy of Rahu). If benefic, the native is intelligent, wealthy, and spends on good things. Pilgrimages are beneficial. After marriage, in-laws may become rich. If malefic and Moon is weak, the native and his mother suffer from poverty.", remedies: ["Wear silver.", "Offer 400 gm coriander or almonds in flowing water."] },
        { houseNumber: 5, title: 'Rahu in House No. 5: The Wise but Challenged Progeny', description: "This house belongs to Sun. If benefic, the native is rich, wise, and enjoys good health and income. He would be a devout philosopher. If malefic, it leads to abortions. After a son's birth, the wife's health suffers for twelve years. If Jupiter is also in the 5th, the native's father is in trouble.", remedies: ["Keep an elephant made of silver.", "Abstain from wine, non-vegetarianism, and adultery.", "Remarry your wife."] },
        { houseNumber: 6, title: 'Rahu in House No. 6: The Exalted and Victorious Mind', description: "Here Rahu is exalted and gives very good results. The native is free of all troubles, intelligent, and victorious. He spends money on clothes. When malefic, he harms his brothers or friends. Sneezing while going to work gives bad results.", remedies: ["Keep a black dog.", "Keep a lead nail in your pocket.", "Never harm your brothers/sisters."] },
        { houseNumber: 7, title: 'Rahu in House No. 7: The Rich but Troubled Partner', description: "The native will be rich, but the wife would suffer. He would be victorious over his enemies. Marriage before 21 is inauspicious. He has good relations with the government but will have losses in businesses connected with Rahu (e.g., electrical equipment). Suffers from headaches.", remedies: ["Never marry before 21 years of age.", "Offer six coconuts in a river."] },
        { houseNumber: 8, title: 'Rahu in House No. 8: The Spender in a Secret World', description: "Gives malefic effect. The native spends money uselessly on court cases. Family life is adversely affected. If Mars or Saturn is benefic and in the 1st or 8th house, the native will be very rich.", remedies: ["Keep a square piece of silver.", "Keep Saunf (aniseed) under the pillow while sleeping.", "Do not work in the electricity or power department."] },
        { houseNumber: 9, title: 'Rahu in House No. 9: The Unconventional Believer', description: "Influenced by Jupiter. Good relations with brothers and sisters are fruitful. If the native is not religious, his progeny would be useless. Professions influenced by Saturn are profitable. Chances of begetting a son are less if the native files court cases against blood relatives.", remedies: ["Use a Tilak of saffron daily.", "Wear gold.", "Always keep a dog (it saves progeny).", "Have good relations with your in-laws."] },
        { houseNumber: 10, title: 'Rahu in House No. 10: The Brave and Respected Professional', description: "Keeping one's head uncovered gives the effect of a debilitated Rahu. Results depend on Saturn's position. If Saturn is auspicious, the native is brave, long-lived, rich, and respected. If Rahu is with Moon, it gives Raja Yoga. If malefic, it adversely affects the mother and the native's health.", remedies: ["Use a blue or black cap.", "Cover one's head.", "Offer 4kg of 'khand' (unrefined sugar) in a temple or flowing water.", "Feed blind people."] },
        { houseNumber: 11, title: 'Rahu in House No. 11: The Gain from Unexpected Sources', description: "The native could be rich as long as his father is alive. He gets money from mean people. After his father's death, he should wear gold. If malefic, the native has bad relations with his father or may even kill him. May have diseases of the ear, spine, or urinary problems.", remedies: ["Wear iron. Use a silver glass for drinking water.", "Never take any electric equipment as a gift.", "Do not keep blue sapphire, ivory, or elephant-shaped toys."] },
        { houseNumber: 12, title: 'Rahu in House No. 12: The Insomniac and Spender', description: "Gives mental troubles and insomnia. Leads to excessive expenditure on sisters and daughters. If with enemies, it becomes impossible to make ends meet. It can lead to false allegations and suicidal thoughts. Telling lies makes Rahu more malefic.", remedies: ["Take your meals in the kitchen itself.", "Keep Saunf (aniseed) and khand (sugar) under the pillow for a good night's sleep."] },
    ],
  },
  {
    name: 'Ketu',
    houses: [
        { houseNumber: 1, title: 'Ketu in House No. 1: The Laborious and Spiritual Self', description: "If auspicious, the native is laborious, rich, and happy but troubled by his progeny. He may fear frequent transfers, but they are often postponed. He is beneficial for his father and guru. If malefic, he suffers from headaches, and his wife has health problems. If Saturn is malefic, it destroys the father and guru.", remedies: ["Feed jaggery (gur) to monkeys.", "Apply saffron as Tilak.", "If offspring is troubled, donate a black and white blanket to a temple."] },
        { houseNumber: 2, title: 'Ketu in House No. 2: The Wandering Inheritor', description: "If benefic, one gets paternal property and fruitful travels. Venus gives good results. If malefic, one travels to dry areas and wanders from place to place. Income is good, but so is expenditure. If Moon or Mars is in the 8th house, life is short with serious problems at age 16 or 20.", remedies: ["Apply turmeric or saffron as tilak.", "One should not be of loose character.", "Religiously visiting temples makes Ketu give good results."] },
        { houseNumber: 3, title: 'Ketu in House No. 3: The God-Fearing Sibling', description: "If benefic, his children are good, and the native is god-fearing. A son is born before 24 and is good for wealth and longevity. If malefic, he loses money in litigation and gets separated from his wife. Living in a south-facing house causes serious problems regarding children.", remedies: ["Use saffron as tilak.", "Wear gold.", "Offer jaggery and rice in flowing water."] },
        { houseNumber: 4, title: 'Ketu in House No. 4: The Pious Son', description: "If benefic, the native is god-fearing and lucky for his father and guru. A son is born only after getting the guru's blessings. He never has a shortage of money. If malefic, the native is unhealthy, his mother is troubled, and there is a loss of happiness. May suffer from diabetes.", remedies: ["Keep a dog.", "Wear silver for peace of mind.", "Offer yellow things in flowing water."] },
        { houseNumber: 5, title: 'Ketu in House No. 5: The Fortunate Progeny', description: "If Jupiter, Sun, or Moon is in 4th, 6th, or 12th, financial condition is excellent with five sons. Ketu becomes benefic after 24. If malefic, the native suffers from asthma. Sons will not survive. Livelihood starts after 24.", remedies: ["Donate milk and sugar.", "The remedies of Jupiter would be useful."] },
        { houseNumber: 6, title: 'Ketu in House No. 6: The Good Adviser', description: "This is the 'Pucca' house of Ketu. The native is a good adviser. If Jupiter is benefic, the native has a long life and a peaceful life. If malefic, the maternal uncle suffers. People turn into enemies without reason. Suffers from skin diseases.", remedies: ["Wear a golden ring in the finger of the left hand.", "Drink milk with saffron and wear gold in the ear.", "Heat a gold rod, dip it in milk, then drink it for mental peace and longevity.", "Keep a dog."] },
        { houseNumber: 7, title: 'Ketu in House No. 7: The Early Achiever', description: "If benefic, the native gets the wealth of forty years by age twenty-four. Wealth increases in proportion to children. Enemies are frightened. If malefic, the native is usually ill, makes false promises, and is troubled by enemies until 34. Abusing others destroys the native.", remedies: ["Never make a false promise, be proud, or abusive.", "Use saffron as Tilak.", "In case of serious trouble, use the remedies of Jupiter."] },
        { houseNumber: 8, title: 'Ketu in House No. 8: The Karmic Transformer', description: "If benefic, a son is born at 34 or after the marriage of a sister/daughter. If malefic, the wife has ill health. A son will not be born or may die. May suffer from diabetes or urinary problems. After 26, family life suffers.", remedies: ["Keep a dog.", "Donate a black and white blanket in a temple.", "Worship lord Ganesha.", "Wear gold in the ear."] },
        { houseNumber: 9, title: 'Ketu in House No. 9: The Exalted and Obedient Soul', description: "Ketu is exalted here. The native is obedient and lucky. He earns wealth through his own labor. The son is able to guess the future. Spends a big part of life in a foreign land. If malefic, suffers from urinary problems, back pain, and problems in legs. Sons keep on dying.", remedies: ["Keep a dog.", "Establish a rectangular piece of gold anywhere in the house.", "Wear gold in the ear.", "Respect elders, especially father-in-law."] },
        { houseNumber: 10, title: 'Ketu in House No. 10: The Opportunistic Professional', description: "The effect depends on Saturn's nature. If benefic, the native is lucky, concerned about himself and opportunist. His father dies early. If he forgives his brothers, he will progress. If malefic, suffers from urinary and ear problems and pain in bones. Domestic life is troubled.", remedies: ["Keep a silver pot full of honey in the house.", "Keep a dog, specially after age 48.", "Avoid adultery.", "Use remedies of Moon and Jupiter."] },
        { houseNumber: 11, title: 'Ketu in House No. 11: The Wealthy but Worried Gainer', description: "Considered very good; gives wealth. Wealth earned is more than paternal wealth, but one worries about the future. If malefic, there are abdomen problems. The more he worries, the more troubled he is. The grandmother or mother suffers if Saturn is also malefic.", remedies: ["Keep a black dog.", "Wear an onyx or emerald."] },
        { houseNumber: 12, title: 'Ketu in House No. 12: The Exalted Benefactor', description: "Ketu is exalted here. The native is wealthy and achieves a big position. Spends on good works. If malefic, one buys land from an issueless person and becomes issueless himself. Killing dogs gives malefic results.", remedies: ["Worship Lord Ganesha.", "Do not have a loose character.", "Keep a dog.", "Keep Saunf (aniseed) and khand (sugar) under the pillow for a good night's sleep."] },
    ],
  },
];


// --- REACT COMPONENTS ---

// Navbar Component


// Accordion Item Component
const AccordionItem: React.FC<{
  houseData: HouseData;
  isOpen: boolean;
  onClick: () => void;
}> = ({ houseData, isOpen, onClick }) => {
  const { houseNumber, title, description, beneficEffects, maleficEffects, keyNotes, remedies, customSections } = houseData;
  
  if (!description && !beneficEffects && !maleficEffects && !remedies) {
    return null; // Don't render if there's no data
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        type="button"
        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={onClick}
      >
        <span className="text-gray-800 dark:text-gray-200">{houseNumber}. {title}</span>
        <svg
          className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            {typeof description === 'string' && <p className="mb-4 text-gray-600 dark:text-gray-300 italic">{description}</p>}
            {Array.isArray(description) && (
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
                {description.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            )}
            
            {customSections && customSections.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{section.title}</h3>
                     <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {section.points.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </div>
            ))}

            {beneficEffects && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">🟢 Benefic Effects</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {beneficEffects.map((effect, index) => <li key={index}>{effect}</li>)}
                    </ul>
                </div>
            )}
            {maleficEffects && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">🔴 Malefic Effects</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {maleficEffects.map((effect, index) => <li key={index}>{effect}</li>)}
                    </ul>
                </div>
            )}
            {keyNotes && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-2">🌟 Key Notes</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {keyNotes.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                </div>
            )}
            {remedies && (
                 <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">🧿 Remedies</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {remedies.map((remedy, index) => <li key={index}>{remedy}</li>)}
                    </ul>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

// Main Page Component
export default function AstrologyPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(astrologyData[0]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setOpenAccordion(null); // Close accordion when changing planets
  };

  const handleAccordionClick = (houseNumber: number) => {
    setOpenAccordion(openAccordion === houseNumber ? null : houseNumber);
  };
  
  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">
        <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
            Vedic Planetary Results
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select a planet to view its effects in all 12 houses.
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-2 mb-10">
          {astrologyData.map((planet) => (
            <button
              key={planet.name}
              onClick={() => handlePlanetSelect(planet)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out
                ${
                  selectedPlanet.name === planet.name
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {planet.name}
            </button>
          ))}
        </nav>

        <main>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            Results for {selectedPlanet.name}
          </h2>
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
            {selectedPlanet.houses.map((house) => (
              <AccordionItem
                key={house.houseNumber}
                houseData={house}
                isOpen={openAccordion === house.houseNumber}
                onClick={() => handleAccordionClick(house.houseNumber)}
              />
            ))}
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Astrological Insights. All information is for educational purposes only.</p>
        </footer>
      </div>
    </div>
  );
}