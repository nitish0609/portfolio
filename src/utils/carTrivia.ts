// src/utils/carTrivia.ts

export const carTriviaBank = [
    {
        q: "Which legendary '80s homologation car was famously known as 'Godzilla'?",
        opts: ["Porsche 959", "Nissan Skyline R32 GT-R", "Ferrari F40", "Audi Quattro"],
        a: 1,
        fact: "The R32 GT-R dominated Group A racing so completely that the Australian press nicknamed it 'Godzilla, the monster from Japan'."
    },
    {
        q: "The Lexus LFA features a V10 engine that revs so fast, engineers had to...",
        opts: ["Use a digital tachometer", "Limit the top speed digitally", "Build it entirely from titanium", "Liquid cool the steering wheel"],
        a: 0,
        fact: "The 4.8L V10 revs from idle to 9,000 RPM in 0.6 seconds. An analog needle physically couldn't keep up."
    },
    {
        q: "What was the first production car to break the 200 mph barrier?",
        opts: ["McLaren F1", "Ferrari F40", "Lamborghini Countach", "Jaguar XJ220"],
        a: 1,
        fact: "The Ferrari F40 hit 201.4 mph in 1987, making it the first production car to shatter the mythical 200 mph mark."
    },
    {
        q: "The iconic Porsche 911 engine architecture is famous for being:",
        opts: ["Front-mounted V8", "Mid-mounted V12", "Rear-mounted Flat-6", "Front-mounted Inline-6"],
        a: 2,
        fact: "The 911's rear-engine, flat-six 'boxer' layout is legendary, creating unique handling dynamics."
    },
    {
        q: "In the modern hypercar holy trinity (P1, LaFerrari, 918 Spyder), which relies on a naturally aspirated V12?",
        opts: ["McLaren P1", "Porsche 918 Spyder", "Ferrari LaFerrari", "None of them"],
        a: 2,
        fact: "The LaFerrari pairs an electric motor with an absolutely screaming 6.3L NA V12, whereas the P1 and 918 use V8s."
    },
    {
        q: "The legendary McLaren F1 engine design required engine bay insulation made of what material?",
        opts: ["Carbon Fiber", "Titanium", "Gold Foil", "Asbestos"],
        a: 2,
        fact: "The exhaust temperatures were so high that McLaren lined the engine bay with highly reflective real gold foil."
    },
    {
        q: "What massive engine did Bugatti put in the Veyron to achieve 253mph?",
        opts: ["Quad-Turbo V12", "Twin-Turbo V8", "Quad-Turbo W16", "Naturally Aspirated V16"],
        a: 2,
        fact: "The Veyron features an 8.0L W16 engine with four turbochargers and 10 radiators to manage the immense heat."
    },
    {
        q: "Which Japanese sports car famously advertised a 'gentlemen’s agreement' horsepower rating of 276hp but made much more?",
        opts: ["Toyota Supra Mk4", "Honda NSX", "Nissan Skyline GT-R", "All of the above"],
        a: 3,
        fact: "Japanese automakers agreed to cap advertised power at 276hp (280 PS) for safety, though cars like the Supra easily produced 320+ hp from the factory."
    },
    {
        q: "Which iconic '90s supercar was developed with input from F1 legend Ayrton Senna?",
        opts: ["Honda NSX", "Ferrari F50", "Jaguar XJ220", "Bugatti EB110"],
        a: 0,
        fact: "Senna heavily contributed to the suspension tuning and chassis rigidity of the incredible first-gen Honda NSX at the Suzuka circuit."
    },
    {
        q: "What engine layout powered the Mazda RX-7?",
        opts: ["Inline-4", "Flat-4", "Rotary Engine", "V6"],
        a: 2,
        fact: "The RX-7 used a twin-rotor Wankel engine (like the legendary 13B) which produces incredibly smooth power up to massive RPMs."
    },
    {
        q: "The legendary Ford GT40 was originally built specifically to defeat which manufacturer at Le Mans?",
        opts: ["Porsche", "Ferrari", "Aston Martin", "Chevrolet"],
        a: 1,
        fact: "After Enzo Ferrari backed out of a deal to sell his company to Ford, Henry Ford II ordered the GT40 built solely to crush Ferrari."
    },
    {
        q: "What is the firing order of a classic American cross-plane V8 (e.g., Chevy Small Block)?",
        opts: ["1-8-4-3-6-5-7-2", "1-5-3-6-2-4", "1-2-3-4-5-6-7-8", "1-12-5-8-3-10-6-7-2-11-4-9"],
        a: 0,
        fact: "1-8-4-3-6-5-7-2 is the iconic firing sequence responsible for the classic, burbling American V8 soundtrack."
    },
    {
        q: "Which modern sports car shares its platform and engine heavily with the BMW Z4?",
        opts: ["Toyota GR Supra", "Subaru BRZ", "Nissan Z", "Mercedes AMG GT"],
        a: 0,
        fact: "The A90 Supra shares the B58 inline-6 and foundational chassis with the BMW Z4, sparking endless 'Nice BMW' memes."
    },
    {
        q: "The Pagani Zonda is famous for its exhaust note, powered by a naturally aspirated V12 built by:",
        opts: ["Ferrari", "Lamborghini", "Mercedes-AMG", "Cosworth"],
        a: 2,
        fact: "Horacio Pagani secured an agreement to use bespoke, incredibly loud naturally aspirated V12 engines built by Mercedes-AMG."
    },
    {
        q: "Which car holds the record for the most overall victories at the 24 Hours of Le Mans?",
        opts: ["Audi", "Ford", "Ferrari", "Porsche"],
        a: 3,
        fact: "Porsche is the undisputed king of Le Mans with 19 overall victories."
    },
    {
        q: "The original Lamborghini internal code name 'LP400' referred to which iconic wedge-shaped supercar?",
        opts: ["Miura", "Countach", "Diablo", "Murcielago"],
        a: 1,
        fact: "The LP400 Countach defined the 1970s and 80s bedroom poster era with its extreme geometric wedge design and scissor doors."
    },
    {
        q: "What does the 'GTO' in Ferrari 250 GTO stand for?",
        opts: ["Grand Touring Omologato", "Gran Turismo Omologato", "Grand Touring Original", "Gara Turismo Otto"],
        a: 1,
        fact: "It translates to Grand Touring Homologated, indicating it was certified (homologated) by the FIA to race in the Group 3 Grand Touring Car category."
    },
    {
        q: "Which component of the Bugatti Chiron takes over a minute to be fully CNC machined from a solid block of aluminum?",
        opts: ["Engine Block", "Brake Calipers", "Wiper Arm", "Wheels"],
        a: 1,
        fact: "The massive 8-piston front brake calipers are precision-machined from a single block of aerospace-grade aluminum to handle stopping from 260+ mph."
    },
    {
        q: "The iconic Subaru WRX STI is most famous for its association with which colored wheels?",
        opts: ["White", "Black", "Gold", "Bronze"],
        a: 2,
        fact: "World Rally Blue combined with signature Gold BBS wheels is the unmistakable, classic look of the Subaru rally heritage."
    },
    {
        q: "Which American muscle car was named after a supposed 'small, vicious animal that eats Mustangs'?",
        opts: ["Dodge Charger", "Chevrolet Camaro", "Pontiac GTO", "Plymouth Barracuda"],
        a: 1,
        fact: "When journalists asked Chevy what a 'Camaro' was, product managers famously replied 'a small, vicious animal that eats Mustangs'."
    },
    {
        q: "The McLaren F1 famously has a top speed of 240.1 mph. How many seats does it have?",
        opts: ["2", "3", "4", "1"],
        a: 1,
        fact: "Gordon Murray designed the F1 with 3 seats, placing the driver directly in the center for optimal visibility and weight distribution."
    },
    {
        q: "In what year did the Chevrolet Corvette finally switch to a mid-engine layout?",
        opts: ["2018", "2019", "2020", "2021"],
        a: 2,
        fact: "With the introduction of the C8 generation in 2020, the Corvette finally realized Zora Arkus-Duntov's decades-old dream of going mid-engine."
    },
    {
        q: "The Porsche 959 featured a highly advanced 'PSK' system. What did this system manage?",
        opts: ["Active Aerodynamics", "All-Wheel Drive", "Sequential Turbos", "Active Suspension"],
        a: 1,
        fact: "The Porsche-Steuer Kupplung (PSK) was an incredibly advanced torque-vectoring all-wheel-drive system, years ahead of its time."
    },
    {
        q: "Which car is famously known for performing 'The Scandinavian Flick'?",
        opts: ["Volvo 240", "Saab 900", "Audi Quattro", "Any rally car"],
        a: 3,
        fact: "While popular in Scandinavia, 'The Scandinavian Flick' is a rally driving technique used to induce oversteer and carry speed through corners, employed across almost all rally cars."
    },
    {
        q: "The VTEC system developed by Honda stands for Variable Valve Timing and List Electronic Control. In what car did it debut?",
        opts: ["Honda Civic", "Honda Integra", "Honda NSX", "Honda CR-X"],
        a: 1,
        fact: "VTEC actually debuted globally in the 1989 Honda Integra XSi, specifically the B16A engine."
    },
    {
        q: "Which modern hypercar uses a bespoke massive 6.5L naturally aspirated V12 developed by Cosworth that revs to 11,100 RPM?",
        opts: ["Aston Martin Valkyrie", "Gordon Murray T.50", "Bugatti Tourbillon", "Pagani Utopia"],
        a: 0,
        fact: "The Valkyrie features a Cosworth-developed V12 that produces incredible power and arguably the greatest exhaust note of the modern era."
    },
    {
        q: "What strange aerodynamic feature was famously banned in F1 after the Brabham BT46B used it in 1978?",
        opts: ["Ground effect skirts", "Active aero wings", "A giant suction fan", "Six wheels"],
        a: 2,
        fact: "The 'Fan Car' used a massive rear fan ostensibly for 'cooling', but it actually sucked the car to the ground for infinite cornering grip. It was immediately banned."
    },
    {
        q: "Alfa Romeo's high-performance models wear a special green four-leaf clover badge. What is its Italian name?",
        opts: ["Scuderia", "Quadrifoglio", "Corsa", "Superleggera"],
        a: 1,
        fact: "The 'Quadrifoglio' (four-leaf clover) has adorned Alfa's most potent models since Ugo Sivocci painted one on his race car for luck in 1923."
    },
    {
        q: "The incredible Audi Sport Quattro S1 was famous for primarily competing in which motorsport class?",
        opts: ["Group C", "Group A", "Group B Rally", "Formula 1"],
        a: 2,
        fact: "The SWB, incredibly aggressive S1 Quattro is synonymous with the terrifying and legendary 'Group B' rally era."
    },
    {
        q: "What does 'GTR' stand for in Nissan GT-R?",
        opts: ["Grand Touring Racing", "Gran Turismo Racer", "Gran Turismo Racing", "Grand Touring Racer"],
        a: 2,
        fact: "Gran Turismo Racing emphasizes that it's a fast long-distance cruiser crossed with a hardcore track weapon."
    },
    {
        q: "The Shelby Cobra originally started its life as a British sports car made by which manufacturer?",
        opts: ["Austin-Healey", "Triumph", "AC Cars", "Morgan"],
        a: 2,
        fact: "Carroll Shelby took the lightweight AC Ace chassis, ripped out the anemic British six-cylinder, and stuffed in a massive Ford V8."
    },
    {
        q: "Which car is famously nicknamed the 'Widowmaker' due to its vicious snap-oversteer characteristics?",
        opts: ["Ferrari F40", "Porsche 911 Turbo (930)", "Dodge Viper", "AC Cobra"],
        a: 1,
        fact: "The 930 generation Porsche 911 Turbo had massive turbo lag and all its weight over the rear wheels, punishing inexperienced drivers who lifted mid-corner."
    },
    {
        q: "The 'Hellcat' engine from Dodge is a 6.2L V8 topped with what forced induction method?",
        opts: ["Twin Turbochargers", "Procharger", "Supercharger", "Nitrous Oxide"],
        a: 2,
        fact: "The Hellcat block is topped with a massive 2.4-liter twin-screw supercharger that produces the engine's signature screaming whine."
    },
    {
        q: "Which car holds the production car lap record around the Nürburgring Nordschleife as of 2024?",
        opts: ["Mercedes-AMG One", "Porsche 911 GT2 RS", "Lamborghini Aventador SVJ", "McLaren Senna"],
        a: 0,
        fact: "The F1-powered Mercedes-AMG One set an insane blistering lap time of 6:29.090 around the Green Hell."
    },
    {
        q: "The Ferrari Testarossa is most easily identified by which styling feature?",
        opts: ["Pop-up headlights", "Flying buttresses", "Massive side strakes/cheese graters", "Scissor doors"],
        a: 2,
        fact: "The 'cheese grater' side strakes design were actually mandated to meet international safety laws regarding the massive side radiators."
    },
    {
        q: "What does ‘JDM’ actually stand for?",
        opts: ["Japanese Drift Motors", "Japanese Domestic Market", "Japan Direct Manufacturing", "Japanese Driving Machines"],
        a: 1,
        fact: "JDM strictly refers to cars built specifically for the Japanese Domestic Market, though the term has evolved into a global car culture subset."
    },
    {
        q: "Which hypercar uses a revolutionary 'FreeValve' camless engine technology developed by Koenigsegg?",
        opts: ["Jesko", "Regera", "Gemera", "Agera RS"],
        a: 2,
        fact: "The 4-seat Gemera features the 'Tiny Friendly Giant' . a 2.0L 3-cylinder twin-turbo engine with no camshafts that makes 600hp."
    },
    {
        q: "The Aston Martin DB5 is eternally linked to which fictional character?",
        opts: ["Jason Bourne", "Batman", "James Bond", "Ethan Hunt"],
        a: 2,
        fact: "Since Goldfinger (1964), the DB5 has been the quintessential James Bond vehicle, complete with ejector seats and machine guns."
    },
    {
        q: "What unique mechanism did the Ferrari Enzo use to actuate its automated manual gearshifts?",
        opts: ["Hydraulic paddles", "F1-style single clutch", "Twin-disc dry clutch", "CVT chains"],
        a: 1,
        fact: "The Enzo used an F1-derived automated manual transmission that essentially slammed a massive single clutch into place in 150 milliseconds."
    },
    {
        q: "Where is the engine located in an Aston Martin Vulcan?",
        opts: ["Mid-mounted", "Front-mid mounted", "Front mounted", "Rear mounted"],
        a: 1,
        fact: "It features a massive naturally aspirated 7.0L V12 pushed entirely behind the front axle line, making it a 'front-mid-engine' setup."
    },
    {
        q: "Which automaker uses the 'Boxer' engine layout to keep their vehicles' center of gravity incredibly low?",
        opts: ["Audi & Volkswagen", "Subaru & Porsche", "Honda & Acura", "Mazda & Nissan"],
        a: 1,
        fact: "Both Subaru and Porsche rely heavily on the flat, horizontally-opposed 'Boxer' engine design for its dynamic packaging benefits."
    },
    {
        q: "The Plymouth Superbird was famously banned from NASCAR for what reason?",
        opts: ["Excessive horsepower", "Illegal engine displacement", "Aerodynamic dominance", "Unsafe braking"],
        a: 2,
        fact: "The massive rear wing and aerodynamic nose cone of the Superbird (and Dodge Daytona) made them so dominant that NASCAR instituted the 'aero engine' rule to ban them."
    },
    {
        q: "The term 'Homologation Special' refers to vehicles that were...",
        opts: ["Hand-crafted by a single engineer", "Built solely to satisfy racing rulebooks", "Designed exclusively for the autobahn", "Built using only composite materials"],
        a: 1,
        fact: "Racing bodies like the FIA often required a manufacturer to build 'X' amount of road cars before the race car version is allowed to compete."
    },
    {
        q: "What famous automotive designer penned the lines of the Lamborghini Miura, Countach, and Lancia Stratos?",
        opts: ["Giorgetto Giugiaro", "Marcello Gandini", "Pininfarina", "Ian Callum"],
        a: 1,
        fact: "Working at Bertone, Gandini essentially defined modern wedge supercar design with his incredible pencil strokes."
    },
    {
        q: "Which car is famously known as the first 'Supercar'?",
        opts: ["Ferrari 250 GTO", "Lamborghini Miura", "Mercedes 300SL Gullwing", "AC Cobra"],
        a: 1,
        fact: "The Miura layout (transverse mid-engine V12) and stunning design established the template that all modern supercars follow to this day."
    },
    {
        q: "The Porsche Carrera GT features a screaming V10 engine that was originally designed for which racing series?",
        opts: ["Formula 1", "Le Mans Prototype", "WRC", "IndyCar"],
        a: 0,
        fact: "Porsche secretly developed a 5.5L V10 for the Footwork F1 team in the 1990s. The program was canceled, but the engine was resurrected for the Carrera GT."
    },
    {
        q: "When it comes to drifting, which lightweight, balanced Toyota chassis is considered the grandfather of the sport?",
        opts: ["AE86 Corolla", "A80 Supra", "SW20 MR2", "JZX100 Chaser"],
        a: 0,
        fact: "The Hachi-Roku (AE86), popularized by Keiichi Tsuchiya and Initial D, proved you didn't need massive power to slide gracefully."
    },
    {
        q: "Which component fails spectacularly in 'The Fast and the Furious' causing Brian O'Conner's floorboards to fall out?",
        opts: ["The ECU", "The Nitrous Manifold", "The Wastegate", "The Danger to Manifold warning"],
        a: 3,
        fact: "The infamous 'Danger to Manifold' laptop warning resulted in the inexplicable shedding of the car's passenger side floor pan."
    },
    {
        q: "The classic Mini Cooper achieved motorsport fame by winning which prestigious event three times in the 1960s?",
        opts: ["The Indy 500", "The Monte Carlo Rally", "The Dakar Rally", "The 24 Hours of Le Mans"],
        a: 1,
        fact: "Despite its tiny size and lack of power, the Mini Cooper S used its incredible agility to conquer the twisting snow roads of Monte Carlo."
    },
    {
        q: "What does the abbreviation 'AMG' stand for in Mercedes-AMG?",
        opts: ["Aufrecht, Melcher, Großaspach", "Advanced Motor Group", "Alpina Motor Gesellschaft", "Auto Motor Germany"],
        a: 0,
        fact: "It stands for the founders, Hans Werner Aufrecht and Erhard Melcher, alongside Aufrecht's birthplace, Großaspach."
    }
];

// Helper to grab random questions based on limit
export const getRandomTrivia = (limit: number) => {
    const shuffled = [...carTriviaBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};
